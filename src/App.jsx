import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listpage from './pages/Listpage';
import { ListProvider } from './context/Listcontext';

function App() {
  return (
        <Router>

      <ListProvider>
    
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
<Route path="/list/:listId" element={<Listpage />} />
            </Routes>
          </main>
          <Footer />
        </div>
    
      </ListProvider>
          </Router>

  );
}

export default App;
