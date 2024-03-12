import React, { useState } from 'react';
import './EditForm.css';

/**
 * The EditExercise component allows for editing the details of an exercise.
 * It displays form inputs pre-filled with the exercise's current details,
 * such as title, instructions, category, logo, and picture. Users can update
 * these details and either save the changes or cancel the edit.
 *
 * @component
 * @param {Object} props - Props for EditExercise.
 * @param {Object} props.exercise - The current exercise object to be edited.
 * @param {Function} props.onSave - The function to call when the save button is clicked. Passes the updated exercise object.
 * @param {Function} props.onCancel - The function to call when the cancel button is clicked.
 */
const EditExercise = ({ exercise, onSave, onCancel }) => {
  const [title, setTitle] = useState(exercise.title);
  const [instructions, setInstructions] = useState(exercise.instructions);
  const [category, setCategory] = useState(exercise.category);
  const [logo, setLogo] = useState(exercise.logo);
  const [picture, setPicture] = useState(exercise.picture);

  /**
   * Handles the save action, preventing the default form submission event,
   * and calls the onSave prop with the updated exercise details.
   * 
   * @param {Event} e - The event object.
   */
  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      ...exercise,
      title,
      instructions,
      category,
      logo,
      picture,
    });
  };

  /**
   * Updates the logo state to the selected file's URL to display a preview.
   * 
   * @param {Event} e - The event object for the file input change.
   */
  const handleLogoChange = (e) => {
    setLogo(URL.createObjectURL(e.target.files[0]));
  };

  /**
   * Updates the picture state to the selected file's URL to display a preview.
   * 
   * @param {Event} e - The event object for the file input change.
   */
  const handlePictureChange = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="edit-exercise-form">
      <div className="form-group">
        <label>Logo</label>
        {logo && <img src={logo} alt="Logo Preview" />}
        <input type="file" onChange={handleLogoChange} />
      </div>
      <div className="form-group">
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Instructions</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Picture</label>
        {picture && <img src={picture} alt="Picture Preview" />}
        <input type="file" onChange={handlePictureChange} />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div className="form-actions">
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditExercise;
