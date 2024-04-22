/**
 * LandingPage component is a functional React component that renders the landing page of the application.
 * It displays a navigation bar, a header section, and a section with images that link to different parts of the application.
 * 
 * State:
 * - showAdminProfile: A boolean state that determines whether the admin profile link tooltip is shown. It is initially set to false.
 * 
 * Functions:
 * - handleMouseEnter: A function that sets the `showAdminProfile` state to true after a delay of 1000 milliseconds, indicating the user has hovered over the admin profile link.
 * - handleMouseLeave: A function that sets the `showAdminProfile` state to false, indicating the user has moved the cursor away from the admin profile link.
 * 
 * Styling:
 * The component uses inline styles for various elements, including the page background, navigation bar, header, and image items.
 * 
 * Navigation:
 * - The navigation bar includes a logo, the application's name, and a user icon that links to the admin profile. Hovering over the user icon displays a tooltip with "Admin Profile".
 * 
 * Content Sections:
 * - The header displays the title "WEIGHT LIFTING TRACKER".
 * - Below the header, there's a section with images linking to different parts of the application, such as user data, dashboard, editing workouts, and viewing reports.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [showAdminProfile, setShowAdminProfile] = useState(false);

    const handleMouseEnter = () => {
        setTimeout(() => {
            setShowAdminProfile(true);
        }, 1000);
    };

    const handleMouseLeave = () => {
        setShowAdminProfile(false);
    };

    // Add your styling here
    const pageStyle = {
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://t3.ftcdn.net/jpg/01/19/59/74/360_F_119597487_SnvLBdheEGOxu05rMQ5tCzo250cRrTz9.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'fit',
    };

    const headerStyle = {
        marginBottom: '2rem',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#fff',
    };


    const navStyle = {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '1rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 999,
    };

    const navItemStyle = {
        textDecoration: 'none',
        color: '#fff',
        transition: 'color 0.3s ease',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        marginLeft: '1rem',
    };

    const centerText = {
        color: '#fff',
        textAlign: 'center',
    };

    const imagesContainer = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '4rem',
    };

    const imageItem = {
        marginRight: '2rem',
        textAlign: 'center',
        width: '200px', 
        height: '200px', 
        borderRadius: '0%', 
        overflow: 'fit', 
        position: 'relative', 
    };

    const imageStyle = {
        width: '100%', 
        height: '100%', 
        objectFit: 'cover', 
    };

    const imageNameStyle = {
        color: '#fff',
        marginTop: '0.5rem',
    };

    
    const userIconImageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEUAAAD///+rq6tAQECcnJyioqI5OTnf3989PT21tbWMjIzz8/MyMjJMTEwlJSXj4+NYWFjt7e0ODg7GxsZxcXHNzc1iYmIeHh7X19e+vr5RUVGBgYHPz8+pqalpaWkqKioaGhqGhoZ1dXWTk5NdXV2enp4UFBRxXuXKAAAHQUlEQVR4nO2dbUPyPAyFNwEHDJw4RARE8O3//8RHb99gKS47TbuEZ+ezlF6AbZfkpEnC1N1kOF0t5vOn9bvGH3ruH2hwUa9B/289j2vU4062ua77yzxVoGw8CcK3Ltom+1VeXsvzqfj2DlTK/lhXWdtADg0EAZ/bhnErE/sa79tGOaV8K8J3o/EX+q21AODdsm2KPyWAqBswTee+gBdtE9Qp91xu1m0D1KvwArxse/ocXfgQqt0njjTFAV/anjtPtzih9nX0WwsUsNf2zLkqUcKRe7x8VmTZcrO5LcvyfvSp42fcql5rHnqd+n7x55ij0X1ZbpYz95TA58U31wNTsX1DPzAR9ZyL3xgbzLUXvsrOF9HK8SQOrjW3dKS+7GQxTSjiDBroiv5I4f9oWU3oR3+FjOMgDBjlaqS+zMwooZKv8H1qhBB6FKaEEo+bMiL/iU/IKJRQPoKHalOdGrRdUEKPE66wyKYILfKUUMtC4zhtPSCjUMKh9ERhkciDEOGl9ERhPVSnBj0FayYcBCIMk/FBRLb8ETIKJXyUnigskmboCJ3STDgOQ5jfSU8UVkfIk2ZCEn7oCJ2ihDvheeJ6CkR4Iz1RWB0hT5oJtx0hSx1hm1qcPSFJbMoQYqHzIDp/wuuzJ1x1hCxNOsIWNa0SQrG2jrBNnT8hqYMxQ7jbb4qMkSm7qiYQrRCuPstlGAvjY2aS8KcCIWMUHpQWCX/LWwpGMvZCntCvVLVeR8sHo/RgbI5wfvRu+0YvgDKk0QkrgWzG17L6KeSD/DPRCatpT0b5zk8BmI3vkCTnM0aQfWOaMJ0xltSRIUJXwS5jSe3bJuQUO63NELqtD4y5L3LThJwldZjb2PFP2VeW9fUDE6g2UQ1hWgQqN4tOWDrxPpTDlpE/pYgwUPGuKkJR4/a3dBGm9/JvGJ3Q4e841FLcrKONMC2ka5SjE5Ly9KryF9k3jE7IcDt6G7ePpJEwfZZ8w2F1dA2EWJLphEjkPDQhrzuFoDVJKWGaiRXyaiVkxTZYik7I79IkdBD3IHy8BDQ84WJ2SeYgDhOuItj4oaiFFCE1eIaQxEGcEGasl50w8Ytr6V+TjRHGa5pVeNuwIEJSQhBSvp5WiDBurxAowuZHSM6ygQV2i/AgjN4Nxau/kAnCtPQo67VBmC6hhhGWCNMZHBG3QojvGnYI0YO4IUIwfGOJEAvfmCKEdg1bhEj4xhhhOmvcEMEaYZo2DfrbI2y6axgkbLhrWCRsFqEySdgoQmWTMN3wN0YScrFByCqDt02YznbnTsjeM6wS8tM2NgnzBo/DJgmLJodTi4TLXQNAi4QNc/z2CJuGh80RNg7WWCNsHnCzRYiUEZsizJHAtyVCLOVtiPAWS0DZIUSTiGYI4Vb4VgjxZL4RQo8aNxOEM5+iGguEfoVRCOEu7j2QnsVtCGGyjwnoVWqCEtabJuTkVy4EE141qIP1k7/3AiNMenEuhGwScWITcmuEY1SYNk+HShImk1dypxVHDdbhBsmJIISg+LX6QsYZ0ptQi99CzE+qllDME6yUUNDXHZ2QVUEtZglKlBLK2boSnYSyt4ZFJ6w/0voetSuKTljn5Za1yCYKCWVtzok6wlz+TrTohH92jfB3OVGpIrwNcXuIJsIAbT+SFghPXwIe6IJXPYSMJpHQMqSGkBGvuIfOAkoIGaaf3QZzPkcndMZ3GMatjwaYdgkZR+1/TUxtENLel5yj9mcjWquEjKj2l3fcBiG5epNx1P7+VGwQVvoI56v6l/wcg2wQHveCZsQr7n4jrDYILw/fjBHVnh4kgWR2/OA92Q+O3oyo9vYwC2CE8DeD/Fr/x8dXIBohTHpfvztGAUll4bVCmOz2ZZYVDJdd9QxrhpArmTtKOsI2JXOTDrk16uwIySiaCaGssGZCmVvJOsI2JXP/oWZCmTssCeHZ3UPaEbYpmfuAycmoI4yo8yecnz2hzO3x/0fCEJlmTGsRQtLH8uwISV99RYT7sycchyFMJesC/SRDSG4e7wgjinSchgipS0vC4yAj0hUdInwj/p4ApWWgXkUIbxQTknQxVltLCANd8AaIpPyFCKXvW8JFClOwuxKIS0cPISmfwmw0xOHBKB2IJFKoiZWAE3cA42LXSCIfPuYUIh+UsBkA1w3ZqrEqd/LvrCYkvKjODPwHeiDjSBseUFGvMXbcIsdbLWsNLYDLsYFIyO59JA0bhqNKk2fCJprQkYIVlfN17TLTopcjOS2PeXkx6D+Px+un+bu2i396uT7QalpVbwio9/Pyj0FfFovtfD0euM3CqHV97xxNofCKu7h9PHDh/SP2bU+dJ599mm+Rb1M+5m6SAdEocKv40mkvkh557tHRmrHAYrii/lTsW7gay79HBj3Hq5KEf53UPWiSjEF/qnfjl7r/eBL3zj++vHth/YrEmDWoEH1a7an7GnPxgMNWFePsYScN+K7piYez+CqfgqWjVw8X7WuP5DH/AwZIktwhqdryAAAAAElFTkSuQmCC';

  
    const userDataImageUrl = 'https://static.vecteezy.com/system/resources/previews/005/419/001/original/illustration-of-customer-data-user-data-customer-analytic-user-personal-data-costumer-statistic-can-be-used-for-web-landing-page-social-media-mobile-apps-animation-etc-vector.jpg';
    const dashboardImageUrl = 'https://cdn1.vectorstock.com/i/1000x1000/79/10/cartoon-color-characters-people-build-dashboard-vector-35307910.jpg';
    const editWorkoutsImageUrl = 'https://previews.123rf.com/images/gmast3r/gmast3r1912/gmast3r191200926/135660953-santa-claus-doing-exercises-on-stepper-treadmill-people-training-workout-healthy-lifestyle-concept.jpg';
  

    return (
        <div style={pageStyle}>
            {/* Navbar Section */}
            <nav style={navStyle}>
                <div className='Logo'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaQfALhECwtR_ZlrM6zvAJ7z0G3pvq4L-R1w&usqp=CAU" alt="Logo" style={{width: '60px', height: '60px', marginLeft: '20px',}} />
                </div>
                <h2 style={centerText}>Weight Lifting Tracker </h2>
                <div>
                    <div 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}
                        style={{ position: 'relative' }}
                    >
                        <Link to="/" style={navItemStyle}>
                            <img 
                                src={userIconImageUrl} 
                                alt="User Icon" 
                                style={{ 
                                    ...navItemStyle, 
                                    width: '60px', 
                                    height: '60px', 
                                    borderRadius: '50%',
                                    marginRight: '20px',
                                }} 
                            />
                        </Link>
                        
                    
                    </div>
                </div>
            </nav>
            {/* Header Section */}
            <header style={{...headerStyle, width: '100%', textAlign: 'center', marginBottom: '4rem'}}> 
                <h1>WEIGHT LIFTING TRACKER</h1>
            </header>
            {/* Images Section */}
            <div style={centerText}>
                <div style={imagesContainer}>
                    <div style={imageItem}>
                        <Link to="/admin/users" style={navItemStyle}>
                            <img 
                                src={userDataImageUrl} 
                                alt="User Data" 
                                style={imageStyle} 
                            />
                        </Link>
                        <p style={imageNameStyle}>Users Data</p>
                    </div>
                    <div style={imageItem}>
                        <Link to="/userworkouts" style={navItemStyle}>
                            <img 
                                src={dashboardImageUrl} 
                                alt="workouts" 
                                style={imageStyle} 
                            />
                        </Link>
                        <p style={imageNameStyle}>workouts</p>
                    </div>
                    <div style={imageItem}>
                        <Link to="/Workouts" style={navItemStyle}>
                            <img 
                                src={editWorkoutsImageUrl} 
                                alt="Edit Workouts" 
                                style={imageStyle} 
                            />
                        </Link>
                        <p style={imageNameStyle}>Exercises</p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
