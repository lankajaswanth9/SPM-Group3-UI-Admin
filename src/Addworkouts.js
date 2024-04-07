import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Addworkouts.css'

function AddPredefinedWorkout() {
  const [workout_name, setWorkoutName] = useState('');
  const [workout_date, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [exercisesList, setExercisesList] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([
    { exercise_id: '', sets: 1, reps: 1, weight: 0 },
  ]);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await axios.get('http://localhost:3000/admin/exercises');
        setExercisesList(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    }
    fetchExercises();
  }, []);

  const handleWorkoutChange = (e) => {
    setWorkoutName(e.target.value);
  };

  const handleDateChange = (e) => {
    setWorkoutDate(e.target.value);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...workoutExercises];
    updatedExercises[index][field] = value;
    setWorkoutExercises(updatedExercises);
  };

  const addExerciseField = () => {
    setWorkoutExercises([...workoutExercises, { exercise_id: '', sets: 1, reps: 1, weight: 0 }]);
  };

  const removeExerciseField = (index) => {
    const updatedExercises = workoutExercises.filter((_, i) => i !== index);
    setWorkoutExercises(updatedExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJsYW5rajAxQHBmdy5lZHUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTE3MjUyMjB9.u8vdK1HALZkXcz3VcaPgzwsWGWxOneWCj_zGaZnOy8Q'; // Move token here
    try {
      const workoutResponse = await axios.post(
        'http://localhost:3000/admin/saveWorkout',
        { 
          workout_name: workout_name, 
          workout_date: workout_date,
          notes: '', // Set the note field to an empty string or any default value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const workout_id = workoutResponse.data.workout_id;

      for (const exerciseDetail of workoutExercises) {
        await axios.post('http://localhost:3000/admin/saveWorkoutExerciseLinkage', {
          sets: exerciseDetail.sets,
          reps: exerciseDetail.reps,
          weight: exerciseDetail.weight,
          workout_id: workout_id,
          exercise_id: exerciseDetail.exercise_id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      alert('Workout and exercises saved successfully!');
      // Optionally reset form here
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="workout-form-container">
      <form onSubmit={handleSubmit} className="workout-form">
        <div className="input-field">
          <label htmlFor="workout_name">Workout Name</label>
          <input id="workout_name" type="text" value={workout_name} onChange={handleWorkoutChange} />
        </div>
        <div className="input-field">
          <label htmlFor="workout_date">Workout Date</label>
          <input id="workout_date" type="date" value={workout_date} onChange={handleDateChange} />
        </div>
        {/* Exercise fields and buttons go here */}
        {workoutExercises.map((exercise, index) => (
          <div key={index} className="exercise-field">
            <select value={exercise.exercise_id} onChange={(e) => handleExerciseChange(index, 'exercise_id', e.target.value)}>
              <option value="">Select Exercise</option>
              {exercisesList.map(ex => (
                <option key={ex.exercise_id} value={ex.exercise_id}>{ex.title}</option>
              ))}
            </select>
            <input type="number" placeholder="Sets" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)} />
            <input type="number" placeholder="Reps" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)} />
            <input type="number" placeholder="Weight" value={exercise.weight} onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)} />
            {workoutExercises.length > 1 && (
              <button type="button" className="remove-exercise-btn" onClick={() => removeExerciseField(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-exercise-btn" onClick={addExerciseField}>Add Exercise</button>
        <button type="submit" className="save-workout-btn">Save Workout</button>
      </form>
    </div>
  );
}

export default AddPredefinedWorkout;
