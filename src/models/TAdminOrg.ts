import { Model, Table, Column, DataType, Index } from 'sequelize-typescript';

export enum OrgType {
  GAP = 1,
  UAP = 2,
  Plant = 3,
}

@Table({
  tableName: 't_admin_org',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class TAdminOrg extends Model {
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
    comment: '组织名称',
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: '父级组织ID',
  })
  parent_id?: number;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
    comment: '组织类型: 1-GAP, 2-UAP, 3-Plant',
  })
  type!: OrgType;

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
