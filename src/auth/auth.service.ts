import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    //tipo User do Prisma
    return {
      accessToken: this.jwtService.sign(
        {
          //aqui podem ser passadas várias informações que desejar
          id: user.id,
          email: user.email, //payload
          name: user.name,
        },
        {
          expiresIn: '7 days', //após esse tempo o token vai expirar e é necessário um novo login ou renovar automaticamente
          subject: String(user.id), //a quem pertence o token
          issuer: 'login',
          audience: 'users',
          //notBefore: Math.ceil(Date.now() + 1000 * 60 * 60) / 1000  não é válido antes desse momento + 1h
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      //vai utilizar o serviço verify do jwt service
      const data = this.jwtService.verify(token, {
        audience: 'users', //só vai validar o token se pertencer a essa audiencia
        issuer: 'login',
      });

      return data //retorna o payload

    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    if (!await bcrypt.compare(password, user.password)) {//compara se o hash é válido para o password recebido
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail está incorreto.');
    }

    //enviar email..

    return true;
  }

  async reset(password: string, token: string) {
    //validar o token, se for válido, trocar a senha
    const id = 0;

    const user = await this.prisma.user.update({
      where: {
        id, //dentro do token terá o id do usuário
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
