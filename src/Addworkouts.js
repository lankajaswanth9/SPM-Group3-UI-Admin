import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Addworkouts.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function AddPredefinedWorkout() {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState(''); 

  const [exercisesList, setExercisesList] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([
    { exercise_id: '', sets: 1, reps: 1, weight: 0 },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://3.14.144.6:3000/admin/exercises');
        setExercisesList(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setErrorMessage('Failed to fetch exercises. Please try again later.');
      }
    };

    fetchExercises();
  }, []);

  const handleNotesChange = (e) => {
    setNotes(e.target.value); 
  };


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
    if (!workoutName || workoutExercises.some(ex => !ex.exercise_id)) {
      setErrorMessage('Please fill all required fields.');
      return;
    }
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    const currentDate = new Date().toISOString().split('T')[0];
  
    try {
      const payload = {
        workout_name: workoutName, 
        workout_date: currentDate,
        notes: notes, 
        exercises: workoutExercises.map(ex => ({
          exerciseId: Number(ex.exercise_id),
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight
        }))
      };
  
      const response = await axios.post('http://3.14.144.6:3000/admin/saveWorkout', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Workout and exercises saved successfully!');
      navigate('/userWorkouts');
      setWorkoutName('');
      setWorkoutDate(new Date().toISOString().split('T')[0]);
      setWorkoutExercises([{ exercise_id: '', sets: 1, reps: 1, weight: 0 }]);
    } catch (error) {
      console.error('Failed to save workout:', error);
      if (error.response && error.response.data) {
        alert('Failed to save workout. Error: ' + error.response.data.message);
      } else {
        alert('Failed to save workout. Error: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
    <Navbar />
    <div className="workout-form-container">
      <form onSubmit={handleSubmit} className="workout-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="input-field">
          <label htmlFor="workout_name">Workout Name</label>
          <input id="workout_name" type="text" value={workoutName} onChange={handleWorkoutChange} />
        </div>
        <div className="input-field">
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" value={notes} onChange={handleNotesChange} />
        </div>
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
              <button type="button" onClick={() => removeExerciseField(index)} className="remove-exercise-btn">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addExerciseField} className="add-exercise-btn">Add Exercise</button>
        <button type="submit" disabled={isSubmitting} className="save-workout-btn">
          {isSubmitting ? 'Saving...' : 'Save Workout'}
        </button>
      </form>
    </div>
    </>
  );
}

export default AddPredefinedWorkout;
