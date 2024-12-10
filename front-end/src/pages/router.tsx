import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/login";
import UserList from "./user/user";
import AlbumList from "./albums/album";
import PhotoList from "./photo/photo";
import PrivateRoutes from "./utils/privateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/users" element={<UserList />}></Route>
        <Route path="/albums" element={<AlbumList />}></Route>
        <Route path="/albums/:id" element={<AlbumList />}></Route>
        <Route
          path="/photo/:idAlbum/:isUserVieweingYourOwnAlbum"
          element={<PhotoList />}
        ></Route>

        <Route element={<PrivateRoutes />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
