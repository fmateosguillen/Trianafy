import mongoose from 'mongoose';

const {Schema} = mongoose;

const userSchema = new Schema({
    nombre: String,
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    return result > 0;

}

const userRepository ={

      async findAll() {
        //return users;
        const result =  await User.find({}).exec();
        return result;
    },
    async findByEmail(email) {
        let users = await Usuario.findOne({ email: email }).exec();
        return users == null ? undefined : users;
    },
    async findByUsername(username) {
        let users = await Usuario.findOne({ nombre_usuario: username }).exec();
        return users == null ? undefined : users;
    },
  
    async findById(id){
        const result = await User.findById(id).exec();
        return result != null ? result : undefined;

    },

    async create(newUser) {
     
        const nuevoUsuario= new User({
            nombre: newUser.nombre,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        })

        const result = await nuevoUsuario.save();
        return result;

    },

    async updateById(id, modifiedUser) {
        const usuarioGuardado= await User.findById(id)
        
        if (usuarioGuardado != null){
            return await Object.assign(usuarioGuardado, modifiedUser).save();

        }else 
        return undefined;
    },

    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 

    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 
    
    async delete(id) {
    await User.findByIdAndRemove(id).exec()

    }
}

export {
    User,
    userRepository,
    emailExists
}