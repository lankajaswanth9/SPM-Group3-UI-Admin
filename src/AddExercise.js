import React, { useState } from 'react';
import axios from 'axios';
import './AddExercise.css';

/**
 * Represents a form for adding a new exercise. It collects information such as the exercise's
 * title, instructions, category, logo, and picture. If the form is successfully submitted,
 * it triggers an onSaveSuccess callback. If the user decides to cancel, it triggers
 * an onCancel callback.
 * 
 * @component
 * @param {Object} props
 * @param {Function} props.onSaveSuccess - Callback function that is called upon successful submission of the form.
 * @param {Function} props.onCancel - Callback function that is called when the user clicks the cancel button.
 */
const AddExercise = ({ onSaveSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [logo, setLogo] = useState(null);
  const [picture, setPicture] = useState(null);
  const [errors, setErrors] = useState({});

  /**
   * Handles the submission of the form to add a new exercise. It performs client-side validation
   * first, setting errors if required fields are missing. If validation passes, it attempts
   * to send the exercise data to the server using an HTTP POST request. Upon success,
   * it resets the form fields and calls the onSaveSuccess callback. If there is an error,
   * it updates the state with the error details.
   * 
   * @param {Event} e - The event object associated with the form submission.
   */
  const handleSave = async (e) => {
    e.preventDefault();

    // Validate input fields
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required.';
    if (!instructions) newErrors.instructions = 'Instructions are required.';
    if (!category) newErrors.category = 'Category is required.';
    if (!logo) newErrors.logo = 'Logo is required.';
    if (!picture) newErrors.picture = 'Picture is required.';

    // Display errors if validation fails
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('title', title);
    formData.append('instructions', instructions);
    formData.append('category', category);
    formData.append('logo', logo);
    formData.append('picture', picture);

    try {
      // Attempt to submit exercise data to server
      const response = await axios.post('http://localhost:3000/api/exercises', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Reset form and invoke success callback on successful response
      if (response.status === 201) {
        setTitle('');
        setInstructions('');
        setCategory('');
        setLogo(null);
        setPicture(null);
        document.getElementById('logo').value = '';
        document.getElementById('picture').value = '';
        onSaveSuccess();
      } else {
        // Handle unsuccessful response
        setErrors({ submit: 'Failed to add exercise.' });
      }
    } catch (error) {
      // Handle error during form submission
      console.error('Error adding exercise:', error);
      setErrors({ submit: 'An error occurred while adding the exercise.' });
    }
  };

  // JSX markup for the form
  return (
    <form className="add-exercise-form" onSubmit={handleSave}>
      {/* Title input field */}
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <div className="error">{errors.title}</div>}
      </div>

      {/* Instructions input field */}
      <div className="form-group">
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        {errors.instructions && <div className="error">{errors.instructions}</div>}
      </div>

      {/* Category input field */}
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && <div className="error">{errors.category}</div>}
      </div>

      {/* Logo file input field */}
      <div className="form-group">
        <label htmlFor="logo">Logo:</label>
        <input
          id="logo"
          type="file"
          onChange={(e) => setLogo(e.target.files[0])}
        />
        {errors.logo && <div className="error">{errors.logo}</div>}
      </div>

      {/* Picture file input field */}
      <div className="form-group">
        <label htmlFor="picture">Picture:</label>
        <input
          id="picture"
          type="file"
          onChange={(e) => setPicture(e.target.files[0])}
        />
        {errors.picture && <div className="error">{errors.picture}</div>}
      </div>

      {/* Form action buttons */}
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="save-btn">Add Exercise</button>
      </div>
    </form>
  );
};

export default AddExercise;
