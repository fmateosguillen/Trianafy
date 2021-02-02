import { Playlist } from '../models/Playlist';
import { Song } from '../models/Song';

const playlistRepository = {
    async findAll(id) {
        const result = await Playlist.find({
                user_id: id
            })
            .populate('songs')
            .exec();
        return result;
    },
    async addPlaylist(newList) {
        const playlist = new Playlist({
            name: newList.name,
            description: newList.description != undefined ? newList.description : "",
            user_id: newList.user_id,
        });
        return await playlist.save();
    },
    async addSongToPlaylist(playlistId, songId, userId) {
        const playlist = await Playlist.findOne({_id: playlistId, user_id: userId})
            .populate('songs')
            .exec();
        const newSong = await Song.findById({_id: songId});
        if (playlist != null && newSong != 0) {
            let songNotIn = playlist.songs.filter(song => song.equals(newSong));
            if (songNotIn.length == 0) {
                console.log(newSong);
                playlist.songs.push(newSong)
                await playlist.save();
                return playlist;
            }
        }
    },
    async updateList(newPlaylist, id, userId) {
        const result = await Playlist.find({
                _id: id,
                user_id: userId
            })
            .populate('songs')
            .exec();
        if (result.nModified > 0) {
            return await Playlist.updateOne({
                _id: id
            }, {
                name: newPlaylist.name,
                description: newPlaylist.description
            });
        } else {
            return null;
        }
    },
    async descriptionById(id, userId) {
        const result = await Playlist.find({
                _id: id,
                user_id: userId
            })
            .populate('songs')
            .exec();
        return result;
    },
    async deletePlaylist(id, userId) {
        return await Playlist.deleteOne({
            _id: id,
            user_id: userId
        }).exec();
    },
    async getPlaylistSongs(playlistId, userId) {
        const playlist = await Playlist.findOne({
            _id: playlistId,
            user_id: userId
        }).populate('songs').exec();
        if(playlist != null){
            return playlist.songs;
        }
    },
    async getSongFromPlaylist(playlistId, songId, userId) {
        const playlist = await Playlist.findOne({
            _id: playlistId,
            user_id: userId
        }).populate({
            path: 'songs',
            match: {
                _id: songId
            }
        }).exec();
        return playlist.songs;
    },
    async deleteSongFromPlaylist(playlistId, songId, userId) {
        const playlist = await Playlist.findOne({_id: playlistId, user_id: userId}).exec();
        const song = await Song.findById(songId).exec();
        if(playlist != null && song != 0){
            let idSong = 0;
            for(let i = 0; i < playlist.songs.length; i++){
                console.log(playlist.songs[i]._id);
                if(playlist.songs[i]._id == songId){
                    idSong = i;
                }
            }
            playlist.songs.splice(idSong, 1);
            await playlist.save()
            return playlist;
        }
    }
}

export {
    playlistRepository
}