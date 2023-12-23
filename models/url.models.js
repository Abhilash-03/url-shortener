import mongoose, { model } from "mongoose";

const urlSchema = new mongoose.Schema({
    shorturl: {
        type: String,
        required: true,
        unique: true
    },
    originalurl: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamp: Number
        }
    ]
}, {timestamps: true})

export const ShortUrl = model('Shorturl', urlSchema);