import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'

import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate-qr')
  @ApiBody({})
  async generateQr(@Body() data: any) {
    return await this.appService.generateQr(data)
  }
}
