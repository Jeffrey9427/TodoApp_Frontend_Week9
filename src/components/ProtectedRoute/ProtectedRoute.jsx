import { Navigate } from 'react-router-dom'
import { Cookies } from 'react-cookie';

export default function ProtectedRoute ({ children })  {
    //check if user is authenticated by checking if login token is present in cookies with name "session"
    const cookies = new Cookies(null, { path: '/' });
    const token = cookies.get('session_id');
    const expiryTime = cookies.get('expiry_time');

    //redirect to /login if token is invalid
    if (token === undefined || !token || !expiryTime) {
        return <Navigate to="/login" />;
    } 

    // Replace the URL-encoded characters with their original values
    const decodedExpiryTime = expiryTime.replace(/%3A/g, ':').replace(/%2F/g, '/');

    // Convert the decoded expiry time string to a Date object
    const expiryDate = new Date(decodedExpiryTime);

    // Compare the expiry time with the current time
    if (Date(Date.UTC(Date.now())) > expiryDate.getTime()) {
        return <Navigate to="/login" />;
    }

    return children;
};