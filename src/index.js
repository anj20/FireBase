import { initializeApp } from "firebase/app";
import {
  getfirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  where,
  query,
  orderBy,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVFVn7goXgJUyR90UpOqLgQ6eJCIzibIs",
  authDomain: "fir-books-ff377.firebaseapp.com",
  projectId: "fir-books-ff377",
  storageBucket: "fir-books-ff377.appspot.com",
  messagingSenderId: "783111522465",
  appId: "1:783111522465:web:5321b79d3916daf0e5c8e0",
  measurementId: "G-DLMXHS5J61",
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getfirestore();

//collection ref
const colRef = collection(db, "books");
//queries
const q = query(
  colRef,
  where("author", "==", "patrick rothfusses"),
  orderBy("title", "desc")
);

//get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach(() => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// real time collection data
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach(() => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// Adding a book
const addBook = document.querySelector(".add");
addBook.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBook.title.value,
    author: addBook.author.value,
  }).then(() => {
    addBook.reset();
  });
});

// Deleting a book
const deleteBook = document.querySelector(".delete");
deleteBook.addEventListener("submit", (e) => {
  e.preventDefault();
  const docref = doc(db, "books", deleteBook.id.value);
  deleteDoc(docref).then(() => {
    deleteBook.reset();
  });
});
