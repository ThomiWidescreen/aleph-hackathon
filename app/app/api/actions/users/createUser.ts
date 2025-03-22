"use server"

import User from "@database/models/user";

interface Props {
    address: string;
    name: string;
    description: string;
}


export const createUser = async({ address='0x00', name, description }: Props) => {
    console.log({address, name, description})
    
    try {
        const newUser = new User({ address, name, description });
        await newUser.save();
        return { message: 'Usuario creado', user: "test" }
    } catch (error) {
        return { error: 'Error al crear usuario' }
    }
    }