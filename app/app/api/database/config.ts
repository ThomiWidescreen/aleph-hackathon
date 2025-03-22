import mongoose from "mongoose";

export const dbConection = async () => {
    try {
        
        mongoose.set('strictQuery', false);

        await mongoose.connect( process.env.MONGODB_CNN || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conxión con base de datos existosa");

    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar la base de datos')
    }
}

export default dbConection;