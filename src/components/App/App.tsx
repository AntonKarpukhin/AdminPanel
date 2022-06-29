import React from 'react';
import './App.css';
import {AdminAdd,AdminFilters, AdminHeader, AdminEmployees} from "../index";

function App() {
  return (
    <div className="App">
		<AdminHeader/>
		<AdminAdd/>
		<AdminFilters/>
		<AdminEmployees/>
    </div>
  );
}

export default App;
