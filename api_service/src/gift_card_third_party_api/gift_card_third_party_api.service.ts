import { Injectable } from '@nestjs/common';
import { GogiftApiService } from './gogift_api/gogift_api.service';

@Injectable()
export class GiftCardThirdPartyApiService {
  constructor(private gogiftApiService: GogiftApiService) {}

  getToken() {
    return this.gogiftApiService.getToken();
  }
}
