import React, { useRef, useState } from 'react';
import StartGameModal from './shared/pages/StartGameModal';
import { Player } from './shared/components/Player';
import HomePage from './shared/pages/HomePage';
import EndGameModal from './shared/pages/EndGameModal';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  colors: {
    primary: 'rgb(1, 110, 33)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(153, 248, 153)',
    onPrimaryContainer: 'rgb(0, 33, 5)',
    secondary: 'rgb(82, 99, 79)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(213, 232, 207)',
    onSecondaryContainer: 'rgb(16, 31, 16)',
    tertiary: 'rgb(57, 101, 107)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(188, 235, 241)',
    onTertiaryContainer: 'rgb(0, 31, 35)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(252, 253, 246)',
    onBackground: 'rgb(26, 28, 25)',
    surface: 'rgb(1, 110, 33)',
    onSurface: 'rgb(26, 28, 25)',
    surfaceVariant: 'rgb(222, 229, 217)',
    onSurfaceVariant: 'rgb(66, 73, 64)',
    outline: 'rgb(114, 121, 111)',
    outlineVariant: 'rgb(194, 201, 189)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 49, 45)',
    inverseOnSurface: 'rgb(240, 241, 235)',
    inversePrimary: 'rgb(126, 219, 127)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(239, 246, 235)',
      level2: 'rgb(232, 242, 229)',
      level3: 'rgb(224, 237, 223)',
      level4: 'rgb(222, 236, 220)',
      level5: 'rgb(217, 233, 216)',
    },
    surfaceDisabled: 'rgba(26, 28, 25, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 25, 0.38)',
    backdrop: 'rgba(44, 50, 42, 0.4)',
  },
};

const App = () => {
  //rename this as "Game"? Make a parent class that controls the flow over the modals and overall game then the smaller modals can control their speicfic funcitonality
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [showStartGameModal, setShowStartGameModal] = useState(true);
  const [players, setPlayers] = useState<Player[]>([
    { name: 'fred', isActive: true, amountWon: 10 },
    { name: 'fred', amountWon: 10 },
    { name: 'fred', amountWon: 100 },
  ]);
  const [moneyTotal, setMoneyTotal] = useState(10);

  const resetState = () => {
    setShowStartGameModal(true);
    setShowEndGameModal(false);
    setMoneyTotal(0);
    setPlayers([]);
  };

  return (
    <PaperProvider theme={theme}>
      {/* <StartGameModal
        visible={showStartGameModal}
        setVisible={state => setShowStartGameModal(state)}
        players={players}
        setPlayers={setPlayers}
        setMoneyTotal={setMoneyTotal}
      /> */}
      {moneyTotal > 0 && (
        <HomePage
          {...{ players, setPlayers, moneyTotal, setShowEndGameModal }}
        />
      )}
      {/* <EndGameModal
        visible={showEndGameModal}
        resetState={resetState} //change these to (state) => setState(state) and find out why this is better (also change the types)
        players={players}
      /> */}
    </PaperProvider>
  );
};

export default App;
