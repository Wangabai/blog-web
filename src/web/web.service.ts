import { Injectable } from '@nestjs/common';
import { CreateWebDto } from './dto/create-web.dto';
import { UpdateWebDto } from './dto/update-web.dto';

@Injectable()
export class WebService {
  create(createWebDto: CreateWebDto) {
    return 'This action adds a new web';
  }

  findAll() {
    return `This action returns all web`;
  }

  findOne(id: number) {
    return `This action returns a #${id} web`;
  }

  update(id: number, updateWebDto: UpdateWebDto) {
    return `This action updates a #${id} web`;
  }

  remove(id: number) {
    return `This action removes a #${id} web`;
  }
}
