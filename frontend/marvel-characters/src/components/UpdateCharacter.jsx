import axios from "axios";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FormModal from "./FormModal";

function UpdateCharacter() {
    const { id: characterId } = useParams(); // Get :id from the route

    const [character_data, setCharacter] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        alias: '',
        alignment: '',
        powers: '',
        image_url: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/characters/${characterId}`);
                setCharacter(response.data);
                setFormData({
                    name: response.data.name || '',
                    alias: response.data.alias || '',
                    alignment: response.data.alignment || '',
                    powers: response.data.powers || '',
                    image_url: response.data.image_url || '',
                });
            } catch (err) {
                console.error(err);
                setError("Failed to load character data");
            }
        };

        fetchCharacter();
    }, [characterId]);

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevState) => ({
          ...prevState, // Keep the existing form data
          [name]: value, // Update the key corresponding to the input's name attribute
        }));
      };

    // Form validation
    const validateForm = () => {
        const { name, alias, alignment, powers, image_url } = formData;
        if (!name.trim() || !alias.trim() || !alignment.trim() || !powers.trim() || !image_url.trim()) {
            setValidated(true);
            setSuccess('');
            setError('All fields are required.');
            return false;
        }
        setError('');
        return true;
    };


    const updateCharacter = async (event) => {
        event.preventDefault();

        if (!validateForm()) return; // If validation fails, exit

        try {
            const response = await axios.put(
                `http://127.0.0.1:5000/characters/${characterId}`,
                formData
            );

            setCharacter(response.data);
            setSuccess(`Character "${response.data.name}" updated successfully!`);
            setSubmitted(true);
            setShowModal(true);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Failed to update character');
            setSuccess('');
        }
    };

    // Prevent rendering until data is fetched
    if (!character_data) {
        return (
        <Container className="mt-5">
            <p>Loading character...</p>
         </Container>
        );
    }


    return (
        <Container className="mt-5">
            <h2 className="mt-5">Update Character</h2>
            <FormModal character_data={character_data} submitted={submitted} showModal={showModal} handleCloseModal={handleCloseModal} />

            {submitted && <Alert variant="success" dismissible>{success}</Alert>}
            {error && <Alert variant="danger" dismissible>{error}</Alert>}

            <Form onSubmit={updateCharacter} noValidate validated={validated}>

                {/* Name */}
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a name
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Alias */}
                <Form.Group className="mb-3">
                    <Form.Label>Alias</Form.Label>
                    <Form.Control type="text" name="alias" value={formData.alias} onChange={handleChange} required />
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
                    <Form.Control type="text" name="powers" value={formData.powers} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide powers
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Image URL */}
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" name="image_url" value={formData.image_url} onChange={handleChange} required />
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

export default UpdateCharacter;