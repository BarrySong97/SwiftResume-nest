import { ApiProperty } from '@nestjs/swagger';

export class Pdf {
  @ApiProperty()
  template: string;
}
