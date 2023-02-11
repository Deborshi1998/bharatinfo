import React from 'react'
import { doc, setDoc } from "firebase/firestore";
import dataIMR from '../utils/uploadData';
import { db } from '../utils/firebaseSetup';
function Upload() {
    const handleUpload = async() =>{

         setDoc(doc(db, "Economy", "UnemployementRate"), dataIMR).then(()=>{
            window.alert("Successful")
        }).catch((error)=>{
            window.alert(error)
        });
    }
  return (
    <div>
        <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Upload