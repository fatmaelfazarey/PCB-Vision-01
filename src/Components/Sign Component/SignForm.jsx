import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AddNewUser } from '../../Services/AddNewUser';
import { AppContext } from '../../Context/AppContext';

const SignForm = () => {
    const { t, language } = useContext(AppContext);
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        image: ""
    });
    const [errors, setErrors] = useState({});
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^01\d{9}$/;
    const PasswordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //#region handle each field on change
    // Validate form fields
    // const [errors, setErrors] = useState({
    //     name: "",
    //     email: "",
    //     phone: "",
    //     password: "",
    //     confirmPassword: "",
    // });
    // const nameValid = (e) => {
    //     if (!formData.name.trim()) {
    //         setErrors({ ...errors, [e.target.name]: "Name is required" });
    //         return false;

    //     } else {
    //         setErrors({ ...errors, [e.target.name]: "" });
    //         return true;
    //     }
    // }
    // const emailValid = (e) => {
    //     if (!emailReg.test(formData.email)) {
    //         setErrors({ ...errors, [e.target.name]: "Invalid email format, username@example.com" });
    //         return false;

    //     } else {
    //         setErrors({ ...errors, [e.target.name]: "" });
    //         return true;
    //     }
    // }
    // const phoneValid = (e) => {
    //     if (!phoneRegex.test(formData.phone)) {
    //         setErrors({ ...errors, [e.target.name]: "The Egyptian phone number must consist of 11 digits" });
    //         return false;

    //     } else {
    //         setErrors({ ...errors, [e.target.name]: "" });
    //         return true;
    //     }
    // }
    // const passwordValid = (e) => {
    //     if (!PasswordPattern.test(formData.password)) {
    //         setErrors({ ...errors, [e.target.name]: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character." });
    //         return false;

    //     } else {
    //         setErrors({ ...errors, [e.target.name]: "" });
    //         return true;
    //     }
    // }
    // const passwordConfirmValid = (e) => {
    //     if (formData.password !== formData.confirmPassword) {
    //         setErrors({ ...errors, [e.target.name]: "Passwords do not match" });
    //         return false;

    //     } else {
    //         setErrors({ ...errors, [e.target.name]: "" });
    //         return true;
    //     }
    // }
    //#endregion

    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!emailReg.test(formData.email)) { newErrors.email = "Invalid email format, username@example.com"; }
        if (!phoneRegex.test(formData.phone)) newErrors.phone = "The Egyptian phone number must consist of 11 digits";
        if (!PasswordPattern.test(formData.password)) newErrors.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            AddNewUser(formData).then(() => {
                // alert("Form submitted successfully! ✅");
            }).catch((error) => {
                // console.error("Error during form submission:", error);
                alert(t('Something went wrong. Please try again.'));
            });
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
            });
            alert(t('Form submitted successfully, You can log in now! ✅'));
            navigate('/login');
        }

    };

    return (
        <div className="relative bg-second dark:bg-second-dark flex items-center h-screen">

            <div className={`h-screen absolute top-0 left-0 md:relative bg-white dark:bg-black shadow-lg sm:w-130 w-[90%] flex flex-col justify-center items-center p-5 ${language === 'ar' ? 'rounded-l-4xl' : 'rounded-r-4xl'}`}>
                <div className='text-center text-gray-600 flex flex-col justify-center items-center'>
                    <img src={assets.logo} alt='pcb' />
                    <p className='text-lg'>{t('Create your personal account')}</p>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col w-full gap-3 mt-4 mb-4 items-end'>
                    {/* Full Name Field */}
                    <div className='flex flex-col w-full'>
                        <label
                            htmlFor="name"
                            className={`text-gray-600  block text-sm`}>{t('Full Name')}</label>
                        <input
                            value={formData.name}
                            id='name'
                            name="name"
                            type='text'
                            onChange={(e) => { handleChange(e); }}
                            className={`w-full rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark font-[400] dark:text-white`} />
                        {errors.name && <span className="text-red-500 text-[.6rem]">{t(errors.name)}</span>}
                    </div>
                    {/* Email Field */}
                    <div className='flex flex-col w-full'>
                        <label
                            htmlFor="email"
                            className={`text-gray-600  block text-sm`}>{t('Email')}</label>
                        <input
                            value={formData.email}
                            id='email'
                            name="email"
                            type='text'
                            onChange={(e) => { handleChange(e); }}
                            className={`w-full rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark font-[400] dark:text-white`} />
                        {errors.email && <span className="text-red-500 text-[.6rem]">{t(errors.email)}</span>}
                    </div>
                    {/* Email Field */}
                    <div className='flex flex-col w-full'>
                        <label
                            htmlFor="phone"
                            className={`text-gray-600  block text-sm`}>{t('Phone')}</label>
                        <input
                            id='phone'
                            value={formData.phone}
                            name="phone"
                            type='tel'
                            onChange={(e) => { handleChange(e); }}
                            className={`w-full rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark font-[400] dark:text-white`} />
                        {errors.phone && <span className="text-red-500 text-[.6rem]">{t(errors.phone)}</span>}
                    </div>
                    {/* Password Field */}
                    <div className='flex flex-col w-full'>
                        <label
                            htmlFor="password"
                            className={`text-gray-600  block text-sm`}>{t('Password')}</label>
                        <div className='relative'>
                            {
                                hiddenPassword ?
                                    <>
                                        <input
                                            value={formData.password}
                                            id='password'
                                            type='password'
                                            name='password'
                                            onChange={(e) => { handleChange(e); }}
                                            className={`w-full rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark font-[400] dark:text-white`} />
                                        <img src={assets.eye} width='22' className={`absolute leading-2 bottom-[50%]  translate-y-[50%] ${language === 'ar' ? 'left-3' : 'right-3'}`} onClick={() => setHiddenPassword(false)} />
                                    </>
                                    :
                                    <>
                                        <input
                                            value={formData.password}
                                            id='password'
                                            name='password'
                                            type='text'
                                            onChange={(e) => { handleChange(e); }}
                                            className={`w-full rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark font-[400] dark:text-white`} />
                                        <img src={assets.view} width='22' className={`absolute leading-2 bottom-[50%]  translate-y-[50%] ${language === 'ar' ? 'left-3' : 'right-3'}`} onClick={() => setHiddenPassword(true)} />
                                    </>
                            }

                        </div>
                        {errors.password && <span className="text-red-500 text-[.6rem]">{t(errors.password)}</span>}
                    </div>
                    {/* Confirm password Field */}
                    <div className='flex flex-col w-full'>
                        <label
                            htmlFor="confirmPass"
                            className={`text-gray-600  block text-sm`}>{t('Confirm password')}</label>
                        <div className='relative'>
                            {
                                hiddenConfirmPassword ?
                                    <>
                                        <input
                                            id='confirmPass'
                                            value={formData.confirmPassword}
                                            name="confirmPassword"
                                            type='password'
                                            onChange={(e) => { handleChange(e); }}
                                            className={`w-full rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark font-[400] dark:text-white`} />
                                        <img src={assets.eye} width='22' className={`absolute leading-2 bottom-[50%]  translate-y-[50%] ${language === 'ar' ? 'left-3' : 'right-3'}`} onClick={() => setHiddenConfirmPassword(false)} />
                                    </>
                                    :
                                    <>
                                        <input
                                            id='confirmPass'
                                            value={formData.confirmPassword}
                                            name="confirmPassword"
                                            type='text'
                                            onChange={(e) => { handleChange(e); }}
                                            className={`w-full rounded-xl outline-0 caret-main p-2 bg-second dark:bg-second-dark font-[400] dark:text-white`} />
                                        <img src={assets.view} width='22' className={`absolute leading-2 bottom-[50%]  translate-y-[50%] ${language === 'ar' ? 'left-3' : 'right-3'}`} onClick={() => setHiddenConfirmPassword(true)} />
                                    </>
                            }

                        </div>
                        {errors.confirmPassword && <span className="text-red-500 text-[.6rem]">{t(errors.confirmPassword)}</span>}
                    </div>
                    <input type="submit" value={t('Submit')} className={` w-fit  bg-transparent border text-main  font-bold py-2 px-4 rounded-xl opacity-90 transition hover:bg-main hover:opacity-100 hover:text-white dark:hover:text-black `}
                    />
                </form>

                <div className='text-center text-gray-600 text-base'>
                    <p>{t('Create')} <Link to='/'><u className='text-blue-600'>{t('Company account')}</u></Link></p>
                    <p>{t('Already have an account?')}<Link to='/login'><u className='text-blue-600'>{t('login here')}</u></Link></p>
                </div>
            </div>
            <div className='w-full md:w-3/5 h-full overflow-hidden flex items-center '>
                <img src={assets.sign} />
            </div>

        </div>

    )
}

export default SignForm
