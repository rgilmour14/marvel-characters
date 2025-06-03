import axios from "axios";
import { useState } from "react"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FormModal from "./FormModal";

function AddCharacter() {
    const [character_data, setCharacter] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        alias: '',
        alignment: '',
        powers: '',
        image_url: '',
    });

    {/* Handle changes to form inputs */ }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    {/* Handle the form submission */ }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {

        try {
            const response = await axios.post("http://127.0.0.1:5000/characters", formData);
            console.log(response.data);
            setCharacter(response.data);
            setSubmitted(true);
            setShowModal(true);
            setError(null);
        } catch (error) {
            setError(`Error submitting form. Please try again: ${error.message}`);
            setSubmitted(false);
        }
    } 
    setValidated(true);
    }


    return (
        <Container className="mt-5">
            <h2 className="mt-5">Create A New Character</h2>
            <FormModal character_data={character_data} submitted={submitted} showModal={showModal} handleCloseModal={handleCloseModal} />

            {submitted && <Alert variant="success" dismissible>{character_data.name} created successfully!</Alert>}
            {error && <Alert variant="danger" dismissible>{error}</Alert>}

            <Form onSubmit={handleSubmit}noValidate validated={validated}>

                {/* Name */}
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter a name" name="name" value={formData.name} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a name
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Alias */}
                <Form.Group className="mb-3">
                    <Form.Label>Alias</Form.Label>
                    <Form.Control type="text" placeholder="Enter an alias" name="alias" value={formData.alias} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide an alias
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Alignment */}
                <Form.Group className="mb-3">
                    <Form.Label>Alignment</Form.Label>
                    <Form.Select name="alignment" value={formData.alignment} onChange={handleChange} required>
                    <option hidden value="">Choose...</option>
                    <option value="hero">Hero</option>
                    <option value="villain">Villain</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please chose hero or villain
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Powers */}
                <Form.Group className="mb-3">
                    <Form.Label>Powers</Form.Label>
                    <Form.Control type="text" placeholder="Enter your character's powers" name="powers" value={formData.powers} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide powers
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Image URL */}
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder="Enter a image url" name="image_url" value={formData.image_url} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide an image URL
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="success" type="submit" style={{ marginBottom: '10px' }}>
                    Submit
                </Button>

                <div className="d-flex justify-content-center mt-3">
                    <Button variant="primary" href={`/characters`} style={{ margin: '10px' }}>Back to All Characters</Button>
                </div>

            </Form>
        </Container>
    )
}

export default AddCharacter;