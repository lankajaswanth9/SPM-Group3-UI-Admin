// ExerciseInfoView.js
import React from 'react';
import './ExerciseInfo.css'; // Make sure to create a corresponding CSS file for this component

const ExerciseInfoView = ({ exercise, onBackClick }) => {
  // Split the instructions string into an array of steps, removing any empty strings
  const instructionSteps = exercise.instructions.split('\n').filter(Boolean);

  // Determine the correct property name for the exercise picture URL
  const exerciseImageUrl = exercise.exercise_picture || exercise.logo || exercise.picture;

  return (
    <div className="exercise-info-view">
      <button className="back-btn" onClick={onBackClick}>Back</button>
      <div className="exercise-content">
        {exerciseImageUrl && (
          <img src={exerciseImageUrl} alt={`${exercise.title}`} className="exercise-image" />
        )}
        <h1 className="exercise-title">{exercise.title}</h1>
        <div className="exercise-instructions">
          <h2>Instructions:</h2>
          <ol>
            {instructionSteps.map((step, index) => (
              <li key={index}>{step.trim()}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ExerciseInfoView;
