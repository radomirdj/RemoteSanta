import { Module } from '@nestjs/common';
import { GiftCardThirdPartyApiService } from './gift_card_third_party_api.service';
import { GogiftApiService } from './gogift_api/gogift_api.service';

@Module({
  providers: [GogiftApiService, GiftCardThirdPartyApiService],
  exports: [GiftCardThirdPartyApiService],
})
export class GiftCardThirdPartyApiModule {}
