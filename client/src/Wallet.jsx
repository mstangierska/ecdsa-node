import server from "./server";
import {toHex } from "ethereum-cryptography/utils.js";
import * as secp from "ethereum-cryptography/secp256k1";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    const address = toHex(secp.secp256k1.getPublicKey(privateKey))
    setAddress(address);
    if (address) {
      const {
        data: { balance, privateKey },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
      setPrivateKey(privateKey)

    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Address
        <input placeholder="Type a public key, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div>
      Address: {address.slice(10)}...
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
