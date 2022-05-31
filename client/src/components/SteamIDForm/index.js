import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_STEAM } from '../../utils/mutations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

const SteamIDForm = ({ gotSteamID }) => {
  const [steamID, setBody] = useState(gotSteamID);
  const [btnText, setBtn] = useState('Update Steam ID');
  const [updateUserSteam, { error }] = useMutation(UPDATE_USER_STEAM);

    // update state based on form input changes
    const handleChange = (event) => {
      if (event.target.value.length <= 280) {
        setBody(event.target.value);
      }
    };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateUserSteam({
        variables: { steamUser: steamID },
      });

      // clear form value
      //setBody('');
      setBtn('Updated!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='ml-auto'>
      <form
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Please enter in your Steam ID"
          value={steamID}
          className="form-input"
          onChange={handleChange}
        ></input>
        <button className="btn mb-3 w-100" type="submit" id="updatebtn">
          {btnText}
        </button>
      </form>
    </div>
  );
};


export default SteamIDForm;
