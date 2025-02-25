import React, { useContext, useState } from 'react'
import SecondHeader from '../Shared/SecondHeader';
import UploadPCB from '../Components/Main Component/UploadPCB';
import Response from '../Components/Main Component/Response';
import { AppContext } from '../Context/AppContext';

const Main = () => {
    const { userId } = useContext(AppContext);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const [reesponseData, setResponseData] = useState();
    return (
        <div className='pl-2.5 pr-2.5'>
            <SecondHeader navigateTo={`/profile/${userId}`} />
            <UploadPCB />
            {/* <UploadPCB loading={loading} error={error} setLoading={setLoading} setError={setError} setResponseData={setResponseData} /> */}
            {/* <Response loading={loading} error={error} reesponseData={reesponseData} /> */}
        </div>
    )
}

export default Main
