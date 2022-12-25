import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { List, Button, Divider } from 'react-native-paper';

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
        setPlayers(prev =>
          prev.filter(currPlayer => player.name !== currPlayer.name),
        );
      }
    : undefined;

  return (
    <View style={styles.container}>
      <List.Section style={styles.container}>
        <List.Subheader>Players</List.Subheader>
        <ScrollView>
          {players.map((player: Player, index: number) => (
            <>
              <List.Item
                title={player.name}
                key={index}
                description={player.amountWon + ''}
                left={() => {
                  return player.isActive ? (
                    <List.Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/1324/1324728.png',
                      }}
                      style={{ resizeMode: 'center', width: 5, height: 5 }}
                    />
                  ) : undefined;
                }}
                right={() =>
                  onRemovePlayer ? (
                    <Button onPress={onRemovePlayer(player)}>X</Button>
                  ) : undefined
                }
              />
              <Divider />
            </>
          ))}
        </ScrollView>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexBasis: 1,
    // innerWidth: '80%',
    // borderWidth: 1,
    // borderColor: 'white',
    // backgroundColor: 'aliceblue',
    //  backgroundColor: "powderblue",
    //  backgroundColor: "steelblue" skyblue
  },
  listItem: {
    flexDirection: 'row',
    flex: 1,
    alignContent: 'center',
  },
  removeButton: {
    flexGrow: 1,
    padding: 10,
    opacity: 0.3,
    color: 'steelblue',
    justifyContent: 'flex-end',
  },
  text: {
    flexGrow: 2,
    color: 'steelblue',
    fontWeight: '300',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 20,
  },
});
