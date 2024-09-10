import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import Deck from './Deck';

@Table({ tableName: 'Cards', timestamps: true })
class Card extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  // })
  // public title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  public content!: string;

  @ForeignKey(() => Deck) 
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public deckId!: number;
}

export default Card;
