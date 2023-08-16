import { ApiProperty } from '@nestjs/swagger';
export class PdfMargin {
  top: number;
  left: number;
  right: number;
  bottom: number;
  unit: string;
}
export class PdfSetting {
  @ApiProperty()
  template: string;

  @ApiProperty()
  margin: PdfMargin;
}
