import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ListProvider } from "./context/Listcontext";
import Lists from "./pages/Lists";
import Listpage from "./pages/Listpage";

const App = () => {
  return (
    <ListProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/lists" replace />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/list/:listId" element={<Listpage />} />
          <Route path="*" element={<h2 className="text-center mt-4">Page Not Found</h2>} />
        </Routes>
      </Router>
    </ListProvider>
  );
};

export default App;
