import { Schema, model } from "mongoose";

export interface IUser {
    address: string;
    name: string;
    description: string;
    photo: string;
    state: boolean;
    // hiringAvailability: boolean;
    // score: number; // This is the score of the user del 1 al 5 float
}

const UserSchema = new Schema<IUser>({
    address: {
        type: String,
        required: [true, 'Wallet is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    state: {
        type: Boolean,
        default: true
    }
})

// UserSchema.methods.toJSON = function() {
//     const { password, __v, _id, ...usuario} = this.toObject();
//     usuario.uid = _id;
//     return usuario;
// }

export default model('User', UserSchema)