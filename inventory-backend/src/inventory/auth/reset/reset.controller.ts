import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateResetDto } from './create-reset.dto';
import { ResetService } from './reset.service';

@Controller('reset')
export class ResetController {
    constructor(private resetService: ResetService) { }
    @Post()
    resetPassword(@Body() createResetDto: CreateResetDto): Promise<void> {
        return this.resetService.passwordReset(createResetDto)
    }
}
