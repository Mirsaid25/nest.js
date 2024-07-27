import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

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
    @Get()
    getAll(){
        return this.userService.getAllUsers();
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
