import { BaseModel } from 'src/common/models/base.model';

export class ResumeDto extends BaseModel {
  html: string;
  json: string;
  css: string;
  head: string;
  title: string;
  previewImage: string;
  userId: string;
}
