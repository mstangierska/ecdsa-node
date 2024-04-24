const secp = require("ethereum-cryptography/secp256k1");
const keccak256 = require("ethereum-cryptography/keccak")
const { toHex } = require("ethereum-cryptography/utils")

const privateKey = secp.secp256k1.utils.randomPrivateKey()
const publicKey = secp.secp256k1.getPublicKey(privateKey)
const address = keccak256.keccak256(publicKey.slice(1)).slice(-20);


console.log(`privateKey : ${toHex(privateKey)}`)
console.log(`publicKey : ${toHex(publicKey)}`)
console.log(`address: 0x${toHex(address)}`);

