import React, { FC, ReactNode, useState } from "react";
import { View, Text, Button, TextInput, Modal, StyleSheet } from "react-native";
import { isNumeric } from "../utils/Validation";
import alert from "../utils/Alert";
import { Player, PlayerList } from "../components/Player";

type props = {
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	children?: ReactNode;
	visible: boolean;
};

const StartGameModal = ({ setVisible, children, visible }: props) => {
	const [players, setPlayers] = useState<Player[]>([
		{ name: "fred1", amountWon: 0 },
		{ name: "fred2", amountWon: 0 },
		{ name: "fred3", amountWon: 0 },
	]);
	const [maxWinnings, setMaxWinnings] = useState("");
	const [playerName, setPlayerName] = useState("");

	const startGameOnPress = () => {
		if (players.length < 2) {
			alert("You cannot start a game with less than 2 players!");
			return;
		}
		if (parseInt(maxWinnings) < 1) {
			alert("You cannot start a game with less than 1 dollar to be won!");
			return;
		}
		setVisible(false);
	};

	return (
		<>
			<View
				style={{
					// alignItems: "center",
					justifyContent: "space-evenly",
					alignSelf: "center",
					flexDirection: "column",
					// alignContent: "stretch",
					borderColor: "black",
					// flexShrink: 1,
					borderWidth: 2,
				}}
			>
				<Modal
					visible={visible}
					animationType="fade"
					onRequestClose={() => setVisible(false)}
					// transparent
					style={{ borderWidth: 1, borderColor: "black" }}
				>
					{/* <View> */}
					<PlayerList {...{ players, setPlayers }} />
					<Text>Winning pot!</Text>
					<TextInput
						onChangeText={(amount) => {
							if (!isNumeric(amount)) {
								alert("only numbers allowed");
							} else setMaxWinnings(amount);
						}}
						value={maxWinnings}
						placeholder="input an amount of money to win!"
						keyboardType="numeric"
						style={{ borderColor: "black", borderWidth: 1 }}
					/>
					{/* </View> */}
					<View style={styles.buttons}>
						<Button title={"Start Game button"} onPress={startGameOnPress} />
						<Gap />
						<TextInput
							onChangeText={(name) => setPlayerName(name)}
							value={playerName}
							placeholder="Input a player name"
							style={{ borderColor: "black", borderWidth: 1 }}
						/>
						<Button
							title={"Add new player"}
							onPress={() => {
								if (playerName) {
									setPlayers((prev) => [
										...prev,
										{ name: playerName, amountWon: 0 },
									]);
									setPlayerName("");
								} else {
									alert("You must add a player name");
								}
							}}
						/>
						{children}
					</View>
				</Modal>
			</View>
		</>
	);
};

const Gap = () => {
	return <View style={styles.gap} />;
};

const beginButtons = () => {};
const moneyInput = () => {};
const startPage = () => {};

const styles = StyleSheet.create({
	gap: { height: 10 },
	playerList: {},
	container: {},
	buttons: { justifyContent: "space-evenly" },
	containeralt: {
		alignItems: "center",
		backgroundColor: "white",
		borderColor: "#eee",
		borderRadius: 10,
		borderWidth: 1,
		justifyContent: "center",
		height: 300,
		margin: "auto",
		padding: 30,
		width: 300,
	},
});

export default StartGameModal;
