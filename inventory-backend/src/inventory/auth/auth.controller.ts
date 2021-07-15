import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { CreateResetPasswordDto } from './create-reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto)
    }
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        
        return this.authService.signIn(authCredentialsDto)
    }
    @Post('reset-password')
    resetPassword(@Body(ValidationPipe) creeateResetPasswordDto: CreateResetPasswordDto): Promise<void> {
        return this.authService.resetPassword(creeateResetPasswordDto)
    }
}
