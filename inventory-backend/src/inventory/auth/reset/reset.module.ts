import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../jwt.strategy';
import { UserRepository } from '../user.repository';
import { ResetController } from './reset.controller';
import { ResetRepository } from './reset.repository';
import { ResetService } from './reset.service';

@Module({
    imports: [
      ConfigModule,
      PassportModule.register({ defaultStrategy: 'jwt'}),
      JwtModule.registerAsync({ 
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          // secret: configService.get('JWT_SECRET'), 
          secret: 'secret', 
          signOptions: 
            { expiresIn: '1d' } 
        })
      }),
      TypeOrmModule.forFeature([ResetRepository, UserRepository]),
    ],
    providers: [JwtStrategy, ResetService],
    controllers: [ResetController],
    exports: [JwtStrategy, PassportModule]
  })
export class ResetModule {}
