import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import DashboardPage from "./page/Dashboard";
import HomePage from "./page/HomePage";
import LotteryPage from "./page/LotteryPage";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Dynamic route data
  const data = [
    { menuId: 1, menuName: "home", Component: <HomePage /> },
    { menuId: 3, menuName: "Lottery", Component: <LotteryPage /> },
    { menuId: 2, menuName: "dashboard", Component: <DashboardPage /> },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <Router>
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <nav className="h-16 flex items-center justify-between px-6 shadow-md relative">
          <Link to="/" className="text-xl font-bold text-black">
            MyApp
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-black font-medium">
            {data.map((item) => (
              <li key={item.menuId}>
                <Link
                  to={`/${item.menuName === "home" ? "" : item.menuName}`}
                  className="hover:text-blue-200"
                  onClick={closeMenu}
                >
                  {item.menuName.charAt(0).toUpperCase() +
                    item.menuName.slice(1)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? (
              // Close (X) icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Mobile Dropdown */}
          {isOpen && (
            <ul className="absolute top-16 left-0 w-full bg-blue-400 flex flex-col items-center space-y-4 py-4 text-black font-medium md:hidden shadow-md">
              {data.map((item) => (
                <li key={item.menuId}>
                  <Link
                    to={`/${item.menuName === "home" ? "" : item.menuName}`}
                    className="hover:text-blue-200"
                    onClick={closeMenu}
                  >
                    {item.menuName.charAt(0).toUpperCase() +
                      item.menuName.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* Routes generated dynamically */}
        <div className="flex-1 overflow-auto text-black">
          <Routes>
            {data.map((item) => (
              <Route
                key={item.menuId}
                path={item.menuName === "home" ? "/" : `/${item.menuName}`}
                element={item.Component}
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
