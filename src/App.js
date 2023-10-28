import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getTransactions() {
      const blockData = await alchemy.core.getBlock(blockNumber);
      const transactions = blockData.transactions;
      setTransactions(transactions);
    }

    getBlockNumber().then(
      getTransactions(blockNumber)
    );
  });

  return <div className="App">
    <div>
      Block Number: {blockNumber}
    </div>
    <div>
      <ol>
        {transactions.map(tx => <li>{tx}</li> )}
      </ol>
    </div>
  </div>;
}

export default App;
