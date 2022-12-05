import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';

var db = null;

function initRealtimeDB(firebaseApp) {
  db = getDatabase(firebaseApp);
  return db;
}

async function write(id, data) {
  if (window.isRender) return;
  await set(ref(db, `projects/${id}`), data);
}

function listen(id, callback) {
  onValue(ref(db, `projects/${id}`), (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

export { initRealtimeDB, write, listen }