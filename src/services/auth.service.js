import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authModel from '../models/auth.model.js';

export const login = async (username, password) => {
    const user = await authModel.getUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) return null;
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
};