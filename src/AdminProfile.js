// AdminProfile.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminProfile = () => {
    const profileStyle = {
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
    };

    const headingStyle = {
        fontSize: '24px',
        margin: '20px 0'
    };

    return (
        <div style={profileStyle}>
            <h1 style={headingStyle}>Admin Profile</h1>
            {/* Display admin profile information here */}
            <div>
                {/* Other profile information */}
            </div>
            <Link to="/">Return to Landing Page</Link>
        </div>
    );
};

export default AdminProfile;
