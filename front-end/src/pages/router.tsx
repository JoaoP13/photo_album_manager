import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import PrivateRoutes from "./utils/privateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route element={<PrivateRoutes />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
