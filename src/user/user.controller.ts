import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {LoginDto, RegisterDto} from "@/user/user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly service: UserService,
    ) {}

    @Post('login')
    async login(@Body() dto: LoginDto){
        return this.service.login(dto);
    }

    @Post('register')
    async register(@Body() dto: RegisterDto){
        console.log(dto)
        return this.service.register(dto);
    }
}
