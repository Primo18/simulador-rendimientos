import { Request, Response } from 'express';
import UserService from '../services/userService.js';
import { getErrorMessage } from '../utils/errorHelper.js';
import { generateToken } from '../utils/jwtHelper.js';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;
        const user = await UserService.createUser(username, password, role);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await UserService.authenticateUser(username, password);
        const token = generateToken({ id: user.id, username: user.username, role: user.role });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ error: getErrorMessage(error) });
    }
};