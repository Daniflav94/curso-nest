import { SetMetadata } from '@nestjs/common'
import {Role} from '../enums/role.enum'

//Esse decorator vai receber vários Roles e vai criar um objeto dentro deles com cada um desses roles
export const ROLES_KEY = "roles"
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles) //pode receber vários enums como argumento

