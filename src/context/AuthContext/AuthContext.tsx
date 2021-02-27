import { ACCESS_TOKEN } from 'const';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContextProps } from './types';

const AuthContext = createContext<AuthContextProps | Record<string, unknown>>({});

export interface UserDetails {
    username: string;
    token: string;
}

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserDetails | null>(null);
    const [pageChange, setPageChange] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = process.browser ? localStorage.getItem(ACCESS_TOKEN) : null;
    const router = useRouter();

    const handleRouteChange = (url: string): void => {
        console.log(url);
        /**
         * Trigger function for route change
         * Block user if he/she don't have access to this route
         */
    };

    useEffect(() => {
        const checkUserSession = async (): Promise<void> => {
            try {
                if (token) {
                    /**
                     * Fetch user details based on token from server here
                     * update the context based on the server data
                     */
                    setUser({ username: '', token: '' });
                    handleRouteChange(window.location.pathname);
                } else {
                    handleRouteChange(window.location.pathname);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                localStorage.removeItem(ACCESS_TOKEN);
                router.replace('/');
            }
        };
        checkUserSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChangeStart = (): void => {
        setPageChange(true);
    };

    const handlePageChangeEnd = (): void => {
        setPageChange(false);
    };

    useEffect(() => {
        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeStart', handlePageChangeStart);
        router.events.on('routeChangeComplete', handlePageChangeEnd);
        router.events.on('routeChangeError', handlePageChangeEnd);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.off('routeChangeStart', handlePageChangeStart);
            router.events.off('routeChangeComplete', handlePageChangeEnd);
            router.events.off('routeChangeError', handlePageChangeEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const setSessionData = (sessionDetails: UserDetails): void => {
        if (sessionDetails.token) {
            localStorage.setItem(ACCESS_TOKEN, sessionDetails.token);
        }
        setUser(sessionDetails);
    };

    const removeSessionData = (): void => {
        localStorage.removeItem(ACCESS_TOKEN);
        setUser(null);
        router.replace('/');
    };

    /**
     * Context value to access glabally from anywhere
     * Memo to optimize at best
     */
    const value = useMemo(
        () => ({
            user,
            setSessionData,
            removeSessionData,
            loading: loading || pageChange,
        }),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user, loading, pageChange]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => useContext(AuthContext) as AuthContextProps;
