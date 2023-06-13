import { Injectable } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async create(data: UserDTO) {
        
        return await this.prisma.user.create({ //toda vez que houver apenas o return em função async, não precisa escrever await, pois vem automático
            data,
           /*  select: //especificar informações retornadas após inserção, não é obrigatório
            {
                id: true
            }  */
        })
    }

    async list() {
        return this.prisma.user.findMany(/* {
             where: {   //pode ser feito um filtro no banco de dados
                email: {
                    contains: '@gmail.com'
                }
            } 
        } */)
    }
}