import React, { useState } from "react";
import { View, Text, Button, TextInput, Modal } from "react-native";

type Player = {
	name: string;
	amountWon: 0;
};

const StartPage = () => {
	const [players, setPlayers] = useState<Player[]>([]);
	const [moneyTotal, setMoneyTotal] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<View
				style={{
					flex: 0,
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<View>
					<Modal
						visible={modalVisible}
						transparent={false}
						onRequestClose={() => setModalVisible(false)}
						style={{ backgroundColor: "red" }}
					>
						<Text>I am a modal</Text>
						<Button
							title="close the modal"
							onPress={() => setModalVisible(false)}
						></Button>
					</Modal>
				</View>
				<View>
					{players.map((player) => (
						<Text>{player.name}</Text>
					))}
				</View>
				<TextInput
					onChangeText={(amount) => setMoneyTotal(amount)}
					value={moneyTotal}
					placeholder="input an amount of money to win!"
					keyboardType="numeric"
				/>
				<View>
					<Button
						title={"Start Game button"}
						onPress={() => console.log("you started a game")}
					/>
					<Button
						title={"Add new player"}
						onPress={() => setModalVisible((prev) => !prev)}
					/>
				</View>
			</View>
		</>
	);
};

const playerList = () => {};
const beginButtons = () => {};
const moneyInput = () => {};
const startPage = () => {};

export default StartPage;
