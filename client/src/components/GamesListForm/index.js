import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_GAME } from '../../utils/mutations';
import { QUERY_GAMES, QUERY_ME } from '../../utils/queries';

const GamesListForm = () => {
  const [gameTitle, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addGame, { error }] = useMutation(ADD_GAME, {
    update(cache, { data: { addGame } }) {
      
        // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, games: [...me.games, addGame] } },
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


  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addGame({
        variables: { gameTitle },
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Game Title"
          value={gameTitle}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></input>
        <button className="btn col-12 col-md-3" type="submit">
          Add Game
        </button>
      </form>
    </div>
  );
};

export default GamesListForm;