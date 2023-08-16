import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { UserDTO } from 'src/auth/dto/user.dto';
import { ResumeDto } from './dto/resume.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
@Controller('resume')
@ApiTags('resume')
@UseGuards(JwtGuard)
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  // @ApiResponse({ type: CreateResumeDto })
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.create(createResumeDto) as unknown as ResumeDto;
  }

  @Get()
  @ApiResponse({ type: ResumeDto, isArray: true })
  findAll(@CurrentUser() user: UserDTO) {
    return this.resumeService.findAll(user) as unknown as ResumeDto[];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(id) as unknown as ResumeDto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(
      id,
      updateResumeDto
    ) as unknown as ResumeDto;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumeService.remove(id) as unknown as CreateResumeDto;
  }
}
