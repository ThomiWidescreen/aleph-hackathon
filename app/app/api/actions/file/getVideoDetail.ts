"use server"

import Video from "@database/models/video";

export const getVideoDetail = async(id: string) => {

    const video = await Video.findById(id);

    if (!video) {
        return null;
    }

    return ({
        messaje: 'OK Get Video Detail',
        video
    })
}