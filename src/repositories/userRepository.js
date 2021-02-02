import bcrypt from 'bcryptjs';
import { user } from '../models/users';


const emailExists = async (emailUser) => {
    let users = await user.find({}).exec();
    let emails = users.map(user => user.email);
    return emails.includes(emailUser);
}

const usernameExists = async (userr) => {
    let users = await user.find({}).exec();
    let usernames = users.map(userr => userr.username);
    return usernames.includes(userr);
}
const userRepository = {

    async findAll(){
        const result = await user.find({}).exec();
        return result;
    },
    async newUser(newUser){
        let password = bcrypt.hashSync(newUser.password, parseInt(process.env.BCRYPT_ROUNDS));
        const user = new User({
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            password: password
        });
        const result = await user.save();
        return result;
    },
    async findByUsername (userr){
        return await user.findOne({username: userr}).exec();
    },
    async findById(id) {
        const users = await user.find({});
        let result = users.filter(user => user.id == id)
        return result;
    },

    toDto(user) {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        }
    }
}

export{
    userRepository,
    emailExists,
    usernameExists
}