import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StartGameModal, { Player } from "./shared/pages/StartGameModal";
import HomePage from "./shared/pages/HomePage";
import EndGameModal from "./shared/pages/EndGameModal";

const App = () => {
	//rename this as "Game"? Make a parent class that controls the flow over the modals and overall game then the smaller modals can control their speicfic funcitonality
	const [showEndGameModal, setShowEndGameModal] = useState(false);
	const [showStartGameModal, setShowStartGameModal] = useState(true);
	const [players, setPlayers] = useState<Player[]>([
		{ name: "fred1", amountWon: 0 },
		{ name: "fred2", amountWon: 0 },
		{ name: "fred3", amountWon: 0 },
		// { name: "fred4", amountWon: 0 },
		// { name: "fred5", amountWon: 0 },
	]);
	return (
		<>
			<HomePage
				{...{ players, setPlayers, moneyTotal: 5, setShowEndGameModal }}
			/>
			<StartGameModal visible={showStartGameModal}></StartGameModal>
			<EndGameModal
				visible={showEndGameModal}
				players={players}
				showStartModal={setShowStartGameModal} //change these to (state) => setState(state) and find out why this is better (also change the types)
			></EndGameModal>
		</>
	);
};

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<App />);
