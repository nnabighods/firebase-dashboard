import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get} from 'firebase/database';
import { db, storage  } from "./libs/firebase/firebaseConfig";

document.forms["seedForm"].addEventListener("submit", onAddSeed);
document.querySelector("#seedImage").addEventListener("change", onImageSelected);

    // loading form submit event handler
    function onAddSeed(e) {
    e.preventDefault();
    uploadNewSeed();
    }

    // file input change handler
    function onImageSelected(e) {
        //selected file
        let file = e.target.files[0];
        document.querySelector(".display img").src = URL.createObjectURL(file);
        // console.log(file);
        // update the display with the requested image
        
            // testUpload(file);
        }
    
    // upload form fields to storage bucket and RTD
    async function uploadNewSeed() {
        // ref to the data...
        const seed = document.querySelector('#seedName').value.trim();
        const cost = document.querySelector('#seedCost').value.trim();
        const descrip = document.querySelector('#descrip').value.trim();
        const file = document.querySelector('#seedImage').files[0]
        
        // set path to the storage bucket for image
        const imageRef =     storageRef( storage, `images/${file.name}`);
        // path to the RTD
        const dataRef =  databaseRef( db, 'seed');
        // upload the image return
        const uploadResult = await uploadBytes(imageRef, file);
        // asking for URL use in src element in storefront
        const imageUrl =  await getDownloadURL(imageRef);
        console.log(imageUrl);
        const storagePath = uploadResult.metadata.fullPath;
        
        // unique firebase key
        // push return a ref to area with the key but no data written yet
        const itemRef = push(dataRef);
        // ref.key
        set(itemRef,{
          key:itemRef.key,
          sku: `nsm${itemRef.key}`,
          imageUrl,
          storagePath,
          seed,
          cost,
          descrip
        })
        
    }

