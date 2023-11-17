import { Module, Provider } from '@nestjs/common'
import { StudentCertificateIssueHistoryService } from './student-certificate-issue-history.service'
import { StudentCertificateIssueHistoryController } from './student-certificate-issue-history.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StudentCertificateIssueHistory } from '../entities/student-certificate-issue-history.entity'

const providers: Provider[] = [
  StudentCertificateIssueHistoryService
]

@Module({
  controllers: [
    StudentCertificateIssueHistoryController
  ],
  providers: [
    ...providers
  ],
  imports: [
    TypeOrmModule.forFeature([StudentCertificateIssueHistory])
  ],
  exports: [
    ...providers
  ]
})
export class StudentCertificateIssueHistoryModule {
}
