

import React, { useEffect, useRef, useState } from 'react';

const CameraCapture = (props) => {
  const videoRef = useRef(null); // Reference for the video element
  const photoRef = useRef(null); // Reference for the canvas element
  const [hasPhoto, setHasPhoto] = useState(false); // State to track if a photo is captured
  const [photoUrl, setPhotoUrl] = useState(null); // State to store the Base64 URL
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

    // Check if the canvas element exists
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
    setPhotoUrl(base64Url); // Save the Base64 URL in state
    setHasPhoto(true); // Update state to indicate a photo has been captured

    // Stop the video stream after capturing the photo
    stopCamera();
  };

  // Clear the photo and reset the canvas
  const clearPhoto = () => {
    const photo = photoRef.current;
    const ctx = photo.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, photo.width, photo.height);

    // Reset states
    setPhotoUrl(null);
    setHasPhoto(false);
  };

  if(props.capture){
    takePhoto();
  }
  useEffect(() => {
    startCamera();
  }, [])

  return (
    <div className='text-yellow-600'>
      {/* Video element to display the camera stream */}
      <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: '500px', display: hasPhoto ? 'none' : 'block' }}
      ></video>

      {/* Button to start the camera */}
      <button onClick={startCamera} style={{ display: hasPhoto ? 'none' : 'block' }}>
        Start Camera
      </button>

      {/* Button to capture a photo */}
      <button onClick={takePhoto} style={{ display: hasPhoto ? 'none' : 'block' }}>
        Take Photo
      </button>

      {/* Canvas element (always rendered but hidden when no photo is captured) */}
      <canvas
        ref={photoRef}
        style={{ display: 'none', width: '100%', maxWidth: '500px' }}
      ></canvas>

      {/* Display the captured image */}
      {hasPhoto && (
        <div>
          {/* <h3>Captured Photo:</h3> */}
          <img
            src={photoUrl}
            alt="Captured"
            style={{ width: '100%', maxWidth: '500px' }}
          />
        </div>
      )}

      {/* Button to clear the photo */}
      {hasPhoto && <button onClick={clearPhoto}>Clear Photo</button>}
      {/* <p>{photoUrl}</p> */}
    </div>
  );
};

export default CameraCapture;