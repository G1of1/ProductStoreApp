import { Container, Text, VStack, SimpleGrid, useToast, } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import React from 'react'
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/skeleton/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';


const HomePage = () => {
  const toast = useToast();
  const{ data: products, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try{
        const res = await fetch('/api/products/all');
        const data = await res.json();

        if(!res.ok) {
          toast({
            title: 'Error',
            description: data.error,
            status: 'error',
            isClosable: true
          })
        }
        return data;
      }
      catch(error) {
        throw new Error(error.message)
      }
    }

  })
  return (
    <Container maxW="container.xl" py={12} >
      <VStack spacing={8}>
      <Text fontSize={30} fontWeight={"bold"} bgGradient={"linear(to-r, orange.400, red.400)"} bgClip={"text"} textAlign={"center"}>Products✨</Text>
      <SimpleGrid 
      columns={{
        base: 1,
        md: 2,
        lg: 3, }}
      spacing ={10}
      w = {"full"}>
      {!isLoading ? products.map((product) => (<ProductCard key={product._id} product={product} />)): <LoadingSpinner />}
      </SimpleGrid>
      {products?.length === 0 && 
      (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Product😎
							</Text>
						</Link>
      </Text>)}
      </VStack>
      </Container>
  )
}

export default HomePage