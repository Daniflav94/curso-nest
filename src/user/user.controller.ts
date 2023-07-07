import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseInterceptors, UseGuards } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserUpdatePatchDTO } from "./dto/user-update-patch.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@Roles(Role.Admin) //esse decorator faz com que somente Role.Admin tenha acesso
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor) //aqui irá monitorar todas as rotas
@Controller('users')
export class Usercontroller {

    constructor(private readonly userService: UserService) {}

    //@UseInterceptors(LogInterceptor) //verificar quanto tempo levou para criar um usuário
    @Post()
    async create(@Body() data: UserDTO){ //@Body vai pegar o corpo da requisição
        return this.userService.create(data)
    }

    @Roles(Role.User)
    @Get()
    async list() {
        return this.userService.list()
    }

    @Get(':id')
    async readOne(@ParamId() id){ //decorator criado para converter o id para number
        return this.userService.findById(id)
    }

    @Patch(':id')
    async updatePartial(@Body() data: UserUpdatePatchDTO, @ParamId() id){
        return this.userService.updatePartial(id, data)
    }

    @Put(':id')
    async update(@Body() data: UserDTO, @ParamId() id){
        return this.userService.update(id, data)
    }

    @Delete(':id')
    async delete(@ParamId() id){
        return this.userService.delete(id)
    }

}