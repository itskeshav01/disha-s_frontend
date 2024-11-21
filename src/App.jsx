import React, { useState } from "react";
import { Header } from "./components/Header";
import JsonInputField from "./components/JsonInputField";
import axios from "axios";
import MultiFilterUI from "./components/MultiFilterUi";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [apiResponse, setApiResponse] = useState({}); // Store the API response

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value); // Update the state with the entered value
  };

  const submitData = async () => {
    try {
      // Validate if input is valid JSON
      const parsedData = JSON.parse(jsonInput);

      // If JSON is valid, clear any previous error messages
      setErrorMessage("");

      // Send POST request to server
      console.log("Sending data:", parsedData);
      const response = await axios.post("https://bajajapp-esyj.onrender.com/bfhl", parsedData);

      // Handle the response
      console.log("Server Response:", response.data);
      setApiResponse(response.data); // Save the API response
      alert("Data submitted successfully!");
    } catch (error) {
      // If JSON is invalid or the request fails, handle the error
      if (error instanceof SyntaxError) {
        setErrorMessage("Invalid JSON format. Please correct it.");
      } else {
        console.error("Error submitting data:", error);
        setErrorMessage("Failed to submit data. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div className="max-w-md flex flex-col gap-3 mx-auto mt-5">
          <JsonInputField label="Enter JSON" value={jsonInput} onChange={handleJsonChange} placeholder='{"name": "John", "age": 30}' name="jsonInput" />
          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
          <button className="sm:px-6 px-2 py-2 rounded-xl bg-blue-500 border-none w-full text-white" onClick={submitData}>
            Submit
          </button>
          <MultiFilterUI apiResponse={apiResponse} />
        </div>
      </div>
    </div>
  );
};

export default App;
