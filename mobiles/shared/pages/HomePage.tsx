import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, Modal } from 'react-native';
import { PlayerList, Player } from '../components/Player';
import {
  Button,
  Avatar,
  List,
  Text,
  Appbar,
  Divider,
} from 'react-native-paper';

const presentURIs = [
  'https://www.psdgraphics.com/file/christmas-gift-icon.jpg',
  'https://sketchok.com/images/articles/08-other/07-different-topics/christmas/04/18.jpg',
  'https://pixy.org/src/92/thumbs350/920906.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdZTZ0f8yQ1c-COzq5ra4DO2wmrEmriae2AM8ShTrriZ5MXmpbkOftPVqoIk3EympB-e0&usqp=CAU',
];

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

    currentActivePlayerIndex = players.findIndex(
      player => player.isActive === true,
    );
  }, [players, winningPot, setShowEndGameModal]);

  let giftRotation = new Animated.Value(0.5);
  Animated.loop(
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
      Animated.timing(giftRotation, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.delay(750),
    ]),
  ).start();

  const interpolatedRotation = giftRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-30deg', '30deg'],
  });

  return (
    <>
      <Appbar.Header dark mode="small">
        <Divider />
        <Appbar.Content
          titleStyle={{ textAlign: 'center' }}
          title={`Remaining Pot: ${winningPot}`}
        />
      </Appbar.Header>
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'space-evenly',
          paddingHorizontal: 20,
          paddingBottom: 20,
          flex: 1,
        }}>
        <PlayerList players={players} />
        {prizeModal ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Text variant="titleLarge" style={{ padding: 20 }}>
              You've won ${currentWinnings}!
            </Text>
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
              }}
              mode="contained-tonal">
              Start Next Player Turn
            </Button>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            {openGift ? (
              <View
                style={{
                  alignContent: 'flex-start',
                  justifyContent: 'space-evenly',
                  flexWrap: 'wrap',
                }}>
                {presentURIs.map(uri => {
                  return (
                    <Animated.View
                      style={{
                        transform: [{ rotateZ: interpolatedRotation }],
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setPrizeModal(true);
                          setCurrentWinnings(getPrizeAmount(winningPot));
                          setOpenGift(false);
                        }}>
                        <Avatar.Image
                          size={100}
                          source={{
                            uri,
                          }}
                        />
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </View>
            ) : (
              <Button mode="contained-tonal" onPress={() => setOpenGift(true)}>
                Open Gift
              </Button>
            )}
          </View>
        )}
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
