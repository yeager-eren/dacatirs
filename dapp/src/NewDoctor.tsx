import { useState } from "react";
import { aptos, moduleAddress } from "./constants";
import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";

export function NewDoctor() {


  const { account, signAndSubmitTransaction } = useWallet();
  const [newDoctor, setNewDoctor] = useState<string>("");
  const [transactionInProgress, setTransactionInProgress] = useState<boolean>(false);

  const onSubmit = async () => {
    // check for connected account
    if (!account) return;
    setTransactionInProgress(true);

    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::dacatirs::create_doctor`,
        functionArguments: [newDoctor]
      }
    }

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });

      // clear input text
      setNewDoctor("");

      window.location.reload()
    } catch (error) {
      alert("error occured on creating doctor")
      console.log("error", error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  return <div>

    <h3> Create a new doctor </h3>
    <hr />

    <input
      type="text"
      onChange={(e) => {
        setNewDoctor(e.target.value)
      }}
    />

    <button onClick={onSubmit}>
      {transactionInProgress ? "Submitting..." : "Submit"}
    </button>
  </div>
}
