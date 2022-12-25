import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, Modal } from 'react-native';
import { PlayerList, Player } from '../components/Player';
import { Button, Avatar, List, Text, Appbar } from 'react-native-paper';

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
    console.log('winning is ', winningPot);
    if (winningPot === 0) {
      console.log('set endgame state');
      setShowEndGameModal(true);
    }
  }, [winningPot, setShowEndGameModal]);

  useEffect(() => {
    setPlayers(
      (
        prevPlayerState, //set first player
      ) =>
        prevPlayerState.map((player, index) => {
          if (currentActivePlayerIndex === index) player.isActive = true;
          return player;
        }),
    );
  }, [setPlayers]);

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
    ]),
  ); //.start();

  const interpolatedRotation = giftRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-30deg', '30deg'],
  });

  return (
    <>
      <View
        style={{
          // justifyContent: 'center',
          alignContent: 'center',
          justifyContent: 'space-evenly',
          // alignSelf: 'center',
          padding: 50,
          flex: 2,
        }}>
        <Appbar.Content title={`Remaining Pot: ${winningPot}`} />
        <PlayerList players={players} />
        <View>
          <Button mode="contained-tonal" onPress={() => setOpenGift(true)}>
            Open Gift
          </Button>
        </View>
        {prizeModal && (
          <>
            <Text>You've won {currentWinnings}</Text>
            {/* add easing animation for hte prize?*/}
            <Button
              onPress={() => {
                setPlayers(prevPlayerState => {
                  console.log(currentActivePlayerIndex);
                  const activePlayer = prevPlayerState.filter(
                    player => player.isActive === true,
                  );
                  activePlayer[0].amountWon += currentWinnings;
                  activePlayer[0].isActive = false;

                  currentActivePlayerIndex =
                    (currentActivePlayerIndex + 1) % players.length;
                  const nextPlayer = prevPlayerState.filter(
                    (player, index) => index === currentActivePlayerIndex,
                  );
                  nextPlayer[0].isActive = true;

                  return prevPlayerState;
                });
                setPrizeModal(false);
                setOpenGift(false);
                setWinningPot(prev => prev - currentWinnings);
              }}>
              Start Next Player Turn
            </Button>
          </>
        )}
        <View style={{ paddingVertical: 100 }}>
          {openGift && (
            <Animated.View
              style={{ transform: [{ rotateZ: interpolatedRotation }] }}>
              <TouchableOpacity
                onPress={() => {
                  setPrizeModal(true);
                  setCurrentWinnings(getPrizeAmount(winningPot));
                  setOpenGift(false);
                }}>
                <List.Image
                  variant="image"
                  source={{
                    uri: 'https://cdn5.vectorstock.com/i/1000x1000/24/79/christmas-gift-icon-in-flat-style-vector-11872479.jpg',
                  }}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </View>
    </>
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
