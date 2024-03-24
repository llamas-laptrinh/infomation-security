const plaintext = document.getElementById("plain-text");
const shift = document.getElementById("shift");
const encryptButton = document.getElementById("encrypt-Button");
const decryptButton = document.getElementById("decrypt-Button");
const ciphertext = document.getElementById("cipher-text");
const show = document.getElementById("show")

// Caesar cipher function 
function caesarCipher(text, shift) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char);
            const newIndex = (index + shift) % 26;
            result += alphabet[newIndex].toUpperCase();
        } else {
            result = "Không thể mã hóa vì có ký tự lạ";
            break;
        }
    }
    return result;
}

encryptButton.addEventListener("click", () => {
    const shiftValue = parseInt(shift.value);
    const encryptedText = caesarCipher(plaintext.value, shiftValue);
    ciphertext.value = encryptedText;
});