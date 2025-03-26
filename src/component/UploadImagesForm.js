import React, { useState, useRef } from 'react';
import axios from 'axios';

const UploadImagesForm = ({ accessToken }) => {
    const [creatorInfo, setCreatorInfo] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();

    const fetchCreatorInfo = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8088/tiktok/query-creator-info',
                null,
                { params: { accessToken } }
            );

            console.log('response : ' + response);
            console.log(typeof response.data);
            setCreatorInfo(JSON.parse(response.data));
        } catch (error) {
            alert('Lỗi khi lấy thông tin creator');
        }
    };

    const handleFileChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleReset = () => {
        setImages([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!images.length) {
            alert('Vui lòng chọn ảnh. Tiêu đề và thẻ tags sẽ được đặt mặc định từ BE.');
            return;
        }

        const formData = new FormData();
        images.forEach((image) => formData.append('images', image));
        formData.append('accessToken', accessToken);

        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8088/tiktok/upload-multiple-images',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
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

            <button
                onClick={fetchCreatorInfo}
                className="bg-green-500 text-white py-2 px-4 rounded mb-4 hover:bg-green-600"
            >
                Lấy thông tin Creator
            </button>

            {creatorInfo && (
                <div className="border p-3 mb-4">
                    <h2 className="font-semibold mb-2">Creator Info (test):</h2>
                    <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto max-h-40">
                        {JSON.stringify(creatorInfo, null, 2)}
                    </pre>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="border p-2 rounded"
                />

                {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`preview-${index}`}
                                className="w-full h-auto rounded border object-cover"
                            />
                        ))}
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Đang tải...' : 'Upload to TikTok'}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadImagesForm;
