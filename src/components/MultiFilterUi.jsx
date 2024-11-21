import React, { useState } from "react";
import Select from "react-select";

const MultiFilterUI = ({ apiResponse }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredData, setFilteredData] = useState({});

  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
  ];

  // Handle dropdown change
  const handleChange = (selected) => {
    setSelectedOptions(selected);

    // Filter the API response based on selected options
    const filteredKeys = selected.map((option) => option.value);
    const filtered = Object.keys(apiResponse)
      .filter((key) => filteredKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = apiResponse[key];
        return obj;
      }, {});

    setFilteredData(filtered);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Multi Filter</h1>
      <Select isMulti options={options} value={selectedOptions} onChange={handleChange} placeholder="Select Filters" className="mb-4" />
      <div className="mt-3">
        <p className="font-semibold">Filtered Response:</p>
        {Object.keys(filteredData).map((key) => (
          <p key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}: {Array.isArray(filteredData[key]) ? filteredData[key].join(",") : filteredData[key]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MultiFilterUI;
