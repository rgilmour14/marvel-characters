// src/components/FormModal.js

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FormModal = ({ character_data, submitted, showModal, handleCloseModal }) => {

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitted &&
            <>
              <p>Nice job!  Here are the added character details.</p>
              <p><b>Name: </b>{character_data.name}</p>
              <p><b>Alias: </b>{character_data.alias}</p>
              <p><b>Alignment: </b>{character_data.alignment}</p>
              <p><b>Powers: </b>{character_data.powers}</p>
              <p><b>Image URL: </b>{character_data.image_url}</p>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormModal;