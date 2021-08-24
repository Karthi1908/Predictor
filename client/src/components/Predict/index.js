import React from 'react';
import {
  Box,
  Container,
  useColorModeValue,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  RadioGroup,
  Stack,
  Radio,
  NumberInput,
  NumberInputField,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import PredictionContext from '../../helper/PredictionContext';
import Loading from '../../helper/Loading';
import { ContractProvider, CONTRACT_ADDRESS, wallet } from '../../helper/tezos';

const BuySellWindow = ({ id, options }) => {
  const [request, setRequest] = React.useState({
    option: options[0],
    quantity: 0,
  });

  const buySubmit = async (e) => {
    e.preventDefault();
    const { option, quantity } = e.target.elements;

    const contract = await wallet.at(CONTRACT_ADDRESS);

    contract.methods.voteOnprediction(id, option.value).send({
      amount: parseFloat(quantity.value) * 0.1,
    });
  };

  return (
    <Tabs variant="soft-rounded" width="100%">
      <TabList>
        <Tab>Buy</Tab>
        <Tab isDisabled>Sell</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <form onSubmit={buySubmit}>
            <Container
              padding={{ base: '0' }}
              display="flex"
              flexDirection="column"
            >
              <Box margin="3">
                <Text fontWeight="bold" fontSize="lg">
                  Pick an option
                </Text>
                <RadioGroup
                  onChange={(e) =>
                    setRequest((request) => {
                      return {
                        ...request,
                        option: e,
                      };
                    })
                  }
                  value={request.option}
                  name="option"
                >
                  <Stack direction="column">
                    {options.map((option, i) => {
                      return (
                        <Radio key={i} value={option}>
                          <Box
                            borderWidth="1px"
                            borderColor="gray.400"
                            p="2"
                            borderRadius="2xl"
                          >
                            {option}
                          </Box>
                        </Radio>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </Box>
              <Box margin="3">
                <Text fontWeight="bold" fontSize="lg">
                  Amount of shares
                </Text>
                <NumberInput
                  isRequired
                  placeholder="Shares"
                  onChange={(e) =>
                    setRequest((request) => {
                      return {
                        ...request,
                        quantity: e,
                      };
                    })
                  }
                  value={request.quantity}
                  name="quantity"
                >
                  <NumberInputField />
                </NumberInput>
              </Box>
              <Box margin="3">
                <Button type="submit">Buy</Button>
              </Box>
            </Container>
          </form>
        </TabPanel>
        <TabPanel>Lol2</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default function Predict({ id }) {
  const { predictions } = React.useContext(PredictionContext);
  const [data, setData] = React.useState(null);
  const colors = {
    bg: useColorModeValue('gray.100', 'gray.900'),
    text: useColorModeValue('black', 'white'),
    border: useColorModeValue('gray.400', ''),
    cardBg: useColorModeValue('gray.200', 'gray.700'),
  };

  React.useEffect(() => {
    const _ = predictions.get(id);
    setData({
      prediction: _.predictionName,
      lastDate:
        new Date(_.endTime).toLocaleDateString() +
        ' ' +
        new Date(_.endTime).toLocaleTimeString(),
      tradeVol: '-',
      liquidity: '-',
      options: _.predictionOptions,
      disclosure: `Clarification: A redundant reference to smart contract "deployment" has been removed to clarify the resolution criteria of this market, which will resolve "Yes" if smart contract functionality is live by the resolution date.

      This is a market on if Cardano Mainnet will be live and supporting smart contract functionality by October 1st, 2021, 12 PM ET. In Cardano’s official roadmap, this is referred to as Goguen. This market will resolve to "Yes" if it is possible to create and execute functional smart contracts on the Cardano network on a “Mainnet” by the resolution date. This does not include staking functionality or consensus mechanisms. In the event of ambiguity in terms of the market outcome, the market will be resolved in good faith at the sole discretion of the Markets Integrity Committee (MIC).
      
      Per the Cardano roadmap:
      “With the integration of smart contracts, the Goguen era represents a big step forwards in capability for the Cardano network. Where the Shelley era decentralizes the core of the system, Goguen adds the ability to build decentralized applications (DApps) on Cardano’s solid foundation of peer-reviewed research and high-assurance development.”
      
      “This will allow the creation of fungible and non-fungible tokens, supporting the creation of new cryptocurrencies on Cardano as well as the tokenization of many types of digital and physical assets. Another benefit will be easier integration of smart contracts and DApps involving multiple cryptocurrencies.”`,
    });
  }, []);

  return data ? (
    <Container
      maxWidth="100vw"
      width="auto"
      bg={colors.bg}
      color={colors.text}
      height="auto"
      minH="92vh"
      display="flex"
      flexDir="column"
      justifyContent="center"
      padding="0 15% 0 15%"
    >
      <Accordion allowToggle margin="6">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1">Please Read this before making any purchases</Box>
            </AccordionButton>
          </h2>
          <AccordionPanel p="6">{data.disclosure}</AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box
        p="6"
        maxW="max-content"
        borderWidth="1px"
        borderRadius="lg"
        borderColor={colors.border}
        overflow="hidden"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          margin={{ base: '2', md: '4' }}
          maxWidth="lg"
          overflow="visible"
          textOverflow="clip"
        >
          {data.prediction}
        </Text>
        <Box
          p="2"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          borderColor={colors.border}
          bg={colors.cardBg}
          overflow="hidden"
          display="flex"
          flexDir="column"
          margin={{ base: '2', md: '4' }}
        >
          <Text fontSize="sm">Last Date</Text>
          <Text fontSize="xl">{data.lastDate}</Text>
        </Box>
        <Box
          p="2"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          borderColor={colors.border}
          bg={colors.cardBg}
          overflow="hidden"
          display="flex"
          flexDir="column"
          margin={{ base: '0.5', md: '4' }}
        >
          <Text fontSize="sm">Trade Volume</Text>
          <Text fontSize="xl">$ {data.tradeVol}</Text>
        </Box>
        <Box
          p="2"
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          borderColor={colors.border}
          bg={colors.cardBg}
          overflow="hidden"
          display="flex"
          flexDir="column"
          margin={{ base: '0.5', md: '4' }}
        >
          <Text fontSize="sm">Liquidity</Text>
          <Text fontSize="xl">$ {data.liquidity}</Text>
        </Box>
      </Box>
      <Box
        margin="6"
        p={{ base: '2', md: '6' }}
        maxW="max-content"
        borderWidth="1px"
        borderRadius="lg"
        borderColor={colors.border}
        overflow="hidden"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
        <BuySellWindow id={id} options={data.options} />
      </Box>
    </Container>
  ) : (
    <Loading />
  );
}
