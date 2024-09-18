import { Table, Column, Model, DataType, ForeignKey, HasMany, HasOne, BelongsTo } from 'sequelize-typescript';
import Deck from './Deck';
import Verse from './Verse';
import Note from './Note';

@Table({ tableName: 'Cards', timestamps: true })
class Card extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public order!: number;


  @ForeignKey(() => Deck)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public deckId!: number;
  @BelongsTo(() => Deck, { onDelete: 'CASCADE' })
  public deck!: Deck;

  @HasOne(() => Verse, { foreignKey: 'cardId', onDelete: 'CASCADE' })
  public verse!: Verse;

  @HasOne(() => Note, { foreignKey: 'cardId', onDelete: 'CASCADE' })
  public note!: Note;
}

export default Card;
