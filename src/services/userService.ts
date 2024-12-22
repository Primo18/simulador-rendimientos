import User from '../models/user.js';
import { hashPassword, comparePassword } from '../utils/bcryptHelper.js';

class UserService {
    async createUser(username: string, password: string, role: string = 'USER') {
        const hashedPassword = await hashPassword(password);
        return await User.create({ username, password: hashedPassword, role });
    }

    async authenticateUser(username: string, password: string) {
        const user = await User.findOne({ where: { username } });
        if (!user) throw new Error('User not found');

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');

        return user;
    }

    async getUserById(id: number) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        return user;
    }
}

export default new UserService();
