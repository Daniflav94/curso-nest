import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
    providers: [PrismaService],
    exports: [PrismaService] //para quem importar esse módulo terá acesso ao service
})
export class PrismaModule{

}