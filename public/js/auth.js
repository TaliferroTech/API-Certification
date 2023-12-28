const signInTab = document.getElementById("signin-tab");
const authTab = document.getElementById("tab_4");
const mainContainer = document.getElementById("main_container");
const layer = document.getElementsByClassName("layer")[0];

console.log(layer);

const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);
ui.disableAutoSignIn();

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  console.log("connecting firebase auth emulator");
  auth.useEmulator("http://127.0.0.1:9099");
}

const uiConfig = {
  "callbacks": {
    // Called when the user has been successfully signed in.
    "signInSuccessWithAuthResult": function (authResult, redirectUrl) {
      console.log("authResult:", authResult);
      if (authResult.additionalUserInfo) {
        console.log(additionalUserInfo);
      }
      // Do not redirect.
      return false;
    },
  },
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
};

function handleSignedInUser(user) {
  signInTab.textContent = "Sign out";
  authTab.classList.remove("active");
  authTab.classList.remove("show");
  mainContainer.classList.remove("show_container");
  layer.classList.remove("layer-is-visible");

  console.log("user signed in:", user);
}

function handleSignedOutUser() {
  console.log("no user present");
  signInTab.textContent = "Sign in";
  signInTab.addEventListener("click", (event) => {
    if (signInTab.textContent === "Sign out") {
      auth.signOut();
      signInTab.removeEventListener("click", () => {});
    }
  });
  mainContainer.classList.remove("show_container");
  authTab.classList.remove("active");
  authTab.classList.remove("show");
  layer.classList.remove("layer-is-visible");

  ui.start("#firebaseui-auth-container", uiConfig);
}

let counter = 0;
auth.onAuthStateChanged(function (user) {
  console.log("called:", ++counter);
  user ? handleSignedInUser(user) : handleSignedOutUser();
});
