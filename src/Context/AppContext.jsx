import { createContext, useState, useEffect } from "react";
import { getUserIsLogined } from "../Services/getUserIsLogined";
import { getPCBS } from '../Services/getPCBS';
import { useTranslation } from 'react-i18next';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    // const { t, i18n } = useTranslation();
    const [user, setUser] = useState(null);  // Initial state set to null
    const [userId, setUserId] = useState(null);

    //#region Language
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    localStorage.removeItem('i18nextLng');
    useEffect(() => {
        console.log(language);
        localStorage.setItem('language', language);
        i18n.changeLanguage(language);
        window.document.dir = i18n.dir();
    }, [language, i18n]);
    //#endregion

    // let token;
    const LoginUser = async (email, password) => {
        const url = `http://localhost:3001/users?email=${email}&password=${password}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();
            if (users.length > 0) {
                alert("Login successful! 🎉");
                // token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
                // user.token = token;
                setUser(users[0]);
                localStorage.setItem('userId', users[0].id);
                return users[0];
            } else {
                alert("Invalid email or password. Please try again.");
                return null;
            }
        } catch (error) {

            alert('Error logging in, Check the server connection', error.message);
            // console.error('Error logging in:', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'));
            getUserIsLogined(localStorage.getItem('userId'), setUser);
        }
    }, []);

    //#region get History
    const [history, setHistory] = useState(null);
    const [userHistoryLoading, setUserHistoryLoading] = useState(false);
    const [userHistoryError, setUserHistoryError] = useState(null);
    useEffect(() => {
        if (userId) {
            getPCBS(userId, setHistory, setUserHistoryLoading, setUserHistoryError);
        }
    }, [userId]); // Add userId to dependency array
    //#endregion


    //#region Mode
    // const [isDarkMode, setIsDarkMode] = useState(false);
    // const toggleMode = () => {

    //     if (localStorage.getItem('theme')) {
    //         localStorage.removeItem("theme");
    //         document.getElementsByClassName('App')[0].classList.toggle('dark', localStorage.theme);
    //         setIsDarkMode(true);
    //     } else {
    //         localStorage.theme = "dark";
    //         document.getElementsByClassName('App')[0].classList.add(localStorage.theme);
    //         setIsDarkMode(false);
    //     }
    // }
    // useEffect(() => {
    //     toggleMode();
    // }, []);






    const [isDarkMode, setIsDarkMode] = useState(false);


    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);


    const toggleMode = () => {
        if (isDarkMode) {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        } else {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    };
    //#endregion









    //#endregion

    const value = {
        LoginUser,
        user,
        setUser,
        userId,
        userHistoryError,
        userHistoryLoading,
        history,
        toggleMode,
        isDarkMode,
        i18n,
        t, language, setLanguage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
