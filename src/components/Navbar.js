import { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";
import logo from "../assets/Quilt.png";

const Navbar = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const activeAccount = await getAccount();
      setAccount(activeAccount);
    })();
  }, []);

  // TODO 4.a - Complete onConnectWallet function
  const onConnectWallet = async () => {
    await connectWallet();
    const activeAccount = await getAccount();
    setAccount(activeAccount);
  };

  return (
    <div className="navbar">
      <a href="/" className="navbar-brand">
        <img src={logo} className="logo" width="200px" />
      </a>
      <div className="d-flex">
        {/* TODO 4.b - Call connectWallet function onClick  */}
        <button onClick={onConnectWallet} className="btn btn-outline-info">
          {/* TODO 5.a - Show account address if wallet is connected */}
          {account !== "" ? account : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
