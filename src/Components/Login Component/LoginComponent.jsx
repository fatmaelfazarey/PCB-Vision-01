import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

import { useNavigate } from 'react-router-dom';
// import { LoginUser } from '../../Services/LoginUser';
import { AppContext } from '../../Context/AppContext';

const LoginComponent = () => {
    const navigate = useNavigate();
    const { LoginUser, language, t } = useContext(AppContext);
    const { user } = useContext(AppContext);
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    const validate = () => {
        let newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            LoginUser(formData.email, formData.password).then(user => {
                if (user) {
                    // console.log("User logged in:", user);
                    navigate(`/main/${user.id}`);
                } else {
                    console.log("Login failed");
                }
            });
        }
    };
    // console.log("User logged in:", user);
    return (
        <div className="relative bg-second dark:bg-second-dark flex items-center h-screen">
            <div className={`h-screen absolute top-0 left-0 md:relative bg-white dark:bg-black shadow-lg sm:w-130 w-[90%] flex flex-col justify-center items-center p-5  ${language === 'ar' ? 'rounded-l-4xl' : 'rounded-r-4xl'}`}>
                <div className='text-center text-gray-600 flex flex-col justify-center items-center'>
                    <img src={assets.logo} alt='pcb' />
                    <p className='text-lg'>{t('Log in to your account')}</p>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col w-full gap-3 mt-4 mb-4 items-end'>
                    {/* Email Field */}
                    <div className='flex flex-col w-full'>
                        <label
                            htmlFor="email"
                            className={`text-gray-600 block text-sm`}>{t('Email')}</label>
                        <input
                            id='email'
                            name="email"
                            type='text'
                            onChange={(e) => { handleChange(e); }}
                            className={`w-full font-[400] dark:text-white rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark`} />
                        {errors.email && <span className="text-red-500 text-[.6rem]">{t(errors.email)}</span>}
                    </div>
                    {/* Password Field */}
                    <div className='flex flex-col w-full'>
                        <label
                            htmlFor="password"
                            className={`text-gray-600  block text-sm`}>{t('Password')}</label>
                        <div className='relative'>
                            <input
                                id='password'
                                type={`${hiddenPassword ? 'password' : 'text'}`}
                                name='password'
                                onChange={(e) => { handleChange(e); }}
                                className={`w-full font-[400] dark:text-white rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark `} />
                            <img src={`${hiddenPassword ? assets.eye : assets.view}`} width='22' className={`absolute leading-2 bottom-[50%]  translate-y-[50%] ${language === 'ar' ? 'left-3' : 'right-3'}`} onClick={() => setHiddenPassword(false)} />
                        </div>
                        {errors.password && <span className="text-red-500 text-[.6rem]">{t(errors.password)}</span>}
                    </div>
                    <input type="submit" value='Login' className={` w-fit  bg-transparent border text-main  font-bold py-2 px-4 rounded-xl opacity-90 transition hover:bg-main hover:opacity-100 hover:text-white dark:hover:text-black`}
                    />
                </form>
                <div className='text-center text-gray-600 text-base'>
                    <p>{t('Create')} <Link to='/'><u className='text-blue-600'>{t('Company account')}</u></Link></p>
                    <p>{t('You don\'t have an account')} <Link to='/sign'><u className='text-blue-600'>{t('create account')}</u></Link></p>
                </div>
            </div>
            <div className='w-full md:w-3/5 h-full overflow-hidden flex items-center '>
                <img src={assets.sign} />
            </div>
        </div>
    )
}

export default LoginComponent
