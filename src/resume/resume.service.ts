import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { PrismaService } from 'nestjs-prisma';
import { UserDTO } from 'src/auth/dto/user.dto';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createResumeDto: CreateResumeDto) {
    const data = await this.prisma.resume.create({
      data: {
        ...createResumeDto,
      },
    });
    return data;
  }

  findAll(user: UserDTO) {
    const list = this.prisma.resume.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        title: true,
        userId: true,
        previewImage: true,
      },
    });
    return list;
  }

  findOne(id: string) {
    return this.prisma.resume.findUnique({
      where: { id },
    });
  }

  update(id: string, updateResumeDto: UpdateResumeDto) {
    return this.prisma.resume.update({
      where: { id },
      data: {
        ...updateResumeDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.resume.delete({
      where: { id },
    });
  }
}
