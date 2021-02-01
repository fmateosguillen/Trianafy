import mongoose from 'mongoose'
import { User, userRepository } from './users';
import {Song} from './song'

const {Schema} = mongoose;

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
        },
    ]
});

const playList= mongoose.model("playList", playListSchema);

const playListRepository ={

    async findAll(idUser) {
        const result = await playList.find({
          user_id: idUser,
        }).populate("songs").exec();
        return result;
      },

      findDescription(id, idUser) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const result = playList.findOne({_id: id,user_id: idUser,}).exec();

          return result;
        } else {
          return null;
        }
      },

      async create(newList) {
        const theNewList = new playList({
          nombre_playlist: newList.nombre_playlist,
          descripcion: newList.descripcion,
          user_id: newList.user_id,
        });
        return await theNewList.save();
      },
      
      async updateList(id, listUpdate, idUser) {
        const listEdit = await playList.findOne({_id: id,user_id: idUser,}).exec();
        if (listEdit != null) {
          console.log(listUpdate);
          console.log(listEdit);
          return await Object.assign(listEdit,listUpdate).save();
        } else {
          return undefined;
        }
      }, 

       async deleteList(id, idUser) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          return await playList.deleteOne({_id: id,user_id: idUser,}).exec();
        } else {
          return null;
        }
      },

      async getSongs(id, idUser) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const listSongs = await playList.findOne({_id: id,usuario_id: idUsuario,}).populate("songs").exec();
          if (listSongs != null) {
            return listSongs.songs;
          }
        }
        return null;
      },

      async addSongToPlaylist(idList, idSong, idUser) {
        if (mongoose.Types.ObjectId.isValid(idList) && mongoose.Types.ObjectId.isValid(idSong)) {

          const list = await playList.findOne({_id: idList, user_id: idUser,}).populate("songs").exec();
          const songToAdd = await Song.findById(idSong);

          if (list != null && songToAdd != null) {

            let exist = list.songs.filter(songExist=>songExist.equals(songToAdd));
           
            if(exist.length==0){
                list.songs.push(cancion);
                await list.save();
                return list;
            }
          }
        }
        return null;
      },

      async getSongFromList(idList, idSong, idUser) {
        if (mongoose.Types.ObjectId.isValid(idList) && mongoose.Types.ObjectId.isValid(idSong)) {
            
        const list = await playList.findOne({_id: idList, user_id: idUser,}).populate({path: "songs",match: {_id: idSong,},}).exec();

          if (list != null && list.songs.length > 0) {
            return list.songs[0];
          }
        }
        return null;
      },
      async eliminarCancionLista(idList, idSong, idUser) {
        if (mongoose.Types.ObjectId.isValid(idList) && mongoose.Types.ObjectId.isValid(idSong)) {

        const list = await playList.findOne({_id: idList, user_id: idUser,}).populate("songs").exec();
          let song = await Cancion.findById(idSong).exec();
          if (list != null && song != null) {
            let indice = undefined;
          
            for (let i = 0; i < list.songs.length; i++) {
              if ((list.songs[i]._id = idSong)) {
                indice = i;
              }
            }
            list.songs.splice(indice, 1);
            await list.save();
            return list;
          }
        }
        return null;
      },
    };

export{
    playList,
    playListRepository
}