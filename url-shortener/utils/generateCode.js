// utils/generateCode.js
const shortid = require('shortid');

const generateShortCode = () => {
  return shortid.generate();
};

module.exports = generateShortCode;