import React, { useState } from "react";
import { Box, Heading, VStack, HStack, Input, IconButton, useToast, Text, Spacer, Container, List, ListItem, ListIcon, Button } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Cannot add empty todo",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4}>
        <Heading>Todo App</Heading>
        <HStack w="100%">
          <Input placeholder="Add a new todo..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} />
          <IconButton aria-label="Add todo" icon={<FaPlus />} onClick={handleAddTodo} />
        </HStack>
        <List w="100%" spacing={2}>
          {todos.map((todo, index) => (
            <ListItem key={index} p={2} borderWidth="1px" borderRadius="md">
              <HStack w="100%">
                <ListIcon as={FaPlus} color="green.500" />
                <Text>{todo}</Text>
                <Spacer />
                <IconButton aria-label="Delete todo" icon={<FaTrash />} onClick={() => handleRemoveTodo(index)} />
              </HStack>
            </ListItem>
          ))}
        </List>
        {todos.length === 0 && (
          <Box py={10} textAlign="center">
            <Text>No todos. Add a new one above!</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
