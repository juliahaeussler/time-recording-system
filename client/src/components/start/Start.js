import React from 'react';
import { Link } from 'react-router-dom';


const Start = () => {

    return (
        <div>
        <div><Link to={'/signup'}>Benutzer hinzufügen</Link></div>
        <div><Link to={'/login'}>Anmelden</Link></div>
        </div>

    );
}

export default Start;