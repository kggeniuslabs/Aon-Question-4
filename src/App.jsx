import React, { useState } from 'react';

function App() {
  const [hotelData, setHotelData] = useState({
    name: 'GRAND HOTEL',
  imageUrl: 'data:image/jpeg;base64,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',
    rating: 4
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...hotelData });
  const [errors, setErrors] = useState({});

  // Write your JavaScript Logic here

  const handleOpenModal = () => {
    setFormData({ ...hotelData });
    setErrors({});
    
  };

  const handleCloseModal = () => {
    
  };

  const handleChange = (e) => {
    
  };

  const validate = () => {
    
  };

  const handleSubmit = (e) => {
    
  };

  return (
    <>

    <header>
      <h1 className="app-title">Hotel Information</h1>
    </header>
    
      <div className="hotel-card">
        <div className="card-image-wrapper">
          <img src={hotelData.imageUrl} alt={hotelData.name} className="hotel-image" />
        </div>
        <h2 className="hotel-name">{hotelData.name}</h2>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map(star => (
            <span key={star} className={`star ${star <= hotelData.rating ? 'filled' : ''}`}>
              ★
            </span>
          ))}
        </div>
        <div className="card-divider"></div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleOpenModal}>Add Hotel Info</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add Hotel Info</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Hotel Name:</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. GRAND HOTEL"
                />
                <div className={`error-msg ${errors.name ? 'visible' : ''}`}>{errors.name}</div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL:</label>
                <input 
                  type="text" 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
                <div className={`error-msg ${errors.imageUrl ? 'visible' : ''}`}>{errors.imageUrl}</div>
              </div>

              <div className="form-group">
                <label className="form-label">Star Rating:</label>
                <select 
                  name="rating" 
                  value={formData.rating || ''} 
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="" disabled>Select Rating</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
                <div className={`error-msg ${errors.rating ? 'visible' : ''}`}>{errors.rating}</div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
