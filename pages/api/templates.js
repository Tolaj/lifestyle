// pages/api/templates.js
import dbConnect from 'utils/dbConnect';
import Template from 'models/Template';
import systemTemplates from 'constants/templates';
import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';

export default async function handler(req, res) {
    await dbConnect();

    // Seed system templates if they don't exist
    const systemCount = await Template.countDocuments({ isSystem: true });
    if (systemCount === 0) {
        await Template.insertMany(systemTemplates);
    }

    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth;
    let userId = null;
    if (token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET);
            userId = decoded.id;
        } catch (e) { }
    }

    if (req.method === 'GET') {
        // Return system templates + templates created by this user
        const query = userId
            ? { $or: [{ isSystem: true }, { createdBy: userId }] }
            : { isSystem: true };
        const templates = await Template.find(query).sort({ isSystem: -1, createdAt: 1 });
        return res.status(200).json(templates);
    }

    if (req.method === 'POST') {
        // Save a custom template
        if (!userId) return res.status(401).json({ message: 'Not authenticated' });
        const { name, emoji, description, categories, products } = req.body;
        const template = await Template.create({
            name,
            emoji: emoji || '📦',
            description,
            isSystem: false,
            createdBy: userId,
            categories,
            products,
        });
        return res.status(201).json(template);
    }

    if (req.method === 'DELETE') {
        if (!userId) return res.status(401).json({ message: 'Not authenticated' });
        const { id } = req.query;
        const template = await Template.findOne({ _id: id, createdBy: userId, isSystem: false });
        if (!template) return res.status(404).json({ message: 'Template not found or not deletable' });
        await Template.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Template deleted' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}