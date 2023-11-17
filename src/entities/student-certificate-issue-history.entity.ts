import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class StudentCertificateIssueHistory {
  @PrimaryGeneratedColumn()
  CertificateId: string

  @Column()
  StudentId: number

  @Column()
  CertificatePdfUrl: string

  @Column()
  CertificateOA: string

  @Column()
  ExpiredDate: Date

  @Column()
  IssuedDate: Date

  @Column()
  ValidVerifyUrl: string
}