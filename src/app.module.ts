import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentCertificateIssueHistoryModule } from './student-certificate-issue-history';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '154.26.134.127',
      port: 8899,
      username: 'dc',
      password: 'mast3r1@3',
      database: 'Bac2Student',
      entities: [
        "dist/**/*.entity.js"
      ],
      synchronize: true,
      logging: true,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    }),
    StudentCertificateIssueHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
