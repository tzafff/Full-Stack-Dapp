import {useState} from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({contract,account}) =>{
    const[file,setFile]=useState(null);
    const[fileName,setFileName]=useState(null);
    //Handle image - to upload the image on ipfs
    //Retrieve File 

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(file){
            try{
                const formData = new FormData();
                
                formData.append("file",file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                      pinata_api_key: `API_KEY`,
                      pinata_secret_api_key: `
                      Secret-Key`,
                      "Content-Type": "multipart/form-data",
                    },
                  });

                  const ImgHash =`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                  contract.add(account,ImgHash)
                  alert("SuccessFully Image uploaded")
                  setFileName("No image selected");
                  setFile(null)
            }catch(error){
                alert(error);
            }
        }
    }

    const retrieveFile = (event) =>{
        const data = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend =() =>{
            setFile(event.target.files[0])
        }
        console.log(event.target.files[0].name);
        setFileName(event.target.files[0].name);
        event.preventDefault();
    }


    return (
        <div className="top">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
              Choose Image
            </label>
            <input
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
              disabled={!account}
            />
            <span className="textArea">Image: {fileName}</span>
            <button type="submit" className="upload">
              Upload File
            </button>
          </form>
        </div>
      );
};
export default FileUpload;