import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const baseURL = "/Evan-form-front-end";

createRoot(document.getElementById("root")).render(
    <Router basename={baseURL}>
        <App />
    </Router>
);
