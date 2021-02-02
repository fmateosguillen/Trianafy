const { Schema, model} = require('mongoose');

let mongoose = require('mongoose');

const playListSchema = new Schema({

    nombre_playlist: String,
    descripcion: String,
    user_id: {
        type: mongoose.ObjectId,
        ref: "User",
    },
    songs:[
        {
            type: mongoose.ObjectId,
            ref: "Song",
        }]
      }, {
        versionKey:false
});

const playList= mongoose.model("playList", playListSchema);
