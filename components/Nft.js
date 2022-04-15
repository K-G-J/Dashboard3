import { useNFTBalances } from "react-moralis";
import { useEffect } from "react";
import CustomContainer from "./CustomContainer";
import { Box, Image, Text } from "@chakra-ui/react";

export default function Nft({user}) {

  const { getNFTBalances, data } = useNFTBalances()
  
  useEffect(() => {
    getNFTBalances({
      params: {
        chain: 'polygon',
        address: user.get('ethAddress')
      }
    })
  }, [])
  
  return (
    <CustomContainer>
      <Text fontSize="xl" fontWeight="bold">My NFTs</Text>
      {data && data.result.map(nft => (
        <Box mt="4" px="2" py="2" borderWidth="1px" borderRadius="md" key={nft.token_uri}>
          {nft.image && <Image src={nft.image} />}
          <p>{nft.token_uri}</p>
        </Box>
      ))}
    </CustomContainer>
  )
}
