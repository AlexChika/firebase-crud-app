import { colRef, docRef } from "./firebaseConfig";
import {
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

// Getting all users from firebase
const getAllUsers = () => {
  return getDocs(colRef)
    .then((snapshot) => {
      let users = [];
      snapshot.forEach((user) => {
        users.push({
          ...user.data(),
          id: user.id,
        });
      });
      return users;
    })
    .catch((err) => {
      console.log(err.message);
      return [];
    });
};
const createUser = (email, data) => {
  const docref = docRef(email);
  return setDoc(docref, data);
};
const deleteUser = (email) => {
  const docref = docRef(email);
  return deleteDoc(docref);
};
const updateUser = (email, data) => {
  const docref = docRef(email);
  return updateDoc(docref, data);
};
const getUser = (email) => {
  const docref = docRef(email);
  return getDoc(docref);
};
//  Real Time Data Collection
//  getting Dom elements
function dom(selector) {
  const element = document.querySelector(selector);
  if (element) {
    return element;
  }
  throw new Error(`no element was found with this "${selector}" selector`);
}
// outputs html for all users
function usersRender(array) {
  if (array.length < 1) {
    return `<h2>Please try again</h2>`;
  }
  const html = array
    .map((user) => {
      const { age, name, surname, email, phone, bio } = user;
      return ` 
         <article class="user">
              <h1>${name} ${surname}</h1>
              <p class="email">${email}</p>
              <div>
                <div class="falign">
                  <p style="margin-right: 10px;" class="identifiers">age</p>
                  <small>${age} years</small>
                </div>
                <div class="falign">
                  <p  style="margin-right: 10px;" class="identifiers">phone</p>
                  <small>${phone}</small>
                </div>
                <p>${bio}</p>
              </div>
            </article>
        `;
    })
    .join("");
  return html;
}
//outputs html for single user
function singleUserRender(user) {
  const { age, bio, email, name, surname, phone } = user;
  if (!user) {
    return `<h2>Please try again</h2>`;
  }
  return `
   <div class="singleUser">
              <div class="imgCon">
                <img
                  src="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png"
                  alt="avatar icon"
                />
              </div>
              <div class="userDetail">
                <div>
                  <h1>${name} ${surname}</h1>
                  <p>${phone}</p>
                </div>
                <div>
                  <h2${email}</h2>
                  <p>${age}</p>
                </div>
                <p>${bio}</p>
              </div>
            </div>
            `;
}
export {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  dom,
  usersRender,
  singleUserRender,
};
