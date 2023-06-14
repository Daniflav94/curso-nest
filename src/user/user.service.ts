import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UserUpdatePatchDTO } from "./dto/user-update-patch.dto";

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

    async findById(id: number) {
        await this.exists(id)

        return this.prisma.user.findUnique({
            where: {
                id,
            }
        })
    }

    async updatePartial(id: number, {email, name, password, birthAt}: UserUpdatePatchDTO){

        await this.exists(id)

        const data: any = {}

        if(birthAt){ //vai ser recebido como string porém o banco de dados só aceita date então precisa ser convertido
            data.birthAt = new Date(birthAt)
        }

        if(email){
            data.email = email
        }

        if(name){
            data.name = name
        }

        if(password){
            data.password = password
        }

        return this.prisma.user.update({
            data,
            where: {
                id,
            }
        })
    }

    async update(id: number, {email, name, password, birthAt}: UserDTO){

        await this.exists(id)

        return this.prisma.user.update({
            data: {email, name, password, birthAt: birthAt ? new Date(birthAt) : null},
            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id)

        return this.prisma.user.delete({
            where:{
                id
            }
        })
    }

    async exists(id: number){
        if(!(await this.prisma.user.count({
            where: {
                id
            }
        }))){
            throw new NotFoundException(`O usuário com id ${id} não existe`)
        }
    }
}