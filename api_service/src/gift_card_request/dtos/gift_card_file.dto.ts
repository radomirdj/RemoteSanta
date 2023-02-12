import { Expose } from 'class-transformer';

export class GiftCardFileDto {
  @Expose()
  url: string;
}
