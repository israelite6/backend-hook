import { CryptoJS, CryptoJSAesJson } from "./Crypto";
import DeviceInfo from "./DeviceInfo";
import md5 from "./md5";

export default function Signature(data) {
  const md5DeviceInfo = md5(DeviceInfo);
  const generate = () => {
    return CryptoJS.AES.encrypt(md5DeviceInfo, md5DeviceInfo, {
      format: CryptoJSAesJson,
    }).toString();
  };

  const verify = (data) => {
    try {
      var decrypted = CryptoJS.AES.decrypt(data, md5DeviceInfo, {
        format: CryptoJSAesJson,
      }).toString(CryptoJS.enc.Utf8);

      if (decrypted === md5DeviceInfo) {
        return true;
      }
    } catch (e) {}
    return false;
  };

  return { generate, verify };
}
