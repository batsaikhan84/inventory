import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { User } from "./user.entity";
import * as bcryptjs from 'bcryptjs'
import { CreateResetPasswordDto } from "./create-reset-password.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, name, role, department } = authCredentialsDto
        const user = new User();
        user.salt = await bcryptjs.genSalt();
        user.username = username.toLowerCase();
        user.password = await this.hashPassword(password, user.salt);
        user.name = name;
        user.role = role;
        user.department = department;
        try {
            await user.save();
        } catch(error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('username already exists')
            } else {
                throw new InternalServerErrorException();
            }
        } 
    }
    async resetPasswrod(createResetPasswordDto: CreateResetPasswordDto): Promise<void> {
        const { username, password, password_confirm } = createResetPasswordDto
        if (password !== password_confirm) {
            throw new ConflictException('password mismatch')
        }
        const user = await this.findOne({ username })
        if(!user) {
            throw new UnauthorizedException('Invalid username')
        }
        if(await user.validatePassword(password)) {
            throw new ConflictException("password used previously")
        }
        user.salt = await bcryptjs.genSalt()
        user.password = await this.hashPassword(password, user.salt)
        try {
            await user.save();
        } catch(error) {
            throw new InternalServerErrorException();
        } 
    }
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcryptjs.hash(password, salt)
    }
    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto
        const user = await this.findOne({ username })
        if(user && await user.validatePassword(password)) {
            return user
        } else {
            return null;
        }
    }
}