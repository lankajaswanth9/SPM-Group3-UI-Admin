// UserWorkouts.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './userworkout.css';
import DetailedView from './Detailedview';

const UserWorkouts = () => {
    const [groupedWorkouts, setGroupedWorkouts] = useState({});
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkoutExerciseDetails();
    }, []);

    const fetchWorkoutExerciseDetails = async () => {
        setLoading(true);
        try {
            const detailsRes = await fetch('http://localhost:3000/admin/allWorkoutExercises', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const detailsData = await detailsRes.json();
    
            const workoutDetails = {};
            // Temporarily store fetched exercise details to avoid refetching
            const exerciseDetailsCache = {};
    
            for (const detail of detailsData) {
                if (!workoutDetails[detail.workout_id]) {
                    const workoutRes = await fetch(`http://localhost:3000/admin/workouts/${detail.workout_id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    const workoutData = await workoutRes.json();
                    workoutDetails[detail.workout_id] = { ...workoutData, exercises: [] };
                }
    
                // Check if exercise details have already been fetched
                if (!exerciseDetailsCache[detail.exercise_id]) {
                    const exerciseRes = await fetch(`http://localhost:3000/admin/exercises/${detail.exercise_id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    const exerciseData = await exerciseRes.json();
                    exerciseDetailsCache[detail.exercise_id] = exerciseData;
                }
    
                // Add exercise details to the workout, leveraging the cache
                workoutDetails[detail.workout_id].exercises.push({
                    detail_id: detail.detail_id,
                    sets: detail.sets,
                    reps: detail.reps,
                    weight: detail.weight,
                    ...exerciseDetailsCache[detail.exercise_id],
                });
            }
    
            setGroupedWorkouts(workoutDetails);
        } catch (error) {
            console.error('Error fetching workout exercise details:', error);
        } finally {
            setLoading(false);
        }
    };
    

    const handleViewClick = (exerciseDetail) => {
        setSelectedExercise(exerciseDetail);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (selectedExercise) {
        return <DetailedView exercise={selectedExercise} onBackClick={() => setSelectedExercise(null)} />;
    }


    return (
        <div className="user-workouts-page">
            <Navbar />
            <div>  <button className="add-button">
        <Link to="/add-workout">Add Workout</Link>
      </button></div>
            <div className="workouts-list">
                {Object.values(groupedWorkouts).map(workout => (
                    <div key={workout.workout_id} className="workout-item">
                        <div className="workout-header">
                            <h3>{workout.workout_name}</h3>
                            <button className="edit-button" onClick={() => handleEditWorkout(workout.workout_id)}>Edit</button>
                        </div>
                        <div className="exercises-list">
                            {workout.exercises.map((exerciseDetail, index) => (
                                <div key={index} className="exercise-detail">
                                    <img src={exerciseDetail.logo} alt={exerciseDetail.exerciseTitle} />
                                    <div>
                                        <h4>{exerciseDetail.title}</h4>
                                        <p><b>Category: </b>{exerciseDetail.category}</p>
                                        <p><b>Sets:</b> {exerciseDetail.sets}</p>
                                        <p><b>Reps:</b> {exerciseDetail.reps}</p>
                                        <p><b>Weight:</b> {exerciseDetail.weight}</p>
                                    </div>
                                
                                    <button className="view-button" onClick={() => handleViewClick(exerciseDetail)}>View</button>
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
