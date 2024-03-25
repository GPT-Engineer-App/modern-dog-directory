import React, { useState, useEffect } from "react";
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

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBreeds, setFilteredBreeds] = useState([]);

  useEffect(() => {
    setFilteredBreeds(
      breeds.filter((breed) =>
        breed.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, breeds]);

  const handleBreedChange = async (e) => {
    const selectedBreedId = e.target.value;
    setNewDog((prevDog) => ({
      ...prevDog,
      breed: selectedBreedId,
    }));

    try {
      const response = await fetch(`https://api.thedogapi.com/v1/breeds/${selectedBreedId}`);
      const data = await response.json();
      setNewDog((prevDog) => ({
        ...prevDog,
        name: data.name,
        size: data.height.metric,
        coat: data.coat,
        energy: data.energy_level,
        trainability: data.trainability,
      }));
    } catch (error) {
      console.error("Error fetching breed details:", error);
    }
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
              <FormLabel>Search Breed</FormLabel>
              <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search breed..." />
            </FormControl>
            <FormControl>
              <FormLabel>Select Breed</FormLabel>
              <Select name="breed" value={newDog.breed} onChange={handleBreedChange}>
                <option value="">Select a breed</option>
                {filteredBreeds.map((breed) => (
                  <option key={breed.id} value={breed.id}>
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
