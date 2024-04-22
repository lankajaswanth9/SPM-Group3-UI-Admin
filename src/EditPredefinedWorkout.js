import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Addworkouts.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function EditPredefinedWorkout() {
  const { workoutId } = useParams();
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDate, setWorkoutDate] = useState('');
  const [exercisesList, setExercisesList] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [notes, setNotes] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchWorkoutData = async () => {
      setIsLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://3.14.144.6:3000/admin/workoutsWithExercises/${workoutId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const workoutData = response.data;

        if (!workoutData) {
          setError('Workout not found.');
          setIsLoading(false);
          return;
        }

        setWorkoutName(workoutData.workout_name);
        setWorkoutDate(workoutData.workout_date);
        setWorkoutExercises(workoutData.exercises || []); 
        setNotes(workoutData.notes); 
      } catch (error) {
        console.error('Error fetching workout data:', error);
        setError('Failed to fetch workout data.');
      }
      setIsLoading(false);
    };

    fetchWorkoutData();
  }, [workoutId]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

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

  const handleWorkoutChange = (e) => {
    setWorkoutName(e.target.value);
  };

  const handleDateChange = (e) => {
    setWorkoutDate(e.target.value);
  };

  const handleExerciseChange = (index, field, value) => {
    setWorkoutExercises(currentExercises => {
      const updatedExercises = [...currentExercises];
  
      if (field === 'exercise_id') {
        const updatedExercise = { 
          ...updatedExercises[index].exercise, 
          [field]: value 
        };
        updatedExercises[index].exercise = updatedExercise;
      } else {
        updatedExercises[index][field] = value;
      }
      
      return updatedExercises;
    });
  };
  
  const addNewExercise = () => {
    const newExercise = {
      exercise: { exercise_id: '', title: '' },
      sets: 1,
      reps: 1,
      weight: 0
    };
    setWorkoutExercises([...workoutExercises, newExercise]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Authentication token not found, please login again.');
      setIsSubmitting(false);
      return;
    }
    const transformedExercises = workoutExercises.map(exercise => ({
      exerciseId: Number(exercise.exercise.exercise_id),
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight
    }));

    const currentDate = new Date().toISOString().split('T')[0];
    const payload = {
      workout_id: workoutId,
      workout_name: workoutName,
      workout_date: currentDate,
      notes: notes,
      exercises: transformedExercises
    };
  
    try {
      const response = await axios.post(`http://3.14.144.6:3000/admin/saveWorkout`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(response.data);
      alert('Workout updated successfully!');
      navigate('/userWorkouts');
    } catch (error) {
      console.error('Failed to update workout:', error);
      alert('Failed to update workout.'); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar/>
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
              <select value={exercise.exercise.exercise_id} onChange={(e) => handleExerciseChange(index, 'exercise_id', e.target.value)}>
                <option value="">Select Exercise</option>
                {exercisesList.map(ex => (
                  <option key={ex.exercise_id} value={ex.exercise_id}>{ex.title}</option>
                ))}
              </select>
              <input type="number" placeholder="Sets" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)} />
              <input type="number" placeholder="Reps" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)} />
              <input type="number" placeholder="Weight" value={exercise.weight} onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)} />
              <button type="button" onClick={() => setWorkoutExercises(workoutExercises.filter((_, i) => i !== index))} className="remove-exercise-btn">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addNewExercise} className="add-exercise-btn">
            Add Exercise
          </button>
          <button type="submit" disabled={isSubmitting} className="save-workout-btn">
            {isSubmitting ? 'Updating...' : 'Update Workout'}
          </button>
        </form>
      </div>
    </>
  );
}

export default EditPredefinedWorkout;
