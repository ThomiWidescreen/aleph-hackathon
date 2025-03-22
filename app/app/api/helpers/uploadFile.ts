"use server";

import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


// Función para verificar la conexión
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
export const uploadFile = async (file: string) => {

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