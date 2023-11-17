import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'

import { catchError, lastValueFrom, map } from 'rxjs'
import { BlobServiceClient } from '@azure/storage-blob'
import _ from 'lodash'

import { EncryptDocumentResponseDto, EncryptDocumentWithoutKeyResponseDto } from './dto/encrypt-document-response.dto'
import { DocumentUrlResponseDto } from './dto/document-url-response.dto'
import { WrapDocumentResponseDto } from './dto/wrap-document-response.dto'
import { ResponseDto } from './dto/response.dto'

const BLOCKCHAIN_BASE_URL = 'https://verifykh.com/api/'
const AZURE_BLOB_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=dgcuatstorage;AccountKey=LgEy267jyjZPi/0TAjDiFZDnQsbFegIzLBd7E7tgzGHZtiCcDSAGnzRsXbVk+LLfhlc+VwsIbLZT+AStqYlTqQ==;EndpointSuffix=core.windows.net'
const AZURE_BLOB_STORAGE_CONTAINER_NAME = 'dgs-oa-files'

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService
  ) {
  }

  async generateQr(data: any) {
    const wrappedDocument = await this.wrapDocument(data)
    const encryptedDocument = await this.encryptDocument(wrappedDocument)
    const documentUrl = await this.documentUrl(encryptedDocument)

    const { cipherText, iv, tag, type } = encryptedDocument
    
    const encryptedDocumentWithoutKey = EncryptDocumentWithoutKeyResponseDto.create({ cipherText, iv, type, tag })
    
    await this.updateOaFile(wrappedDocument.signature.targetHash, encryptedDocumentWithoutKey)

    return ResponseDto.create({ qrCodeUrl: documentUrl.url, wrappedDocument: wrappedDocument })
  }

  async wrapDocument(data: any) {
    return await this.post<WrapDocumentResponseDto>('wrap-document', data)
  }

  async encryptDocument(data: any) {
    return await this.post<EncryptDocumentResponseDto>('encrypt-document', data)
  }

  async documentUrl(data: any) {
    return await this.post<DocumentUrlResponseDto>('document-url', data)
  }

  async updateOaFile(targetHash: string, data: EncryptDocumentWithoutKeyResponseDto) {
    const blobName = targetHash + ".json";
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_BLOB_STORAGE_CONNECTION_STRING)
    const containerClient = blobServiceClient.getContainerClient(AZURE_BLOB_STORAGE_CONTAINER_NAME)
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    blockBlobClient.upload(JSON.stringify(data), JSON.stringify(data).length, { blobHTTPHeaders: { blobContentType: "application/json" } }).then(res => { console.log(res._response.request.url) }).catch(err => { console.error(err.message) })
  }

  async post<T>(path: string, body: any, queryParams?: any, customHeaders?: any) {
    const url = `${BLOCKCHAIN_BASE_URL}${path}`

    const response = await lastValueFrom(
      this.httpService.post<T>(url, body).pipe(
        catchError(async err => {
          throw err
        }),
        map(res => res.data)
      )
    )

    if (response instanceof String) {
      throw new HttpException(response, HttpStatus.BAD_REQUEST)
    }

    return response
  }
}
