import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/env.js';

const secretKey = jwtConfig.secret || 'secret';
const expires = jwtConfig.expiresIn || '1h';

export const generateToken = (payload: object, expiresIn: string = expires): string => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token: string): string | object | null => {
    try {
        return jwt.verify(token, secretKey);
    } catch {
        return null;
    }
};
