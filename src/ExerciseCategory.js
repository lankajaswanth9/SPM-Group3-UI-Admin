import React from 'react';
import './workouts.css'

const ExerciseCategory = ({ category, exercises, onView, onEdit, onDelete }) => {
  
  return (
    <div className="Exercise-container">
      <div className="exercise-category">
        <h2>{category} Exercises </h2>
        <div className="exercise-list">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <img src={exercise.logo} alt={`${category} - ${exercise.title} Logo`} className="exercise-logo" />
              <div className="exercise-info">
                <h3>{exercise.title}</h3>
                <div className="exercise-actions">
                  <button className="btn view" onClick={() => onView(exercise)}>View</button>
                  <button className="btn edit" onClick={() => onEdit(exercise)}>Edit</button>
                  <button className="btn delete" onClick={() => onDelete(exercise.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCategory;
