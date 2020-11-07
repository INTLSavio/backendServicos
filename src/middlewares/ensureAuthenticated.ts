import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // Recuperando o Token do cabeçalho da requisição
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    // Recuperando o valor do Token
    const [, token] = authHeader.split(' ');

    try {
        // Verifica se o Token foi realmente gerado a partir do secret utilizado pela aplicação
        const decoded = verify(token, authConfig.jwt.secret);

        // Recupera o id do usuário
        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new AppError('Invalid JWT Token', 401);
    }
}
