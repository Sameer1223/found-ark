import React, { useState, useEffect } from 'react';
import '../../style/Server.css';

function Server() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://lostarkapi.herokuapp.com/server/all')
            .then(response => response.json())
            .then(serverData =>  setData(serverData.data));
    }, [])
    
    if (!data) {
        return (<p>ERROR: Server status is currently not working. Please try again later.</p>)
    }

    return (  
        <div id="serverList">
            {Object.keys(data).map(function(key){
                return <p key={key} className="server">{key}: {data[key]}</p>
            })}
        </div>
    );
}

export default Server;