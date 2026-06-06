// pages/api/applyTemplate.js
import dbConnect from 'utils/dbConnect';
import Template from 'models/Template';
import { Category } from 'models/index';
import Product from 'models/Product';
import Group from 'models/Group';
import Order from 'models/Order';
import Inventory from 'models/Inventory';
import Wishlist from 'models/Wishlist';
import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end();
    }

    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    let userId, groupId;
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
        groupId = req.body.groupId;
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const { templateId } = req.body;

    const template = await Template.findById(templateId);
    if (!template) return res.status(404).json({ message: 'Template not found' });

    const group = await Group.findById(groupId).populate('categories products orders inventories wishlists');
    if (!group) return res.status(404).json({ message: 'Group not found' });

    // --- Conflict check ---
    // Get existing category and product IDs in group
    const existingCategoryIds = group.categories.map(c => c._id.toString());
    const existingProductIds = group.products.map(p => p._id.toString());

    // Get all product IDs referenced in orders, inventory, wishlists
    const referencedProductIds = new Set();

    const orders = await Order.find({ _id: { $in: group.orders } });
    orders.forEach(o => o.items.forEach(i => referencedProductIds.add(i.product?.toString())));

    const inventories = await Inventory.find({ _id: { $in: group.inventories } });
    inventories.forEach(i => referencedProductIds.add(i.product?.toString()));

    const wishlists = await Wishlist.find({ _id: { $in: group.wishlists } });
    wishlists.forEach(w => w.items.forEach(i => referencedProductIds.add(i.product?.toString())));

    // Products that are referenced but won't exist in new template
    const templateProductNames = template.products.map(p => p.name.toLowerCase());
    const conflictingProducts = group.products.filter(p =>
        referencedProductIds.has(p._id.toString()) &&
        !templateProductNames.includes(p.name.toLowerCase())
    );

    if (conflictingProducts.length > 0) {
        return res.status(409).json({
            message: 'conflict',
            conflicts: conflictingProducts.map(p => p.name),
        });
    }

    // --- Apply template ---
    // Remove existing categories and products not referenced anywhere
    const safeToRemoveCategoryIds = group.categories
        .filter(c => !group.products.some(p => p.category?.toString() === c._id.toString() && referencedProductIds.has(p._id.toString())))
        .map(c => c._id);

    const safeToRemoveProductIds = group.products
        .filter(p => !referencedProductIds.has(p._id.toString()))
        .map(p => p._id);

    await Category.deleteMany({ _id: { $in: safeToRemoveCategoryIds } });
    await Product.deleteMany({ _id: { $in: safeToRemoveProductIds } });

    await Group.updateOne({ _id: groupId }, {
        $pull: {
            categories: { $in: safeToRemoveCategoryIds },
            products: { $in: safeToRemoveProductIds },
        }
    });

    // Create new categories
    const categoryMap = {};
    for (const cat of template.categories) {
        const existing = await Category.findOne({ name: cat.name, _id: { $in: group.categories } });
        if (existing) {
            categoryMap[cat.name] = existing._id;
        } else {
            const newCat = await Category.create({ name: cat.name, icon: cat.icon, color: cat.color });
            await Group.updateOne({ _id: groupId }, { $addToSet: { categories: newCat._id } });
            categoryMap[cat.name] = newCat._id;
        }
    }

    // Create new products
    for (const prod of template.products) {
        const categoryId = categoryMap[prod.category];
        if (!categoryId) continue;
        const existing = await Product.findOne({ name: prod.name, _id: { $in: group.products } });
        if (!existing) {
            const newProd = await Product.create({
                name: prod.name,
                category: categoryId,
                price: prod.price || '0',
                unit: prod.unit || 'unit',
                description: prod.description || '',
                inventory: false,
            });
            await Group.updateOne({ _id: groupId }, { $addToSet: { products: newProd._id } });
        }
    }

    return res.status(200).json({ message: 'Template applied successfully' });
}