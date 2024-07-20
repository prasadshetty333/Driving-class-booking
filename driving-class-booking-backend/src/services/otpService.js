const crypto = require('crypto');

exports.generateOtp = () => {
  return crypto.randomBytes(3).toString('hex');
};

exports.isOtpValid = (otp, otpExpires) => {
  return otp && new Date() < new Date(otpExpires);
};
