import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Headers } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  //esse guard vai verificar se o token é válido, caso não seja retorna 403 Forbidden resource

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      //data é o retorno do checkToken e traz o payload
      //(authorization ?? '') vai verificar se for null ou undefined vai converter para vazio caso seja e evitar erros,
      //remover a palavra bearer com split(' ')[1]

      request.tokenPayload = data;

      request.user = await this.userService.findById(data.id)//vai trazer todos os dados do usuário do banco de dados para o retorno

      return true;

    } catch (e) {
      return false;
    }
  }
}
