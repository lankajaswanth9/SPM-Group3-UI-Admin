import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import './DetailedViewworkout.css'; 

const DetailedView = () => {
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const { workoutId } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const response = await fetch(`http://3.14.144.6:3000/admin/workoutsWithExercises/${workoutId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const workoutData = await response.json();
        
        console.log('Workout Details:', workoutData);
  
        setWorkoutDetails(workoutData);
      } catch (error) {
        console.error('Error fetching workout details:', error);
      }
    };
    fetchWorkoutDetails();
  }, [workoutId, token]);
  

  if (!workoutDetails) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="user-workouts-page">
      <Navbar />
      <div className="workout-details-container">
        <h1 className='Name'>{workoutDetails.workout_name}</h1>
        <div className='Description'><b>Description:   </b>{workoutDetails.notes}</div>
        <div className="exercises-list">
          {workoutDetails.exercises.map((exercise, index) => (
            <div key={index} className="exercise-detail">
              <img src={exercise.exercise.exercise_picture} alt={exercise.title} />
              <div>
                <h4>{exercise.exercise.title}</h4>
                <div>
                  <p><b>Sets:</b> {exercise.sets}</p>
                  <p><b>Reps:</b> {exercise.reps}</p>
                  <p><b>Weight:</b> {exercise.weight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
