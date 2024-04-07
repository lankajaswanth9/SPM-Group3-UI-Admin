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

    
    const userIconImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69qXPjYQwiZ4eJZJKIG6IORvrM-g7hm4h7A&usqp=CAU';

  
    const userDataImageUrl = 'https://static.vecteezy.com/system/resources/previews/005/419/001/original/illustration-of-customer-data-user-data-customer-analytic-user-personal-data-costumer-statistic-can-be-used-for-web-landing-page-social-media-mobile-apps-animation-etc-vector.jpg';
    const dashboardImageUrl = 'https://cdn1.vectorstock.com/i/1000x1000/79/10/cartoon-color-characters-people-build-dashboard-vector-35307910.jpg';
    const editWorkoutsImageUrl = 'https://previews.123rf.com/images/gmast3r/gmast3r1912/gmast3r191200926/135660953-santa-claus-doing-exercises-on-stepper-treadmill-people-training-workout-healthy-lifestyle-concept.jpg';
    const reportsImageUrl = 'https://t3.ftcdn.net/jpg/01/34/35/86/360_F_134358697_bWE6vHPDP2Z3lma65Khv9O1hnCwCJb5l.jpg';

    return (
        <div style={pageStyle}>
            {/* Navbar Section */}
            <nav style={navStyle}>
                <div className='Logo'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaQfALhECwtR_ZlrM6zvAJ7z0G3pvq4L-R1w&usqp=CAU" alt="Logo" style={{width: '60px', height: '60px', marginLeft: '20px',}} />
                </div>
                <h2 style={centerText}>Tracker Hacker</h2>
                <div>
                    <div 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}
                        style={{ position: 'relative' }}
                    >
                        <Link to="/adminprofile" style={navItemStyle}>
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
                        {showAdminProfile && (
                            <div style={{ 
                                position: 'absolute', 
                                top: '100%', 
                                left: 0, 
                                backgroundColor: '#fff', 
                                padding: '10px', 
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                borderRadius: '5px', 
                            }}>
                                <p>Admin Profile</p>
                            </div>
                        )}
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
                        <p style={imageNameStyle}>View Users Data</p>
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
                        <p style={imageNameStyle}>Edit Ecercises</p>
                    </div>
                    <div style={imageItem}>
                        <Link to="/reports" style={navItemStyle}>
                            <img 
                                src={reportsImageUrl} 
                                alt="Reports" 
                                style={imageStyle} 
                            />
                        </Link>
                        <p style={imageNameStyle}>View Reports</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
