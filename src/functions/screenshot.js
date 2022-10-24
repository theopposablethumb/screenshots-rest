const axios = require('axios');
const endpoint = 'https://api.screenshotmachine.com/';
const key = process.env.SCREENSHOT_MACHINE;


const getCurrentDate = () => {
  const d = new Date();
  return d.toISOString();
}

const convertToBase64 = (data) => {
  const imgPrefix = 'data:image/png;base64,';
  const imageBuffer  = Buffer.from(data);
  const imageBase64  = imageBuffer.toString('base64');
  const imageDataUrl = imgPrefix+imageBase64;
  return imageDataUrl;
}


const getMobileScreenshot = async (pages, zoom, cookie, rareCookie) => {
  const device = 'phone';
  const images = await Promise.all(
    pages.map(async p => {
      const page = encodeURIComponent(p);
      const url = `${endpoint}${key}&url=${page}&device=${device}&zoom=${zoom}&dimension=480xfull&cookies=${cookie}%3B${rareCookie}&cacheLimit=0`;
      try {
        const res = await axios.request({
          method: 'GET',
          url: url,
          responseType: 'arraybuffer',
          responseEncoding: null
        });
        return convertToBase64(res.data);
      } catch (error) {
        console.log(error)
        return {
          error: 'error'
        }
      }
    })
  )
  return images;
}

 const getDesktopScreenshot = async (pages, zoom, cookie, rareCookie) => {
  const device = 'phone';

  const images = await Promise.all(
    pages.map(async p => {
      const page = encodeURIComponent(p);
      const url = `${endpoint}${key}&url=${page}&device=${device}&zoom=${zoom}&dimension=1480xfull&cookies=${cookie}%3B${rareCookie}&cacheLimit=0`;
      try {
        const res = await axios.request({
          method: 'GET',
          url: url,
          responseType: 'arraybuffer',
          responseEncoding: null
        });
        return convertToBase64(res.data);
      } catch (error) {
        console.log(error)
        return {
          error: 'error'
        }
      }
    })
  )
  return images;
}

exports.screenshot = async (w, r, c) => {
  let cookie;
  let rareCookie;
  const zoom = '200';

  if (r === 'yes') rareCookie = 'HcpConfirmation_HasConfirmed%3DTrue';

  if (c === 'yes') cookie = `OptanonAlertBoxClosed=${getCurrentDate()}`;
  const screenshots = {
    mobile: await getMobileScreenshot(w, zoom, cookie, rareCookie),
    desktop: await getDesktopScreenshot(w, zoom, cookie, rareCookie)
  }
  return screenshots;
}