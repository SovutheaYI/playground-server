import { ApiProperty } from "@nestjs/swagger";

export class CreateQrCodeDto {
  @ApiProperty({ type: Object, required: true })
  $template: any

  @ApiProperty({ type: Object, required: true })
  certificate: any

  @ApiProperty({ type: Object, required: true })
  recipient: any
}