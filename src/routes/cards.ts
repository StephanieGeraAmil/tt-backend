import express, { Request, Response } from 'express';
import Card from '../models/Card'; // Import the Card model
import Verse from '../models/Verse'; // Import the Verse model
import Note from '../models/Note'; // Import the Note model

const router = express.Router();

// Get all cards
router.get('/', async (req: Request, res: Response) => {
    try {
        const cards = await Card.findAll({
            include: [
                { model: Verse}, 
                { model: Note},               
            ],
            order: [['order', 'ASC']], 
        });
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Get a single card by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const card = await Card.findByPk(id, {
            include: [
                { model: Verse },
                { model: Note },
            ],
        });
        if (card) {
            res.json(card);
        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});


// Create a new card for a specific deck
router.post('/', async (req, res) => {
    const { deckId, order } = req.body;
    try {
        // Ensure that both deckId and order are provided
        const newCard = await Card.create({
            deckId,
            order, // Provide the order
        });
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});


// Update an existing card
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const {  order } = req.body;

    try {
        const [updated] = await Card.update(
            { order }, 
            { where: { id } }
        );
        if (updated) {
            const updatedCard = await Card.findByPk(id);
            res.json(updatedCard);
        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Delete a card
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleted = await Card.destroy({
            where: { id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;
