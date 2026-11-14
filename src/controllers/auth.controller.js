import { login } from '../services/auth.service.js';

export const loginController = async (req, res, next) => {
    const { username, password } = req.body ?? {};
    if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password) {
        return res.status(400).json({ error: 'Username y password son requeridos' });
    }
    try {
        const result = await login(username.trim(), password);
        if (!result) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        res.status(200).json({ token: result.token });
    } catch (error) {
        next(error);
    }
};