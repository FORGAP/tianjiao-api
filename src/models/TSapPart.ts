import { Model, Table, Column, DataType, Index } from 'sequelize-typescript';

@Table({
  tableName: 't_sap_part',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class TSapPart extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    comment: '零件编号',
  })
  part_no!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: '零件描述',
  })
  description?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: '项目ID',
  })
  project_id?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: '客户ID',
  })
  customer_id?: number;

  @Column({
    type: DataType.DECIMAL(18, 0),
    allowNull: true,
    comment: '销售价格',
  })
  sales_price?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: '创建者ID',
  })
  created_by?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: '更新者ID',
  })
  updated_by?: number;
}
