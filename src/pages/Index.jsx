import React, { useState, useEffect } from "react";
import { Box, Heading, Text, VStack, HStack, Image, Input, Button, Select, Grid, GridItem, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FaSearch, FaPlus } from "react-icons/fa";
import DogForm from "../components/DogForm";

const characteristics = [
  { name: "Size", options: ["Small", "Medium", "Large"] },
  { name: "Coat", options: ["Short", "Medium", "Long"] },
  { name: "Energy", options: ["Low", "Moderate", "High"] },
  { name: "Trainability", options: ["Easy", "Moderate", "Difficult"] },
];

const dogBreeds = [
  {
    name: "Labrador Retriever",
    image: "https://images.unsplash.com/photo-1537204696486-967f1b7198c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMHJldHJpZXZlcnxlbnwwfHx8fDE3MTEzNTQ4NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
    size: "Large",
    coat: "Short",
    energy: "High",
    trainability: "Easy",
  },
  {
    name: "French Bulldog",
    image: "https://images.unsplash.com/photo-1531842477197-54acf89bff98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBidWxsZG9nfGVufDB8fHx8MTcxMTM1NDg0Nnww&ixlib=rb-4.0.3&q=80&w=1080",
    size: "Small",
    coat: "Short",
    energy: "Moderate",
    trainability: "Moderate",
  },
  {
    name: "Golden Retriever",
    image: "https://images.unsplash.com/photo-1612774412771-005ed8e861d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXJ8ZW58MHx8fHwxNzExMzU0ODQ3fDA&ixlib=rb-4.0.3&q=80&w=1080",
    size: "Large",
    coat: "Medium",
    energy: "Moderate",
    trainability: "Easy",
  },
  {
    name: "German Shepherd",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZHxlbnwwfHx8fDE3MTEzNTQ4NDd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    size: "Large",
    coat: "Medium",
    energy: "High",
    trainability: "Easy",
  },
  {
    name: "Poodle",
    image: "https://images.unsplash.com/photo-1605244863941-3a3ed921c60d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwb29kbGV8ZW58MHx8fHwxNzExMzU0ODQ3fDA&ixlib=rb-4.0.3&q=80&w=1080",
    size: "Medium",
    coat: "Long",
    energy: "Moderate",
    trainability: "Easy",
  },
];

const Index = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [dogs, setDogs] = useState(dogBreeds);
  const [breeds, setBreeds] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => setBreeds(data))
      .catch((error) => console.error(error));
  }, []);

  const handleFilterChange = (characteristic, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [characteristic]: value,
    }));
  };

  const handleAddDog = (newDog) => {
    setDogs((prevDogs) => [...prevDogs, newDog]);
  };

  const filteredDogs = dogs.filter((dog) => {
    const searchMatch = searchTerm === "" || dog.name.toLowerCase().includes(searchTerm.toLowerCase());

    const filterMatch = Object.entries(filters).every(([characteristic, value]) => dog[characteristic.toLowerCase()] === value);

    return searchMatch && filterMatch;
  });

  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" mb={8}>
        Dog Directory
      </Heading>
      <HStack spacing={4} mb={8}>
        <Input placeholder="Search by breed" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button leftIcon={<FaSearch />} colorScheme="blue">
          Search
        </Button>
        <Button leftIcon={<FaPlus />} colorScheme="purple" onClick={onOpen}>
          Add Dog
        </Button>
      </HStack>
      <HStack spacing={8} mb={8}>
        {characteristics.map((characteristic) => (
          <VStack key={characteristic.name} align="stretch">
            <Text fontWeight="bold">{characteristic.name}</Text>
            <Select placeholder={`Select ${characteristic.name}`} value={filters[characteristic.name] || ""} onChange={(e) => handleFilterChange(characteristic.name, e.target.value)}>
              {characteristic.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </VStack>
        ))}
      </HStack>
      {filteredDogs.length === 0 ? (
        <Text>No dogs found matching the selected criteria.</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8}>
          {filteredDogs.map((dog) => (
            <GridItem key={dog.name} bg={bgColor} p={4} borderRadius="md">
              <VStack align="stretch">
                <Image src={dog.image} alt={dog.name} borderRadius="md" />
                <Heading as="h2" size="lg" mt={4}>
                  {dog.name}
                </Heading>
                {characteristics.map((characteristic) => (
                  <HStack key={characteristic.name}>
                    <Text fontWeight="bold">{characteristic.name}:</Text>
                    <Text>{dog[characteristic.name.toLowerCase()]}</Text>
                  </HStack>
                ))}
              </VStack>
            </GridItem>
          ))}
        </Grid>
      )}
      <DogForm isOpen={isOpen} onClose={onClose} onSubmit={handleAddDog} characteristics={characteristics} breeds={breeds} />
    </Box>
  );
};

export default Index;
