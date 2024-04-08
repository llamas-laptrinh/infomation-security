function generateSubKey(key) {
  const subKey = key.slice(round * subKeyLength, (round + 1) * subKeyLength);
  return subKey;
}
function xor(a, b) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b[i];
  }
  return result;
}

function feistelCipher(block, key) {
  const subKey = generateSubKey(key);

  const leftHalf = block.slice(0, block.length / 2);
  const rightHalf = block.slice(block.length / 2);

  //   const fResult = applyFunctionF(rightHalf, subKey); // Áp dụng hàm F

  //   const newLeftHalf = xor(fResult, leftHalf); // XOR kết quả F với nửa trái
  //   const newRightHalf = rightHalf; // Nửa phải không thay đổi

  //   const swappedBlock = newLeftHalf.concat(newRightHalf); // Ghép hai nửa
  //   const permutedBlock = applyPermutation(swappedBlock); // Hoán vị khối

  //   return permutedBlock;
}
feistelCipher();
