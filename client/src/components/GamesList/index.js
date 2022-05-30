import React, { useState } from 'react';
import { useMutation } from '@apollo/client';import Auth from '../../utils/auth';
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { REMOVE_GAME } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';


const GamesList = ({ games }) => {
  const [gameid, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [removeGame, { error }] = useMutation(REMOVE_GAME, {
    update(cache, { data: { removeGame } }) {
      
      // could potentially not exist yet, so wrap in a try/catch
    try {
      // update me array's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, games: [...me.games.filter(function (el) {
          return el._id != removeGame._id
        }) ] } },
      });
    } catch (e) {
      console.warn("First Game insertion by user!")
    }

    // update games array's cache
    // console.log('before');
    // const { games } = cache.readQuery({ query: QUERY_GAMES });
    // cache.writeQuery({
    //   query: QUERY_GAMES,
    //   data: { games: [addGame, ...games] },
    // });
    // console.log('after');
  }
  });

  // submit form
  const handleDelete = async (game_id ,event) => {
    setText(game_id);

    console.log(game_id);
    try {
      await removeGame({
        variables: { gameid: game_id },
      });

    } catch (e) {
      console.error(e);
    }
  };


  if (!games) {
    return <p className="bg-dark text-light p-3">Not playing any games 😢</p>;
  }

  return (
    <div className='GamesContainer bg-secondary p-3 gList'>
      <h5>
        Playing {games.length} {games.length === 1 ? 'game' : 'games'}
      </h5>
      {games.map(game => (
        <div className="game-item w-100 d-flex flex-row" key={game._id}>
          <div>▪ {game.gameTitle}</div> {Auth.getProfile().data.username === game.username ? (<button className='btn-mini' onClick={(e) => handleDelete(game._id, e)} data-gameid={game._id}><FontAwesomeIcon icon={faTrashCan}/></button>) : ''} 
        </div>
      ))}
    </div>
  );
};

export default GamesList;