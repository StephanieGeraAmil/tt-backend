import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Card from './Card'; 
import User from './User'; 

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

  @HasMany(() => Card) 
  public cards!: Card[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false, 
  })
  public userId!: number; 
  
  @BelongsTo(() => User)
  public user!: User;

}

export default Deck;
