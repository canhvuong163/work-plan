import { getFirestore, collection, doc, addDoc, setDoc, getDocs, getDoc, query, where, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

var db = null;

function initFirestore(firebaseApp) {
  db = getFirestore(firebaseApp);
  return db;
}

async function createNew(email, name = 'Kế hoạch làm việc mới') {
  let ref = collection(db, 'projects');

  let data = {
    owner: email,
    name: name,
    shareable: false,
    members: "",
    data: [
      {
        "name": "Nội dung kế hoạch công việc",
        "noiDungCongViec": [
          {
            "type": "",
            "description": ""
          }
        ],
        "nguoiThucHien": [
          {
            "type": "",
            "description": ""
          }
        ],
        "thoiGianThucHien": [
          {
            "type": "",
            "description": ""
          }
        ],
        "tienDoCongViec": [
          {
            "type": "",
            "description": ""
          }
        ]
      }
    ],
  };

  let docRef = await addDoc(ref, data);

  return {
    id: docRef.id,
    ...data,
  };
}

async function getListByEmail(email) {
  let ref = collection(db, 'projects');
  let condition = where('owner', '==', email);
  let querySnapshot = await getDocs(query(ref, condition));

  let result = [];
  querySnapshot.forEach(doc => {
    result.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return result;
}

async function getOneById(id) {
  try{let ref = doc(db, 'projects', id);

  let snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    return null;
  }} catch (e) {
    alert('Dự án này chưa được chủ sở hữu chia sẻ hoặc không tồn tại');
    window.open('./home.html', '_self');
  }
}

async function updateById(id, data) {
  try {
    let ref = doc(db, 'projects', id);
    await setDoc(ref, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteById(id) {
  try {
    let ref = doc(db, 'projects', id);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateGeneralById(id, newName, shareable, members) {
  try {
    let ref = doc(db, 'projects', id);
    await setDoc(ref,
      { name: newName, shareable: shareable, members: members},
      { merge: true },
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { initFirestore, createNew, getListByEmail, getOneById, updateById, updateGeneralById, deleteById }
