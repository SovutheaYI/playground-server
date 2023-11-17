import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

import { AppModule } from './app.module'

export const PUBLIC_DOCUMENT = (app: INestApplication) => {
  const description = `Access resource api, property information, update user profile programmatically <br/><br/>
  ****`
  const options = new DocumentBuilder()
    .setTitle(`Client API`)
    // .addServer(SERVER_URL)
    .setDescription(description)
    .setVersion('1.0')
    .build()

  return SwaggerModule.createDocument(app, options, {
    include: [
      AppModule
    ],
    extraModels: [
      
    ]
  })
}
