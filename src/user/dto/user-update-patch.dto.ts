import { PartialType } from "@nestjs/mapped-types";
import { UserDTO } from "./user.dto";

export class UserUpdatePatchDTO extends PartialType(UserDTO){

}