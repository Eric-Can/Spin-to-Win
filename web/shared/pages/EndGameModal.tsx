import React from "react";
import { View, Text, Modal, Button } from "react-native";
import { Player, PlayerList } from "./StartGameModal";

type props = {
	visible: boolean;
	players: Player[];
	showStartModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EndGameModal = ({ visible, players, showStartModal }: props) => {
	return (
		<Modal {...{ visible }}>
			<View>
				<Text>End Game Modal, Here are the final winning numbers</Text>
				<PlayerList players={players}></PlayerList>
				<Button
					title="Exit"
					onPress={() => console.log("you exited the game")}
				/>
				<Button title="New Game" onPress={() => showStartModal(true)} />
			</View>
		</Modal>
	);
};

export default EndGameModal;
