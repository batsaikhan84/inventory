import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { CreateResetPasswordDto } from './create-reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(authCredentialsDto);
    if(!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const username = user.username
    const department = user.department
    const role = user.role
    const name = user.name
    const payload: JwtPayload = { username, department, role, name }
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
  async resetPassword(createResetPasswordDto: CreateResetPasswordDto): Promise<void> {
    return this.userRepository.resetPasswrod(createResetPasswordDto)
  }
}


