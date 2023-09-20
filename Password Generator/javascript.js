const passwordBox = document.getElementById("password-input");
const passwordButton = document.getElementById("passwordButton");
const generatePasswordButton = document.getElementById("generatePassword");
const passLength = 12;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const specialChar = "!@#$%^&*()";

const allChar = upperCase + lowerCase + number + specialChar;

function createPassword() {
    let newPass = "";

    newPass += upperCase[Math.floor(Math.random() * upperCase.length)];
    newPass += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    newPass += number[Math.floor(Math.random() * number.length)];
    newPass += specialChar[Math.floor(Math.random() * specialChar.length)];

    while (passLength > newPass.length) {
        newPass += allChar[Math.floor(Math.random() * allChar.length)];
        }

    passwordBox.value = newPass;
}

generatePasswordButton.addEventListener("click", () => {
    createPassword();
});

passwordButton.addEventListener("click", () => {
    passwordBox.select();
    document.execCommand("copy");
});