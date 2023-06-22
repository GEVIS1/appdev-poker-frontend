import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../contexts/GameContext';
import StartGameButton from '../buttons/StartGameButton';
import LeaveGameButton from '../buttons/LeaveGameButton';
import { AuthContext } from '../contexts/AuthContext';
import PokerClass, { Card, Hand } from '../utils/poker/game';
import CardComponent from './CardComponent';
import HiddenHand from './HiddenHand';
import OtherHand from './OtherHand';
import { Player } from '../utils/firebase/poker';
import endTurn from '../utils/firebase/endTurn';

// Prototype code below ==========================================================================
const poker = new PokerClass();
poker.shuffleDeck();

const scores = [123, 239, 0, 0];

const defaultHand: Hand = poker.dealAHand();
// Prototype code above ==========================================================================

function Poker() {
  const { currentGame, gameData } = useContext(GameContext);
  const { user } = useContext(AuthContext);
  const [isOwner, setIsOwner] = useState(
    gameData && user && gameData.creator.uid === user.uid,
  );
  const [yourIndex, setYourIndex] = useState<number | null>(null);

  // Prototype code below ==========================================================================
  const [currentHand, setCurrentHand] = useState<Hand>(defaultHand);

  const changeCard = (index: number) => setCurrentHand((prev) => {
    if (!prev.cards) return prev;
    const cards = [...prev.cards];
    cards[index] = poker.dealACard();
    return { cards } as Hand;
  });
  // Prototype code above ==========================================================================

  useEffect(() => {
    if (gameData && user) {
      setIsOwner(gameData.creator.uid === user.uid);

      /*
       * Attempt to find the index of the player in the gameData,
       * this is needed to match the player to their hand,
       * and to know if it's their turn by checking currentPlayer
       * against player's index in the players array.
       */
      const filteredPlayers = gameData.players.filter(
        (p: Player) => p.uid === user.uid,
      );

      if (filteredPlayers.length === 0) return;

      const playerUid = filteredPlayers[0].uid;

      if (playerUid) {
        const playerIndex = gameData.players.findIndex(
          (player: Player) => player.uid === playerUid,
        );
        if (playerIndex === -1) return;
        setYourIndex(playerIndex);
      }
    }
  }, [gameData, user]);

  if (currentGame && gameData && user && yourIndex !== null) {
    return (
      <div
        id="poker"
        data-testid="poker"
        className="flex flex-col border-2 border-green-900 rounded-lg p-4 gap-1 w-full"
      >
        <div
          id="game"
          className="flex flex-col gap-7 justify-center items-center p-6 h-gamearea"
        >
          {/*
           * Draw the other players' hands. Only draws the hands of players in the game.
           */}
          {gameData.hands.map((hand: Hand, i: number) => {
            // Don't draw your own hand, or hands for non-existent players
            if (gameData.players[i]?.uid === user.uid || !gameData.players[i]) {
              return null;
            }
            if (hand.cards === null) {
              return <HiddenHand keyProp={i.toString()} />;
            }
            return (
              <OtherHand
                key={
                  hand.cards
                    .map((card: Card) => card.suit + card.rank)
                    .join('') + i.toString()
                }
                hand={hand}
                currentTurn={gameData.currentTurn === i}
                playerName={gameData.players[i].name}
                score={scores[i]}
              />
            );
          })}
          {/*
           * Draw the hand of the player.
           */}
          <div
            className={`flex flex-col justify-center items-center mt-auto mb-auto border-2 rounded-lg px-5 pb-4 pt-1 ${
              // If it's your turn, highlight your hand
              yourIndex === gameData.currentTurn
                ? 'border-yellow-600'
                : 'border-green-900'
            }`}
          >
            <div className="flex flex-row justify-between">
              {scores[yourIndex] ? (
                <div>{`Score: ${scores[yourIndex]}`}</div>
              ) : null}
            </div>
            <div id="myHand" className="flex flex-col">
              <div className="flex flex-row gap-5 mb-3">
                {currentHand.cards
                  && currentHand.cards.map((card, i) => (
                    <div
                      key={card.suit + card.rank}
                      className="flex flex-col justify-center items-center gap-4"
                    >
                      <CardComponent className="text-9xl" card={card} />
                      {yourIndex === gameData.currentTurn && (
                        <button
                          type="button"
                          key={i.toString()}
                          onClick={() => changeCard(i)}
                          className="bg-yellow-600 rounded-md px-2 py-1 text-white "
                        >
                          Swap
                        </button>
                      )}
                    </div>
                  ))}
              </div>
              {yourIndex === gameData.currentTurn && (
                <button
                  type="button"
                  onClick={() => endTurn(user, currentGame)}
                  className="bg-yellow-600 rounded-md px-2 py-1 text-white "
                >
                  End Turn
                </button>
              )}
            </div>
          </div>
          <div id="gameButtons" className="flex flex-row gap-2">
            {user && isOwner && gameData.currentTurn === -1 ? (
              <StartGameButton />
            ) : null}
            <LeaveGameButton />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default Poker;
