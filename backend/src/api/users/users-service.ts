import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10; 

/**
 * Creates a new user in the database with a hashed password.
 * @param login - The user's login name.
 * @param password - The user's plain-text password.
 * @returns The newly created user object (without the password).
 */
export const createUser = async (login: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    try {
        const newUser = await prisma.user.create({
            data: {
                login: login,
                password: hashedPassword, 
                score: 0, 
            },
        });

        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;

    } catch (error: any) {
        if (error.code === 'P2002' && error.meta?.target.includes('login')) {
            throw new Error('UsernameAlreadyExists');
        }
        throw error;
    }
};

/**
 * Authenticates a user and returns a JWT if successful.
 * @param login - The user's login name.
 * @param password - The user's plain-text password.
 * @returns A JWT string if credentials are valid, otherwise null.
 */
export const loginUser = async (login: string, password: string): Promise<string | null> => {
    const user = await prisma.user.findUnique({
        where: { login },
    });

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }

    const tokenPayload = {
        id: user.id,
        login: user.login
    };

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in the environment variables.');
    }

    const token = jwt.sign(tokenPayload, secret, {
        expiresIn: '7d', 
    });

    return token;
};