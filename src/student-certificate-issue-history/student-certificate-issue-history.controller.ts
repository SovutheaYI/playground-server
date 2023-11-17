import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'

import { StudentCertificateIssueHistoryService } from './student-certificate-issue-history.service'

@ApiTags('issue-history')
@Controller()
export class StudentCertificateIssueHistoryController {
  constructor(private readonly studentCertificateIssueHistoryService: StudentCertificateIssueHistoryService) {}

  @Get('histories')
  async get() {
    return await this.studentCertificateIssueHistoryService.findAll()
  }
}
