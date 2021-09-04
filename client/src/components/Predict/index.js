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
import { CONTRACT_ADDRESS, wallet } from '../../helper/tezos';

const BuySellWindow = ({ id, options }) => {
  const [request, setRequest] = React.useState({
    option: options[0],
    quantity: 0,
  });

  const buySubmit = async (e) => {
    e.preventDefault();
    const { option, quantity } = e.target.elements;

    const contract = await wallet.at(CONTRACT_ADDRESS);

    contract.methods.voteOnprediction(0, '', id, option.value).send({
      amount: parseFloat(quantity.value) * 0.1,
    });
  };

  return (
    <Tabs variant="soft-rounded" width="100%">
      <TabList>
        <Tab>Options</Tab>

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
                <Text fontWeight="bold" fontSize="md">
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
	  key : id,
	  ref : _.predictionRef,
      pstatus : _.predictionStatus,
      liquidity: '-',
      options: _.predictionOptions,
      disclosure: "Predictor is for informational and educational purposes only. We take no custody of anyone's money or cryptocurrency. Predictor displays existing markets live on the Tezos blockchain and is a graphical user interface for both visualizing data and market trends from on-chain activity, and interacting with said smart contracts directly via your Web 3 enabled wallet.",
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
        flexDirection="column"
        flexWrap="wrap"
      >
	    <Text fontSize="sm">Prediction id:  {data.ref}     Token id:  {data.key} </Text>
		
        <Text
          fontSize="lg"
          fontWeight="bold"
          margin={{ base: '1', md: '1' }}
          maxWidth="lg"
          overflow="visible"
          textOverflow="clip"
        >
          {data.prediction}
        </Text>
		</Box>
        <Box
		p="3"
        maxW="max-content"
        borderWidth="1px"
        borderRadius="lg"
        borderColor={colors.border}
        overflow="hidden"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
      >
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
          margin={{ base: '0', md: '2' }}
        >
          <Text fontSize="sm">Last Date</Text>
          <Text fontSize="l">{data.lastDate}</Text>
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
          margin={{ base: '0', md: '2' }}
        >
          <Text fontSize="sm">Status</Text>
          <Text fontSize="l">{data.pstatus}</Text>
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
          margin={{ base: '0', md: '2' }}
        >
          <Text fontSize="sm">Liquidity</Text>
          <Text fontSize="l">$ {data.liquidity}</Text>
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
