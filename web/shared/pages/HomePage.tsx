import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Image,
	Animated,
	Modal,
} from "react-native";
import { PlayerList, Player } from "../components/Player";

const possibleWinnings = [1, 2, 5, 10, 20, 50, 100];
let currentActivePlayerIndex = 0; // Math.floor(Math.random() * players.length); // ([nextPlayer, currentPlayer] = useTrackActivePlayer) move the tracking player functionality to a custom hook? useEffect to trakc anytime something changed (like winings?) then upate the current player?

type props = {
	players: Player[];
	moneyTotal: number;
	setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
	setShowEndGameModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomePage = ({
	players,
	setPlayers,
	moneyTotal,
	setShowEndGameModal,
}: props) => {
	//add functionality for a playre being active and getting a prize
	const [prizeModal, setPrizeModal] = useState(false);
	const [currentWinnings, setCurrentWinnings] = useState(10);
	const [winningPot, setWinningPot] = useState(moneyTotal);
	const [openGift, setOpenGift] = useState(false);

	useEffect(() => {
		console.log("winning is ", winningPot);
		if (winningPot === 0) {
			console.log("set endgame state");
			setShowEndGameModal(true);
		}
	}, [winningPot]);

	useEffect(() => {
		setPlayers(
			(
				prevPlayerState //set first player
			) =>
				prevPlayerState.map((player, index) => {
					if (currentActivePlayerIndex === index) player.isActive = true;
					return player;
				})
		);
	}, []);

	let giftRotation = new Animated.Value(0);
	Animated.loop(
		//turn this into an animated function?
		Animated.sequence([
			Animated.timing(giftRotation, {
				toValue: 1,
				duration: 500,
				useNativeDriver: false,
			}),
			Animated.timing(giftRotation, {
				toValue: 0,
				duration: 500,
				useNativeDriver: false,
			}),
			Animated.delay(750),
		])
	); //.start();

	const interpolatedRotation = giftRotation.interpolate({
		inputRange: [0, 1],
		outputRange: ["-30deg", "30deg"],
	});

	return (
		<View
			style={{
				flex: 0,
				alignItems: "center",
				justifyContent: "space-evenly",
				alignContent: "center",
			}}
		>
			<View>
				<PlayerList players={players} />
				<Text style={{ fontSize: 20, borderWidth: 2 }}>{winningPot}</Text>
			</View>
			<Modal visible={prizeModal} onRequestClose={() => setPrizeModal(false)}>
				<View>
					<Text>You've won {currentWinnings}</Text>
					{/* add easing animation for hte prize?*/}
					<Button
						title="start next player turn"
						onPress={() => {
							setPlayers((prevPlayerState) => {
								console.log(currentActivePlayerIndex);
								const activePlayer = prevPlayerState.filter(
									(player) => player.isActive === true
								);
								activePlayer[0].amountWon += currentWinnings;
								activePlayer[0].isActive = false;

								currentActivePlayerIndex =
									(currentActivePlayerIndex + 1) % players.length;
								const nextPlayer = prevPlayerState.filter(
									(player, index) => index === currentActivePlayerIndex
								);
								nextPlayer[0].isActive = true;

								return prevPlayerState;
							});
							setPrizeModal(false);
							setOpenGift(false);
							setWinningPot((prev) => prev - currentWinnings);
						}}
					></Button>
				</View>
			</Modal>
			{openGift && (
				<Animated.View
					style={{ transform: [{ rotateZ: interpolatedRotation }] }}
				>
					<TouchableOpacity
						onPress={() => {
							setPrizeModal(true);
							setCurrentWinnings(getPrizeAmount(winningPot));
						}}
					>
						<Text>Click here to open your gift</Text>
						{/* <Image source={}></Image> */}
					</TouchableOpacity>
				</Animated.View>
			)}
			<View>
				<Button title="open gift" onPress={() => setOpenGift(true)} />
			</View>
		</View>
	);
};

const getPrizeAmount = (max: number) => {
	//make this algorithm better later
	//keep max winnings less than 40% of the pot
	// only use the enums
	// make it more likely that lower numbers are used (have a percent?)
	let maxOptions;
	console.log(max);
	const maxPossibleWinning = Math.floor(max / 3);

	switch (true) {
		case maxPossibleWinning >= 100:
			maxOptions = 7;
			break;
		case maxPossibleWinning >= 50:
			maxOptions = 5;
			break;
		case maxPossibleWinning >= 20:
			maxOptions = 4;
			break;
		case maxPossibleWinning >= 10:
			maxOptions = 3;
			break;
		case maxPossibleWinning >= 5:
			maxOptions = 2;
			break;
		default:
			maxOptions = 1;
			break;
	}

	const pos = Math.floor(Math.random() * maxOptions);
	console.log(maxOptions, maxPossibleWinning, pos, possibleWinnings[pos]);

	return possibleWinnings[pos];
};

export default HomePage;
