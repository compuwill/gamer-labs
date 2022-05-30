import React from 'react';
import { Link } from 'react-router-dom';

const ReactionList = ({ reactions }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        {reactions &&
          reactions.map(reaction => (
            <p className="mb-3" key={reaction._id}>
              {' '} {reaction.reactionBody} 
              <br></br>
              <Link to={`/profile/${reaction.username}`}>
                {reaction.username} commented on {reaction.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReactionList;
