import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserUpdatePatchDTO } from "./dto/user-update-patch.dto";
import { UserService } from "./user.service";

@Controller('users')
export class Usercontroller {

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() data: UserDTO){ //@Body vai pegar o corpo da requisição
        return this.userService.create(data)
    }

    @Get()
    async list() {
        return {users:[]}
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id){
        return {user:{}, id}
    }

    @Patch(':id')
    async update(@Body() body: UserUpdatePatchDTO, @Param('id', ParseIntPipe) id){
        return {body, id}
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id){
        return{id}
    }

}