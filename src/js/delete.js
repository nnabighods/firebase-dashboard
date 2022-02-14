import { getApp } from 'firebase/app';
import {ref as databaseRef, set, get, remove} from 'firebase/database';
import {db, storage} from "./libs/firebase/firebaseConfig";

function deleteData() {
    const key = sessionStorage.getItem('key');
    const path = databaseRef(db, `seed/${key}`);
    remove(path);
}
deleteData();
