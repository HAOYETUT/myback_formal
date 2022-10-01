
import crypto_js from 'crypto-js'

// md5
export const md5_until = (value) => {
  return crypto_js.MD5(value).toString()
}

export const encrypt_decrypt_until = {
  // 加密函數
  encrypt: (word, keyStr) => {
    if (word instanceof Object) {
      word = JSON.stringify(word)
    }
    var key = crypto_js.enc.Utf8.parse(keyStr)
    var encryptedObj = crypto_js.AES.encrypt(crypto_js.enc.Utf8.parse(word), key,
      {
        mode: crypto_js.mode.ECB,
        padding: crypto_js.pad.Pkcs7,
      },
    )
    return encryptedObj.toString()
  },
  // 解密函數
  decrypt: (word, keyStr) => {
    let key = crypto_js.enc.Utf8.parse(keyStr)
    let decrypt = crypto_js.AES.decrypt(word, key,
      {
        mode:crypto_js.mode.ECB,
        padding:crypto_js.pad.ZeroPadding,
      },
    )
    let decString = crypto_js.enc.Utf8.stringify(decrypt).toString();
    return decString
  },
}