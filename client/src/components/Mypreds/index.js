import React from 'react';
import PredictionContext from '../../helper/PredictionContext';
import { useWallet } from '../../helper/WalletContext';

export default function MyPreds() {
  const { predictionsArray } = React.useContext(PredictionContext);
  const { connected, connect, activeAccount } = useWallet();
  const [myPreds, setMyPreds] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      if (!connected) {
        await connect();
      }
      console.log(activeAccount?.address);

      const _ = predictionsArray.filter(
        (item) => item.proposer === activeAccount.address
      );
      console.log(_);
      setMyPreds(_);
    })();
  }, [activeAccount]);

  console.log(myPreds);
  return <></>;
}
