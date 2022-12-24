import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StartGameModal from "./shared/pages/StartGameModal";
import { Player } from "./shared/components/Player";
import HomePage from "./shared/pages/HomePage";
import EndGameModal from "./shared/pages/EndGameModal";
import { View } from "react-native";

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

	console.log("index#endgameState", showEndGameModal);
	return (
		<View style={{ padding: 10, borderWidth: 1, borderColor: "black" }}>
			{/* <HomePage
				{...{ players, setPlayers, moneyTotal: 2, setShowEndGameModal }}
			/> */}
			<StartGameModal
				visible={showStartGameModal}
				setVisible={(state) => setShowStartGameModal(state)}
			></StartGameModal>
			{/* <EndGameModal
				visible={showEndGameModal}
				setVisible={setShowEndGameModal}
				players={players}
				showStartModal={setShowStartGameModal} //change these to (state) => setState(state) and find out why this is better (also change the types)
			></EndGameModal> */}
		</View>
	);
};

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<App />);
