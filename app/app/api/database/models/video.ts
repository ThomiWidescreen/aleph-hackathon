import { Schema, model, models } from "mongoose";

interface IVideo {
    id: string,
    title: string;
    description: string;
    category: string;
    price: number;
    tags: string[];
    authorAddress: string;
    urlVideo: string;
}

const VideoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    category: {
        type: String,
        default: 'General'
    },
    price: {
        type: Number,
    },
    tags: {
        type: [String],
    },
    authorAddress: {
        type: String,
        required: [true, 'Author is required']
    },
    urlVideo: {
        type: String,
        required: [true, 'Url is required']
    }
})


//@ts-ignore
export default models.Video || model("Video", VideoSchema);