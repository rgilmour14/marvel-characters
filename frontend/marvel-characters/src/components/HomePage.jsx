// src/components/HomePage.jsx

import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomePage() {

  return (
    <Container>
      <Row>
        <Col>
          <h3>Welcome to the Marvel Characters 🏠 page!</h3>
          <p className='welcome'>This app will let you see all of the Marvel Characters and their powers. You can create and edit your own character! If theres a character that you do not like, you can delete them! The power is yours!</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://miro.medium.com/v2/resize:fit:1200/1*-wnhqGmQVVBMMUfaUTBSFQ.jpeg"
                alt="First slide"
              />
              <Carousel.Caption style={{ textShadow: '2px 2px black' }}>
                <h3>Create A Character</h3>
                <p>Here is your chance to create your very own Marvel Character!</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://assetsio.gnwcdn.com/legendary-marvel-deck-building-game-artwork.png?width=1200&height=600&fit=crop&enable=upscale&auto=webp"
                alt="Second slide"
              />
              <Carousel.Caption style={{ textShadow: '2px 2px black' }}>
                <h3>Take the Town</h3>
                <p>Team up with other characters to takeover the city!</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://static1.thegamerimages.com/wordpress/wp-content/uploads/wm/2024/07/marvel-rivals-spider-man-guide-featured-image.jpg?q=70&fit=contain&w=1200&h=628&dpr=1"
                alt="Third slide"
              />
              <Carousel.Caption style={{ textShadow: '2px 2px black' }}>
                <h3>Join the Marvel Universe</h3>
                <p>When creating a character, be sure to join the email list for exclusive offers!</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;