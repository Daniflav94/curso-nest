import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        //faz verificações antes de abrir conexão com o banco

        console.log('UserMiddleware', 'antes')

        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
           throw new BadRequestException('ID inválido') 
        }

        console.log('UserMiddleware', 'depois')

        next()
    }
}