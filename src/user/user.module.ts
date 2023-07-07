import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from "@nestjs/common";
import { Usercontroller } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule)],
    controllers: [Usercontroller],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule implements NestModule {
    
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        }) //vai aplicar um middleware no módulo
    }
}