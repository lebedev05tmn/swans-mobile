// src/shared/config/emailApi.ts
import { api } from './api';

// Интерфейсы для ответов
interface JsonRpcBaseResponse {
    jsonrpc: '2.0';
    id: string;
}
interface JsonRpcSuccessResponse<T> extends JsonRpcBaseResponse {
    result: T;
    error?: never;
}
interface JsonRpcErrorResponse extends JsonRpcBaseResponse {
    result?: never;
    error: { code: number; message: string; data?: any };
}
type JsonRpcResponse<T> = JsonRpcSuccessResponse<T> | JsonRpcErrorResponse;

// Ожидаемые типы result для JSON-RPC
interface SendCodeResult {
    success: boolean;
    session_id?: string;
    message?: string;
}
interface SimpleSuccessResult {
    success: boolean;
}

// Типы возвращаемых значений наших функций
type SendCodeReturn = { success: boolean; sessionId?: string; error?: string };
type VerifyCodeReturn = { success: boolean; error?: string };
type CreateUserReturn = { success: boolean; error?: string };
type SendNewPasswordReturn = { success: boolean; error?: string }; // Тип для новой функции

// Хелпер для извлечения сообщения об ошибке
function getErrorMessage(response: JsonRpcErrorResponse | any): string {
    // Приоритет стандартному { message: "..." } для ошибок 4xx/5xx и Axios
    if (response?.message) return response.message;
    // Потом проверяем JSON-RPC ошибку
    if (response?.error?.message) return response.error.message;
    return 'Неизвестная ошибка API';
}

// --- API Функции ---

/**
 * Отправляет код подтверждения на email (Шаг 1 Регистрации).
 * Также неявно проверяет, существует ли пользователь.
 */
export const sendCode = async (email: string): Promise<SendCodeReturn> => {
    const requestBody = {
        jsonrpc: '2.0' as const,
        method: 'send_code',
        params: { email },
        id: `send_${Date.now()}`,
    };
    try {
        console.log('[API] Вызов send_code:', JSON.stringify(requestBody));
        const response = await api.post<JsonRpcResponse<SendCodeResult>>(
            '/api/auth/email_registration',
            requestBody,
        );
        const data = response.data;
        console.log('[API] Ответ send_code:', JSON.stringify(data));

        if (data.result) {
            if (data.result.success === true && data.result.session_id) {
                return { success: true, sessionId: data.result.session_id };
            } else if (data.result.success === false && data.result.message) {
                console.warn(
                    '[API] Ошибка send_code (в result):',
                    data.result.message,
                );
                return { success: false, error: data.result.message };
            } else {
                const errorMsg =
                    'API Error: Unexpected result format (success=false or missing session_id/message)';
                console.error('[API] Ошибка send_code (result):', errorMsg);
                return { success: false, error: errorMsg };
            }
        } else if (data.error) {
            const errorMsg = getErrorMessage(data);
            console.error('[API] Ошибка send_code (error):', errorMsg);
            return { success: false, error: errorMsg };
        } else {
            console.error('[API] Ошибка send_code: Unexpected response format');
            return { success: false, error: 'Unexpected API response format' };
        }
    } catch (error: any) {
        const errorMsg = getErrorMessage(error.response?.data || error);
        console.error(
            '[API] Сетевая ошибка send_code:',
            errorMsg,
            error.response?.status,
        );
        return { success: false, error: errorMsg };
    }
};

export const verifyCode = async (
    sessionId: string,
    code: string,
): Promise<VerifyCodeReturn> => {
    const requestBody = {
        jsonrpc: '2.0' as const,
        method: 'verify_code',
        params: { session_id: sessionId, code },
        id: `verify_${Date.now()}`,
    };
    try {
        console.log('[API] Вызов verify_code:', JSON.stringify(requestBody));
        const response = await api.post<JsonRpcResponse<SimpleSuccessResult>>(
            '/api/auth/email_registration',
            requestBody,
        );
        console.log('[API] Ответ verify_code:', JSON.stringify(response.data));
        if (response.data.result?.success) {
            return { success: true };
        } else {
            const errorMsg = response.data.error
                ? getErrorMessage(response.data)
                : 'API Error: Success=false or missing';
            console.error('[API] Ошибка verify_code:', errorMsg);
            return { success: false, error: errorMsg };
        }
    } catch (error: any) {
        const errorMsg = getErrorMessage(error.response?.data || error);
        console.error(
            '[API] Сетевая ошибка verify_code:',
            errorMsg,
            error.response?.status,
        );
        return { success: false, error: errorMsg };
    }
};

export const createUser = async (
    sessionId: string,
    password: string,
): Promise<CreateUserReturn> => {
    const requestBody = {
        jsonrpc: '2.0' as const,
        method: 'create_user',
        params: { session_id: sessionId, password },
        id: `create_${Date.now()}`,
    };
    try {
        console.log('[API] Вызов create_user:', JSON.stringify(requestBody));
        const response = await api.post<JsonRpcResponse<SimpleSuccessResult>>(
            '/api/auth/email_registration',
            requestBody,
        );
        console.log('[API] Ответ create_user:', JSON.stringify(response.data));
        if (response.data.result?.success) {
            return { success: true };
        } else {
            const errorMsg = response.data.error
                ? getErrorMessage(response.data)
                : 'API Error: Success=false or missing';
            console.error('[API] Ошибка create_user:', errorMsg);
            return { success: false, error: errorMsg };
        }
    } catch (error: any) {
        const errorMsg = getErrorMessage(error.response?.data || error);
        console.error(
            '[API] Сетевая ошибка create_user:',
            errorMsg,
            error.response?.status,
        );
        return { success: false, error: errorMsg };
    }
};

/**
 * Отправляет новый пароль на email для восстановления (Шаг 5).
 */
export const sendNewPassword = async (
    email: string,
): Promise<SendNewPasswordReturn> => {
    const requestBody = { email }; // Обычное тело запроса { email: "..." }
    try {
        console.log(
            '[API] Вызов send_new_password:',
            JSON.stringify(requestBody),
        );
        // Обычный POST, не JSON-RPC
        // Ожидаем 200 OK при успехе, или ошибку 4xx/5xx с { message: "..." }
        await api.post('/api/auth/send_new_password', requestBody);
        console.log('[API] Ответ send_new_password: Успех (200 OK)');
        return { success: true };
    } catch (error: any) {
        // Axios генерирует ошибку для не-2xx статусов
        const errorMsg = getErrorMessage(error.response?.data || error);
        console.error(
            '[API] Ошибка/Сетевая ошибка send_new_password:',
            errorMsg,
            error.response?.status,
        );
        return { success: false, error: errorMsg };
    }
};
