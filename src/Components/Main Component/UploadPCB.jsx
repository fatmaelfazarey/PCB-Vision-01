import React, { useState, useEffect, useContext } from 'react';
import AddPCBImage from '../../Shared/AddPCBImage';
import { AppContext } from '../../Context/AppContext';
import { AddNewPCB } from '../../Services/AddNewPCB';

import Response from './Response';
const UploadPCB = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reesponseData, setResponseData] = useState();
    const { userId, t } = useContext(AppContext);

    // console.log(userId);
    //#region remove fakeResponse[getRandomNumber()] from defects when call backend
    const fakeResponse = [
        {},
        { "Short": [200, 100, 220, 120], "Open Cricut": [100, 120, 120, 140], "Spur": [220, 190, 250, 210], "Spur_0": [90, 200, 110, 210], "Mouse Bite": [50, 50, 80, 80], "Spur_1": [257, 20, 280, 30], "Spur_2": [150, 150, 170, 180] },
        { "Short": [100, 100, 130, 130], "Spur": [150, 120, 170, 140], "Spur_1": [180, 110, 200, 125] },
        { "Spur": [150, 120, 170, 140], "Spur_1": [50, 120, 70, 140] },
        { "Spurious": [50, 70, 70, 100], "Missing Hole": [150, 120, 170, 140], "Spurious_1": [150, 20, 170, 50], "Missing Hole_1": [250, 150, 270, 190] }

    ]
    function getRandomNumber() {
        return Math.floor(Math.random() * 5);
    }

    //#endregion
    const [formData, setFormData] = useState({
        image1: '',
        image2: '',
        userId: '',
        defects: fakeResponse[getRandomNumber()]
    });

    const handleImageUpload = (fieldName, value) => {
        setFormData(prevState => {
            const updatedState = { ...prevState, [fieldName]: value };
            // console.log("Updated FormData:", updatedState);
            return updatedState;
        });
    };

    const resetForm = () => {
        window.location.reload();
    };

    useEffect(() => {
        setFormData(prevState => ({ ...prevState, userId: userId }));
    }, [userId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.userId) {
            if (formData.image1 || formData.image2) {
                AddNewPCB(formData, userId, setLoading, setError).then((res) => {
                    setResponseData(res);
                    // alert(t('The response was obtained successfully'));
                    // console.log(res);
                }).catch((error) => {
                    alert(t('Something went wrong. Please try again.'));
                });
            } else {
                alert(t('Unacceptable value. Try again'));
            }
        }
        else {
            alert(t('Sorry, an error occurred. Try again later'));
        }
    }
    return (
        <>
            <form className='max-w-screen-xl mx-auto mt-7 mb-7 flex flex-col gap-3 w-full' onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row  gap-3 w-full items-center justify-center">
                    <AddPCBImage image='image1' onImageUpload={handleImageUpload} />
                    <AddPCBImage image='image2' onImageUpload={handleImageUpload} />
                </div>
                <div className="flex flex-row gap-3 w-full items-center justify-evenly">
                    <input
                        type='reset'
                        value={t('Reset')}
                        onClick={resetForm}
                        className={`bg-white dark:bg-black text-main border font-bold py-2 px-4 rounded-xl transition hover:bg-main hover:opacity-100 hover:text-white hover:dark:text-black `}
                    />
                    <input
                        type='submit'
                        value={t('Submit')}
                        className={` mr-2 border bg-main text-white dark:text-black font-bold py-2 px-4 rounded-xl opacity-90 transition hover:bg-main hover:opacity-100 `}
                    />
                </div>
            </form>
            <Response loading={loading} error={error} reesponseData={reesponseData} />
        </>

    );
};

export default UploadPCB;
