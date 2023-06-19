import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";


@Module({
    imports: [
        JwtModule.register({
        secret: "yce_!Lfyk*6Pca=PDEx2Mb%$PkzFXAF-"
        }),
        UserModule,
        PrismaModule
    ],
    controllers: [AuthController]
})
export class AuthModule{
    
}