// src/components/CharacterDetails.js

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


function CharacterDetails() {
  const { characterId } = useParams();          
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const deleteCharacter = () => {
        axios
            .delete(`http://127.0.0.1:5000/characters/${characterId}`)
            .then(() => {
                setDeleted(true);
                console.log(characterId + " has been deleted.")
            })
            .catch((error) => {
                console.log(error);
            });
  }

  useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/characters/${characterId}`)
            .then((response) => {
                setCharacter(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load product details.");
                setLoading(false);
            });
    }, [characterId])

    if (loading) return 
          <Container>
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: '15px' }}
            role="status"
          />
          Loading Character Information...
        </h3>
      </Container>
    if (error) return <p>{error}</p>
    if (deleted) return (
        <Alert variant="success">
            Character has been deleted successfully!
        </Alert>
    )  

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h2 className="mb-4">View Character</h2>

      <Card style={{ width: '24rem' }} className="shadow rounded">
        <Card.Img
          variant="top"
          src={character.image_url}
          alt={`${character.name} image`}
          style={{ height: '320px', objectFit: 'contain' }}
        />
        <Card.Body>
          <Card.Title className="fw-bold">{character.name}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">Alias: {character.alias}</Card.Subtitle>
          <Card.Text><strong>Alignment:</strong> {character.alignment.charAt(0).toUpperCase() + character.alignment.slice(1)}</Card.Text>
          <Card.Text><strong>Powers:</strong> {character.powers}</Card.Text>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" href={`/characters`} style={{ margin: '10px' }}>Back to All Characters</Button>
                <Button as="a" href={`/characters/${characterId}/edit`} style={{ margin: '10px' }} variant='warning'>Update Character</Button>
                <Button onClick={deleteCharacter} style={{ margin: '10px' }} variant='danger'>Delete Character</Button>
                

              </div>
    </Container>
    
  );
}

export default CharacterDetails;