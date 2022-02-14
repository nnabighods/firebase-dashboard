/*
Templating
template literals setup

Testing leaving my test markup data
*/
import {ref as databaseRef, set, get, remove} from 'firebase/database';
import {db, storage} from "../libs/firebase/firebaseConfig";

function seedReadCard ({key, seed, imageUrl, cost, descrip}) {
    const template = `
    <div class="vacation-rental card-group col-lg-3 col-md-6 mb-4 mb-lg-0" data-key="${key}">
        <!-- Card-->
        <div class="card rounded shadow border-0">
            <img src="${imageUrl}" alt="${seed}" class="img-fluid w-auto h-75 ratio card-img-top d-block mx-auto">
            <div class="card-body p-4">
            <h5><a href="#" class="text-dark mb-4 text-decoration-none">${seed}</a></h5>
            <h6>$${cost}</h6>
            <p>${descrip}</p>
            <div class="d-flex justify-content-evenly mt-3 gap-2">
                <button id="edit" class="btn btn-primary w-100" data-key="${key}">edit</button>
                <button id="delete" class="btn btn-sm btn-danger w-100" data-key="${key}">delete</button>
            </div>
          </div>
        </div>
    </div>
    `
    const element = document.createRange().createContextualFragment(template).children[0]
        addseedControls(element);
    return element;
}

function addseedControls(seed) {
    seed.querySelector('#edit').addEventListener('click', onEditSeed);
    seed.querySelector('#delete').addEventListener('click', onRemoveSeed);
}

function onEditSeed(e) {
    const key = e.target.dataset.key;
    sessionStorage.setItem('key', key);
    window.location.assign('update.html');
}

function onRemoveSeed(e) {
    const key = e.target.dataset.key;
    sessionStorage.setItem('key', key);
    if (confirm('Are you sure you want to delete this seed?')) {
        // Save it!
        const key = sessionStorage.getItem('key');
        const path = databaseRef(db, `seed/${key}`);
        remove(path);
        window.location.reload();
    } else {
        // Do nothing!
        return false;
    }
}

export {seedReadCard};