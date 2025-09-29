import { Model, Table, Column, DataType, Index } from 'sequelize-typescript';

@Table({
  tableName: 't_admin_user_custom_attribute',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class TAdminUserCustomAttribute extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    comment: '中文名称',
  })
  name_cn?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: '属性名称',
  })
  name!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否多映射',
  })
  multi_mapping!: boolean;

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
