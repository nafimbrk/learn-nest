import { RegisterDto } from './dto/register.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { Role } from './enum/role.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async registerUser(registerDto: RegisterDto): Promise<{message: string}>{
        const hashPassword = await bcrypt.hash(registerDto.password, 10)

        const userEmail = await this.userRepository.findOneBy({email: registerDto.email})
        const userName = await this.userRepository.findOneBy({name: registerDto.name})

        if (userEmail){
            throw new ConflictException('email is already exist')
        }

        if (userName){
            throw new ConflictException('username is already exist')
        }

        const userData = await this.userRepository.find()
        const roleUser: Role = userData.length === 0 ? Role.ADMIN : Role.USER

        const newUser = await this.userRepository.create({
            ...registerDto,
            password: hashPassword,
            role: roleUser
        })

        await this.userRepository.save(newUser)

        return {
            message: 'register user berhasil'
        }
    }
}
