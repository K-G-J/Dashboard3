import { Text, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Input, Button, useToast } from "@chakra-ui/react";
import CustomContainer from "./CustomContainer";
import { useState } from "react"
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis"


export default function Send() {

  const [amount, setAmount] = useState(0)
  const [receiver, setReceiver] = useState('')

  const handleChange = (value) => setAmount(value)

  const toast = useToast()

  const { fetch, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(amount),
    receiver: receiver,
    type: 'native'
  })

  return (
    <CustomContainer>
      <Text fontSize="xl" fontWeight="bold">Send ETH</Text>
      <form onSubmit={async e => {
        e.preventDefault();
        await Moralis.enableWeb3()
        fetch({
          onSuccess: () => {
            toast({
              title: 'ETH successfully sent',
              description: 'Fresh ETH are showing up in the receiver wallet',
              status: 'success',
              duration: 9000,
              isClosable: true
            })
            setReceiver('')
          },
          onError: (error) => {
            toast({
              title: 'Error.',
              description: error,
              status: 'error',
              duration: 9000,
              isClosable: true
            })
          }
        })
      }}>
        <FormControl mt="4">
          <FormLabel htmlFor="amount">
            Amount of ETH
          </FormLabel>
          <NumberInput step={0.1} onChange={handleChange}>
            <NumberInputField id="amount" value={amount} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel htmlFor="receiver" mt="4">Send to</FormLabel>
          <Input id="receiver" type="text" placeholder="Receiver Address" vale={receiver} onChange={ e => setReceiver(e.target.value.trim())}/>
        </FormControl>
        <Button mt="4" type="submit" colorScheme="purple" disabled={isFetching}>💸&nbsp; Send</Button>
      </form>
    </CustomContainer>
  )
}
