import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex flex-col items-center">
      {/* Centered Title */}
      <h1 className="text-2xl font-bold mb-2">Task Manager</h1>
      
      {/* Centered Links with Styles */}
      <div className="flex gap-6">
        <Link 
          to="/" 
          className="hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          Home
        </Link>
        <Link 
          to="/lists" 
          className="hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          Lists
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
