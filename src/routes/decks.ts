// API routes
import express from 'express';
import Deck from '../models/Deck';
import Card from '../models/Card';
import Verse from '../models/Verse';
import Note from '../models/Note';
import User from '../models/User';

const router = express.Router();

// Get all decks
router.get('/', async (req, res) => {
    try {
        const decks = await Deck.findAll({
            include: {
                model: Card,
                include: [
                    {
                        model: Verse, 
                        required: false, 
                    },
                    {
                        model: Note, 
                        required: false, 
                    },
                ],
            },
        });
        res.json(decks);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Get decks of user with associated cards, verses, or notes
router.get('/:email', async (req, res) => {
    const { email } = req.params;
    console.log("in router deck");
    try {
        // Fetch the user by email
        const user = await User.findOne({ where: { email } });

        // If no user is found, return a 404 response
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch decks by userId, along with associated Cards, Verses, and Notes
        const decks = await Deck.findAll({
            where: { userId: user.id }, // Filter by userId
            include: {
                model: Card,
                include: [
                    {
                        model: Verse,
                        required: false,
                    },
                    {
                        model: Note,
                        required: false, 
                    },
                ],
           },
        });

        // Return the decks with associated cards, verses, and notes
        res.json(decks);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});


// Create a new deck (for a specific user)
router.post('/', async (req, res) => {
    
    const { userId, name } = req.body;
    try {
        const newDeck = await Deck.create({
            name,
            userId,
        });
        res.status(201).json(newDeck);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Update an existing deck
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const [updated] = await Deck.update(
            { name },
            { where: { id } }
        );
        if (updated) {
            const updatedDeck = await Deck.findByPk(id);
            res.json(updatedDeck);
        } else {
            res.status(404).json({ error: 'Deck not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});
// Delete a deck
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Deck.destroy({
            where: { id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Deck not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});


export default router;

