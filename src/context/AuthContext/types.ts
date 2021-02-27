import { UserDetails } from './AuthContext';

export interface AuthContextProps {
    user: UserDetails;
    logged?: boolean;
    userRole: 'admin' | 'user';
    setSessionData: (sessionDetails: UserDetails) => void;
    removeSessionData: () => void;
    loading?: boolean;
}
