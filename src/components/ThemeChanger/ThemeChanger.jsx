import { useCookies } from 'react-cookie';

export default function ThemeChanger() {
    const [cookies, setCookie] = useCookies(['theme']);

    //function to change theme and save it to cookies
    const toggleBodyColor = () => {
        const savedTheme = cookies.theme;
        setCookie('theme', savedTheme === 'Light' ? 'Dark' : 'Light', { path: '/' });
    };

    return (
        <button onClick={toggleBodyColor}>
            Use {cookies.theme === 'Light' ? 'Dark' : 'Light'} Mode
        </button>
    );
};