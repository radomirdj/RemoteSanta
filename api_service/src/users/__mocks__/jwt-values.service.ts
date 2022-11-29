import { ExtractJwt } from 'passport-jwt';

function getJWTConstructorValues() {
  return {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: 'secret',
    algorithms: ['HS256'],
  };
}

export default {
  getJWTConstructorValues,
};
