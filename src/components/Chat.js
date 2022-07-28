import { getDB } from "../database";
import { useState, useEffect } from "react";
import global from "../assets/global.png";
import { data } from "../utils/tzkt";

export default function Chat() {
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  async function globalChat() {
    let input = document.getElementById("input");
    let text;
    if (input.value == "") {
      return;
    } else {
      text = input.value;
    }
    let publicDB = await getDB(
      "/orbitdb/zdpuAwnWHePSv4qnkCyH2FKJsvthJVHseYyHynuaDTMbYkhca/quilt"
    );
    let info = {};
    info["add"] = localStorage.getItem("wallet");
    const d = new Date().getTime();
    info["datetime"] = d.toString();
    publicDB.put(JSON.stringify(info), text);
  }
  let keys;
  let values;
  const Display = async () => {
    try {
      let publicDB = await getDB(
        "/orbitdb/zdpuAwnWHePSv4qnkCyH2FKJsvthJVHseYyHynuaDTMbYkhca/quilt"
      );
      await publicDB.load();
      const data = publicDB.all;
      console.log();
      keys = Object.keys(data);
      values = Object.values(data);
      document.getElementById("txt").innerHTML = "";
      for (let i = keys.length - 1; i >= 0; --i) {
        let from = JSON.parse(keys[i]);
        let datetime = parseInt(from["datetime"]);
        datetime = new Date(datetime);
        document.getElementById("txt").innerHTML +=
          values[i] +
          `<h5 style="color:grey;">` +
          from["add"] +
          "<br />" +
          datetime +
          "</h5>" +
          "<br/>" +
          "<br/>";
      }
    } catch (error) {
      console.log(error);
    }
    //scroller
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "auto",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  };

  setTimeout(Pause, 4000);
  function Pause() {
    setInterval(Display, 500);
  }
  const walletAdd = localStorage.getItem("wallet");

  const [key, setKey] = useState(false);
  useEffect(() => {
    if (JSON.stringify(data).includes(walletAdd)) {
      setKey(true);
    }
  });

  if (walletAdd != null) {
    return (
      <div>
        <img
          src={global}
          type="button"
          className="open-button"
          onClick={() => openForm()}
        />
        <div className="chat-popup" id="myForm">
          <h1>Global Chat</h1>
          <div className="chats" id="global">
            <div id="txt"></div>
          </div>
          <form className="input">
            <input
              className="publisher-input"
              type="text"
              placeholder="Write something..."
              id="input"
            />

            <input type="button" onClick={() => globalChat()} value="Send" />

            <button
              type="button"
              className="btn cancel"
              onClick={() => closeForm()}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <h1>Please Generate Keys before chatting</h1>;
  }
}
