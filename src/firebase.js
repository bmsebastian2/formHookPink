 import firebase from 'firebase/app';
 import 'firebase/firestore';
 
 
 var firebaseConfig = {
  apiKey: "AIzaSyCxLtcxeONUjyJmjKMAv2UHtJ5IAkl80ek",
  authDomain: "react-materialui-formhook-1.firebaseapp.com",
  projectId: "react-materialui-formhook-1",
  storageBucket: "react-materialui-formhook-1.appspot.com",
  messagingSenderId: "441146528853",
  appId: "1:441146528853:web:c9054845f97b435e0430dc"
  };
  
  let arrPerson = [];
  
  const fb = firebase.initializeApp(firebaseConfig);
  const db = fb.firestore();
    
  const agregarPersona = async (Per) => {
    await db.collection('personas').doc().set(Per)
  }
  
  db.collection('personas').onSnapshot((querySnapshoty)=>{
    querySnapshoty.forEach((doc) => {
      arrPerson.push(doc.data())
      arrPerson.push({...doc.data(), id:doc.id})
    })
  })

  const getarrPerson = () => {
    return arrPerson
  }



  export {agregarPersona, db, arrPerson}
