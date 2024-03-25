import React, { useState, useEffect } from 'react';
import DetailedView from './Detailedview';
import EditExercise from './EditExercise';
import ExerciseCategory from './ExerciseCategory';
import './workouts.css';
import Navbar from './Navbar';
import AddExercise from './AddExercise';

const AdminPage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);
  const [showAddExercise, setShowAddExercise] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/exercises');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Could not fetch exercises:", error);
      alert("There was a problem fetching exercises. Please try again later.");
    }
  };

  const handleAddExerciseClick = () => {
    setShowAddExercise(true);
    setSelectedExercise(null);
    setEditingExercise(null);
  };

  const handleCancelAddExercise = () => {
    setShowAddExercise(false);
  };

  const handleSaveAddExercise = async (newExercise) => {
    const response = await fetch('http://localhost:3000/admin/exercises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExercise),
    });

    if (response.ok) {
      fetchExercises();
    } else {
      alert("Failed to add exercise.");
    }

    setShowAddExercise(false);
  };

  const handleEditClick = (exercise) => {
    setEditingExercise(exercise);
    setSelectedExercise(null);
  };

  const handleSaveEdit = async (updatedExercise) => {
    const response = await fetch(`http://localhost:3000/admin/exercises/${updatedExercise.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExercise),
    });

    if (response.ok) {
      fetchExercises();
    } else {
      alert("Failed to update exercise.");
    }

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

  const handleDeleteClick = async (exerciseId) => {
    // Attempt to parse the ID as an integer
    const id = parseInt(exerciseId, 10);

    // Check if the result is an integer using the Number.isInteger() function
    if (!Number.isInteger(id)) {
        alert("Invalid exercise ID. Cannot proceed with deletion.");
        return;
    }

    // Proceed with deletion using the validated and converted ID
    try {
        const response = await fetch(`http://localhost:3000/admin/exercises/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Handle successful deletion (e.g., refreshing the list of exercises)
            console.log("Exercise deleted successfully.");
        } else {
            // Handle non-successful responses
            alert("Failed to delete the exercise. Please try again.");
        }
    } catch (error) {
        console.error("Error deleting exercise:", error);
        alert("An error occurred while deleting the exercise.");
    }
};



  const categories = Array.from(new Set(exercises.map(ex => ex.category)));

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
              exercises={exercises.filter(ex => ex.category === category)}
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
