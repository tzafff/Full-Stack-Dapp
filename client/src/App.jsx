import { useState, useEffect } from 'react'
import abi from "./contractJson/chai.json"
import {ethers} from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import './App.css'

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount]=useState('Not connected')
  useEffect(()=>{
    const template= async () =>{
      const contractAddress="0x178C128606A2abA837f1EA647280E9a3793456f3";
      const contractABI=abi.abi;
      
      //Metamask part
      //1. In order to do transactions on goerli testnet
      //2. Metamask consist of infura api which actually help in connecting to the blockchain
      
      try{
             
        const{ethereum}=window;

        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        console.log(contract);
        setState({provider,signer,contract})
      }catch(error){
        alert(error)
      }
    }
    template();
  },[])
  return (
      <div className='App'>
        <Buy></Buy>
        <Memos></Memos>
      </div>
  )
}

export default App
