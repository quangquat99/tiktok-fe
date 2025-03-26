import React, { useState } from 'react';
import axios from 'axios';

const UploadImagesForm = ({ accessToken }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!images.length) {
            alert('Vui lòng chọn ảnh!');
            return;
        }

        const formData = new FormData();
        images.forEach((image) => formData.append('images', image));
        formData.append('accessToken', accessToken);

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8088/tiktok/upload-multiple-images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Tải ảnh thành công: ' + response.data);
        } catch (error) {
            console.error(error);
            alert('Tải ảnh thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto border rounded shadow-md mt-10">
            <h4 className="text-xl font-bold mb-4">Upload ảnh (nhiều ảnh) lên TikTok</h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Đang tải...' : 'Upload to TikTok'}
                </button>
            </form>
        </div>
    );
};

export default UploadImagesForm;
