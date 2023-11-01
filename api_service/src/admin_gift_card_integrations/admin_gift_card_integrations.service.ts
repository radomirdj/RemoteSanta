import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GiftCardIntegrationsService } from '../gift_card_integrations/gift_card_integrations.service';
import { GiftCardThirdPartyApiService } from '../gift_card_third_party_api/gift_card_third_party_api.service';

@Injectable()
export class AdminGiftCardIntegrationsService {
  constructor(
    private prisma: PrismaService,
    private giftCardIntegrationsService: GiftCardIntegrationsService,
    private giftCardThirdPartyApiService: GiftCardThirdPartyApiService,
  ) {}
}
