import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Assessment from '../artifacts/contracts/Assessment.sol/Assessment.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [owner, setOwner] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, Assessment.abi, provider);

        try {
          const balance = await contract.getBalance();
          const owner = await contract.getOwner();
          setBalance(balance.toString());
          setOwner(owner);
        } catch (err) {
          console.error(err);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Assessment Information</h1>
      <p>Owner: {owner}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}
