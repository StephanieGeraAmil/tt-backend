import express, { Request, Response } from 'express';
import Note from '../models/Note'; 


const router = express.Router();

// Get all notes
router.get('/', async (req: Request, res: Response) => {
    try {
        const notes = await Note.findAll({
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Get a single note by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const note = await Note.findByPk(id, {
        });
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Create a new note
router.post('/', async (req: Request, res: Response) => {
    const { content, cardId } = req.body;
    try {
        const newNote = await Note.create({
            content,
            cardId, // Associate with an existing card
        });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Update an existing note
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, cardId } = req.body;
    try {
        const note = await Note.findByPk(id);
        if (note) {
            await note.update({
                content,
                cardId,
            });
            res.json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Delete a note by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const note = await Note.findByPk(id);
        if (note) {
            await note.destroy();
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;
