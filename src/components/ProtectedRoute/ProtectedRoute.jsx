import { Navigate } from 'react-router-dom'
import { Cookies } from 'react-cookie';

export default function ProtectedRoute ({ children })  {
    //check if user is authenticated by checking if login token is present in cookies with name "session"
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('session')

    //redirect to /login if token is invalid
    if (token === undefined) {
        return <Navigate to="/login" />;
    } 

    return children;
};