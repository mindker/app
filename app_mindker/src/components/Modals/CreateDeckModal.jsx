import React, { useState } from "react";
import { Button, Modal, FormControl, FormLabel, Textarea } from "@chakra-ui/react";

const CreateDeck = () => {
  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAnswer = (e) => {
    e.preventDefault();
    setAnswer(e.target.value);
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>Crear pregunta</Button>
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <FormControl onSubmit={handleSubmit}>
          <FormLabel>Create Deck</FormLabel>
          <Textarea
            placeholder="Escribe tu pregunta aqui"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <FormLabel>Escribe la respuesta</FormLabel>
          <Textarea
            placeholder="Escribe tu respuesta aqui"
            value={answer}
            onChange={handleAnswer}
          />
          <Button mt={4} variantColor="teal" type="submit">
            Guardar
          </Button>
        </FormControl>
      </Modal>
    </>
  );
};

export default CreateDeck;