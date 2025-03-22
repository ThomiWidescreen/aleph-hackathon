"use server"

import Video from "@database/models/video";
import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Función para verificar la conexión a Cloudinary
const verifyCloudinaryConnection = async (): Promise<boolean> => {
    try {
        // Intentamos hacer una llamada básica a la API para verificar credenciales
        const result = await cloudinary.api.ping();
        console.log("✅ Conexión a Cloudinary exitosa:", result.status);
        return true;
    } catch (error) {
        console.error("❌ Error de conexión a Cloudinary:", error);
        return false;
    }
};

// Upload an image
const uploadFile = async (file: string): Promise<string | undefined> => {

    const conection = await verifyCloudinaryConnection();

    if (!conection) {
        return;
    }

    try {
        const uploadResult = await cloudinary.uploader
            .upload(file, {
                resource_type: "video"
            }
            );
        // console.log(uploadResult);

        if (!uploadResult.url) {
            throw new Error("No se pudo subir el archivo");
        }

        return uploadResult.url;

    } catch (error) {
        console.error("Error completo de Cloudinary:", error);
    }
}




interface Props {
    title: string;
    description?: string;
    category?: string;
    price?: number;
    tags?: string[];
    authorAddress: string;
    videoData: string;
}

export const createVideo = async ({ title, description = '', category = 'General', price = 0, tags = [], authorAddress, videoData }: Props) => {

    console.log("here")
    const urlVideo = await uploadFile(videoData);

    const body = { title, description, category, price, tags, authorAddress, urlVideo };

    console.log({ body })
    try {
        const video = await Video.collection.insertOne(body);
        // await video.save();
        return {
            message: 'Video creado',
            video
        }
    } catch (error) {
        console.log(error)
        return { error: 'Error al crear video' }
    }
}