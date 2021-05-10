import { IsDefined, IsString, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  readonly uid: string

  @ApiProperty()
  @IsBoolean()
  @IsDefined()
  readonly cms_access: boolean
}

export class FirebaseDto {
  @ApiProperty()
  identities: Record<string, string>
  @ApiProperty()
  sign_in_provider: string
  @ApiProperty()
  sign_in_second_factor?: string
  @ApiProperty()
  second_factor_identifier?: string
  @ApiProperty()
  tenant?: string
}

export class FirebaseUserDto {
  @ApiProperty()
  aud: string
  @ApiProperty()
  auth_time: number
  @ApiProperty()
  email?: string
  @ApiProperty()
  email_verified?: boolean
  @ApiProperty()
  exp: number
  @ApiProperty()
  firebase: FirebaseDto
  @ApiProperty()
  iat: number
  @ApiProperty()
  iss: string
  @ApiProperty()
  phone_number?: string
  @ApiProperty()
  picture?: string
  @ApiProperty()
  sub: string
  @ApiProperty()
  uid: string
}
