const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { ethers } = require('ethers')

// const { keccak256 } = require("ethereum-cryptography/keccak256");

app.use(cors());
app.use(express.json());

const balances = {
  "03c5d097336a6756dfe33d22b55d10ae51f93e6c58945ea1baf90b1b06eebc6ee3": 100,
  "0x2": 50,
  "0x3": 75,
};

const balances = {
  "0x503adc1257af235578a16b0857d03fde4af51505": 100,
  "0x029c7459a79756558a9e376a4465c665bc1f2338": 75,
};

const privateKeys = {
  "0x503adc1257af235578a16b0857d03fde4af51505": "8c9d8e06b029d540f0582839dd909df57aa6eb9fb7a2205648dfda6e95688165",
  "0x029c7459a79756558a9e376a4465c665bc1f2338": "029d27acf8958c2632d6cf51fd32255ae335b7ea60327f5dff9d9c06bc3f1513ec",
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  const privateKey = privateKeys['address']
  res.send({ balance, privateKey });
});

app.post("/send", (req, res) => {

  try {
  // recover a public address from the signature
  const { signature, hexMessage, recoveryBit, sender, recipient, amount } = req.body;

  const signaturePublicKey = secp.recoverPublicKey(hexMessage, signature, recoveryBit);
  const signatureAddressNotHex = keccak256(signaturePublicKey.slice(1)).slice(-20);
  const signatureAddress = "0x" + toHex(signatureAddressNotHex);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (signatureAddress !== sender) {
    res.status(400).send({message: "You are not the person!"})
  }
  else {

  if (balances[sender] < amount && pk == sender) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
}

}
}
);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
