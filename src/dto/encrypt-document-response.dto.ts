import _ from "lodash"

export class EncryptDocumentResponseDto {
  cipherText: string
  iv: string
  tag: string
  key: string
  type: string
}

export class EncryptDocumentWithoutKeyResponseDto {
  cipherText: string
  iv: string
  tag: string
  type: string

  static create(data: EncryptDocumentWithoutKeyResponseDto) {
    return data
  }
}