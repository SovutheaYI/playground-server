export class WrapDocumentResponseDto {
  version: string
  data: WrapDocumentDataResponseDto
  signature: DocumentSignatureDto
}

export class DocumentTemplateDto {
  name: string
  type: string
  url: string
}

export class DocumentSignatureDto {
  type: string
  targetHash: string
  proof: string[]
  merkleRoot: string
}

export class WrapDocumentDataResponseDto {
  id: string
  $template: DocumentTemplateDto
  certificate: any
  recipient: any
  issuers: any[]
}