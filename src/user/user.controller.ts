import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserUpdatePatchDTO } from "./dto/user-update-patch.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@UseInterceptors(LogInterceptor) //aqui irá monitorar todas as rotas
@Controller('users')
export class Usercontroller {

    constructor(private readonly userService: UserService) {}

    //@UseInterceptors(LogInterceptor) //verificar quanto tempo levou para criar um usuário
    @Post()
    async create(@Body() data: UserDTO){ //@Body vai pegar o corpo da requisição
        return this.userService.create(data)
    }

    @Get()
    async list() {
        return this.userService.list()
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id){
        return this.userService.findById(id)
    }

    @Patch(':id')
    async updatePartial(@Body() data: UserUpdatePatchDTO, @Param('id', ParseIntPipe) id){
        return this.userService.updatePartial(id, data)
    }

    @Put(':id')
    async update(@Body() data: UserDTO, @Param('id', ParseIntPipe) id){
        return this.userService.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id){
        return this.userService.delete(id)
    }

}