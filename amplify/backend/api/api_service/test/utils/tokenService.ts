const jwt = require('jsonwebtoken');

export function createToken(data: any): string {
  return jwt.sign(data, 'secret', {
    algorithm: 'HS256',
    expiresIn: 600,
  });
}
