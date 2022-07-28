import { generateKeys } from "../utils/operation";
import { useState } from "react";
import { data } from "../utils/tzkt";
import { useEffect } from "react";
import Chat from "./Chat";

export default function GenKey() {
  const walletAdd = localStorage.getItem("wallet");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(false);
  useEffect(() => {
    if (JSON.stringify(data).includes(walletAdd)) {
      setKey(true);
    }
  });

  const onKeys = async () => {
    setLoading(true);
    await generateKeys();
    alert("Transaction successful!");

    setLoading(false);
  };

  if (key == true) {
    return (
      <div>
        <div className="genkey">
          <h4>Key active</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="genkey" id="genkey">
        <button disabled={loading} onClick={onKeys}>
          {/* TODO 7.c - Show "loading..." when buying operation is pending */}
          {loading === true ? "Loading..." : "Generate Private Key"}
        </button>
      </div>
    );
  }
}
