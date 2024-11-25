import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Repairs from "./Components/Modules/Transactions/Repairs/Repairs"; // Adjust the path based on your project structure

function App() {
  return (
    <Router>
      <Routes>
        {/* Other Routes */}
        <Route path="/repairs" element={<Repairs />} />
      </Routes>
    </Router>
  );
}

export default App;
