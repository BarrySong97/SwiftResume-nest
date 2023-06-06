import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseModel {
  @ApiProperty()
  template: string;
}
