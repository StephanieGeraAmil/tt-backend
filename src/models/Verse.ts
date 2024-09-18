import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Card from './Card';

@Table({ tableName: 'Verses', timestamps: true })
class Verse extends Model {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public reference!: string;

  @ForeignKey(() => Card)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public cardId!: number;


  @BelongsTo(() => Card, { onDelete: 'CASCADE' })
  public card!: Card;
}

export default Verse;
