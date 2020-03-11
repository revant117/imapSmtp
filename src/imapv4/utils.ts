// Seperate utils for IMAP module , so that it can stay decoupled from http server module
import crypto from 'crypto'

export function to<T, U = Error>(
    promise: Promise<T>,
    errorExt?: object
): Promise<[U | null, T | undefined]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((err: U) => {
            if (errorExt) {
                Object.assign(err, errorExt);
            }

            return [err, undefined];
        });
}

export function generateRandomString(length: number): string {
    // TODO: Add a more sphisticated lib to do this?
    return crypto.randomBytes(Math.ceil(length * 0.5)).toString('hex').slice(0, length);
}