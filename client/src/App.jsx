import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  CreateProblem,
  ProblemsList,
  Register,
  SingleProblem,
  Home,
} from "./pages";
import { Footer, Header } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-problem" element={<CreateProblem />} />
        <Route path="/problem" element={<ProblemsList />} />
        <Route path="/problem/:id" element={<SingleProblem />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
