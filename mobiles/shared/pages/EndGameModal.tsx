import React, { useState } from "react";
import { View, Text, Modal, Button } from "react-native";
import { Player, PlayerList } from "../components/Player";

type props = {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	players: Player[];
	showStartModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EndGameModal = ({
	visible,
	players,
	showStartModal,
	setVisible,
}: props) => {
	return (
		<Modal {...{ visible }}>
			<View>
				<Text>End Game Modal, Here are the final winning numbers</Text>
				<PlayerList players={players}></PlayerList>
				<Button
					title="Exit"
					onPress={() => console.log("you exited the game")}
				/>
				<Button
					title="New Game"
					onPress={() => {
						setVisible(false);
						showStartModal(true);
					}}
				/>
			</View>
		</Modal>
	);
};

export default EndGameModal;
