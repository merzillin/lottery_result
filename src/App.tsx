import { lazy, Suspense, useState, type JSX } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

interface RouteConfig {
  menuId: number;
  menuName: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Dynamic route data
  const data: RouteConfig[] = [
    {
      menuId: 1,
      menuName: "home",
      Component: lazy(() => import("./page/HomePage")),
    },
    {
      menuId: 3,
      menuName: "Lottery",
      Component: lazy(() => import("./page/LotteryPage")),
    },
    {
      menuId: 2,
      menuName: "dashboard",
      Component: lazy(() => import("./page/Dashboard")),
    },
    {
      menuId: 4,
      menuName: "report",
      Component: lazy(() => import("./page/Report")),
    },
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
          <Suspense
            fallback={<div className="p-4 text-center">Loading...</div>}
          >
            <Routes>
              {data.map(({ menuId, menuName, Component }) => (
                <Route
                  key={menuId}
                  path={menuName === "home" ? "/" : `/${menuName}`}
                  element={<Component />}
                />
              ))}
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
