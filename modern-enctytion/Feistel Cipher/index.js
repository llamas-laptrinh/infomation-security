// Hàm tạo khóa ngẫu nhiên
function rand_key(p) {
  let key = "";
  for (let i = 0; i < p; i++) {
    const temp = Math.floor(Math.random() * 2); // Tạo bit ngẫu nhiên 0 hoặc 1
    key += temp.toString();
  }
  return key;
}

// Hàm thực hiện XOR bit
function exor(a, b) {
  let temp = "";
  for (let i = 0; i < a.length; i++) {
    const xorResult = a[i] ^ b[i];
    temp += xorResult.toString();
  }
  return temp;
}

// Hàm chuyển đổi nhị phân sang thập phân
function binaryToDecimal(binary) {
  console.log("binaryToDecimal", binary);
  return parseInt(binary, 2);
}

// Mã Feistel Cipher
const PT = "Hello";
console.log("Plain Text is:", PT);

// Chuyển văn bản thuần sang ASCII và nhị phân
const PT_Ascii = Array.from(PT).map((char) => char.charCodeAt(0));
const PT_Bin = PT_Ascii.map((ascii) => ascii.toString(2).padStart(8, "0")).join(
  ""
);

function generateCipherText(bin_data) {
  let str_data = "";

  for (let i = 0; i < bin_data.length; i += 7) {
    const temp_data = bin_data.slice(i, i + 7);
    const decimal_data = binaryToDecimal(temp_data);
    str_data += String.fromCharCode(decimal_data);
  }

  console.log("Cipher Text:", str_data);
  return str_data;
}

function prepareData() {
  const n = Math.floor(PT_Bin.length / 2);
  const L1 = PT_Bin.slice(0, n);
  const R1 = PT_Bin.slice(n);
  const m = R1.length;

  // Tạo K1 và K2
  const K1 = rand_key(m);
  const K2 = rand_key(m);

  // Vòng lặp Feistel đầu tiên
  const f1 = exor(R1, K1);
  const R2 = exor(f1, L1);
  const L2 = R1;

  // Vòng lặp Feistel thứ hai
  const f2 = exor(R2, K2);
  const R3 = exor(f2, L2);
  const L3 = R2;
  return { L3, R3, K2, K1 };
}

function encodeFeistelCipher() {
  const { L3, R3 } = prepareData();
  // Cipher text
  const bin_data = L3 + R3;
  document.writeln("Encoded Text", bin_data);
  return generateCipherText(bin_data);
}

function decodeFeistelCipher() {
  const { L3, R3, K2, K1 } = prepareData();
  const L4 = L3;
  const R4 = R3;

  const f3 = exor(L4, K2);
  const L5 = exor(R4, f3);
  const R5 = L4;

  const f4 = exor(L5, K1);
  const L6 = exor(R5, f4);
  const R6 = L5;
  const PT1 = L6 + R6;

  const PT1_int = binaryToDecimal(PT1);
  const RPT = String.fromCharCode(
    ...Array.from(PT1_int.toString(16), (char) => parseInt(char, 16))
  );
  console.log("Retrieved Plain Text is: ", RPT);
  document.writeln("Decoded Text", RPT);
  return RPT;
}

encodeFeistelCipher();
decodeFeistelCipher();
