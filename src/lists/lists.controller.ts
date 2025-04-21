import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch, 
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { AuthGuard } from '../auth/auth.gaurd';
import { GetUser } from '../auth/get-user.decorator';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
@UseGuards(AuthGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  create(@GetUser() user: any, @Body() dto: CreateListDto) {
    return this.listsService.create(user.id, dto);
  }

  @Patch(':id') // Use the imported Patch decorator
  update(
    @GetUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateListDto,
  ) {
    return this.listsService.update(user.id, id, dto);
  }

  @Get()
  findAll(@GetUser() user: any) {
    return this.listsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@GetUser() user: any, @Param('id') id: string) {
    return this.listsService.findOne(user.id, id);
  }

  @Delete(':id')
  remove(@GetUser() user: any, @Param('id') id: string) {
    return this.listsService.remove(user.id, id);
  }
}

