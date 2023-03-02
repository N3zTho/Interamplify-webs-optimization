import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import {Controller, Get, Logger, Post, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './../utils/file-upload';
import { WebService } from './web.service';
import { Web } from './web.entity';
import {NotificationService} from "../base/services/notification.service";
import {NotificationDto} from "../base/dto/notification.dto";
import {UserService} from "../user/user.service";

@Controller('webs')
export class WebController {
  constructor(
    private webService: WebService,
    @InjectQueue('domainDuplicates')
    private readonly domainDuplicatesQueue: Queue,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService
  ) {}

  private readonly logger = new Logger(WebController.name);

  @Get()
  async findAll(): Promise<Web[]> {
    const webs = await this.webService.findAll();

    return webs;
  }

  @Get('/message')
  async sendMessage(): Promise<boolean> {
    const user = await this.userService.getByUuid("ec814ae2-7d1e-4641-9a6c-1d227207cdad");
    const id = Number(user.id);
    const notification: NotificationDto = {
      title: "Dominios duplicados",
      text: "Proceso terminado con exito.",
      to: [id],
      store: false,
      btnText: "Ver Detalles",
      type: "success",
    };

    await this.notificationService.send(notification);

    return true;
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
