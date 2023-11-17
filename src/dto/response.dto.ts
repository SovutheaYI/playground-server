import { WrapDocumentResponseDto } from "./wrap-document-response.dto"

export class ResponseDto {
  qrCodeUrl: string
  wrappedDocument: WrapDocumentResponseDto

  static create(data: ResponseDto) {
    return data
  }
}