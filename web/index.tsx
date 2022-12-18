import React from "react";
import ReactDOM from "react-dom/client";
import StartModal from "./shared/pages/StartModal";

const App = () => {
	return <StartModal />;
};

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<App />);
