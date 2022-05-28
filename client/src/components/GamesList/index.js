import React from 'react';
import { Link } from 'react-router-dom';

const GamesList = ({ games }) => {
  if (!games) {
    return <p className="bg-dark text-light p-3">Not playing any games 😢</p>;
  }

  return (
    <div>
      <h5>
        Playing {games.length} {games.length === 1 ? 'game' : 'games'}
      </h5>
      {games.map(game => (
        <button className="btn w-100 display-block mb-2" key={game._id}>
          {game.gameTitle}
        </button>
      ))}
    </div>
  );
};

export default GamesList;