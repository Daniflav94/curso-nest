import { IsString, IsEmail, IsStrongPassword } from "class-validator";

export class UserDTO{

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        //se não zerar as especificações abaixo elas serão obrigatórias
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0
    })
    password: string;
}