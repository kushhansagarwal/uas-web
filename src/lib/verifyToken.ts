import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: 'https://uasatucla.kinde.com/.well-known/jwks'
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, {}, (err, email: { email: string }) => {
      if (err) {
        reject(err);
      } else {
        resolve(email.email);
      }
    });
  });
}
