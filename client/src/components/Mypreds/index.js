import React from 'react';
import PredictionContext from '../../helper/PredictionContext';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
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
        <Button marginLeft="10px">Result</Button>
      </PopoverTrigger>
      <PopoverContent>
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
  const submit = async (e) => {
    e.preventDefault();
    const { status } = e.target.elements;

    const contract = await wallet.at(CONTRACT_ADDRESS);
    contract.methods.updatepredictionStatus(pred.id, status.value).send();
  };
  return (
    <Popover returnFocusOnClose={false} placement="right" closeOnBlur={false}>
      <PopoverTrigger>
        <Button>Update</Button>
      </PopoverTrigger>
      <PopoverContent>
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
