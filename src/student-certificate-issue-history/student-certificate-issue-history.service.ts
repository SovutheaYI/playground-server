import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { StudentCertificateIssueHistory } from '../entities/student-certificate-issue-history.entity';

@Injectable()
export class StudentCertificateIssueHistoryService {
  constructor(
    @InjectRepository(StudentCertificateIssueHistory)
    private readonly studentCertificateIssueHistoryRepository: Repository<StudentCertificateIssueHistory>,
  ) {}

  async findAll() {
    const a = await this.studentCertificateIssueHistoryRepository.findOne({
      where: {
        CertificateId: '00029C63-0E31-43D4-8B88-141F1793B36E'
      }
    })
    return JSON.stringify(a)
  }
}