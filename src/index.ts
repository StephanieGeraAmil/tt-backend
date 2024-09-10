import express from 'express';
import { config } from 'dotenv';
import deckRoutes from './routes/decks';
import { sequelize } from './sequelize'; 
// import cardRoutes from './routes/cards';

config(); // Load environment variables

const app = express();

app.use(express.json());  

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    // Synchronize models with the database
    return sequelize.sync(); // This ensures models are initialized and tables are created
  })
  .then(() => {
    console.log('Models synchronized with the database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database or sync models:', error);
  });

// Routes
app.use('/decks', deckRoutes);
// app.use('/cards', cardRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
