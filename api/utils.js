const jwt = require('jsonwebtoken');
const jwtSecret = 'fnr3u24buiabfasiufb4ui3fbaisubf';

function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = getUserDataFromToken
