import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Cookies from "js-cookie";


function App() {
  return (
    <Router>
      <Routes>
       
            <Route
        path=""
        element={
          <ProtectedRoute
            requiredRole=""
            redirectPath=""
          >
            <div>Super Admin Dashboard</div>
          </ProtectedRoute>
        }/>

        {/* Default route - redirect based on role */}
        <Route path="/" element={<DefaultRedirect />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// Helper component to redirect based on role
function DefaultRedirect() {
  const role = Cookies.get("role");

  if (role === "") {
    return <Navigate to="/" replace />;
  } else if (role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }
  // Default to dentist login if no role found

}

export default App;


