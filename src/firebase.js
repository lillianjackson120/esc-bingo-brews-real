import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseEnabled = Boolean(cfg.apiKey && cfg.projectId && cfg.appId);
let db = null;
if (firebaseEnabled) db = getFirestore(initializeApp(cfg));

const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('esc-bingo-state') : null;
const defaultState = {
  mode: 'game',
  called: [],
  pattern: 'Traditional Bingo',
  announcement: '',
  announcementVisible: false,
  currentHostToken: '',
  currentHostUntil: 0,
  sponsors: [
    { name: 'Crow Shields Bailey', level: 'Title Sponsor', logo: '/assets/crow-shields-bailey.png' },
    { name: 'BankPlus', level: 'Gold Sponsor', logo: '/assets/bankplus.jpg' },
    { name: 'Castle Technology Partners', level: 'Gold Sponsor', logo: '/assets/castle.png' },
    { name: "Cockrell's Body Shop", level: 'Gold Sponsor', logo: '/assets/cockrells.jpg' },
    { name: 'Riviera Utilities', level: 'Team Sponsor', logo: '/assets/riviera.png' },
    { name: 'Fairhope Brewing Company', level: 'Host Partner', logo: '/assets/fairhope-brewing.webp' }
  ],
  tableSponsors: ['Wilkins Miller','Social Magazine','Tracey Goens','Avizo','Bryant Bank','Daphne Utilities','Uniti Fiber','River Bank & Trust','Alabama Credit Union','Alabama Power'],
  beerMessages: ['Grab another drink.','Purchase raffle tickets.','Support United Way.','Thank you to our sponsors and players!']
};

export { defaultState };

const localKey = 'esc-bingo-state-v1';
function readLocal(){ try { return { ...defaultState, ...(JSON.parse(localStorage.getItem(localKey)) || {}) }; } catch { return defaultState; } }
function writeLocal(state){ localStorage.setItem(localKey, JSON.stringify(state)); channel?.postMessage(state); }

export function subscribeState(cb){
  if(firebaseEnabled){
    const ref = doc(db,'events','bingo-brews-2026');
    getDoc(ref).then(s=>{ if(!s.exists()) setDoc(ref, defaultState, { merge:true }); });
    return onSnapshot(ref, snap => cb({ ...defaultState, ...(snap.data() || {}) }));
  }
  cb(readLocal());
  const handler = e => cb({ ...defaultState, ...e.data });
  channel?.addEventListener('message', handler);
  window.addEventListener('storage', () => cb(readLocal()));
  return () => channel?.removeEventListener('message', handler);
}

export async function saveState(patch){
  if(firebaseEnabled){
    await setDoc(doc(db,'events','bingo-brews-2026'), { ...patch, updatedAt: serverTimestamp() }, { merge:true });
  } else {
    writeLocal({ ...readLocal(), ...patch });
  }
}
