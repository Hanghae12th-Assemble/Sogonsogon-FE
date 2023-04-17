import CryptoJS from "crypto-js";

const decryptData = (encryptedData) => {
  const secretKey = process.env.REACT_APP_SCRET_KEY;

  if (!encryptedData || encryptedData.trim() === "") {
    return {};
  }

  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = CryptoJS.enc.Utf8.stringify(decryptedBytes);

  try {
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Error while parsing decrypted data:", error);
    return {};
  }
};

export default decryptData;
