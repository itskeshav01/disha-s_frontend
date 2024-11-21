import React, { useState } from "react";

const JsonInputField = ({ label, value, onChange, placeholder, name }) => {
    const [error, setError] = useState("");
    
  const handleChange = (e) => {
      const inputValue = e.target.value;
      console.log(inputValue);
    try {
      
    
      
      onChange(e); // Call the parent's onChange callback
    } catch (err) {
      setError("Invalid JSON format"); // Set error if invalid JSON
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <input
        type="text" // Keeps it as a text input field
        id={name}
        name={name}
        value={value} // Controlled input
        onChange={handleChange} // Use custom change handler
        className="w-full px-3 sm:py-1 py-1 text-sm sm:text-lg border rounded-lg text-dark-gray border-light-gray outline-none font-roboto"
        placeholder={placeholder}
        required
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>} {/* Display error message if any */}
    </div>
  );
};

export default JsonInputField;
