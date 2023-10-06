import { useState } from "react";
import "./Display.css";
const Display = ({contract,account}) =>{

    const[data,setData]=useState("")
    const getdata = async () =>{
    let dataArray;
    const OtherAddress = document.querySelector(".address").value
    try{
        if(OtherAddress){
            dataArray = await contract.display(OtherAddress);
        }
        else{
            dataArray = await contract.display(account);
            console.log(dataArray);
        }
        
    } catch(error){
        alert(error)
    }

    const isEmpty = Object.keys(dataArray).length==0;

    if(!isEmpty){
        const images = dataArray.map((item,i)=>{
            return(
                <a href={item} key={`a-${i}`} target="_blank" >
                    <img
                        key={`a-${i}`}
                        src={item}
                        alt="new"
                        className="image-list"
                    /> 
                </a>
            );
        });
        setData(images)
    }else {
        alert("No images to display")
    }
}
return (
    <>
        <div className="image-list">{data}</div>
            <input
                type="text"
                placeholder="Enter Address"
                className="address"
            ></input>
        <button className="center button" onClick={getdata}>
            Get Data
        </button>
    </>
);
};
export default Display;