import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { YoutubeScraperService } from './youtube-scraper.service';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Category])],
  controllers: [ContentController],
  providers: [ContentService, YoutubeScraperService],
})
export class ContentModule {}
