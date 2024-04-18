import React from 'react';
import './Detailedview.css'; // Import the stylesheet for the detailed view

const DetailedView = ({ exercise, onBackClick }) => {
  // Split the instructions string into an array of steps, and trim each step to ensure no leading/trailing whitespace
  const instructionSteps = exercise.instructions.split('\n').filter(step => step.trim());

  // Determine the correct property name for the exercise picture URL
  const exerciseImageUrl = exercise.exercise_picture || exercise.logo || exercise.picture;

  return (
    <div className="detailed-view">
      <button className="back-btn" onClick={onBackClick}>Back</button> {/* Render the 'Back' button */}
      <div className="exercise-content">
        {exerciseImageUrl && (
          // Render the exercise image if the URL is available
          <img src={exerciseImageUrl} alt={`${exercise.title}`} className="exercise-image" />
        )}
        <h1 className="exercise-title">{exercise.title}</h1> {/* Display the exercise title */}
        <div className="exercise-instructions">
          <h2>Instructions:</h2> {/* Heading for the instructions section */}
          <pre className="instructions-text">{exercise.instructions}</pre> 
        </div>
          
        
      </div>
    </div>
  );
};

export default DetailedView;
