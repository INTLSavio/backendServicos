// Serviço que atualiza o avatar de um usuário

import path from 'path';
import { getRepository } from 'typeorm';
import fs from 'fs';

import AppError from '../errors/AppError';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }

        // Confere se o usuário ja possuía um avatar, caso sim deleta o avatar antigo
        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            // Confere se o arquivo ainda existe utilizando o fs.promises.stat
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            // Caso o arquivo ainda exista deleta o arquivo utilizando o fs.promises.unlink
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
