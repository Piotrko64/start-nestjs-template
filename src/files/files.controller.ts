import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) //Nazwa pliku
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    //https://docs.nestjs.com/techniques/file-upload
    return file.size;
  }
}
