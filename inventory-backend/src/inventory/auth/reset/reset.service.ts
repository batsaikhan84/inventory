import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResetDto } from './create-reset.dto';
import { JwtResetPayload } from './jwt-reset.payload.interface';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { ResetRepository } from './reset.repository';

@Injectable()
export class ResetService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private resetRepository: ResetRepository
      ) { }
    async passwordReset(createResetDto: CreateResetDto): Promise<void> {
        const user = await this.userRepository.findOne({ where: {username: createResetDto.username }})
        if(!user) {
            console.log(user)
          throw new UnauthorizedException('Invalid username or email')
        }
        const username = user.username
        const email = createResetDto.email
        const name = user.name
        const payload: JwtResetPayload = { username, email, name }
        const resetToken = this.jwtService.sign(payload);
        this.resetRepository.createResetToken(resetToken)
        
      }
}
