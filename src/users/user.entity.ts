import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsDefined, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryColumn()
  uid: string

  @ApiProperty()
  @Column('boolean', { default: false })
  @IsBoolean()
  @IsDefined()
  cms_access: boolean

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date
}
