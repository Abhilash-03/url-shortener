import express from 'express';
import { handleRedirect, handleShortUrl } from '../controllers/shorturl.controllers.js';

const router = express.Router();

router.route('/').post(handleShortUrl);
router.route('/:id').get(handleRedirect)

export default router