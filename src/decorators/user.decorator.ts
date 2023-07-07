import { ExecutionContext, createParamDecorator, NotFoundException } from "@nestjs/common";
export const User = createParamDecorator((filter: string, context: ExecutionContext) => {
//data a princípio é vazio, então utiliza _ para ser ignorado

    const request = context.switchToHttp().getRequest()
    
    
    if(request.user){ //request.user vai vir do guard

        if(filter){ //caso no controller esteja sendo passado um parâmetro: @User('email')
            return request.user[filter] //vai trazer somente o 'email'
        }else {
            return request.user
        }

        
    } else {
        throw new NotFoundException("Usuário não encontrado no request. Use o AuthGuard para obter o usuário.")
    }

   

})