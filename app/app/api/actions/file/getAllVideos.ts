"use server"

import Video from "@database/models/video";

export const getAllVideos = async() => {

    try {
            const videos = await Video.find();
    
            return {
                message: 'Get Videos Ok',
                videos: videos || []
            }
    
        } catch (error) {
            return { error: 'Error al buscar user' }
        }
}