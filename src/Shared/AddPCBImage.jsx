import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';

const AddPCBImage = ({ image, onImageUpload }) => {
    const [uploadImage, setUploadImage] = useState(false);
    const [pcbImage, setPcbImage] = useState();

    const handleImageChange = (event) => {
        const input = event.target;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setPcbImage(e.target.result);
                onImageUpload(image, e.target.result);
            };
        }
    };

    //#region capture image
    const [startVideo, setStartVideo] = useState(false);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false); // State to track if a photo is captured
    const [stream, setStream] = useState(null); // State to store the video stream

    // Access the camera and start the video stream
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setStream(stream); // Save the stream in state
        } catch (err) {
            console.error('Error accessing the camera:', err);
        }
    };

    // Stop the video stream
    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop()); // Stop all tracks in the stream
            setStream(null); // Clear the stream from state
        }
    };

    // Capture a photo from the video stream
    const takePhoto = () => {
        const video = videoRef.current;
        const photo = photoRef.current;

        if (!photo) {
            console.error('Canvas element is not available.');
            return;
        }

        const ctx = photo.getContext('2d');

        // Set canvas dimensions to match the video
        photo.width = video.videoWidth;
        photo.height = video.videoHeight;

        // Draw the current video frame onto the canvas
        ctx.drawImage(video, 0, 0, photo.width, photo.height);

        // Convert the canvas content to a Base64 URL
        const base64Url = photo.toDataURL('image/jpeg');
        setPcbImage(base64Url); // Save the Base64 URL in state
        setHasPhoto(true); // Update state to indicate a photo has been captured

        onImageUpload(image, base64Url);
        stopCamera();    // Stop the video stream after capturing the photo
    };

    // Clear the photo and reset the canvas
    const clearPhoto = () => {
        const photo = photoRef.current;
        const ctx = photo.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, photo.width, photo.height);

        // Reset states
        setPcbImage(null);
        setHasPhoto(false);

    };

    // Start the camera when startVideo is true
    useEffect(() => {
        if (startVideo) {
            startCamera();
        }

        // Cleanup: Stop the camera when the component unmounts or startVideo becomes false
        return () => {
            stopCamera();
        };
    }, [startVideo]); // Run this effect only when startVideo changes
    //#endregion


    return (
        <div className='bg-black dark:bg-white p-2 sm:p-4 w-full sm:w-fit flex flex-col gap-2'>
            <div className='w-full sm:w-[400px] h-[500px] bg-[#0a0a35]'>
                {uploadImage ? (
                    <img src={pcbImage} alt="Uploaded PCB" className='' />
                ) : (
                    <div className='bg-[#0a0a35] w-full h-full'>
                        {startVideo && (
                            <div>
                                <video
                                    ref={videoRef}
                                    style={{ width: '100%', maxWidth: '500px', display: hasPhoto ? 'none' : 'block' }}
                                ></video>
                                <canvas
                                    ref={photoRef}
                                    style={{ display: 'none', width: '100%', maxWidth: '500px' }}
                                ></canvas>
                                {hasPhoto && (
                                    <div>
                                        <img
                                            src={pcbImage}
                                            alt="Captured"

                                            style={{ width: '100%', maxWidth: '500px' }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className={`flex items-center  ${startVideo ? 'justify-center' : 'justify-between'}`}>
                {!uploadImage && !startVideo && (
                    <div
                        onClick={() => setStartVideo(true)}
                        className={`relative p-3 bg-second dark:bg-second-dark rounded-full scale-[.8] sm:scale-100 ${startVideo ? 'hidden' : 'visible'}`}
                    >
                        <img src={assets.camera} className='bg-second dark:bg-second-dark w-10' alt="Camera" />
                    </div>
                )}
                {startVideo && (
                    <button onClick={takePhoto} className='relative p-3 bg-second dark:bg-second-dark rounded-full scale-[.8] sm:scale-100'>
                        <img src={assets.camera} className='bg-second dark:bg-second-dark w-10' alt="Camera" />
                    </button>
                )}
                {!startVideo && (
                    <div className='relative p-3 bg-second dark:bg-second-dark rounded-full scale-[.8] sm:scale-100'>
                        <img src={assets.upload} className='bg-second dark:bg-second-dark w-10 ' alt="Upload" />
                        <input
                            type='file'
                            accept='image/*'
                            name={image}
                            onClick={() => setUploadImage(true)}
                            onChange={handleImageChange}
                            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPCBImage;