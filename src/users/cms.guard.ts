import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { UsersService } from './users.service'

@Injectable()
export class CmsGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const databaseUser = await this.usersService.findOne(request.user.uid)
    return databaseUser?.cms_access || false
  }
}
