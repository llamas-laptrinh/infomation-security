const plaintext = document.getElementById("plain-text");
const shift = document.getElementById("shift");
const encryptButton = document.getElementById("encrypt-Button");
const encryptButton2 = document.getElementById("encrypt-Button2");
const encryptButton3 = document.getElementById("encrypt-Button3");
const decryptButton = document.getElementById("decrypt-Button");
const decryptButton2 = document.getElementById("decrypt-Button2");
const decryptButton3 = document.getElementById("decrypt-Button3");
const ciphertext = document.getElementById("cipher-text");
const keyinput = document.getElementById("key");

// Caesar cipher function 
function caesarCipher1(text, shift) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char);
            const newIndex = (index + shift) % 26;
            result += alphabet[newIndex];
        } else {
            result = "Không thể mã hóa vì có ký tự lạ";
            break;
        }
    }
    return result;
}


function monoalphabeticCipher(text, shift) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const key = alphabet.split('')
    key.sort(() => Math.random() - 0.5);
    const k = key.join('');
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char);
            const newIndex = (index + shift) % 26;
            result += k[newIndex];
        } else {
            result = "Không thể mã hóa vì có ký tự lạ";
            break;
        }
    }
    keyinput.value = k;
    return result;
}

function vigenereCipher(text, key) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();
        if (alphabet.includes(char)) {
            const shift = alphabet.indexOf(key[i % key.length]);
            const index = alphabet.indexOf(char);
            const newIndex = (index + shift) % 26;
            result += alphabet[newIndex];
        } else {
            result = "Không thể mã hóa vì có ký tự lạ";
            break;
        }
    }
    return result;
}

encryptButton3.addEventListener("click", () => {
    try {
        const keyValue = (keyinput.value);
        const encryptedText = vigenereCipher(plaintext.value, keyValue);
        ciphertext.innerHTML = encryptedText;
    } catch (error) {
        alert("Kiểm tra lại các ô dữ liều cần");
    }

});

encryptButton2.addEventListener("click", () => {
    try {
        const shiftValue = parseInt(shift.value);
        const encryptedText = monoalphabeticCipher(plaintext.value, shiftValue);
        ciphertext.innerHTML = encryptedText;
    } catch (error) {
        alert("Kiểm tra lại các ô dữ liều cần");
    }
});

encryptButton.addEventListener("click", () => {
    try {
        const shiftValue = parseInt(shift.value);
        const encryptedText = caesarCipher1(plaintext.value, shiftValue);
        ciphertext.innerHTML = encryptedText;
    } catch (error) {
        alert("Kiểm tra lại các ô dữ liều cần");
    }
});