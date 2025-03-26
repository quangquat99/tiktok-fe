import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import UploadVideoForm from './UploadVideoForm';
import UploadImagesForm from './UploadImagesForm';

const Callback = () => {
    const [response, setResponse] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const location = useLocation();


    useEffect(() => {
        axios.get('http://localhost:8088/callback')
            .then(res => setResponse(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        const state = queryParams.get('state');

        if (code) {
            // Gửi code về backend để exchange lấy token
            axios.post('http://localhost:8088/tiktok/exchange-token', { code, state })
                .then(response => {
                    console.log('Access token:', response.data);
                    setAccessToken(response.data.access_token)
                })
                .catch(error => {
                    console.error('Error exchanging token:', error);
                });
        }
    }, [location]);

    return (
        <div style={{ paddingLeft: '20%' }}>

            <h2>Callback Page</h2>
            <p>Response from /callback API: {response}</p>

            <UploadVideoForm accessToken={accessToken} />
            <UploadImagesForm accessToken={accessToken} />
            {accessToken && <UploadVideoForm accessToken={accessToken} />}
            {accessToken && <UploadImagesForm accessToken={accessToken} />}
        </div>
    );
};

export default Callback;