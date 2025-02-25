import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const SignComponent = () => {
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);
    const [nameIsHover, setNameIsHover] = useState(false);
    const [phoneIsHover, setphoneIsHover] = useState(false);
    const [emailIsHover, setEmailIsHover] = useState(false);
    const [passwordIsHover, setPasswordIsHover] = useState(false);
    const [confirmIsHover, setConfirmIsHover] = useState(false);
    const navigate = useNavigate();


    const nameValid = (value, toWriteInValidMessage) => {
        value = value.replace(/\s+/g, '');
        if (!value.length) {
            return false;
        } else if (value.length < 5) {
            toWriteInValidMessage.innerHTML = 'Name must be at least 5 characters long';
            return true;
        } else {
            (toWriteInValidMessage || document.getElementById(toWriteInValidMessage)).innerHTML = '';
            return true;
        }
    }

    const phoneValid = (value, toWriteInValidMessage) => {
        value = value.replace(/\s+/g, ''); // remove space
        const phoneRegex = /^01\d{9}$/;
        if (!value.length) {
            return false;
        } else if (!phoneRegex.test(value)) {
            toWriteInValidMessage.innerHTML = 'Invalid phone number';
            return true;
        } else {
            (toWriteInValidMessage || document.getElementById(toWriteInValidMessage)).innerHTML = '';
            return true;
        }
    };

    const emailValid = (value, toWriteInValidMessage) => {
        value = value.replace(/\s+/g, ''); // remove space
        const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!value.length) {
            return false;
        } else if (!emailReg.test(value)) {
            toWriteInValidMessage.innerHTML = 'Invalid Email, username@example.com';
            return true;
        } else {
            (toWriteInValidMessage || document.getElementById(toWriteInValidMessage)).innerHTML = '';
            return true;
        }
    };

    const passwordValid = (value, toWriteInValidMessage) => {
        const PasswordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/);
        if (!value.length) {
            return false;
        } else if (!PasswordPattern.test(value)) {
            toWriteInValidMessage.innerHTML = 'Try a strong password';
            return true;
        } else {
            (toWriteInValidMessage || document.getElementById(toWriteInValidMessage)).innerHTML = '';
            return true;
        }
    };
    const confirmValid = (value, toWriteInValidMessage) => {
        if (value !== document.getElementById('password')) {
            toWriteInValidMessage.innerHTML = 'Password Not Matched';
            return true;
        } else {
            (toWriteInValidMessage || document.getElementById(toWriteInValidMessage)).innerHTML = '';
            return true;
        }
    }
    const formSubmit = (e) => {
        e.preventDefault();
        if (!document.getElementById('invalidName').innerHTML && !document.getElementById('invalidNumber').innerHTML && !document.getElementById('invalidEmail').innerHTML && !document.getElementById('invalidPassword').innerHTML && !document.getElementById('notMatch').innerHTML) {
            alert('Done');
            navigate('/login');
        }

    }
    return (
        <div className='h-screen bg-second flex items-center '>
            <div className="left bg-white w-2/5 h-full flex flex-col justify-center items-center p-6">
                <div className="logo">
                    <img src={assets.logo} alt='pcb' />
                </div>
                <p className='text-lg text-gray-600'>Create your personal account</p>
                <form className='flex flex-col items-end gap-3 w-full mt-5 mb-5' onSubmit={(e) => formSubmit(e)} >
                    <div
                        className='flex flex-col w-full transition'
                        onMouseOut={(e) => { nameValid(e.currentTarget.children[1].value, e.currentTarget.children[2]) ? setNameIsHover(true) : setNameIsHover(false); }}
                        onMouseOver={() => setNameIsHover(true)}>
                        <label
                            htmlFor="name"
                            className={`transition text-gray-600  block  ${nameIsHover ? 'ml-0 text-sm ' : 'ml-3 text-base'}`}>Name</label>
                        <input
                            id='name'
                            type='text'
                            onChange={(e) => nameValid(e.target.value, document.getElementById('invalidName')) ? setNameIsHover(true) : setNameIsHover(false)}
                            className={`transition w-full rounded-xl outline-0 caret-main ${nameIsHover ? 'p-2 h-fit bg-second text-black' : 'p-0 h-1 bg-main-opacity text-main-opacity'}`} />
                        <span
                            id="invalidName"
                            className='text-red-700 text-[.6rem] ml-3 '></span>
                    </div>
                    <div
                        className='flex flex-col w-full transition'
                        onMouseOut={(e) => { phoneValid(e.currentTarget.children[1].value, e.currentTarget.children[2]) ? setphoneIsHover(true) : setphoneIsHover(false); }}
                        onMouseOver={() => setphoneIsHover(true)}>
                        <label
                            htmlFor="phone"
                            className={`transition text-gray-600  block  ${phoneIsHover ? 'ml-0 text-sm' : 'ml-3 text-base'}`}>Phone Number</label>
                        <input
                            type='text'
                            id='phone'
                            onChange={(e) => nameValid(e.target.value, document.getElementById('invalidNumber')) ? setphoneIsHover(true) : setphoneIsHover(false)}
                            className={` transition w-full rounded-xl outline-0 caret-main ${phoneIsHover ? 'p-2 h-fit bg-second' : 'p-0 h-1 bg-main-opacity'}`} />
                        <span id="invalidNumber" className='text-red-700 text-[.6rem] ml-3 '></span>
                    </div>
                    <div className='flex flex-col w-full transition'
                        onMouseOver={() => setEmailIsHover(true)}
                        onMouseOut={(e) => { emailValid(e.currentTarget.children[1].value, e.currentTarget.children[2]) ? setEmailIsHover(true) : setEmailIsHover(false); }}
                    >

                        <label
                            htmlFor="Email"
                            className={`transition text-gray-600  block  ${emailIsHover ? 'ml-0 text-sm' : 'ml-3 text-base'}`}>Email</label>
                        <input
                            type='email'
                            id='Email'
                            onChange={(e) => emailValid(e.target.value, document.getElementById('invalidEmail')) ? setEmailIsHover(true) : setEmailIsHover(false)}
                            className={` transition w-full rounded-xl outline-0 caret-main ${emailIsHover ? 'p-2 h-fit bg-second' : 'p-0 h-1 bg-main-opacity'}`} />

                        <span id="invalidEmail" className='text-red-700 text-[.6rem] ml-3 '></span>
                    </div>
                    <div className='flex flex-col w-full transition'
                        onMouseOver={() => setPasswordIsHover(true)}
                        onMouseOut={(e) => { passwordValid(e.currentTarget.children[1].children[0].value, e.currentTarget.children[2]) ? setPasswordIsHover(true) : setPasswordIsHover(false); }}
                    >
                        <label
                            htmlFor="password"
                            className={`transition text-gray-600  block  ${passwordIsHover ? 'ml-0 text-sm' : 'ml-3 text-base'}`}>Password</label>
                        <div className={`w-full flex flex-col rounded-xl items-end relative ${passwordIsHover ? 'h-fit bg-second' : ' h-1 bg-main-opacity'} overflow-hidden`}>
                            {hiddenPassword ?
                                <>
                                    <input
                                        type='password'
                                        id='password'
                                        onChange={(e) => passwordValid(e.target.value, document.getElementById('invalidPassword')) ? setPasswordIsHover(true) : setPasswordIsHover(false)}
                                        className={` transition w-full rounded-xl outline-0 caret-main ${passwordIsHover ? 'p-2 h-fit bg-second' : 'p-0 h-1 bg-main-opacity'}`} />
                                    <img src={assets.eye} width='25' className={`absolute leading-2 bottom-[50%] right-2 translate-y-[50%] ${passwordIsHover ? 'block' : 'hidden'}`} onClick={() => setHiddenPassword(false)} />
                                </> :
                                <>
                                    <input
                                        type='text'
                                        id='password'
                                        onChange={(e) => passwordValid(e.target.value, document.getElementById('invalidPassword')) ? setPasswordIsHover(true) : setPasswordIsHover(false)}
                                        className={` transition w-full rounded-xl outline-0 caret-main ${passwordIsHover ? 'p-2 h-fit bg-second' : 'p-0 h-1 bg-main-opacity'}`} />
                                    <img src={assets.view} width='25' className={`absolute leading-2 bottom-[50%] right-2 translate-y-[50%] ${passwordIsHover ? 'block' : 'hidden'}`} onClick={() => setHiddenPassword(true)} />

                                </>
                            }
                        </div>

                        <span id='invalidPassword' className='text-red-700 text-[.6rem] ml-3 '></span>
                    </div>
                    <div className='flex flex-col w-full transition'
                        onMouseOver={() => setConfirmIsHover(true)}
                        onMouseOut={(e) => { confirmValid(e.currentTarget.children[1].children[0].value, e.currentTarget.children[2]) ? setConfirmIsHover(true) : setConfirmIsHover(false); }}
                    >
                        <label htmlFor="confirm" className={`transition text-gray-600  block  ${confirmIsHover ? 'ml-0 text-sm' : 'ml-3 text-base'}`}>Confirm password</label>

                        <div className={`w-full flex flex-col rounded-xl items-end relative ${confirmIsHover ? 'h-fit bg-second' : ' h-1 bg-main-opacity'} overflow-hidden`}>
                            {hiddenConfirmPassword ?
                                <>
                                    <input
                                        type='password'
                                        id='confirm'
                                        onChange={(e) => confirmValid(e.target.value, document.getElementById('notMatch')) ? setConfirmIsHover(true) : setConfirmIsHover(false)}
                                        className={` transition w-full rounded-xl outline-0 caret-main ${confirmIsHover ? 'p-2 h-fit bg-second' : 'p-0 h-1 bg-main-opacity'}`} />
                                    <img src={assets.eye} width='25' className={`absolute leading-2 bottom-[50%] right-2 translate-y-[50%] ${confirmIsHover ? 'block' : 'hidden'}`} onClick={() => setHiddenConfirmPassword(false)} />
                                </> :
                                <>
                                    <input
                                        type='text'
                                        id='confirm'
                                        onChange={(e) => confirmValid(e.target.value, document.getElementById('notMatch')) ? setConfirmIsHover(true) : setConfirmIsHover(false)}
                                        className={` transition w-full rounded-xl outline-0 caret-main ${confirmIsHover ? 'p-2 h-fit bg-second' : 'p-0 h-1 bg-main-opacity'}`} />
                                    <img src={assets.view} width='25' className={`absolute leading-2 bottom-[50%] right-2 translate-y-[50%] ${confirmIsHover ? 'block' : 'hidden'}`} onClick={() => setHiddenConfirmPassword(true)} />

                                </>
                            }
                        </div>
                        <span id='notMatch' className='text-red-700 text-[.6rem] ml-3 '></span>
                    </div>
                    <input type="submit" value='Submit' className={` w-fit  bg-main border text-white  font-bold py-2 px-4 rounded-xl opacity-90 transition hover:bg-main hover:opacity-100 `}
                    />
                </form>
                <div className='text-center text-gray-600 text-base'>
                    <p>Create <Link to='/'><u className='text-blue-600'>Company account</u></Link></p>
                    <p>Already have an account? <Link to='/login'><u className='text-blue-600'>login here</u></Link></p>
                </div>
            </div>
            <div className="right w-3/5 h-full overflow-hidden blur-[2px]">
                <img src={assets.sign} alt='pcb' className='w-full' />
            </div>
        </div>
    )
}

export default SignComponent
