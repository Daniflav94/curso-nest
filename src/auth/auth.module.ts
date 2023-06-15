import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [JwtModule.register({
        secret: "yce_!Lfyk*6Pca=PDEx2Mb%$PkzFXAF-"
    })]
})
export class AuthModule{
    
}