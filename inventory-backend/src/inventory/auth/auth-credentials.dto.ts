import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Transform } from "node:stream";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "password must include at least one upper and one lower case and number or character"}) // at least one upper and one lower case and number or character
    password: string;
    name: string;
    role: string;
    department: string;
}