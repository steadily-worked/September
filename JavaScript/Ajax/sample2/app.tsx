import React, { useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get('http://localhost:8000/comments');
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="App"/>
    )
}
