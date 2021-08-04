import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import {Controller, Get, Logger, Post, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './../utils/file-upload';
import { WebService } from './web.service';
import { Web } from './web.entity';

@Controller('webs')
export class WebController {
  constructor(
    private webService: WebService,
    @InjectQueue('domainDuplicates')
    private readonly domainDuplicatesQueue: Queue,
  ) {}

  private readonly logger = new Logger(WebController.name);

  @Get()
  async findAll(): Promise<Web[]> {
    const webs = await this.webService.findAll();

    return webs;
  }

  @Post('/duplicates')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
    }),
  )
  async duplicates(@UploadedFile() file: Express.Multer.File, @Req() request): Promise<string> {
    try {
      const {
        userId,
        personId,
      } = request.body;

      this.logger.log('Adding new task for getting duplicates');

      await this.domainDuplicatesQueue.add({
        fileName: file.filename,
        userId: userId,
        personId: personId
      });

      return 'success';
    } catch (e) {
      this.logger.log(e);
      return 'error';
    }
  }
}
