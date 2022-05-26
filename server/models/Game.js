const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
      gameTitle: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
      }
    }
);

const Game = model('Game', gameSchema);

module.exports = Game;