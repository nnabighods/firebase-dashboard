import {ref as databaseRef, get, set, update} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {seedReadCard} from './templates/seedReadCard';

async function pageInit(){
    const seedRef = databaseRef(db, 'seed/');
    const seedSnapShot = await get(seedRef);
    const data = seedSnapShot.val();
    // data you need to know its structure
    // firebase structure Obj of Objects { {}, {}, {}, {}, {} }
    // Obj.keys Obj.values Obj.entries
    // document.body.append(vacationRental());
    const cards = Object.values(data).map(seed=> {
        // console.log(vacationRental(rental));
        const card = seedReadCard(seed);
        document.querySelector('#product-cards').append(card);
        return null;
    });
}

pageInit();
