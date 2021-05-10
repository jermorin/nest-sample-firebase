import { IsDefined, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTokenDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  readonly uid: string
}
