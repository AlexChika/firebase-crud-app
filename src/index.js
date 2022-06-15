// Dom ....
import {
  getAllUsers,
  createUser,
  deleteUser,
  dom,
  usersRender,
  updateUser,
  getUser,
  singleUserRender,
} from "./functions";
// dom elements
let usersDomElement = dom("#body");
let usersRefreshBtn = dom("#usersRefreshBtn");
let createUserForm = dom("#createUserForm");
let deleteUserForm = dom("#deleteUserForm");
let viewUserForm = dom("#viewUserForm");
let sigleUserDomElement = dom("#singleUserCon");
//   ........... event Listeners .............
// update all userson load
document.addEventListener("DOMContentLoaded", async () => {
  const users = await getAllUsers();
  usersDomElement.innerHTML = usersRender(users);
});
// refresh users in case of new changes
usersRefreshBtn.addEventListener("click", async () => {
  const users = await getAllUsers();
  usersDomElement.innerHTML = usersRender(users);
});
// creates user or updates existing user
createUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let inputObject = {};
  const inputs = [...e.currentTarget.querySelectorAll("input")];
  const bioInput = createUserForm.querySelector("#bio");
  const btn = createUserForm.querySelector("button");
  if (
    bioInput.textContent.trim() === "" ||
    bioInput.textContent.trim() === "Please fill this field"
  ) {
    bioInput.textContent = "Please fill this field";
    return;
  }
  btn.textContent = "Please wait";
  inputs.forEach((input) => {
    inputObject = {
      ...inputObject,
      [input.name]: input.value,
      bio: bioInput.textContent,
    };
  });
  console.log(inputObject);
  await createUser(inputObject.email, inputObject);
  btn.textContent = "User added";
  setTimeout(() => {
    btn.textContent = "Submit";
    createUserForm.reset();
    bioInput.textContent = "";
  }, 2000);
});
// deletes user using email
deleteUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("I was Clicked");
  const deleteEmail = deleteUserForm.deleteEmail.value;
  deleteUser(deleteEmail).then((resp) => {
    deleteUserForm.reset();
  });
  updateUserForm;
});
// update user fields
updateUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = updateUserForm.email.value;
  const field = updateUserForm.fields.value;
  const value = updateUserForm.value.value;
  let data = {
    [field]: value,
  };
  await updateUser(email, data);
  updateUserForm.reset();
});
// view a single user
viewUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = viewUserForm.email.value;
  console.log(email);
  let user;
  try {
    const snapshot = await getUser(email);
    user = snapshot.data();
  } catch (error) {
    user = "";
  }
  sigleUserDomElement.innerHTML = singleUserRender(user);
});
