import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_GAME } from '../../utils/mutations';
import { QUERY_GAMES, QUERY_ME } from '../../utils/queries';

const GamesListForm = () => {
  const [gamesText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addGames, { error }] = useMutation(ADD_FAVORITE_GAME, {
    update(cache, { data: { addGames } }) {
      
        // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_GAMES });
        cache.writeQuery({
          query: QUERY_GAMES,
          data: { me: { ...me, games: [...me.games, addGames] } },
        });
      } catch (e) {
        console.warn("First Game insertion by user!")
      }

      // update games array's cache
      const { games } = cache.readQuery({ query: QUERY_GAMES });
      cache.writeQuery({
        query: QUERY_GAMES,
        data: { games: [addGames, ...thoughts] },
      });
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
      await addGames({
        variables: { gamesText },
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
      <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Add Games List"
          value={gamesText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GamesListForm;