/**
 * Renders a detailed view of an exercise, including its picture, title, and step-by-step instructions.
 * This component provides a 'Back' button to navigate to the previous view.
 * 
 * @component
 * @param {Object} props - The props for the DetailedView component.
 * @param {Object} props.exercise - The exercise object to display. Should contain `instructions`, `picture`, and `title`.
 * @param {Function} props.onBackClick - Callback function to be called when the 'Back' button is clicked.
 * 
 * @returns {JSX.Element} The JSX markup for the detailed view of an exercise.
 */
import React from 'react';
import './Detailedview.css'; // Import the stylesheet for the detailed view

const DetailedView = ({ exercise, onBackClick }) => {
  // Split the instructions string into an array of steps, removing any empty strings
  const instructionSteps = exercise.instructions.split('\n').filter(Boolean);

  return (
    <div className="detailed-view">
      <button className="back-btn" onClick={onBackClick}>Back</button> {/* Render the 'Back' button */}
      <div className="exercise-content">
        {exercise.picture && (
          // If an exercise picture is provided, render it with an alt text of the exercise title
          <img src={exercise.picture} alt={`${exercise.title}`} className="exercise-image" />
        )}
        <h1 className="exercise-title">{exercise.title}</h1> {/* Display the exercise title */}
        <div className="exercise-instructions">
            <h1 className="exercise-tit">Instructions:</h1> {/* Heading for the instructions section */}
          <ol>
            {instructionSteps.map((step, index) => (
              // Render each instruction step as an item in an ordered list
              <li key={index}>{step.trim()}</li> 
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DetailedView; // Export the DetailedView component for use in other parts of the application
