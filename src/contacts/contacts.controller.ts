import { ContactDto } from './../Dto/Dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { Controller, Get, Post,Put, Delete, Body, Param, Query  } from '@nestjs/common';
import { Contact } from 'src/entities/contact.entity';
import { ContactService } from './contact.service';



@Controller('contacts')
export class ContactsController {

    constructor(private contactService: ContactService){}

    

@Get()
index(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10,
    @Query('name') name: string
    ) {

    limit = limit > 100 ? 100 : limit;

    if (name === null || name === undefined) {

    return this.contactService.paginate({page: Number(page), limit: Number(limit), route: 'http://localhost:3000/contacts'});

    } else {

        return this.contactService.paginateFilterByName({page: Number(page), limit: Number(limit), route: 'http://localhost:3000/contacts'},
        {name}
        )

    }

}
    
    @Post('create')
    async create(@Body() contact: Contact): Promise<any> {
      return this.contactService.create(contact);
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() contact: Contact): Promise<any> {
        contact.id = Number(id);
        return this.contactService.update(contact);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.contactService.delete(id);
    }      

}
