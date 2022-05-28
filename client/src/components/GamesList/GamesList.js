import React from 'react';
import { Link } from 'react-router-dom';

const GamesList = ({ gamesCount, username, favoriteGames }) => {
  if (!favoriteGames || !favoriteGames.length) {
    return <p className="bg-dark text-light p-3">{username}, Favorite Games</p>;
  }

  return (
    <div>
      <h5>
        {username}'s {gamesCount} {gamesCount === 1 ? 'game' : 'games'}
      </h5>
      {favoriteGames.map(gamesList => (
        <button className="btn w-100 display-block mb-2" key={favoriteGames._id}>
          <Link to={`/profile/${favoriteGames.username}`}>{favoriteGames.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default GamesList;