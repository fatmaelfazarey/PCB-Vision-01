import React, { useContext } from 'react';
import { aboutDefects } from '../../assets/assets';
import { AppContext } from '../../Context/AppContext';
import DisplayResponseAndHistoryComp from '../../Shared/DisplayResponseAndHistoryComp';

const Response = ({ error, loading, reesponseData }) => {
    const { t } = useContext(AppContext);
    const GetResponseData = reesponseData;

    return (
        <div className='max-w-screen-xl mx-auto bg-second dark:bg-second-dark p-2 sm:p-5 gap-2 fixed_direction'>
            <div className="bg-white dark:bg-black p-2 sm:p-5 rounded-xl flex flex-row justify-between gap-2 ">
                {error ? (
                    <p className='text-red-600 w-full text-center'>{error}</p>
                ) : loading ? (
                    <p className='w-full text-center dark:text-white'>{t('Loading...')}</p>
                ) : (
                    GetResponseData && (
                        <div className='w-full flex flex-col gap-2 sm:gap-4 justify-between '>
                            <DisplayResponseAndHistoryComp defects={GetResponseData.defects} image1={GetResponseData.image1} components={GetResponseData.components} image2={GetResponseData.image2} />
                        </div>
                    )
                )}
            </div>
        </div >
    );
};

export default Response;
