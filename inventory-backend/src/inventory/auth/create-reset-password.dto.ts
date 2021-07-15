import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateResetPasswordDto {
    username: string;
    password_confirm: string;
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'please include at least one upper and one lower case and number or character '}) // at least one upper and one lower case and number or character
    password: string;
    
}