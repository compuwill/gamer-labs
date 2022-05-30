import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>Game Talk Starts Here!</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map(thought => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>{' '}
              created post on {thought.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/thought/${thought._id}`}>
                <p className='postText'>{thought.thoughtText}</p>
                <div className="mb-0 commentSection">
                  <div>Click to View Comments</div>
                  <div>Total Comments: {thought.reactionCount}</div>
                </div>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
