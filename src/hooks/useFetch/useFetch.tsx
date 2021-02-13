/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr';
import { fetcherFn, keyInterface } from 'swr/dist/types';

export interface UseFetchReturn<T> {
    data: T | undefined;
    isLoading: boolean;
    isError: null | string;
    mutate: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
}

export const useFetch = <T extends unknown>(
    url: keyInterface,
    fetcher: fetcherFn<any> | undefined,
    config = {}
): UseFetchReturn<T> => {
    const { data, error, mutate } = useSWR<T>(url, fetcher, config);
    return {
        data,
        isLoading: !error && !data,
        mutate,
        isError: error,
    };
};
