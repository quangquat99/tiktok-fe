import React, { useState } from 'react';
import axios from 'axios';

const UploadVideoForm = ({ accessToken }) => {
    const [videoFile, setVideoFile] = useState(null);


    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!videoFile) {
            alert('Please select a video file');
            return;
        }

        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('accessToken', accessToken);

        try {
            const response = await axios.post('http://localhost:8080/api/tiktok/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('Video uploaded successfully!');
        } catch (error) {
            console.error(error);
            alert('Upload failed!');
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <input type="file" accept="video/mp4" onChange={handleFileChange} />
                <button type="submit" className="ml-4 p-2 bg-blue-500 text-white rounded">
                    Upload to TikTok
                </button>
            </form>
        </div>
    );
};

export default UploadVideoForm;
