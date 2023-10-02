import { useState,useEffect } from 'react'
import abi from "./contractJson/chai.json"
import {ethers} from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import chai from "./chai.png";
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

        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
        }) //Not working properly!!!

        setAccount(account[0]);
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
        //alert(error)
      }
    }
    template();
  },[])
  return (
    <div >
    <img src={chai} className="img-fluid" alt=".." width="100%" />
    <p style={{ marginTop: "10px", marginLeft: "5px" }}>
      <small>Connected Account - {account}</small>
    </p>
   
      <Buy state={state} />
      <Memos state={state} />
   
  </div>
  )
}

export default App
