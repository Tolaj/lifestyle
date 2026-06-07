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

    const [template, group] = await Promise.all([
        Template.findById(templateId),
        Group.findById(groupId).populate('categories products orders inventories wishlists')
    ]);

    if (!template) return res.status(404).json({ message: 'Template not found' });
    if (!group) return res.status(404).json({ message: 'Group not found' });

    // --- Conflict check ---
    const referencedProductIds = new Set();

    const [orders, inventories, wishlists] = await Promise.all([
        Order.find({ _id: { $in: group.orders } }),
        Inventory.find({ _id: { $in: group.inventories } }),
        Wishlist.find({ _id: { $in: group.wishlists } })
    ]);

    orders.forEach(o => o.items.forEach(i => referencedProductIds.add(i.product?.toString())));
    inventories.forEach(i => referencedProductIds.add(i.product?.toString()));
    wishlists.forEach(w => w.items.forEach(i => referencedProductIds.add(i.product?.toString())));

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
    const safeToRemoveCategoryIds = group.categories
        .filter(c => !group.products.some(p => p.category?.toString() === c._id.toString() && referencedProductIds.has(p._id.toString())))
        .map(c => c._id);

    const safeToRemoveProductIds = group.products
        .filter(p => !referencedProductIds.has(p._id.toString()))
        .map(p => p._id);

    await Promise.all([
        Category.deleteMany({ _id: { $in: safeToRemoveCategoryIds } }),
        Product.deleteMany({ _id: { $in: safeToRemoveProductIds } }),
        Group.updateOne({ _id: groupId }, {
            $pull: {
                categories: { $in: safeToRemoveCategoryIds },
                products: { $in: safeToRemoveProductIds },
            }
        })
    ]);

    // Create all categories in parallel
    const existingCatMap = {};
    group.categories.forEach(c => { existingCatMap[c.name] = c._id; });

    const categoryMap = {};
    const newCats = template.categories.filter(c => !existingCatMap[c.name]);
    const existingCats = template.categories.filter(c => existingCatMap[c.name]);

    existingCats.forEach(c => { categoryMap[c.name] = existingCatMap[c.name]; });

    const createdCats = await Category.insertMany(
        newCats.map(c => ({ name: c.name, icon: c.icon, color: c.color }))
    );

    createdCats.forEach((c, i) => { categoryMap[newCats[i].name] = c._id; });

    if (createdCats.length > 0) {
        await Group.updateOne({ _id: groupId }, {
            $addToSet: { categories: { $each: createdCats.map(c => c._id) } }
        });
    }

    // Create all products in parallel
    const existingProdNames = new Set(group.products.map(p => p.name.toLowerCase()));
    const newProds = template.products.filter(p =>
        categoryMap[p.category] && !existingProdNames.has(p.name.toLowerCase())
    );

    const createdProds = await Product.insertMany(
        newProds.map(p => ({
            name: p.name,
            category: categoryMap[p.category],
            price: p.price || '0',
            unit: p.unit || 'unit',
            description: p.description || '',
            inventory: false,
        }))
    );

    if (createdProds.length > 0) {
        await Group.updateOne({ _id: groupId }, {
            $addToSet: { products: { $each: createdProds.map(p => p._id) } }
        });
    }

    return res.status(200).json({ message: 'Template applied successfully' });
}