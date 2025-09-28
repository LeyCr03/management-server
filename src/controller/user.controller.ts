import { Controller, UseGuards, Request, Delete, Put, Body } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { DecodedRequest } from 'src/types';
import { UpdateUserDto } from 'src/dto/user.dto';

@ApiTags('Users')
@Controller('api/users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('accessToken')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Delete()
  @ApiOperation({ summary: "Delete user by ID" })
  @ApiResponse({ status: 200, description: 'User deleted succsesssfully' })
  @ApiResponse({ status: 404, description: 'User Not found.' })
  async delete(@Request() req: DecodedRequest): Promise<{message: string}>{
    return this.userService.deleteUser(req.user._id)
  }

  @Put()
  @ApiOperation({ summary: "Updated user by ID" })
  @ApiResponse({ status: 200, description: 'User Updated succsesssfully' })
  @ApiResponse({ status: 404, description: 'User Not found.' })
  async update(@Request() req: DecodedRequest, @Body() updateUserDto: UpdateUserDto):Promise<{message: string}>{
    return this.userService.updateUser(req.user._id, updateUserDto)
  }
}
