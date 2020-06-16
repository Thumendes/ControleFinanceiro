import crypto from "crypto";

export const criptografar = (value) => {
  const key = crypto.createCipher("aes-128-cbc", "12345678910");
  const str = key.update(value, "utf8", "hex");
  return str + key.final("hex");
};

export const descriptografar = (value) => {
  const key = crypto.createDecipher("aes-128-cbc", "12345678910");
  const str = key.update(value, "hex", "utf8");
  return str + key.final("utf8");
};
