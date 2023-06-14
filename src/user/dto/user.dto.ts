import { IsString, IsEmail, IsStrongPassword, IsOptional, IsDateString } from "class-validator";

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

    @IsOptional()
    @IsDateString() //vai validar se a string contém uma data
    birthAt: string;
}