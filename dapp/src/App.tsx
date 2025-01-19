import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

import { CreateNewList } from "./CreateListButton";
import { List } from "./List";
import { NewDoctor } from "./NewDoctor";



function App() {

  return (
    <div>

      <h3>Your wallet</h3>
      <WalletSelector />
      <hr />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>List</h1>
        <CreateNewList />
      </div>

      <List />

      <NewDoctor />

    </div>
  )
}

export default App
