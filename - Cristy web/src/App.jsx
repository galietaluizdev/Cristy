import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { BottomBar } from "./components/BottomBar/BottomBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pacientes" element={<BottomBar/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
