const SecretToken = {
  encodedRefreshToken: (token) => {
    const refreshToken = token; // Thay thế bằng refresh token của bạn
    const encodedRefreshToken = Buffer.from(refreshToken).toString("base64");
    return encodedRefreshToken;
  },

  decodedRefreshToken: (token) => {
    const encodedRefreshToken = token; // Thay thế bằng refresh token đã mã hóa
    const decodedRefreshToken = Buffer.from(
      encodedRefreshToken,
      "base64"
    ).toString();
    return decodedRefreshToken;
  },
};
module.exports = SecretToken;
