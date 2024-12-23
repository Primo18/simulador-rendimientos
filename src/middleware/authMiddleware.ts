import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtHelper.js';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    const payload = verifyToken(token);
    if (!payload) {
        res.status(403).json({ error: 'Invalid token' });
        return;
    }

    req.body.user = payload;
    next();
};

export const authorize = (role: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = req.body.user;
        if (!user || user.role !== role) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }
        next();
    };
};
