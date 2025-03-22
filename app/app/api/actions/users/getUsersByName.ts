"use server"

import User from "@database/models/user";

interface Props {
    name: string
}

export const getUsersByName = async ({ name }: Props) => {

    try {

        const regexp = new RegExp(name, 'i');
        console.log({name, regexp})

        const users = await User.find({
            $or: [{ name: regexp }, { description: regexp }],
            $and: [{ state: true }]
        });

        return {
            message: 'Get Users Ok',
            users: users || []
        }

    } catch (error) {
        return { error: 'Error al buscar user' }
    }
}