auth.onAuthStateChanged(user => {
    console.log(user.email)
    if (user) {
        let users = document.querySelector("#user")
        users.textContent = `user logged in as ${user.email}`
    } else {
        let users = document.querySelector("#user")
        users.textContent = "user logged out"

    }
})



// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});


////////authentication
const signupForm = document.querySelector("#signup-form")

signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;
    ////Sign up the users
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user.uid);
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
})
/////sign out a user
const logOut = document.querySelector("#logout")
logOut.addEventListener("click", () => {
    auth.signOut().then(() => {
        console.log("user sign out")
    })
})

///sign in a user
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("click", (e) => {
    e.preventDefault();
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user.uid)
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch((e) => {
        console.log(e.message)
    })
})
