import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
//import path from 'path';
import User from './models/User';  
import Deck from './models/Deck';  
import Card from './models/Card';
import Verse from './models/Verse';
import Note from './models/Note';



config(); 

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
 // models: [path.join(__dirname, 'models')],
 models: [User, Deck, Card, Verse, Note],
});

export { sequelize };
