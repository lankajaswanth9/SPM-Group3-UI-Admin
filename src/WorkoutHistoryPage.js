import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './WorkoutHistoryPage.css'; 
import Navbar from './Navbar';

const WorkoutHistoryPage = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const { userId } = useParams();
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      try {
        const response = await axios.get(`http://3.14.144.6:3000/admin/allWorkoutHistoryByUser/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const historyWithNamesPromises = response.data.map(async (history) => {
          const workoutResponse = await axios.get(`http://3.14.144.6:3000/admin/workouts/${history.workout_id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          return { ...history, workoutName: workoutResponse.data.workout_name };
        });
        
        const historyWithNames = await Promise.all(historyWithNamesPromises);
        setWorkoutHistory(historyWithNames);
      } catch (error) {
        console.error('Error fetching workout history:', error);
      }
    };

    fetchWorkoutHistory();
  }, [userId, token]);


  const groupWorkoutsByDate = (workouts) => {
    return workouts.reduce((grouped, workout) => {
      const date = new Date(workout.workout_starttime).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(workout);
      return grouped;
    }, {});
  };

  const groupedWorkouts = groupWorkoutsByDate(workoutHistory);
  const noWorkouts = workoutHistory.length === 0;

  return (
    <>
      <Navbar /> {/* This will render the Navbar component */}
      <div className="workout-history-container">
        <h1>Workout History</h1>
        {noWorkouts ? (
          <p>No workouts found for this user.</p> 
        ) : (
          Object.entries(groupedWorkouts).map(([date, workouts]) => (
            <div key={date} className="date-section">
              <h2 className="date-header">{date}</h2>
              <div className="workouts-of-day">
                {workouts.map((workout, index) => (
                  <div className="workout-card" key={index}>
                    <h3>{workout.workoutName}</h3>
                    <p><b>Start Time:</b> {new Date(workout.workout_starttime).toLocaleTimeString()}</p>
                    <p><b>End Time:</b> {new Date(workout.workout_endtime).toLocaleTimeString()}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default WorkoutHistoryPage;
