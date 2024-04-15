import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleList from './VehicleList';
import VehicleRegistrationForm from './VehicleRegistrationForm';
import EditVehicle from './EditVehicle';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route path="/register" element={<VehicleRegistrationForm />} />
          <Route path="/edit" element={<EditVehicle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
