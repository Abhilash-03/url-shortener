import { BadRequest } from "../errors/BadRequest.js";
import { ShortUrl } from "../models/url.models.js";
import { nanoid } from "nanoid";

const handleShortUrl =  async (req, res) => {
      const {originalurl} = req.body;

      if(!originalurl){
        throw new BadRequest('URL is required', 400);
      };

      const isExistedUrl = await ShortUrl.findOne({originalurl});
      if(isExistedUrl){
        throw new BadRequest("URL already existed", 400);
      }

      const urlId = nanoid(9);
       await ShortUrl.create({
          shorturl: urlId,
          originalurl: originalurl
      })
   
     return res.render('home', {data: urlId});
    //   res.status(200).json({data: url});
   

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