import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, VStack } from "@chakra-ui/react";

const DogForm = ({ isOpen, onClose, onSubmit, characteristics, breeds }) => {
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

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${newDog.breed}&limit=1`, {
        headers: {
          "x-api-key": "YOUR_API_KEY_HERE",
        },
      });
      const data = await response.json();
      const imageUrl = data[0]?.url;

      onSubmit({
        ...newDog,
        image: imageUrl,
      });
      onClose();
    } catch (error) {
      console.error("Error fetching image:", error);
    }
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
              <FormLabel>Breed</FormLabel>
              <Select name="breed" value={newDog.breed} onChange={handleChange}>
                <option value="">Select Breed</option>
                {breeds.map((breed) => (
                  <option key={breed.id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </Select>
            </FormControl>
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
