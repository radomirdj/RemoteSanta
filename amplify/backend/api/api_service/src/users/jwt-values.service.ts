import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt } from 'passport-jwt';

function getJWTConstructorValues() {
  return {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    _audience: process.env.AWS_COGNITO_COGNITO_CLIENT_ID,
    issuer: process.env.AWS_COGNITO_AUTHORITY,
    algorithms: ['RS256'],
    secretOrKeyProvider: passportJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      // TODO check with POOL2 jwks.json
      jwksUri: process.env.AWS_COGNITO_AUTHORITY + '/.well-known/jwks.json',
    }),
  };
}

export default {
  getJWTConstructorValues,
};
