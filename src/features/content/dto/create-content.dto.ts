import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  categoryId: number;
}
