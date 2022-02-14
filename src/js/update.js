import {ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import {ref as databaseRef, set, get} from 'firebase/database';
import {db, storage} from "./libs/firebase/firebaseConfig";

const seedForm = document.forms['seedForm'];
document.querySelector("#seedImage").addEventListener("change", onImageSelected);

function imageDisplay() {
    const key = sessionStorage.getItem('key');
    document.querySelector('.display img').src = `${key}`;
}

imageDisplay();

async function pageInit() {
    const key = sessionStorage.getItem('key');
    const seedRef = databaseRef (db, `seed/${key}`);
    const seedSnapShot = await get(seedRef);

    if(seedSnapShot.exists()) {
        setFieldValues(seedSnapShot.val());
    }

    seedForm.addEventListener('submit', onUpdateSeed);
}

function onUpdateSeed(e) {
    e.preventDefault();
    updateSeedData();
}

function onImageSelected(e) {
    let file = e.target.files[0];
    document.querySelector(".display img").src = URL.createObjectURL(file);
}

function setFieldValues({seed, cost, descrip, imageUrl}) {
    seedForm.elements['seedName'].value = seed;
    seedForm.elements['seedCost'].value = cost;
    seedForm.elements['descrip'].value = descrip;
    document.querySelector('.display img').src = imageUrl;
}

async function updateSeedData() {
    const seed = seedForm.elements['seedName'].value.trim();
    const cost = seedForm.elements['seedCost'].value.trim();
    const descrip = seedForm.elements['descrip'].value.trim();
    const file = seedForm.elements['seedImage'].files[0];
    const key = sessionStorage.getItem('key');
        if (file.length !== 0) {
            // format storage for new image
            // images/key/file.name  storagepath

            const imageRef =     storageRef( storage, `images/${file.name}`);
            // path to the RTD
            const itemRef = databaseRef(db, `seed/${key}`);
            // upload the image return
            const uploadResult = await uploadBytes(imageRef, file);
            // asking for URL use in src element in storefront
            const imageUrl = await getDownloadURL(imageRef);
            const storagePath = uploadResult.metadata.fullPath;
            set(itemRef, {
                key:itemRef.key,
                sku: `nsm${itemRef.key}`,
                imageUrl,
                storagePath,
                seed,
                cost,
                descrip
            })
        }
}

pageInit();