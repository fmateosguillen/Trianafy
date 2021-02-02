import { Song } from '../models/Song';
import { Mongoose } from 'mongoose';
const songRepository = {

    async findAll() {
        const result = await Song.find({}).exec();
        return result;
    },
    async new(newSong) {
        let song = new Song({
            title: newSong.title,
            artist: newSong.artist,
            album: newSong.album,
            year: newSong.year
        });
        const result = await song.save(song);
        return result;
    },
    async songById(id) {
        try {
            const song = await Song.findById(id).exec();
            return song;
        } catch (error) {
            if (error instanceof ReferenceError) {
                console.log("There are no songs with that ID");
            }
        }
    },
    async editSongById(id, songModified) {
        const currentSong = await Song.findOneAndUpdate(
            {_id: id},
            {title: songModified.title,artist: songModified.artist,
            album: songModified.album,year: songModified.year});
        return currentSong;
    },


    async delete(id){
        return await Song.deleteOne({
            _id: id
        });
    }
}

export {
    songRepository
}