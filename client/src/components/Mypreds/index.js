import React from 'react';
import PredictionContext from '../../helper/PredictionContext';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useWallet } from '../../helper/WalletContext';
import Loading from '../../helper/Loading';
import { CONTRACT_ADDRESS, wallet } from '../../helper/tezos';

const AddPredRes = ({ pred }) => {
  const colors = {
    bg: useColorModeValue('gray.200', 'gray.700'),
    text: useColorModeValue('black', 'white'),
  };

  const submit = async (e) => {
    e.preventDefault();
    const { option } = e.target.elements;
    console.log(option.value);
    const contract = await wallet.at(CONTRACT_ADDRESS);
    contract.methods.predictResults(pred.id, option.value).send();
  };

  return (
    <Popover returnFocusOnClose={false} placement="right" closeOnBlur={false}>
      <PopoverTrigger>
        <Button bg={colors.bg} textColor={colors.text} marginLeft="10px">
          Result
        </Button>
      </PopoverTrigger>
      <PopoverContent textColor={colors.text}>
        <PopoverHeader fontWeight="semibold">
          Update Prediction Result
        </PopoverHeader>
        <PopoverBody>
          <form onSubmit={submit}>
            <FormControl>
              <FormLabel htmlFor={pred.id + '_status'}>Options</FormLabel>
              <RadioGroup name="option">
                <Stack direction="column">
                  {pred.predictionOptions.map((option, i) => {
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
            </FormControl>
            <Button type="submit">Submit</Button>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const UpdatePredStatus = ({ pred }) => {
  const colors = {
    bg: useColorModeValue('gray.200', 'gray.700'),
    text: useColorModeValue('black', 'white'),
  };

  const submit = async (e) => {
    e.preventDefault();
    const { status } = e.target.elements;

    const contract = await wallet.at(CONTRACT_ADDRESS);
    contract.methods.updatepredictionStatus(pred.id, status.value).send();
  };
  return (
    <Popover returnFocusOnClose={false} placement="right" closeOnBlur={false}>
      <PopoverTrigger>
        <Button bg={colors.bg} textColor={colors.text}>
          Update
        </Button>
      </PopoverTrigger>
      <PopoverContent textColor={colors.text}>
        <PopoverHeader fontWeight="semibold">
          Update Prediction Status
        </PopoverHeader>
        <PopoverBody>
          <form onSubmit={submit}>
            <FormControl>
              <FormLabel htmlFor={pred.id + '_status'}>Status</FormLabel>
              <Input name="status" id={pred.id + '_status'}></Input>
            </FormControl>
            <Button type="submit">Submit</Button>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const AddNewPrediction = () => {
  const [num, setNum] = React.useState(0);
  // const { connected, connect, activeAccount } = useWallet();
  const [options, setOptions] = React.useState({});

  const submit = async (e) => {
    e.preventDefault();
    const { prediction, resultRef, start, end } = e.target.elements;

    const contract = await wallet.at(CONTRACT_ADDRESS);

    contract.methods
      .addprediction(
        parseInt(end.value),
        resultRef.value,
        prediction.value,
        Object.keys(options).map((key) => options[key]),
        parseInt(start.value)
      )
      .send();
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Add New Prediction</Button>
      </PopoverTrigger>
      <PopoverContent padding="4">
        <form onSubmit={submit}>
          <FormControl>
            <FormLabel htmlFor="prediction">Prediction</FormLabel>
            <Input name="prediction" id="prediction"></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="resultRef">Result Reference</FormLabel>
            <Input name="resultRef" id="resultRef"></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="start">Start</FormLabel>
            <Input type="number" name="start" id="start"></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="end">End</FormLabel>
            <Input type="number" name="end" id="end"></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="number_options">Number of Options</FormLabel>
            <Input
              onChange={(e) => {
                console.log(e);
                setNum(parseInt(e.target.value) || 0);
              }}
              name="number_options"
              id="number_options"
              type="number"
            ></Input>
          </FormControl>
          {[...Array(num).keys()].map((i) => {
            return (
              <FormControl>
                <FormLabel htmlFor={'option_' + i}>Option {i}</FormLabel>
                <Input
                  onChange={(e) =>
                    setOptions((options) => {
                      var opt = options;
                      opt[`option_${i}`] = e.target.value;
                      return opt;
                    })
                  }
                  name={`option_${i}`}
                  id={`option_${i}`}
                ></Input>
              </FormControl>
            );
          })}
          <Button type="submit">Submit</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default function MyPreds() {
  const { predictionsArray } = React.useContext(PredictionContext);
  const { connected, connect, activeAccount } = useWallet();
  const [myPreds, setMyPreds] = React.useState([]);
  const colors = {
    bg: useColorModeValue('gray.100', 'gray.900'),
    text: useColorModeValue('black', 'white'),
  };

  React.useEffect(() => {
    (async function () {
      if (!connected) {
        await connect();
      }
      if (activeAccount) {
        const _ = predictionsArray.filter(
          (item) => item.proposer === activeAccount.address
        );
        console.log(_);
        setMyPreds(_);
      }
    })();
  }, [activeAccount]);

  return myPreds ? (
    <Container
      width="auto"
      maxWidth="100vw"
      bg={colors.bg}
      height="auto"
      maxHeight="100vh"
      padding="10vh"
    >
      <AddNewPrediction />
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {myPreds.map((pred, i) => {
          return (
            <Box
              key={i}
              // onClick={}
              display="flex"
              maxWidth="300px"
              border="1px solid"
              borderRadius="15px"
              padding="20px"
              margin="10px"
            >
              <Text color={colors.text}>{pred.predictionName}</Text>
              <UpdatePredStatus pred={pred} />
              <AddPredRes pred={pred} />
            </Box>
          );
        })}
      </Box>
    </Container>
  ) : (
    <Loading />
  );
}
