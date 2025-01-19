// <account-address>::<module-name>
module dacatirs_addr::dacatirs {
  use std::string::String;
  use std::signer;
  use aptos_std::table::{Self, Table};

  // Errors
  const E_NOT_INITIALIZED: u64 = 1;

  struct DacatirsList has key{
    my_dacatirs: Table<u64, Doctor>,
    dacatirs_counter: u64
  }

  struct Doctor has store, drop, copy {
    doctor_id: u64,
    address:address,
    name: String,
  }

  // entry -> write
  public entry fun create_list(account: &signer){

    let createdList = DacatirsList {
      my_dacatirs: table::new(),
      dacatirs_counter: 0
    };

    move_to(account, createdList);
  }

  public entry fun create_doctor(account: &signer, name: String) acquires DacatirsList {
    // gets the signer address
    let signer_address = signer::address_of(account);

    // assert signer has created a list
    assert!(exists<DacatirsList>(signer_address), E_NOT_INITIALIZED);

    // gets the DacatirsList resource
    let dacatirs_list = borrow_global_mut<DacatirsList>(signer_address);

    // increment doctor counter
    let counter = dacatirs_list.dacatirs_counter + 1;

    // creates a new Doctor
    let new_doctor = Doctor {
      doctor_id: counter,
      address: signer_address,
      name,
    };
    // adds the new doctor into the dacatirs table
    table::upsert(&mut dacatirs_list.my_dacatirs, counter, new_doctor);

    // sets the doctor counter to be the incremented counter
    dacatirs_list.dacatirs_counter = counter;
  }
}
