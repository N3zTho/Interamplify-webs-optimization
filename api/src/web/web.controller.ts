import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './../utils/file-upload';
import { WebService } from './web.service';
import { Web } from './web.entity';

@Controller('web')
export class WebController {
  constructor(
    private webService: WebService,
    @InjectQueue('domainDuplicates')
    private readonly domainDuplicatesQueue: Queue,
  ) {}

  @Get()
  async findAll(): Promise<Web[]> {
    const webs = await this.webService.findAll();

    return webs;
  }

  @Post('/duplicates')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/files',
        filename: editFileName,
      }),
    }),
  )
  async duplicates(@UploadedFile() file: Express.Multer.File, @Req() request): Promise<string> {
    try {
      const {
        userId,
      } = request.body;

      await this.domainDuplicatesQueue.add({
        fileName: file.filename,
        userId: userId,
      });

      return 'success';
    } catch (e) {
      return 'error';
    }
  }
}
