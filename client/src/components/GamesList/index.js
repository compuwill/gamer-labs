import React from 'react';
import { Link } from 'react-router-dom';

const GamesList = ({ games, title }) => {
  if (!games.length) {
    return <h3>No Games Added Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {games &&
        games.map(games => (
          <div key={games._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {games.username}
              </Link>{' '}
              Added to Favorite {games.createdAt}
            </p>
          </div>
        ))}
    </div>
  );
};

export default GamesList;