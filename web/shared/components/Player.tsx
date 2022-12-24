import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

export type Player = {
	name: string;
	amountWon: number;
	isActive?: boolean;
};

type PlayerListProps = {
	players: Player[];
	setPlayers?: React.Dispatch<React.SetStateAction<Player[]>>;
};

export const PlayerList = ({ players, setPlayers }: PlayerListProps) => {
	const onRemovePlayer = setPlayers
		? (player: Player) => () => {
				setPlayers((prev) =>
					prev.filter((currPlayer) => player.name !== currPlayer.name)
				);
		  }
		: undefined;

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text>Players</Text>
				{players.map((player: Player) => (
					<>
						<ListItem player={player} onRemovePlayer={onRemovePlayer(player)} />
						<Divider />
					</>
				))}
			</View>
		</ScrollView>
	);
};

type ListItemProps = {
	player: Player;
	onRemovePlayer?: () => void;
};

const ListItem = ({ player, onRemovePlayer }: ListItemProps) => {
	return (
		<View style={styles.listItem}>
			<Text style={[styles.text, player.isActive && { fontWeight: "bold" }]}>
				{player.name} : {player.amountWon}
			</Text>
			{onRemovePlayer && (
				<View style={styles.removeButton}>
					<Button title="X" onPress={onRemovePlayer} />
				</View>
			)}
		</View>
	);
};

const Divider = () => (
	<View
		style={{
			height: StyleSheet.hairlineWidth,
			width: "80%",
			alignSelf: "center",
			backgroundColor: "steelblue",
		}}
	/>
);

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "white",
		flex: 1,
		alignItems: "center",
		backgroundColor: "aliceblue",
		alignSelf: "flex-start",
		//  backgroundColor: "powderblue",
		//  backgroundColor: "steelblue" skyblue
	},
	listItem: {
		flexDirection: "row",
	},
	removeButton: {
		flexGrow: 1,
		padding: 10,
		opacity: 0.3,
		color: "steelblue",
		justifyContent: "flex-end",
	},
	text: {
		flexGrow: 2,
		color: "steelblue",
		fontWeight: "300",
		justifyContent: "center",
		alignContent: "center",
		fontSize: 20,
	},
});
