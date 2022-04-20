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
  FormLabel,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Input,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useWallet } from '../helper/WalletContext';
import { CONTRACT_ADDRESS, TOKEN_ADDRESS, wallet,Tezos } from '../helper/tezos';
import { TezosToolkit, MichelCodecPacker, compose } from '@taquito/taquito';
import Loading from '../helper/Loading';



const Redeem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submit = async (e) => {
    e.preventDefault();
    const { tokenId, amount } = e.target.elements;
    console.log(tokenId.value, amount.value);
    const contract = await wallet.at(CONTRACT_ADDRESS);

    const op = await contract.methods
      .redeemTokens(parseInt(amount.value), parseInt(tokenId.value))
      .send();
	await op.confirmation(1);
    alert("Redemption Completed!");  
	
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
    const op1 = await contract.methods.addProposers(activeAccount.address).send();
	
	await op1.confirmation(1);
    alert("Proposer Whitelisted!");  
  };  

  return (
    <Box
      color={useColorModeValue('purple', 'white')}
      bg={useColorModeValue('purple.100', 'purple.900')}
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
				  <Portfolio />
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


const Portfolio = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const colors = {
    bg: useColorModeValue('purple.100', 'purple.700'),
    text: useColorModeValue('blue', 'white'),
	
  };
	const { connect, disconnect, activeAccount, connected } = useWallet();
	const [data, setData] = React.useState(null);
	let ledger = [];
	React.useEffect( async () => {
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
					.then(value => { if(value > 0) {ledger.push({id:tokens[tokenId], balance: value.toString()})}})
					.catch(error => console.log(`Error: ${tokens[tokenId]} ${activeAccount.address}`));
				console.log(ledger)

			};
			
			setData(ledger);
		};
	
	},[activeAccount]);
	return data ?(
	<>
      <MenuItem onClick={onOpen}>Portfolio</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Portfolio Details</ModalHeader>
          <ModalBody>
	
			<Text color={colors.text}> <b> Portfolio </b> </Text>
			
      		<Box display="flex" flexDirection="column" flexWrap="wrap">
				{data.map((pred, i) => {
					return (
						<Box
							key={i}
			    			//onClick={}
							display="flex"
							maxWidth="400px"
							flexDirection="row"
							border="0px solid"
							borderRadius="15px"
							padding="5px"
							margin="5px"
						>
								<Text color={colors.text}>Token id &nbsp;: &nbsp; {pred.id} &nbsp; |&nbsp;</Text>
								<Text color={colors.text}>Balance &nbsp; : &nbsp; {pred.balance}&emsp;</Text>
								<Redeem1 tokenID={pred.id} />
						</Box>
		            );
                })}
			</Box>
			</ModalBody>
        </ModalContent>
      </Modal>
    </>
 
  ):(
    <Loading />
  );
};

const Redeem1 = (tokenID) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
	console.log("tokenId", tokenID.tokenID.toString());
	const colors = {
    bg: useColorModeValue('purple.300', 'purple.600'),
    text: useColorModeValue('purple', 'white'),}
  const submit = async (e) => {
    e.preventDefault();
    const { amount } = e.target.elements;
    console.log(tokenID.tokenID, amount.value);
    const contract = await wallet.at(CONTRACT_ADDRESS);

    await contract.methods
      .redeemTokens(amount.value, tokenID.tokenID)
      .send();
  };

  return (
     
      <Popover returnFocusOnClose={false} placement="right" closeOnBlur={false}>
      <PopoverTrigger>
        <Button bg={colors.bg} textColor={colors.text}>
          Redeem
        </Button>
      </PopoverTrigger>
      <PopoverContent textColor={colors.text}>
        <PopoverHeader fontWeight="semibold">
          Redeem Token
        </PopoverHeader>
        <PopoverBody>
            <form onSubmit={submit}>
             <FormControl>
            <FormLabel htmlFor="tokenID">Token Id : {tokenID.tokenID.toString()} </FormLabel>
            
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
       </PopoverBody>
      </PopoverContent>
    </Popover>
  
  );
};

	
	