import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import User from "./pages/User";

function App() {
  return (
    <main>
      {/* <Search /> */}
      {/* <User /> */}
      <Routes>
        <Route exact path="/" element={<Search />} />
        <Route path="/user/:userName" element={<User />} />
      </Routes>
    </main>
  );
}

export default App;
