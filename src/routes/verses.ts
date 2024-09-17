import express, { Request, Response } from 'express';
import Verse from '../models/Verse'; // Import the Verse model

const router = express.Router();

// Get all verses
router.get('/', async (req: Request, res: Response) => {
    try {
        const verses = await Verse.findAll({
        });
        res.json(verses);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Get a single verse by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const verse = await Verse.findByPk(id, {
        });
        if (verse) {
            res.json(verse);
        } else {
            res.status(404).json({ error: 'Verse not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Create a new verse
router.post('/', async (req: Request, res: Response) => {
    const { content, reference, cardId } = req.body;
    try {
        const newVerse = await Verse.create({
            content,
            reference,
            cardId, // Associate with an existing card
        });
        res.status(201).json(newVerse);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Update an existing verse
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, reference, cardId } = req.body;
    try {
        const verse = await Verse.findByPk(id);
        if (verse) {
            await verse.update({
                content,
                reference,
                cardId,
            });
            res.json(verse);
        } else {
            res.status(404).json({ error: 'Verse not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Delete a verse by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const verse = await Verse.findByPk(id);
        if (verse) {
            await verse.destroy();
            res.status(204).send(); // No content, successful deletion
        } else {
            res.status(404).json({ error: 'Verse not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;
