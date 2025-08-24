import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { createContentSchema, updateContentSchema } from './validations';
import { JoiValidationPipe } from 'src/shared/pipes/joi-validation-pipe';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createContentSchema))
  @HttpCode(HttpStatus.CREATED)
  addContent(@Body() createContentDto: CreateContentDto) {
    return this.contentService.addContent(createContentDto);
  }

  @Get()
  getAllContent() {
    return this.contentService.getAllContent();
  }

  @Get(':id')
  findSpecificContent(@Param('id') id: number) {
    return this.contentService.findOne(+id);
  }

  @Patch(':id')
  //TODO: there is an issue here
  // @UsePipes(new JoiValidationPipe(updateContentSchema))
  @HttpCode(HttpStatus.OK)
  async updateContent(
    @Param('id') id: number,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    await this.contentService.updateContent(+id, updateContentDto);
  }
}
