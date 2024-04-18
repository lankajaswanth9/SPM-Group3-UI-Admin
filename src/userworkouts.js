// UserWorkouts.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './userworkout.css';
import DetailedView from './Detailedview'; 
import { useNavigate } from 'react-router-dom';


const UserWorkouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWorkoutsWithExercises();
    }, []);

    const fetchWorkoutsWithExercises = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3000/admin/workoutsWithExercises', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const workoutsData = await response.json();
            setWorkouts(workoutsData);
        } catch (error) {
            console.error('Error fetching workouts with exercises:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewClick = (exercise) => {
        const exerciseDetails = {
            title: exercise.exercise.title,
            instructions: exercise.exercise.instructions,
            exercise_picture: exercise.exercise.logo 
        };
        setSelectedExercise(exerciseDetails);
    };

    const handleBackClick = () => {
        setSelectedExercise(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    const handleEditClick = (workoutId) => {
        navigate(`/edit-workout/${workoutId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (selectedExercise) {
        return <DetailedView exercise={selectedExercise} onBackClick={handleBackClick} />;
    }
    const handleViewDetails = (workoutId) => {
        navigate(`/workout-details/${workoutId}`); 
    };


    return (
        <div className="user-workouts-page">
            <Navbar />
            <div>  
                <button className="add-button">
                    <Link to="/add-workout">Add Workout</Link>
                </button>
            </div>
            <div className="workouts-list">
                {workouts.map(workout => (
                    <div key={workout.workout_id} className="workout-item">
                        <div className="workout-header">
                            <h3>{workout.workout_name}</h3>
                            <button className="edit-button" onClick={() => handleEditClick(workout.workout_id)}>Edit</button>
                            <button className="view-button" onClick={() => handleViewDetails(workout.workout_id)}>View</button>
                        </div>
                        <div className="exercises-list">
                            {workout.exercises.map((exercise, index) => (
                                <div key={index} className="exercise-detail">
                                    <img src={exercise.exercise.logo} alt={exercise.exercise.title} />
                                    <div>
                                        <h4>{exercise.exercise.title}</h4>
                                        <p><b>Category:</b> {exercise.exercise.category}</p>
                                        <div>
                                        <p><b>Sets:</b> {exercise.sets}</p>
                                        <p><b>Reps:</b> {exercise.reps}</p>
                                        <p><b>Weight:</b> {exercise.weight}</p>
                                    </div>
                                    </div>
                                    <button className="view-button" onClick={() => handleViewClick(exercise)}>View</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserWorkouts;
