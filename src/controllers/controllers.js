const screenshot = require('../functions/screenshot');

exports.postScreenshot = (req, res, next) => {
  const q = req.body;
  const pages = q.urls;
  const rdh = q.rdh;
  const cookieBanner = q.cookie;

  screenshot.screenshot(pages, rdh, cookieBanner)
    .then((result) => {
      return result;
    })
    .then(screenshot => {
      res.status(200).json({ message: 'Fetch screenshot successful', screenshot })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}