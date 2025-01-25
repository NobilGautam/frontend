import React, { useState } from 'react';
import axios from 'axios';
import { useCredContext } from '../context/Credentials';

const FormModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const { credentials } = useCredContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authHeader = `Basic ${localStorage.getItem("AUTH_KEY")}`;
      console.log(authHeader)
      await axios.post('http://localhost:8080/journal', formData, {
        headers: {
          Authorization: authHeader,
        }
      });
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Add New Entry</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <textarea
            placeholder="Content goes here"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
