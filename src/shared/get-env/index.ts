/**
 * Модуль инициализации env-переменных
 * @remark Если не найдено значение хоть одной переменной,
 * Приложение сразу выбросит ошибку, при инициализации модуля
 * @module
 */

/**
 * Получение env-переменной
 * @throwable
 */
// const getEnvVar = (key: string) => {
//     if (process.env[key] === undefined) {
//         throw new Error(`Env variable ${key} is required`);
//     }
//     return process.env[key] || "";
// };

export const API_URL = process.env.NEXT_PUBLIC_API_URL