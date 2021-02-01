import { Router } from 'express';
import {UserController} from '../controllers/userController'

import { param, body } from 'express-validator';
import { validar } from '../middlewares/validacion'
import { emailExists } from '../models/users'

const router = Router();

router.get('/', UserController.todosLosUsuarios);
router.get('/me', UserController.me);
router.get('/:id', UserController.usuarioPorId);

router.post('/', [
    body('username').isLength({min: 5}).withMessage('You have to write 5 characters at least'),
    body('email')
        .isEmail()
        .withMessage('You have to write a valid email in this field')
        .custom(async email => {
            if(await emailExists(email)) {
                throw new Error('This email was already registered');
            } else {  
                return true;
            }
        }),
    body('id').not().exists().withMessage('The ID will be assigned automatically')
],
validar, 
UserController.nuevoUsuario);

router.put('/:id', UserController.editarUsuario);
router.delete('/:id', UserController.eliminarUsuario);

export default router;