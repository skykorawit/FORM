import React, { useReducer, useState } from 'react';
import './App.css';

// Initial State
const initialState = {
  users: []
};

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    phone: '',
    message: '',
    image: null,
    agreeToPolicy: false,
  });
  const [error, setError] = useState('');

  // Handle form data change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate form data
  const validate = () => {
    const { firstName, lastName, email, company, country, phone, message, image, agreeToPolicy } = formData;
    if (!firstName || !lastName || !email || !company || !country || !phone || !message || !image || !agreeToPolicy) {
      setError('Please fill in all fields and agree to the privacy policy.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newUser = { ...formData, image: reader.result }; // Save image as base64
        dispatch({ type: 'ADD_USER', payload: newUser });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          country: '',
          phone: '',
          message: '',
          image: null,
          agreeToPolicy: false,
        });
      };
      reader.readAsDataURL(formData.image);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-pink-400 to-blue-400 text-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8">User Registration Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
        />
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
        >
          <option value="">Select Country</option>
          <option value="Thailand">Thailand</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
        />
        <div className="flex items-center space-x-4">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border border-pink-300 rounded-lg p-2 text-gray-900"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="agreeToPolicy"
              checked={formData.agreeToPolicy}
              onChange={handleChange}
              className="mr-2"
            />
            <span>By selecting this, you agree to our privacy policy</span>
          </label>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button type="submit" className="w-full p-3 text-white rounded-lg hover:bg-blue-400 transition duration-200 bgbutton">
          Submit
        </button>
      </form>

      <h2 className="text-3xl font-bold text-center mt-10">User List</h2>
      <ul className="space-y-6 mt-6">
        {state.users.map((user, index) => (
          <li key={index} className="p-6 bg-white text-gray-900 rounded-lg shadow flex space-x-6 items-center">
            <img src={user.image} alt={`${user.firstName}'s profile`} className="w-20 h-20 rounded-full object-cover border-4 border-pink-600" />
            <div className="space-y-2">
              <p className="text-xl font-bold">{user.firstName} {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Company: {user.company}</p>
              <p>Country: {user.country}</p>
              <p>Phone: {user.phone}</p>
              <p>Message: {user.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
