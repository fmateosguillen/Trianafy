import {playList, playListRepository} from '../models/playlists';
import mongoose from 'mongoose';
import {param} from 'express-val0idator';

const playListController = {

    allList: async (req, res) => {
        const dataLists = await playListRepository.findAll(req.user.id);

        if (Array.isArray(dataLists) && dataLists.length > 0)
        res.json(dataLists)
        else res.sendStatus(404);

    },

    getDescriptionById : async (req,res) => {
        const datas = await playListRepository.findDescription(req.params.id, req.user.id);
        if (datas != null){
            res.send(datas.descripcion);
        }else{
            res.sendStatus(404)
        }
    },

    addList : async (req, res) =>{
        try{
            let newList = await playListRepository.create({
                nombre_playList : req.body.nombre_playList,
                descripcion: req.body.descripcion,
                user_id: req.body.user_id
            });
            res.status(201).json(newList);
        }
        catch{
            res.status(400).json({Error:`Error en la petición :${error.message}`})
        }
    }, 

    deletePlayList : async (req,res) => {
        let resul = await playListRepository.deleteList(req.params.id, req.user.id);
        resul.deletedCount>0 ? res.sendStatus(204) : res.sendStatus(404)
    },

    updateList: async (req, res) => {
        if (req.params.id != undefined && mongoose.Types.ObjectId.isValid(req.params.id)) {
            let listModified = await playListRepository.actualizarList(req.params.id, {
                nombre_playList : req.body.nombre_playList,
                descripcion: req.body.descripcion
            }, req.user.id);
            if (listModified == undefined) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        } else {
            res.sendStatus(400);
        }
    },

    getSongFromList : async (req, res) => {
        let songs = await playListRepository.getSongs(req.params.id, req.user.id);
        songs != null ? res.json(songs) : res.status(404).json({Error:"No se ha encontrado la lista de reproducción"});
    },

    addSongToPlaylist: async (req, res) => {
        let added = await playListRepository.addSongToPlaylist(req.params.idList, req.params.idSong, req.user.id);
        added != null ? res.json(added) : res.sendStatus(404);
    },

    getSongFromList: async (req, res) => {
        let songFromList = await playListRepository.getSongFromList(req.params.idList, req.params.idSong, req.user.id);
        songFromList != null ? res.json(songFromList) : res.sendStatus(404);
    },
    deleteSongFromList: async (req, res) => {
        let result = await playListRepository.deleteSongFromList(req.params.idList, req.params.idSong, req.user.id);
        result != null ? res.sendStatus(204) : res.sendStatus(404);
    }
    
}

export {
    playListController
}