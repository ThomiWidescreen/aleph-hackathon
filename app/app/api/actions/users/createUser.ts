"use server"

import User from "@database/models/user";

interface Props {
    address: string;
    name: string;
    description?: string;
    photo?: string;
    state?: boolean;
    hiringAvailability?: boolean;
    score?: number;
}


// export const createUser = async({ address='0x00', name, description, photo }: Props) => {
export const createUser = async ({
    address = '0x00',
    name,
    description = '',
    photo = '',
    state = true,
    hiringAvailability = false,
    score = 4.5
}: Props) => {

    const body = { address, name, description, photo, state, hiringAvailability, score }

    try {
        const newUser = new User(body);
        const user = await newUser.save();
        
        return {
            message: 'Usuario creado',
            user
        }

    } catch (error) {
        return { error: 'Error al crear usuario' }
    }
}