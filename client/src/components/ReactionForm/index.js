import React, { useState } from 'react';
import './index.css'
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';

const ReactionForm = ({ thoughtId }) => {
  const [reactionBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addReaction, { error }] = useMutation(ADD_REACTION);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addReaction({
        variables: { reactionBody, thoughtId },
      });

      // clear form value
      setBody('');
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
        <textarea
          placeholder="Leave Comment"
          value={reactionBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3 comment" type="submit">
          Comment
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default ReactionForm;
