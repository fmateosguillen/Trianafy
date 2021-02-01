import 'dotenv/config';
import { User, userRepository } from '../models/users';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';

const AuthController = {

    register: (req, res, next) => {

        try{
            let usuarioCreado = await userRepository.create({
                nombre:req.body.nombre,
                username:req.body.username,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))});
              
            res.status(201).json({
                id: usuarioCreado.id,
                username: usuarioCreado.username,
                email: usuarioCreado.email
            });
        }catch{
            res.status(404).json({message: (err.name === 'MongoError' && err.code === 11000) ? 'Email o usuario en uso, intentelo de nuevo' : errorHandler.getErrorMessage(err)});
        }
    },
    login: (req, res, next) => {
    
        const token = JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token
        });
    }
}

export {
    AuthController
}