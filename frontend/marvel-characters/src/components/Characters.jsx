// src/components/Characters.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Characters() {
  const [characters, setCharacters] = useState([]);     // State to store characters
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);    // Error state

  // useEffect to fetch users when component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/characters')
      .then(response => {
        setCharacters(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(`Failed to fetch characters: ${error.message}`);
        setLoading(false);
      });

  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return (
      <Container>
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: '15px' }}
            role="status"
          />
          Loading Characters...
        </h3>
      </Container>
    )
  }

  if (error) return <p>{error}</p>;

  return (
  <Container className="mt-4">
    <h3 className="mb-4 text-center">Character List</h3>
    <Row className="g-4">
      {characters.map(character => (
        <Col key={character.id} xs={12} sm={6} md={4} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src={character.image_url}
              alt={`${character.name} image`}
              style={{ height: '200px', objectFit: 'contain', marginTop: '10px' }}
            />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="text-center">{character.name}</Card.Title>
              <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" href={`/characters/${character.id}`}>
                  View Character
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);
}

export default Characters;