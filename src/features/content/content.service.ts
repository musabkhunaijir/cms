import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { YoutubeScraperService } from './youtube-scraper.service';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly youtubeScraperService: YoutubeScraperService,
  ) {}

  async addContent(createContentDto: CreateContentDto) {
    console.log({ createContentDto });

    const isCategory = await this.categoryRepository.findOne({
      where: { id: createContentDto.categoryId },
    });

    if (!isCategory) {
      throw new NotFoundException('Category not found');
    }

    return this.contentRepository.save(createContentDto);
  }

  async getAllContent(pageSize: number, pageNumber: number) {
    const [data, total] = await this.contentRepository.findAndCount({
      relations: ['category'],
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
    const content = await this.contentRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!content) {
      throw new NotFoundException(`Not found`);
    }

    return content;
  }

  async updateContent(id: number, updateContentDto: UpdateContentDto) {
    await this.findOne(id);

    return this.contentRepository.update({ id }, updateContentDto);
  }

  async importFromYoutubeScraping(videoId: string) {
    const metadata = await this.youtubeScraperService.getVideoMetadata(videoId);

    const content = this.contentRepository.create({
      title: metadata.title,
      description: metadata.description,
    });

    return this.contentRepository.save(content);
  }
}
