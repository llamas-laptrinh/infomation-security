function print(id, value) {
    document.getElementById(id).innerHTML = value;
}

function rand_key(p) {
    let key = "";
    for (let i = 0; i < p; i++) {
        const temp = Math.floor(Math.random() * 2);
        key += temp.toString();
    }
    return key;
}

// Hàm thực hiện XOR bit
function exor(a, b) {
    let temp = "";
    let pre = "";
    for (let i = 0; i < a.length; i++) {
        const xorResult = a[i] ^ b[i];
        pre += `${a[i]} | ${b[i]} => ${xorResult}\n`;
        temp += xorResult.toString();
    }
    return { temp, pre };
}

// Hàm chuyển đổi nhị phân sang thập phân
function binaryToDecimal(binary) {
    return parseInt(binary, 2);
}

function generateCipherText(bin_data) {
    let str_data = "";
    let steps = "";
    for (let i = 0; i < bin_data.length; i += 8) {
        const temp_data = bin_data.slice(i, i + 8);
        const decimal_data = binaryToDecimal(temp_data);
        steps += `binary: ${temp_data} => Decimal: ${decimal_data} => ASCII: ${String.fromCharCode(
        decimal_data
    )} \n`;
        str_data += String.fromCharCode(decimal_data);
    }
    print("encode-step", steps);
    return str_data;
}

function decimalToBinary(N) {
    return (N >>> 0).toString(2);
}

function getText(PT) {
    const PT_Ascii = Array.from(PT).map((char) => char.charCodeAt(0));
    const PT_Bin = PT_Ascii.map((ascii) => ascii.toString(2).padStart(8, "0"));
    return { PT_Bin: PT_Bin.join(""), PT_Ascii };
}

function prepareData(PT, seed, n) {
    const { PT_Bin, PT_Ascii } = getText(PT);
    print("ascii", PT_Ascii);
    print("binary", PT_Bin);

    const blockSize = Math.floor(PT_Bin.length / 2);
    const L = PT_Bin.slice(0, blockSize);
    const R = PT_Bin.slice(blockSize);
    print('l', L)
    print('r', R)


    const { PT_Bin: seed_Bin } = getText(seed);
    const dif = seed_Bin.length - PT_Bin.length;
    let tempSeed =
        dif < 0 ?
        seed_Bin + PT_Bin.substring(0, Math.abs(dif)) :
        seed_Bin.slice(dif);

    const K = [];
    let key = ``
    for (let i = 0; i < n; i++) {
        const shiftedSeed = tempSeed.slice(1) + tempSeed.slice(0, 1); // Dịch phải 1 bit
        K.push(tempSeed.length > 0 ? shiftedSeed.slice(0, blockSize) : rand_key(blockSize));
        tempSeed = shiftedSeed; // Cập nhật tempSeed cho vòng lặp tiếp theo
        key += `K${i+1} : ${K[i]}\n`
    }
    print('k', key)
    let tempL = L;
    let tempR = R;
    let xor_show = ``
    for (let i = 0; i < n; i++) {
        const { temp: f, pre: pre } = exor(tempR, K[i]);
        const { temp: temp, pre: pre2 } = exor(f, tempL);
        xor_show += `<pre id = "xor${i}a">exor(R${i+1}, K${i+1})\n${pre}KQ f${i+1}:${f})</pre>`
        xor_show += `<pre id = "xor${i}b">exor(f${i+1}, R${i+1})\n${pre2}KQ L${i+1}:${temp})</pre>`

        console.log("L" + (i + 1), tempL);
        console.log("R" + (i + 1), tempR);
        tempL = tempR;
        tempR = temp;
    }
    print('xor', xor_show)

    return { L: tempL, R: tempR, K: K };
}

function encodeFeistelCipher(PT, seed, n) {
    const { L, R, K } = prepareData(PT, seed, n);
    const bin_data = L + R;
    const encoded_str = generateCipherText(bin_data);
    return { bin_data, encoded_str };
}

function decodeFeistelCipher({ encoded_str, K, L, R }, n) {
    let tempL = L;
    let tempR = R;

    for (let i = n - 1; i >= 0; i--) {
        const { temp: f } = exor(tempL, K[i]);
        const { temp: temp } = exor(f, tempR);
        tempR = tempL;
        tempL = temp;
    }

    const PT1 = tempL + tempR;
    let str_data = "";
    for (let i = 0; i < PT1.length; i += 8) {
        const temp_data = PT1.slice(i, i + 8);
        str_data += String.fromCharCode(binaryToDecimal(temp_data));
    }
    return str_data;
}