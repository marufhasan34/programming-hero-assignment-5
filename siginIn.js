document.getElementById("signIn").addEventListener("click", () => {
  const inputName = document.getElementById("inputName");
  const inputNameValue = inputName.value;
  const inputPassword = document.getElementById("inputPassword");
  const inputPasswordValue = inputPassword.value;
  if (inputNameValue == "admin" && inputPasswordValue == "admin123") {
    alert("sign In successful");
    window.location.assign("./home.html");
  } else {
    alert("sorry! please try again");
    return;
  }
});
