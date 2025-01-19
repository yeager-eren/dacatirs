import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { aptos, moduleAddress } from "./constants";
import { useEffect, useState } from "react";
import { Doctor } from "./types";


export function List() {

  const { account } = useWallet();

  const [dacatirs, setDacatirs] = useState<Doctor[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);

  const fetchList = async () => {
    if (!account) return [];
    try {

      setIsLoading(true);

      const dacatirsListResource = await aptos.getAccountResource(
        {
          accountAddress: account?.address,
          resourceType: `${moduleAddress}::dacatirs::DacatirsList`
        }
      );

      const tableHandle = dacatirsListResource.my_dacatirs.handle;
      const dacatirsCounter = dacatirsListResource.dacatirs_counter;

      const dacatirsArray = [];
      let counter = 1;
      while (counter <= dacatirsCounter) {
        const tableItem = {
          key_type: "u64",
          value_type: `${moduleAddress}::dacatirs::Doctor`,
          key: `${counter}`,
        };
        const doctor = await aptos.getTableItem<Doctor>({ handle: tableHandle, data: tableItem });
        dacatirsArray.push(doctor);
        counter++;
      }

      setDacatirs(dacatirsArray);
    } catch (e) {
      alert("an error occuer. see logs.");
      console.log(e)
    }
    finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchList();
  }, [account?.address]);


  return <div>
    {loading ? "loading list..." : null}
    {!loading && dacatirs.length === 0 ? "No doctors found..." : null}
    <ul>
      {
        dacatirs.map((doctor) =>
          <li  >
            {doctor.name}
          </li>
        )
      }
    </ul >

  </div>
}
