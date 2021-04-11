// // setup materialize components
// document.addEventListener('DOMContentLoaded', function () {

//     var modals = document.querySelectorAll('.modal');
//     M.Modal.init(modals);

//     var items = document.querySelectorAll('.collapsible');
//     M.Collapsible.init(items);

// });
// ////////**conditionally renderin ui showing or hide nav menu as per authentication status */
// const loggedIn = document.querySelectorAll(".logged-in");
// const loggedOut = document.querySelectorAll(".logged-out")
// const accountDetails = document.querySelector(".account-details");
// const setupUI = (user) => {

//     if (user) {

//         loggedIn.forEach(item => item.style.display = "block")
//         loggedOut.forEach(item => item.style.display = "none")
//         let html = `<div>Logged in as --<b> ${user.email}</b></div>`
//         accountDetails.innerHTML = html;
//     } else {
//         loggedIn.forEach(item => item.style.display = "none")
//         loggedOut.forEach(item => item.style.display = "block")
//     }
// }



// ////////***database part */
// let guideList = document.querySelector(".guides")
// const setupGuide = (data) => {
//     if (data.length) {
//         let html = "";
//         data.forEach(doc => {
//             let guide = doc.data();

//             let li = `
//         <li>
//         <div class="collapsible-header grey lighten-4">${guide.title}</div>
//         <div class="collapsible-body white">${guide.content}</div>

//         </li>
//         `
//             html += li
//         })
//         guideList.innerHTML = html;
//     } else {
//         guideList.innerHTML = "<h5 class='center-align'>Log in to see guide details</h5>"
//     }
// }

















// /////////look up changing state of authentication

// auth.onAuthStateChanged(user => {

//     if (user) {
//         db.collection("guides").onSnapshot((snapshots) => {
//             setupGuide(snapshots.docs)
//             setupUI(user)
//         })

//     } else {
//         db.collection("guides").get().then((snapshots) => {
//             setupUI()
//             setupGuide([])
//         })



//         ////////authentication
//         const signupForm = document.querySelector("#signup-form")

//         signupForm.addEventListener("submit", (e) => {
//             e.preventDefault()
//             const email = signupForm["signup-email"].value;
//             const password = signupForm["signup-password"].value;
//             ////Sign up the users
//             auth.createUserWithEmailAndPassword(email, password).then(cred => {
//                 //console.log(cred.user.uid);
//                 const modal = document.querySelector("#modal-signup");
//                 M.Modal.getInstance(modal).close();
//                 signupForm.reset();
//             })
//         })
//         /////sign out a user
//         const logOut = document.querySelector("#logout")
//         logOut.addEventListener("click", (e) => {
//             e.preventDefault();
//             auth.signOut()
//         })

//         ///sign in a user
//         const loginForm = document.querySelector("#login-form");

//         loginForm.addEventListener("click", (e) => {
//             e.preventDefault();
//             const email = loginForm["login-email"].value;
//             const password = loginForm["login-password"].value;
//             auth.signInWithEmailAndPassword(email, password).then(cred => {
//                 console.log(cred)
//                 const modal = document.querySelector("#modal-login");
//                 M.Modal.getInstance(modal).close();
//                 loginForm.reset();
//             }).catch((e) => {
//                 console.log(e.message)
//             })
//         })


//         ////////***adding guide to database */

//         let guideForm = document.querySelector("#create-form");

//         guideForm.addEventListener("submit", (e) => {
//             e.preventDefault();
//             const title = guideForm["title"].value;
//             const content = guideForm["content"].value;
//             console.log(title, content);

//             db.collection("guides").add({
//                 title: title,
//                 content: content
//             }).then(() => {
//                 const modal = document.querySelector("#modal-create");
//                 M.Modal.getInstance(modal).close();
//                 guideForm.reset();
//             })
//         })

// listen for auth status changes
// 





auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        }, err => console.log(err.message));
    } else {
        setupUI();
        setupGuides([]);
    }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('guides').add({
        title: createForm.title.value,
        content: createForm.content.value
    }).then(() => {
        // close the create modal & reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user & add firestore data
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value,
            age: signupForm['age'].value,
            firstname: signupForm['firstname'].value,
            lastname: signupForm['lastname'].value
        });
    }).then(() => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });

});



// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
    if (user) {
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
        <div>Logged in as ${user.email}</div>
       <div>${doc.data().bio}</div>
       <div>${doc.data().age}</div>
       <div>${doc.data().firstname}</div>
       <div>${doc.data().lastname}</div>
      `;

            accountDetails.innerHTML = html;
        });
        // toggle user UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // clear account info
        accountDetails.innerHTML = '';
        // toggle user elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
};

// setup guides
const setupGuides = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
          <div class="collapsible-body white"> ${guide.content} </div>
        </li>
      `;
            html += li;
        });
        guideList.innerHTML = html
    } else {
        guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
    }


};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});
