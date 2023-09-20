const ShareVideo = require('../models/ShareVideo');

class ShareVideoController {
    // GET share video list
    index(req, res, next) {
        ShareVideo.find({})
            .then(data => res.json({ success: true, data }))
            .catch(next);
    }

    // POST Create share video
    post(req, res, next) {
        if (req && req.body) {
            let shareVideo = new ShareVideo(req.body);
            shareVideo.save()
                .then(data => {
                    console.log(data);
                    res.json({ success: true, data });
                })
                .catch(next);
        }
    }
}
module.exports = new ShareVideoController();