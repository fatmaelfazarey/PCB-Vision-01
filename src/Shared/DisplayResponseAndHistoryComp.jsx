import React from 'react'
import { aboutDefects } from '../assets/assets';

const DisplayResponseAndHistoryComp = (props) => {
    let noDefects = false;

    const ShowDefectsInfo = (defects) => {
        if (Object.keys(defects).length === 0) {
            noDefects = true;
            return <p className='w-full text-center dark:text-white'>No Defects</p>;
        }

        return Object.entries(defects).map(([defectName, defectPoints], idx) => (
            notReapetAboutDefect(getOnlyLetters(defectName)) &&
            (<div key={idx} className='w-[100%] mb-4'>
                <h1 className='text-xl font-semibold text-title'>Defect Name : {defectName}</h1>
                <u className='text-lg font-[400] text-[#777777]'>About  {defectName}</u>
                <p className='text-lg font-[400]  text-title'>
                    {aboutDefects[defectName]}
                </p>
            </div>)
        ));
    };

    const getOnlyLetters = (input) => {
        const lettersArray = input.match(/[a-zA-Z]+/g);
        return lettersArray ? lettersArray.join('') : '';
    };
    const defectsName = new Set();
    const notReapetAboutDefect = (name) => {
        if (defectsName.has(name)) {
            return false
        } else {
            defectsName.add(name);
            return true;
        }

    }

    const ShowComponentsInfo = (components) => {
        if (Object.keys(components).length === 0) {
            noDefects = true;
            return <p className='w-full text-center text-lg font-[400] text-[#777777]'>{t('No Components')}</p>;
        }

        return Object.entries(components).map(([componentsName, componentsPoints], idx) => (
            <div key={idx} className='w-[100%] mb-4'>
                <h1 className='text-xl font-semibold text-title'>{idx + 1}-Component Name: {componentsName}</h1>
            </div>
        ));
    };

    const drowDefects = (defects) => {
        if (!defects || Object.keys(defects).length === 0) {
            return null;
        }
        // { "Short": [200, 100, 220, 120], "Open Cricut": [100, 120, 120, 140], "Spur": [220, 190, 250, 210], "Spur": [90, 200, 110, 210], "Short0": [50, 50, 80, 80], "Spur4": [257, 20, 280, 30], "Spur1": [150, 150, 170, 180] },

        return Object.entries(defects).map(([defectName, defectPoints], idx) => {
            const [x1, y1, x2, y2] = defectPoints;

            return (
                <>
                    <rect
                        x={x1}
                        y={y1}
                        width={x2 - x1}
                        height={y2 - y1}
                        stroke='yellow'
                        strokeWidth="1"
                        fill="none"
                    />
                    <text x={x1} y={y1 - 3} fill="yellow" fontSize="10" fontWeight='400'>{getOnlyLetters(defectName)}</text>
                </>
            );
        });
    };

    return (
        <>
            <div className={`defects_model w-full flex flex-col lg:flex-row justify-between`}>
                {props.image1 && (

                    <div className='lg:w-[50%] w-full'>
                        {ShowDefectsInfo(props.defects)}
                    </div>
                )}
                {props.image1 && (
                    <div className='lg:w-[50%] w-full  md:items-end overflow-x-scroll scrollHedden'>
                        <div className={`relative w-[400px] min-w-24 overflow-x-scroll scrollHedden float-none lg:float-right `} id='image1'>
                            <div className='w-fit h-fit'>
                                <svg width="100" height="100" className='absolute top-0 left-0 w-full h-full'>
                                    {drowDefects(props.defects)}
                                </svg>
                                <img src={props.image1} alt='pcb' />
                            </div>
                        </div>
                    </div>

                )}
            </div>
            <div className={`components_model  w-full flex flex-col lg:flex-row justify-between`}>
                {props.image2 && (
                    // <div className='lg:w-[50%] w-full'>
                    //     {ShowComponentsInfo(props.components || { "Short": [200, 100, 220, 120], "Open Cricut": [100, 120, 120, 140], "Spur": [220, 190, 250, 210], "Spur0": [90, 200, 110, 210], "Short0": [50, 50, 80, 80], "Spur4": [257, 20, 280, 30], "Spur1": [150, 150, 170, 180] })}
                    // </div>
                    <u className='text-lg font-[400] text-[#777777]'>Components</u>
                )}
                {props.image2 && (
                    <div className='lg:w-[50%] w-full  md:items-end overflow-x-scroll scrollHedden'>
                        <div className="relative w-[400px] min-w-24 overflow-x-scroll scrollHedden  float-none lg:float-right" id='image1'>
                            <div className='w-fit h-fit'>
                                <svg width="100" height="100" className='absolute top-0 left-0 w-full h-full'>

                                    {drowDefects(props.components || { "Short": [200, 100, 220, 120], "Open Cricut": [100, 120, 120, 140], "Spur": [220, 190, 250, 210], "Spur0": [90, 200, 110, 210], "Short0": [50, 50, 80, 80], "Spur4": [257, 20, 280, 30], "Spur1": [150, 150, 170, 180] })}
                                </svg>
                                <img src={props.image2} alt='pcb' />
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </>


    )
}

export default DisplayResponseAndHistoryComp
