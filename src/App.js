import AuthRoute from "components/AuthRoute";
import LayoutWithNavbar from "components/LayoutWithNavbar";
import PrivateRoute from "components/PrivateRoute";
import ChangePassword from "pages/ChangePassword";
import DetailTodo from "pages/DetailTodo";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import Verification from "pages/Verification";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<LayoutWithNavbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/:idtodo" element={<DetailTodo />} />
            </Route>
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verification/:token" element={<Verification />} />
            <Route path="/reset-password/:token" element={<ChangePassword />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
