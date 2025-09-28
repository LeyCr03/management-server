import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "src/dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findById(id: string): Promise<User | null> { // Find user by id
    return this.userRepository.findOne({ where: { id } });
  }
  async findByEmail(email: string): Promise<User | null> { // Find user by email
    return this.userRepository.findOne({ where: { email } });
  }

  async updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void> {
    await this.userRepository.update(userId, { refreshTokenHash });
  }

  async getUserWithRefreshTokenHash(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'password', 'refreshTokenHash'],
    });
  }

  async deleteUser(id: string): Promise<{ message: string }> { //delete function
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User with ID ${id} not found.');
    }

    await this.userRepository.remove(user);
    return { message: ' User deleted Succsessfully' };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{ message: string }> { //update function
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User with ID ${id} not found.');
    }
    await this.userRepository.update(id, updateUserDto);
    return { message: ' User Updated' };
  }
}