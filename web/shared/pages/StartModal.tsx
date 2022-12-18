import React, { useState } from "react";
import {
	View,
	Text,
	Button,
	TextInput,
	Modal,
	StyleSheet,
	Alert,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { isNumeric } from "../utils/Validation";
import alert from "../utils/Alert";

type Player = {
	name: string;
	amountWon: number;
};

const StartModal = () => {
	const [players, setPlayers] = useState<Player[]>([]);
	const [moneyTotal, setMoneyTotal] = useState("");
	const [modalVisible, setModalVisible] = useState(true);
	const [playerName, setPlayerName] = useState("");

	const startGameOnPress = () => {
		if (players.length < 2) {
			alert("You cannot start a game with less than 2 players!");
			return;
		}
		if (parseInt(moneyTotal) < 1) {
			alert("You cannot start a game with less than 1 dollar to be won!");
			return;
		}

		setModalVisible(false);
	};

	return (
		<>
			<Button
				title={"make modal visible"}
				onPress={() => setModalVisible((prev) => !prev)}
			/>
			<Modal
				visible={modalVisible}
				animationType="fade"
				onRequestClose={() => setModalVisible(false)}
			>
				<Button
					title={"make modal visible"}
					onPress={() => alert("test alert")}
				/>
				<View
					style={{
						flex: 3,
						alignItems: "center",
						justifyContent: "space-evenly",
						alignContent: "center",
						borderColor: "black",
						flexShrink: 1,
						borderWidth: 2,
					}}
				>
					<View>
						<PlayerList {...{ players, setPlayers }} />
						<Text>Winning pot!</Text>
						<TextInput
							onChangeText={(amount) => {
								console.log(isNumeric(amount) + " " + amount);
								if (!isNumeric(amount)) {
									alert("only numbers allowed");
								} else setMoneyTotal(amount);
							}}
							value={moneyTotal}
							placeholder="input an amount of money to win!"
							keyboardType="numeric"
							style={{ borderColor: "black", borderWidth: 1 }}
						/>
					</View>
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
					</View>
				</View>
			</Modal>
		</>
	);
};

const Gap = () => {
	return <View style={styles.gap} />;
};

const PlayerList = ({
	players,
	setPlayers,
}: {
	players: Player[];
	setPlayers: React.SetStateAction<Player[]>;
}) => {
	return (
		<View>
			{players.map((player: Player, index) => (
				<View>
					<Text>
						{player.name}: {player.amountWon}
					</Text>
					<Button
						title="X"
						onPress={() =>
							setPlayers((prev) =>
								prev.filter((currPlayer, pos) => index !== pos)
							)
						}
					/>
				</View>
			))}
		</View>
	);
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

export default StartModal;
