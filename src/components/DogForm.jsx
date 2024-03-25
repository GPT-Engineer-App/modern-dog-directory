import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, VStack } from "@chakra-ui/react";

const DogForm = ({ isOpen, onClose, onSubmit, characteristics }) => {
  const [newDog, setNewDog] = useState({
    name: "",
    image: "",
    size: "",
    coat: "",
    energy: "",
    trainability: "",
  });

  const handleChange = (e) => {
    setNewDog((prevDog) => ({
      ...prevDog,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(newDog);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a New Dog</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={newDog.name} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input name="image" value={newDog.image} onChange={handleChange} />
            </FormControl>
            {characteristics.map((characteristic) => (
              <FormControl key={characteristic.name}>
                <FormLabel>{characteristic.name}</FormLabel>
                <Select name={characteristic.name.toLowerCase()} value={newDog[characteristic.name.toLowerCase()]} onChange={handleChange}>
                  <option value="">Select {characteristic.name}</option>
                  {characteristic.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Add Dog
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DogForm;
