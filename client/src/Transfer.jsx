import { useState } from "react";
import server from "./server";
import {keccak256} from "ethereum-cryptography/keccak"
import { utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function hashAndSign() {
    try{
      const transactionMessage = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient: recipient
      }
    // hash the transaction. You have to change the message to string first, then byte. After that hash it.
  const hashedTransaction = keccak.keccak256(uft8ToBytes(JSON.stringify(transactionMessage)))
  const hexMessage = toHex(hashedTransaction)

  setHashedMessage(hexMessage)

  const signatureArray = await secp.sign(hexMessage, privateKey, {recovered: true});
  const signature = toHex(signatureArray[0]);
  setSignature(signature);
  const recoveryBit = signatureArray[1];
  setRecoveryBit(recoveryBit);
  }
  catch (error){
    console.log(error);
    alert(error);
  }

}

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature,
        recoveryBit,
        hexMessage
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
