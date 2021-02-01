import { Song, songRepository } from '../models/song';
import mongoose from 'mongoose'

export const songController = {

    allSongs:async(req,res)=>{
        const data = await songRepository.findAll();
        res.json(data);
    },

    addSong:async(req,res)=>{
        try{
            let newSong= await songRepository.create({
                titulo:req.body.titulo,
                artista:req.body.artista,
                album:req.body.album,
                anio:req.body.anio
            });
            res.status(201).json(newSong);
        }catch(error){
            res.status(400).json({Error:`Se ha producido un error con su peticion :${error.message}`})
        }
    },

    findSongById:async(req,res)=>{
        let song = await songRepository.findById(req.params.id);
            if (song != undefined) {
                res.json(song);
            } else {
                res.sendStatus(404);
            }
    },

    deleteSongById:async(req,res)=>{
        let resul=await songRepository.deleteSong(req.params.id);
        resul !=undefined ? res.sendStatus(204) : res.sendStatus(404)
    },

    editSong:async(req,res)=>{
        if(req.params.id!=undefined && mongoose.Types.ObjectId.isValid(req.params.id)){

            let modifiedSong=await songRepository.editSong(req.params.id,{
                titulo:req.body.titulo,
                artista:req.body.artista,
                album:req.body.album,
                anio:req.body.anio
            });

            if(modifiedSong==undefined){
                res.sendStatus(404);
            }else{
                res.sendStatus(204);
            }

        }else{
            res.sendStatus(409);
        }
    }

}

export {
    songController
}