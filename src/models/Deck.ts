import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Card from './Card'; 

@Table({ tableName: 'Decks', timestamps: true })
class Deck extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: true,
//   })
//   public description!: string;

  @HasMany(() => Card) // Association with Card model
  public cards!: Card[];

}

export default Deck;
