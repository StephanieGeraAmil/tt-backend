import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Card from './Card';

@Table({ tableName: 'Notes', timestamps: true })
class Note extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public content!: string;

  @ForeignKey(() => Card) 
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public cardId!: number;

  @BelongsTo(() => Card, { onDelete: 'CASCADE' })
  public card!: Card;
}

export default Note;
