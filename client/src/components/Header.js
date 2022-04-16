import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
  HStack,
  Container,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useWallet } from '../helper/WalletContext';
import { CONTRACT_ADDRESS, TOKEN_ADDRESS, wallet,Tezos } from '../helper/tezos';
import { Tzip12Module, tzip12 } from "@taquito/tzip12";
import { TezosToolkit, MichelCodecPacker, compose } from '@taquito/taquito';



const Redeem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submit = async (e) => {
    e.preventDefault();
    const { tokenId, amount } = e.target.elements;
    console.log(tokenId.value, amount.value);
    const contract = await wallet.at(CONTRACT_ADDRESS);

    await contract.methods
      .redeemTokens(parseInt(amount.value), parseInt(tokenId.value))
      .send();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Redeem</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Redeem Token</ModalHeader>
          <ModalBody>
            <form onSubmit={submit}>
              <FormControl>
                <Input
                  required
                  type="number"
                  name="tokenId"
                  placeholder="Token ID"
                ></Input>
              </FormControl>
              <FormControl>
                <Input
                  required
                  type="number"
                  name="amount"
                  placeholder="Amount"
                />
              </FormControl>
              <Button type="submit">Redeem</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default function Header({ links = [] }) {
  const history = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connect, disconnect, activeAccount, connected } = useWallet();
  const { colorMode, toggleColorMode } = useColorMode();

  const whiteListProposer = async () => {
    const contract = await wallet.at(CONTRACT_ADDRESS);
    contract.methods.addProposers(activeAccount.address).send();
  };  

  return (
    <Box
      color={useColorModeValue('black', 'white')}
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={4}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={8} alignItems={'center'}>
          <Box></Box>
        </HStack>
        <Text fontSize="3xl" colorScheme="blue" fontWeight="bold">
          Predictor
        </Text>

        <Flex alignItems={'center'}>
          <IconButton
            marginRight="10px"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
          />
          <Box display={{ base: 'none', md: 'flex' }}>
            {!connected ? (
              <Button onClick={connect}>Connect Wallet</Button>
            ) : (
              <Menu>
                <MenuButton as={Button} cursor={'pointer'} minW={0}>
                  <Text
                    maxW="300px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {activeAccount?.address}
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => history('/mypreds')}>
                    My Predictions
                  </MenuItem>
                  <MenuItem onClick={whiteListProposer}>Whitelist Me</MenuItem>
                  <MenuItem onClick={disconnect}>Disconnect</MenuItem>
				  <PortfolioDetails />
                  <Redeem />
                </MenuList>
              </Menu>
            )}
          </Box>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {!connected ? (
              <Button onClick={connect}>Connect Wallet</Button>
            ) : (
              <Menu>
                <MenuButton as={Button} cursor={'pointer'} minW={0}>
                  <Text
                    maxW="300px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {activeAccount?.address}
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => history('/mypreds')}>
                    My Predictions
                  </MenuItem>
                  <MenuItem onClick={disconnect}>Disconnect</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}


const PortfolioDetails = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { connect, disconnect, activeAccount, connected } = useWallet();
	//const [data, setData] = React.useState(null);
	let ledger = [];
	const portfolio = async () => {
		if (!connected) {
			await connect();
		}
		if (activeAccount) {
			console.log(activeAccount);
			console.log(activeAccount.address);
			const tokenContract =await Tezos.contract.at(TOKEN_ADDRESS);
			const tokenStore = await tokenContract.storage();
			const tokenLedger = tokenStore.ledger;
			console.log(tokenLedger);
			let tokens = tokenStore.all_tokens.toString().split(',').map(Number);
			console.log(tokens);
			
			for (let tokenId = tokens.length-1 ; tokenId>=0; tokenId--) {	
				console.log(tokenId,tokens[tokenId]);
				await tokenLedger.get([activeAccount.address, tokens[tokenId]])
					.then(value => { ledger.push({id:tokens[tokenId], balance: value.toString()})})
					.catch(error => console.log(`Error: ${tokens[tokenId]} ${activeAccount.address}`));
				console.log(ledger)

			};
		};
	
	}
	return(
	
    <>
      <MenuItem onClick={portfolio}>Portfolio</MenuItem>
      		<Box display="flex" flexDirection="row" flexWrap="wrap">
				{ledger.map((pred, i) => {
					return (
						<Box
							key={i}
			    			// onClick={}
							display="flex"
							maxWidth="300px"
							flexDirection="column"
							border="1px solid"
							borderRadius="15px"
							padding="20px"
							margin="10px"
						>
								<Text color={colors.text}>{pred.id}</Text>
								<Text color={colors.text}>{pred.balance}</Text>
						</Box>
		            );
                })}
			</Box>
    </>
  );
};
	