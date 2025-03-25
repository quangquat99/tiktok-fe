import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Callback = () => {
    const [response, setResponse] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8088/callback')
            .then(res => setResponse(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ paddingLeft: '20%' }}>
            <h2>Callback Page</h2>
            <p>Response from /callback API: {response}</p>
        </div>
    );
};

export default Callback;