import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import './TransactionDetails.css';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    background: '#fff',
  },
};

const TransactionDetails = ({ isOpen, onClose, event, onDelete}) => {
  const handleDelete = () => {
    onDelete(event._id); 
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyle}>
      <div>
        <h2>{event.title}</h2>
        <p>Category: {event.category}</p>
        <p>Amount: ${event.amount.toFixed(2)}</p>
        <p>Date: {moment(event.start).format('MMMM Do YYYY')}</p>
        <button className="close-btn" onClick={onClose} style={{ marginTop: '20px' }}>
          Close
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default TransactionDetails;
