import express from 'express';
import User from '../models/User'; 
import { Request, Response } from 'express';

const router = express.Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll(); // Fetch all users
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});


// Get a single user by email
router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        console.log("in user router");
        const user = await User.findOne({ where: { email } }); // Fetch user by email
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const newUser = await User.create({ email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});


// Delete a user by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy(); // Delete the user
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;
