import React, { useEffect, useState } from 'react';
import axios from 'axios';


const TIKTOK_CLIENT_KEY = 'sbawh5jwr50tttl4l9'; // Thay bằng client key của bạn
const REDIRECT_URI = 'https://dzew7cvh3rahv.cloudfront.net/callback'; // Redirect URI đã đăng ký trên TikTok
const SCOPES = 'user.info.basic'; // Chọn scope phù hợp


const Home = () => {
    const [response, setResponse] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8088')
            .then(res => setResponse(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleLogin = () => {

        const state = Math.random().toString(36).substring(2, 15);
        const authUrl = `https://www.tiktok.com/v2/auth/authorize/` +
            `?client_key=${TIKTOK_CLIENT_KEY}` +
            `&scope=${encodeURIComponent(SCOPES)}` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            `&state=${state}`;

        window.location.href = authUrl;
    };


    return (
        <div style={{ paddingLeft: '20%' }}>
            <h2>Home Page</h2>
            <p>Response from BE : {response}</p>

            <button
                onClick={handleLogin}
                style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid #D0CBB5',
                    backgroundColor: '#000000',
                    color: '#fff',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.borderColor = '#D0CBB5'}
                onMouseLeave={(e) => e.target.style.borderColor = '#D0CBB5'}
            >
                Login with TikTok
            </button>
        </div>
    );
};

export default Home;