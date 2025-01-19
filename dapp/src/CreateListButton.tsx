import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react"
import { useState } from "react";
import { aptos, moduleAddress } from "./constants";

export function CreateNewList() {

  const { account, signAndSubmitTransaction } = useWallet();

  const [accountHasList, setAccountHasList] = useState<boolean>(false);
  const [transactionInProgress, setTransactionInProgress] = useState<boolean>(false);

  const addNewList = async () => {
    if (!account) return [];
    setTransactionInProgress(true);

    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::dacatirs::create_list`,
        functionArguments: []
      }
    }

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({ transactionHash: response.hash });
      setAccountHasList(true);
    } catch (error) {
      setAccountHasList(false);
    } finally {
      setTransactionInProgress(false);
    }
  };

  if (accountHasList) {
    return <i>list exist</i>
  }

  return <button
    disabled={!account}
    onClick={addNewList}
    style={{ height: "40px", backgroundColor: "green", color: "white" }}
  >
    {transactionInProgress ? "creating... " : "Add new list"}
  </button>
}
