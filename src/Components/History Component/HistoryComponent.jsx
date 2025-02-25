import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets';
import { DeletePCB } from '../../Services/DeletePCB';
import DisplayResponseAndHistoryComp from '../../Shared/DisplayResponseAndHistoryComp';

const HistoryComponent = (props) => {
    const [isHover, setIsHover] = useState(false);
    const handleDelete = async (pcbId, userId) => {
        if (!window.confirm('Do you want to delete this PCB?')) return;
        const success = await DeletePCB(pcbId, userId);
        if (success) {
            // window.location.reload();
        }
    };
    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`bg-white dark:bg-black  p-2 sm:p-5 rounded-xl flex flex-row justify-between gap-2 w-full h-full`}>
            <div className='w-full flex flex-col gap-2 sm:gap-4 justify-between relative'>
                <DisplayResponseAndHistoryComp defects={props.defects} image1={props.image1} components={props.components} image2={props.image2} />
                <div
                    title='Delete'
                    onClick={() => { handleDelete(props.id, props.userId) }}
                    className={`absolute right-[50%] top-[-10px] translate-x[50%] bg-second dark:bg-second-dark  blur(1px) cursor-pointer  p-2 rounded-full shadow-xl ${isHover ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={assets.cancel} width='25' />
                </div>
            </div>
        </div>

    )
}

export default HistoryComponent
