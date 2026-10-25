import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListProvider } from "./context/Listcontext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Listpage from "./pages/Listpage";

function App() {
  return (
    <ListProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="/list/:listId" element={<Listpage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ListProvider>
  );
}

export default App;