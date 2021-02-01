import { Router } from 'express';
import { body, param } from 'express-validator';
import { songController } from '../controllers/songController';
import { token } from '../servicios/passport';
import { validar } from '../middlewares/validacion';

const router = Router();
router.get('/',token(),songController.allSongs);

router.post('/',[token(),
    body('id').not().exists().withMessage('The ID will be assigned automatically')]
    ,validar,songController.addSong);

router.get('/:id',token(),songController.findSongById);

router.delete('/:id',token(),songController.deleteSongById);

router.put('/:id',[token(),body('id')
        .not().exists()
        .withMessage("The ID couldn't be modified")],songController.editSong);

export default router;
