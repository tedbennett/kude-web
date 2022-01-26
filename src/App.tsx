import "./App.css";
import CSS from "csstype";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SessionParent } from "./pages/SessionParent";
import { Home } from "./pages/Home";

const styles: CSS.Properties = {
  height: "100%",
  minHeight: "100vh",
};

export const App = () => {
  return (
    <BrowserRouter>
      {/* Background styles */}
      <div style={styles} className="dark:bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/session/:sessionId" element={<SessionParent/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
