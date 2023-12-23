import express from "express";
import { ShortUrl } from "../models/url.models.js";

const router = express.Router();

router.get('/', async(req, res) => {
    const allurls = await ShortUrl.find({});
    return res.render('home', {
        urls: allurls
    })
})

export default router