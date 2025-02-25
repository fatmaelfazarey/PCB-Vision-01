import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import HistoryComponent from '../Components/History Component/HistoryComponent';

const History = () => {

    const { userId, history, userHistoryLoading, userHistoryError } = useContext(AppContext);

    // const historyLength = history.length;
    // Loading state
    // if (userHistoryLoading) {
    //     return <div className='max-w-screen-xl mx-auto flex flex-col w-full h-full'>
    //         <div className=' bg-second dark:bg-second-dark p-2 sm:p-5  w-full  '>
    //             <p className='p-2 bg-white dark:bg-black'> Loading history...</p>
    //         </div>
    //     </div>;
    // }

    // Error state
    if (userHistoryError) {

        return <div className='max-w-screen-xl mx-auto flex flex-col w-full h-full'>
            <div className=' bg-second dark:bg-second-dark p-2 sm:p-5  w-full  '>
                <div

                    className='bg-white dark:bg-black  rounded-xl w-full h-full flex flex-col items-center justify-center gap-2'>
                    <img src={assets.not_found} alt="empty" title='click to add history' className='w-full' />
                    <p className='p-2 bg-white dark:bg-black'> Error: {userHistoryError}</p>
                </div>
              
            </div>
        </div>;
    }

    //        {/* <pre>{JSON.stringify(history, null, 2)}</pre> */}
    return (
        <div className='max-w-screen-xl mx-auto flex flex-col w-full h-full fixed_direction'>
            <div className='flex justify-between items-center w-full'>
                <u className='text-lg font-[400] text-[#777777]'>History</u>
                <p className='text-lg font-[400] text-[#777777]'>{history && history.length} Boards</p>
            </div>
            {userHistoryLoading ?
                <div className=' bg-second dark:bg-second-dark p-2 sm:p-5  w-full  h-full'>
                    <p className='p-2 sm:p-5 bg-white dark:bg-black rounded-xl'> Loading history...</p>
                </div> :
                <div className=' bg-second dark:bg-second-dark p-2 sm:p-5  w-full  h-full'>
                    {history && history.length > 0 ? (
                        <div className=' w-full flex flex-col gap-5'>

                            {
                                history.map((items, index) => (
                                    <div key={index}>
                                        <HistoryComponent defects={items.defects} image1={items.image1} image2={items.image2} id={items.id} userId={items.userId} />
                                    </div>))
                            }
                        </div>
                    ) : (
                        <Link
                            to={`/main/${userId}`}
                            className='bg-white dark:bg-black  rounded-xl w-full h-full flex flex-col items-center justify-center gap-2'>
                            <img src={assets.empty} alt="empty" title='click to add history' />
                            <h1 title='click to add history' >No history...</h1>
                        </Link>
                    )}
                </div>}
        </div>

    );
};

export default History;
