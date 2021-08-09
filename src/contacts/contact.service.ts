import { ContactDto } from './../Dto/Dto';

import { Contact } from '../entities/contact.entity';
import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination} from 'nestjs-typeorm-paginate';
import { from, map, Observable, pipe } from 'rxjs';


@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>
    ) { }
    async create(contact: Contact): Promise<Contact> {
        return await this.contactRepository.save(contact);
    }
    
 

    async update(contact: Contact): Promise<UpdateResult> {

        return await this.contactRepository.update(contact.id,contact);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.contactRepository.delete(id);
    } 
    
     paginate(options: IPaginationOptions){
       return paginate<ContactDto>(this.contactRepository,options)
      }

    

paginateFilterByName(options: IPaginationOptions, contact:ContactDto) {

    return from(this.contactRepository.findAndCount({
        skip: options.page * options.limit || 0,
        take: options.limit || 10,
        order: {id: "ASC"},
        select: ['id', 'name', 'title', 'email', 'phone', 'address', 'city'],
        where: [
            { name: Like(`%${contact.name}%`)}
        ]
    })).pipe(
        map(([contact, totalContact]) => {

            const contactPageable: Pagination<ContactDto> ={

                items: contact,
                links: {
                    first: options.route + `?limit=${options.limit}`,
                    previous: options.route + ``,
                    next: options.route + `?limit=${options.limit}&page=${options.page + 1}`,
                    last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalContact/options.limit)}`
                },
                meta : {
                    currentPage: options.page,
                    itemCount: contact.length,
                    itemsPerPage: options.limit,
                    totalItems: totalContact,
                    totalPages: Math.ceil(totalContact/ options.page)
                }

            };

            return contactPageable;

        })
    )

}
}
