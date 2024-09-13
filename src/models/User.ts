import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Deck from './Deck'; // Import the Deck model

@Table({ tableName: 'Users', timestamps: true })
class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  public email!: string;

  @HasMany(() => Deck) // Association with Deck model
  public decks!: Deck[];
}

export default User;


