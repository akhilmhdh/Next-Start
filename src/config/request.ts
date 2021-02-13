import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { ACCESS_TOKEN } from 'const';
import snakeCaseKeys from 'snakecase-keys';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface RequestReturn<T> {
    data: T | null;
    error: AxiosError | null;
}

/**
 * An axios interceptor to convert js camelcase to python api
 * canvert camelCase to snakecase
 */
axios.interceptors.request.use(
    (req) => {
        const newRequest = { ...req };
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            newRequest.headers.Authorization = `Bearer ${token}`;
        }
        if (req?.data?.avoidInterceptor) {
            delete newRequest?.data?.avoidInterceptor;
            return newRequest;
        }
        if (newRequest.headers['Content-Type'] === 'multipart/form-data') return newRequest;
        if (newRequest.headers['Content-Type'] === 'application/x-www-form-urlencoded')
            return newRequest;

        if (newRequest.params) {
            newRequest.params = snakeCaseKeys(req.params);
        }

        if (newRequest.data) {
            newRequest.data = snakeCaseKeys(req.data);
        }
        return newRequest;
    },
    (err) => {
        return Promise.reject(err);
    }
);

/**
 * convert all snake_case api to camelcase keys from backend
 */
axios.interceptors.response.use(
    (res) => {
        return { ...res, data: camelcaseKeys(res.data, { deep: true }) };
    },
    (err) => {
        return Promise.reject(err);
    }
);

/**
 * A request wrapper for axios
 * @param options - all configuration for axios instance, methods, params
 * @param type - content type header
 * @returns {Promise<object>}: {data:<result | undefined>, error:<error | undefined>}
 */
export const request = async <T extends unknown>(
    options: AxiosRequestConfig,
    headers = { 'Content-Type': `application/json` }
): Promise<RequestReturn<T>> => {
    Object.assign(options, { headers });
    try {
        const { data } = await axios(options);
        return { error: null, data };
    } catch (error) {
        return { error, data: null };
    }
};
