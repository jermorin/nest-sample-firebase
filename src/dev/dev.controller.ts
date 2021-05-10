import { Body, Controller, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { DevService } from './dev.service'
import { CreateTokenDto } from './dev.dto'

@ApiTags('Dev')
@Controller('dev')
export class DevController {
  constructor(private readonly devService: DevService) {}

  @Post('generate-token')
  @ApiResponse({
    status: 201,
    type: String,
  })
  createUrl(@Body() dto: CreateTokenDto): Promise<string> {
    return this.devService.generateToken(dto.uid)
  }
}
