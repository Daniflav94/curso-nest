import { Module } from "@nestjs/common";
import { Usercontroller } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [Usercontroller],
    providers: [UserService],
    exports: []
})
export class UserModule {}