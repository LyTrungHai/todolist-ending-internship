import "./App.css";
import LoginForm from "./page/LoginPage/LoginForm";
import HomePage from "./page/HomePage/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./page/RegisterPage/RegisterForm";
import Todo from "./page/TodoPage";
import NotFound from "./page/Notfound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/todopage"
          element={
            <RequireAuth redirectTo="/login">
              <Todo />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}
function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = localStorage.getItem("LOGIN_USER");
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default App;
