import { Router } from 'express';
import { body } from 'express-validator';
import { emailExists, usernameExists } from '../models/users';
import { AuthController } from '../controllers/authController';
import { validar } from '../middlewares/validacion';

const router = Router();

router.post('/register', [
    body('username')
        .isLength({min: 5})
        .withMessage('You have to write 5 characters at least')
        .custom(username => {
            if (usernameExists(username)) {
                throw new Error('This email was already registered')
            } else
                return true;
        }),
    body('password').isLength({min: 8}).withMessage('The password must have at least 8 characters'),
    body('email')
        .isEmail()
        .withMessage('You have to write a valid email in this field')
        .custom(email => {
            if(emailExists(email)) {
                throw new Error('This email was already registered');
            } else {  
                return true;
            }
        }),
    body('id').not().exists().withMessage('The ID will be assigned automatically')
],
validar, 
AuthController.register);


export default router;