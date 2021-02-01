import mongoose from 'mongoose';
import {playList} from './playlists';

const {Schema} = mongoose;

const songSchema= new Schema({
    titulo: String,
    artista: String,
    album: String,
    anio:Number
});

const Song=mongoose.model('Song',songSchema);

const songRepository={

    async findAll(){
        const result =await Song.find({}).exec()
        return result;
    },

    async findById(id){
        if (mongoose.Types.ObjectId.isValid(id)) {
            const result = await Song.findById(id).exec();
            return result != null ? result : undefined;
          } else {
            return undefined;
          }
    
    },

    async addSong(newSong){

        const song= new Song({
            titulo: newSong.titulo,
            artista: newSong.artista,
            album: newSong.album,
            anio: newSong.anio
        });
        
        const result= await song.save();
        return result;
    },

    async deleteSong(id){

        if (mongoose.Types.ObjectId.isValid(id)) {

            let lists=await playList.find({songs:{$in:[id]}}).exec();

            for(let i=0;i<lists.length;i++){
              for(let j=0;j<lists[i].songs.length;j++){

                if(lists[i].songs[j]==id){
                    lists[i].songs.splice(j,1);

                  await lists[i].save();
                }
              }
            }
            return await Song.findByIdAndRemove(id).exec();
          } else {
            return undefined;
          }
    },
    async editSong(id, modifySong) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const songEdit = await Song.findById(id).exec();

          if (songEdit != null) {
            return await Object.assign(songEdit, modifySong).save();

          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      },
};

export {
    Song,
    songRepository
    
}