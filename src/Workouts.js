/**
 * The `AdminPage` component serves as the administration panel for managing exercises within an application.
 * It allows for the addition, editing, viewing, and deletion of exercises. The exercises are displayed by categories,
 * and actions are provided for each exercise. It also integrates with other components like `AddExercise`, `EditExercise`,
 * `DetailedView`, and `ExerciseCategory` to facilitate these functionalities.
 *
 * State:
 * - `exercises`: Array of exercise objects that contains all the exercises.
 * - `selectedExercise`: Object of the currently selected exercise for viewing its details.
 * - `editingExercise`: Object of the currently selected exercise for editing.
 * - `showAddExercise`: Boolean to control the visibility of the `AddExercise` component.
 *
 * Functions:
 * - `handleAddExerciseClick`: Sets the state to show the `AddExercise` component.
 * - `handleCancelAddExercise`: Resets the state to hide the `AddExercise` component.
 * - `handleSaveAddExercise`: Adds a new exercise to the state and hides the `AddExercise` component.
 * - `handleEditClick`: Sets the state to show the `EditExercise` component with the selected exercise.
 * - `handleSaveEdit`: Updates an exercise in the state and hides the `EditExercise` component.
 * - `handleCancelEdit`: Resets the state to hide the `EditExercise` component.
 * - `handleViewClick`: Sets the state to view the details of a selected exercise.
 * - `handleBackFromDetailView`: Resets the state to hide the `DetailedView` component.
 * - `handleDeleteClick`: Deletes an exercise from the state.
 *
 * @returns {JSX.Element} The AdminPage component, which orchestrates the management of exercises.
 */



// AdminPage.js
import React, { useState } from 'react';
import DetailedView from './Detailedview';
import EditExercise from './EditExercise';
import ExerciseCategory from './ExerciseCategory';
import './workouts.css';
import Navbar from './Navbar';
import AddExercise from './AddExercise';
// Sample data, 
const apiData = [
  
    {
        id: 1,
        logo: '/Images/a1.jpeg',
        picture: '/Images/a1.jpeg',
        title: 'Bench Press',
        instructions: `NOTE: To increase the difficulty for this exercise, have an exercise partner place a weight plate on your lap.\n2. Place a bench behind your back and hold on to its edge with your hands fully extended at around shoulder width. The legs will be extended forward while you're bent at the waist. This is your starting position.\n3. Slowly lower your body by bending at the elbows until your arms are close to a 90 degree angle. Keep your elbows as close as possible.`,
        category: 'Arms'
    },
    {
      id: 2,
      logo: '/Images/a2.jpeg',
      picture: '/Images/a2.jpeg',
      title: 'Bench Press',
      instructions: `NOTE: To increase the difficulty for this exercise, have an exercise partner place a weight plate on your lap.\n2. Place a bench behind your back and hold on to its edge with your hands fully extended at around shoulder width. The legs will be extended forward while you're bent at the waist. This is your starting position.\n3. Slowly lower your body by bending at the elbows until your arms are close to a 90 degree angle. Keep your elbows as close as possible.`,
      category: 'Arms'
  },
  {
    id: 22,
    logo: '/Images/a3.jpeg',
    picture: '/Images/a3.jpeg',
    title: 'Bench Press',
    instructions: `NOTE: To increase the difficulty for this exercise, have an exercise partner place a weight plate on your lap.\n2. Place a bench behind your back and hold on to its edge with your hands fully extended at around shoulder width. The legs will be extended forward while you're bent at the waist. This is your starting position.\n3. Slowly lower your body by bending at the elbows until your arms are close to a 90 degree angle. Keep your elbows as close as possible.`,
    category: 'Arms'
},
  
    {
    
    id: 3,
    logo: '/Images/3.jpeg',
    picture: '/Images/3.jpeg',
    title: 'Box Squat(Barbell)',
    instructions: 'Instructions on how to perform squats.',
    category: 'Legs'
  },
  {
    
    id: 4,
    logo: '/Images/4.jpeg',
    picture: '/Images/4.jpeg',
    title: 'Bulgarian Split Squat',
    instructions: 'Instructions on how to perform squats.',
    category: 'Legs'
  },
  {
    
    id: 5,
    logo: '/Images/5.jpeg',
    picture: '/Images/5.jpeg',
    title: 'Cable pull through',
    instructions: 'Instructions on how to perform squats.',
    category: 'Legs'
  },
  {
    id: 6,
    logo: 'Images/b1.jpeg',
    picture: 'Images/b1.jpeg',
    title: 'Bent over row(Band)',
    instructions: 'Instructions on how to perform the bench press.',
    category: 'Back'
  },
  {
    id: 7,
    logo: 'Images/b2.jpeg',
    picture: 'Images/b2.jpeg',
    title: 'Bent over row- Under hand(Barbell)',
    instructions: 'Instructions on how to perform the bench press.',
    category: 'Back'
  },
  {
    id: 8,
    logo: 'Images/b3.jpeg',
    picture: 'Images/b3.jpeg',
    title: 'Chinup Assisted',
    instructions: 'Instructions on how to perform the bench press.',
    category: 'Back'
  },
  {
    id: 9,
    logo: 'Images/c1.jpeg',
    picture: 'Images/c1.jpeg',
    title: 'Bench Press',
    instructions: 'Instructions on how to perform the bench press.',
    category: 'Chest'
  },
  {
    id: 10,
    logo: 'Images/c2.jpeg',
    picture: 'Images/c2.jpeg',
    title: 'Bench Press',
    instructions: 'Instructions on how to perform the bench press.',
    category: 'Chest'
  },
  {
    id: 11,
    logo: 'Images/c3.jpeg',
    picture: 'Images/c3.jpeg',
    title: 'Bench Press',
    instructions: 'Instructions on how to perform the bench press.',
    category: 'Chest'
  },
  {
    id: 12,
    logo: 'Images/s1.jpeg',
    picture: 'Images/s1.jpeg',
    title: 'Bench Press',
    instructions: 'Instructions on how to perform the bench press.',
    category: 'Shoulders'
  },
  {
    id: 13,
    logo: 'Images/s2.jpeg',
    picture: 'Images/s2.jpeg',
    title: 'Bench Press',
    instructions: 'Instructions on how to perform the bench press.',
    category: 'Shoulders'
  },
  {
    id: 14,
    logo: 'Images/s3.jpeg',
    picture: 'Images/s3.jpeg',
    title: 'Bench Press',
    instructions: 'Instructions on how to perform the bench press.',
    category: 'Shoulders'
  },

  // Add more exercises
];

const AdminPage = () => {
  const [exercises, setExercises] = useState(apiData);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);
  const [showAddExercise, setShowAddExercise] = useState(false);

  const handleAddExerciseClick = () => {
    setShowAddExercise(true);
    setSelectedExercise(null); 
    setEditingExercise(null); 
  };

  const handleCancelAddExercise = () => {
    setShowAddExercise(false);
  };

  const handleSaveAddExercise = (newExercise) => {
    setExercises([...exercises, newExercise]);
    setShowAddExercise(false);
  };

  const handleEditClick = (exercise) => {
    setEditingExercise(exercise);
    setSelectedExercise(null); 
  };

  const handleSaveEdit = (updatedExercise) => {
    setExercises(prevExercises =>
      prevExercises.map(ex => (ex.id === updatedExercise.id ? updatedExercise : ex))
    );
    setEditingExercise(null);
  };

  const handleCancelEdit = () => {
    setEditingExercise(null);
  };

  const handleViewClick = (exercise) => {
    setSelectedExercise(exercise);
    setEditingExercise(null); 
  };

  const handleBackFromDetailView = () => {
    setSelectedExercise(null);
  };

  const handleDeleteClick = (exerciseId) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId));
  };

  const categories = Array.from(new Set(exercises.map((ex) => ex.category)));

  return (
    <div className="admin-page">
      <Navbar />
      {showAddExercise ? (
        <AddExercise onCancel={handleCancelAddExercise} onSaveSuccess={handleSaveAddExercise} />
      ) : (
        <>
          {(!selectedExercise && !editingExercise) && (
            <button className="add-exercise-btn" onClick={handleAddExerciseClick}>
              Add Exercise
            </button>
          )}
          {selectedExercise && !editingExercise && (
            <DetailedView exercise={selectedExercise} onBackClick={handleBackFromDetailView} />
          )}
          {editingExercise && (
            <EditExercise exercise={editingExercise} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
          )}
          {!selectedExercise && !editingExercise && categories.map((category) => (
            <ExerciseCategory
              key={category}
              category={category}
              exercises={exercises.filter((ex) => ex.category === category)}
              onView={handleViewClick}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default AdminPage;