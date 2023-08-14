import { Injectable } from '@nestjs/common';
import { Issuer } from 'openid-client';

const GOGIFT_URL = 'https://auth-pre.gogift.io';
const GOGIFT_CLIENT_ID = '01H5VSQZH29VAH0AKSE9SE73GX';
const GOGIFT_CLIENT_SECRET = 'tcy2hY2uhIOSRj0tafmo8fLX4du3/xjk';

@Injectable()
export class GogiftApiService {
  async getToken() {
    const GRANT_TYPE = 'client_credentials';

    const issuer = await Issuer.discover(GOGIFT_URL);
    // issuer.defaultHttpOptions = { timeout: 3500 }; - It was in GoGift documentation, but not supported now

    const client = new issuer.Client({
      client_id: GOGIFT_CLIENT_ID,
      client_secret: GOGIFT_CLIENT_SECRET,
    });

    return client.grant({
      grant_type: GRANT_TYPE,
    });
  }
}
