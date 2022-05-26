import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';

const GamesForm = () => {
    const { loading, data } = useQuery(GET_ME);
    const [deleteGame] = useMutation(REMOVE_GAME);
    const userData = data?.me || {};
  
    if(!userData?.username) {
      return (
        <h4>
          You need to be logged in to see this page. Use the navigation links above to sign up or log in!
        </h4>
      );
    }
  
    // create function that accepts the games's mongo _id value as param and deletes the book from the database
    const handleDeleteGame = async (gameId) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        await deleteGame({
          variables: {gamesId: gamesId},
          update: cache => {
            const data = cache.readQuery({ query: GET_ME });
            const userDataCache = data.me;
            const savedGamesCache = userDataCache.savedGames;
            const updatedGamesCache = savedGamesCache.filter((games) => games.gamesId !== gamesId);
            data.me.savedGames = updatedGamesCache;
            cache.writeQuery({ query: GET_ME , data: {data: {...data.me.savedGames}}})
          }
        });
        // upon success, remove book's id from localStorage
        removeGameId(gamesId);
      } catch (err) {
        console.error(err);
      }
    };
    // if data isn't here yet, say so
    if (loading) {
      return <h2>LOADING...</h2>;
    }
  
    return (
      <>
        <Jumbotron fluid className='text-light bg-dark'>
          <Container>
            <h1>Viewing favorite games!</h1>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {userData.savedGames.length
              ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
              : 'You have no games books!'}
          </h2>
          <CardColumns>
            {userData.savedGames.map((games) => {
              return (
                <Card key={games.gamesId} border='games'>
                  {games.image ? <Card.Img src={games.image} alt={`The cover for ${games.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{games.title}</Card.Title>
                    <p className='small'>Authors: {games.authors}</p>
                    {games.link ? <Card.Text><a href={book.link} target="_blank" rel="noopener noreferrer" >More Information on Games</a></Card.Text> : null}
                    <Card.Text>{games.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={handleDeleteGame}>
                      Delete this Game from favorite list
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
      </>
    );
};
  
export default GamesForm;