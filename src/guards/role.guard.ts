import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Headers } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  //esse guard vai verificar se o token é válido, caso não seja retorna 403 Forbidden resource

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    //verificar se a rota possui um Role
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      //se não houver nenhuma role, libera o acesso
      return true;
    }

    const { user } = context.switchToHttp().getRequest(); //extrair o user para saber se ele tem o papel necessário para acesso

    const rolesFiltered = requiredRoles.filter((role) => role === user.role);

    return rolesFiltered.length > 0;

    /* if (rolesFiltered.length > 0) {    mesma coisa que a linha 31
      return true;
    } else {
      return false;
    } */

  }
}
