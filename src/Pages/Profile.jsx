import React, { useContext } from 'react'
import SecondHeader from '../Shared/SecondHeader';
import UserInformation from '../Shared/UserInformation';
import History from '../Shared/History';
import { AppContext } from '../Context/AppContext';
const Profile = () => {
    const { userId } = useContext(AppContext);
    return (
        <div className='pl-2.5 pr-2.5'>
            <SecondHeader navigateTo={`/main/${userId}`} />
            <UserInformation />
            <History />
        </div>
    )
}

export default Profile
