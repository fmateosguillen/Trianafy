const {Schema} = require('mongoose');

import mongoose from 'mongoose';

const songSchema= new Schema({
    titulo: String,
    artista: String,
    album: String,
    year:Number
});

const Song=mongoose.model('Song',songSchema);
