// pages/api/session.js
import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';

export default function handler(req, res) {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth;

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const user = verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
