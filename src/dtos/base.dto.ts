import {
  IsString,
  IsInt,
  Min,
  Max,
  IsArray,
  IsOptional,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryDTO {
  @ApiPropertyOptional({
    description: 'pageNum页面(1开始)',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'pageNum必须为必须为有效整数' })
  @Min(1, { message: 'pageNum应大于等于1' })
  readonly pageNum = 1;

  @ApiPropertyOptional({
    description: 'pageSize页面(1开始)',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'pageSize必须为必须为有效整数' })
  @Min(1, { message: 'pageSize应大于等于1' })
  @Max(1000, { message: 'pageSize应小于等于1000' })
  readonly pageSize = 10;

  @ApiPropertyOptional({
    description:
      '排序字段(https://www.sequelize.com.cn/core-concepts/model-querying-basics#%E6%8E%92%E5%BA%8F)',
    type: Array,
  })
  @IsOptional()
  @IsArray({ message: 'order必须为数组' })
  readonly order?: Array<any>;

  @ApiPropertyOptional({
    description:
      '查询字段名(https://www.sequelize.com.cn/core-concepts/model-querying-basics#select-%E6%9F%A5%E8%AF%A2%E7%89%B9%E5%AE%9A%E5%B1%9E%E6%80%A7)',
    type: Object,
  })
  @IsOptional()
  readonly attributes?: any;
}
