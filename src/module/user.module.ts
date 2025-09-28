import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Poll } from 'src/entity/poll.entity';
import { Sub } from 'src/entity/sub.entity';
import { Vote } from 'src/entity/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Poll, Sub, Vote]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}