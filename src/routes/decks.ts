// API routes
import express from 'express';
import Deck from '../models/Deck';  

const router = express.Router();

// Get all decks
router.get('/', async (req, res) => {
    const decks = await Deck.findAll();
    res.json(decks);
});

// Create a new deck
router.post('/', async (req, res) => {
    const newDeck = await Deck.create(req.body);
    res.json(newDeck);
});

// Other CRUD operations (update, delete) would follow

export default router;

