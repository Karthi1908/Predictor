import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useWallet } from '@tezos-contrib/react-wallet-provider';

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export default function Header({ links = [] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connected, activeAccount, connect, disconnect } = useWallet();
  const { colorMode, toggleColorMode } = useColorMode();

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
          <Box>Logo</Box>
        </HStack>
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
                  <MenuItem onClick={disconnect}>Disconnect</MenuItem>
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
