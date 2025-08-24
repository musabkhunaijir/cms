import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  addContent(createContentDto: CreateContentDto) {
    console.log({ createContentDto });

    return this.contentRepository.save(createContentDto);
  }

  async getAllContent(pageSize: number, pageNumber: number) {
    const [data, total] = await this.contentRepository.findAndCount({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      order: { id: 'DESC' },
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      totalPages,
    };
  }

  async findOne(id: number) {
    const isExist = await this.contentRepository.findOne({ where: { id } });

    if (!isExist) {
      throw new NotFoundException(`Not found`);
    }
  }

  async updateContent(id: number, updateContentDto: UpdateContentDto) {
    await this.findOne(id);

    return this.contentRepository.update({ id }, updateContentDto);
  }
}
