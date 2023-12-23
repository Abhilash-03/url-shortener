import { BadRequest } from "../errors/BadRequest.js";
import { ShortUrl } from "../models/url.models.js";
import { nanoid } from "nanoid";

const handleShortUrl =  async (req, res) => {
      const {originalurl} = req.body;
      if(!originalurl){
        throw new BadRequest('URL is required', 400);
      };
      const urlId = nanoid(9);
      const url = await ShortUrl.create({
          shorturl: urlId,
          originalurl: originalurl
      })
   
      res.status(200).json({data: url});
   

}

const handleRedirect = async (req, res) => {
        const {id} = req.params;
        const url = await ShortUrl.findOneAndUpdate({ shorturl: id }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        });

        if(!url){
            throw new BadRequest('URL not exists', 400);
          };

        res.redirect(url.originalurl);
}

export { handleShortUrl, handleRedirect }