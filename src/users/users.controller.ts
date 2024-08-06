import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags("Пользователи")
@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}

    @ApiOperation({summary:"Создание пользователя"})
    @ApiResponse({status:200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary:"Получить всех пользователей"})
    @ApiResponse({status:200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary:"Выдать роль"})
    @ApiResponse({status:200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.userService.addRole(dto);
    }

    @ApiOperation({summary:"Забанить пользователя"})
    @ApiResponse({status:200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto){
        return this.userService.ban(dto);
    }

    // @ApiOperation({summary:"Получить через Id"})
    // @ApiResponse({status:200, type: [User]})
    // @Get(":id")
    // getOne(@Param("id") id:number){
    //     return this.userService.getOneById(id);
    // }

    // @ApiOperation({summary:"Удалить пользователя"})
    // @Delete(":id")
    // deleteUser(@Param("id") id:number){
    //     return this.userService.deleteUser(id);
    // }
}
