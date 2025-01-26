import React, { useState } from 'react';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import axios from 'axios';
import Tilt from 'react-parallax-tilt';

const EntryCard = ({ id, title, content, date, refreshEntries }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const authHeader = 'Basic ' + localStorage.getItem("AUTH_KEY");

  // Extract time from the date string
  const formattedTime = new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const handleEdit = async () => {
    console.log("here is : " + id);
    try {
      // PUT request to update the journal entry
      await axios.put(`http://localhost:8080/journal/id/${id}`, {
        title: editedTitle,
        content: editedContent,
      });
      refreshEntries(); // Refresh the entries list after updating
      setShowEditModal(false); // Close the modal
    } catch (error) {
      console.error('Error updating entry:', error);
      // Optionally handle errors, e.g., show a notification or alert
    }
  };
  

  const handleDelete = async () => {
    try {
      const deleteResponse = await axios.delete(`http://localhost:8080/journal/id/${id}`, {
        headers: {
          Authorization: authHeader,
        }
      });
      console.log(deleteResponse);
      refreshEntries(); // Refresh entries after deletion
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <Tilt className="flex flex-col w-[22%] h-[300px] justify-between bg-white shadow-md p-4 pb-6 rounded-lg">
      <div>
        <div className="w-full flex justify-end gap-1">
          <MdOutlineModeEdit
            className="text-[1.2rem] hover:cursor-pointer"
            onClick={() => setShowEditModal(true)}
          />
          <MdDeleteOutline
            className="text-[1.2rem] hover:cursor-pointer"
            onClick={() => setShowDeleteModal(true)}
          />
        </div>
        <div>
          <h1 className="text-[1.5rem] font-semibold w-[90%] border-b-[3px] border-red-500">{title}</h1>
          <p className="text-[1rem] mt-2">{content}</p>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="text-sm text-gray-400">{formattedTime}</p>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Edit Entry</h2>
            <input
              className="w-full border px-3 py-2 rounded mb-4"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="w-full border px-3 py-2 rounded mb-4"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Content"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this entry?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Tilt>
  );
};

export default EntryCard;
