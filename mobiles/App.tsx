import React, { useState } from 'react';
import StartGameModal from './shared/pages/StartGameModal';
import { Player } from './shared/components/Player';
import HomePage from './shared/pages/HomePage';
import EndGameModal from './shared/pages/EndGameModal';
import { View } from 'react-native';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  //rename this as "Game"? Make a parent class that controls the flow over the modals and overall game then the smaller modals can control their speicfic funcitonality
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [showStartGameModal, setShowStartGameModal] = useState(true);
  const [players, setPlayers] = useState<Player[]>([
    { name: 'fred1', amountWon: 0 },
    { name: 'fred2', amountWon: 0 },
    { name: 'fred3', amountWon: 0 },
    // { name: "fred4", amountWon: 0 },
    // { name: "fred5", amountWon: 0 },
  ]);

  console.log('index#endgameState', showEndGameModal);
  return (
    <PaperProvider>
      <Appbar.Header dark mode="small">
        <Appbar.Content
          title="Christmas Sweep Stakes!"
          titleStyle={{ textAlign: 'center' }}
        />
      </Appbar.Header>
      <HomePage
        {...{ players, setPlayers, moneyTotal: 100, setShowEndGameModal }}
      />
      {/* <StartGameModal
        visible={showStartGameModal}
        setVisible={state => setShowStartGameModal(state)}
      /> */}
      {/* <EndGameModal
				visible={showEndGameModal}
				setVisible={setShowEndGameModal}
				players={players}
				showStartModal={setShowStartGameModal} //change these to (state) => setState(state) and find out why this is better (also change the types)
			></EndGameModal> */}
    </PaperProvider>
  );
};

export default App;
