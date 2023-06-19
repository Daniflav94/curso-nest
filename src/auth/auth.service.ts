import { Injectable, UnauthorizedException } from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService{

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
        ){}

    async createToken() {
        //return this.jwtService.sign()
    }

    async checkToken(token: string) {
        //return this.jwtService.verify()
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        })

        if(!user){
            throw new UnauthorizedException('Email e/ou senha incorretos.')
        }

        return user;
    }

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!user){
            throw new UnauthorizedException('E-mail está incorreto.')
        }

        //enviar email..

        return true
    }

    async reset(password: string, token: string) {
        //validar o token, se for válido, trocar a senha
        const id = 0

        await this.prisma.user.update({
            where:  {
                id, //dentro do token terá o id do usuário
            },
            data: {
                password,
            }
        })

        return true
    }
}