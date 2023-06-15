import { ExecutionContext, createParamDecorator } from "@nestjs/common";
export const ParamId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
//data a princípio é vazio, então utiliza _ para ser ignorado

return Number(context.switchToHttp().getRequest().params.id) //id sempre vem como string e precisa ser convertido 

})