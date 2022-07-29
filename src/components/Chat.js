import { getDB } from "../database";
import { useState, useEffect } from "react";
import global from "../assets/global.png";
import { data } from "../utils/tzkt";

export default function Chat() {
  let interval;
  useEffect(() => {
    interval = setInterval(() => {
      Display();
    }, 1000);
  }, []);

  let publicDB;
  async function openDB() {
    publicDB = await getDB(
      "/orbitdb/zdpuAwnWHePSv4qnkCyH2FKJsvthJVHseYyHynuaDTMbYkhca/quilt"
    );
  }
  openDB();

  function OpenForm() {
    document.getElementById("myForm").style.display = "block";
    // setInterval(Display, 50);
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    return () => clearInterval(interval);
  }
  async function globalChat() {
    let input = document.getElementById("input");
    let text;
    if (input.value === "") {
      return;
    } else {
      text = input.value;
    }
    publicDB = await getDB(
      "/orbitdb/zdpuAwnWHePSv4qnkCyH2FKJsvthJVHseYyHynuaDTMbYkhca/quilt"
    );
    let info = {};
    info["add"] = localStorage.getItem("wallet");
    const d = new Date().getTime();
    info["datetime"] = d.toString();

    publicDB.put(JSON.stringify(info), text).then((input.value = ""));
  }

  let keys;
  let values;
  const Display = async () => {
    try {
      let publicDB = await getDB(
        "/orbitdb/zdpuAwnWHePSv4qnkCyH2FKJsvthJVHseYyHynuaDTMbYkhca/quilt"
      );

      const data = publicDB.all;

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
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  };
  // let input = document.getElementById("input");
  // if (input) {
  //   input.addEventListener("keypress", function (event) {
  //     // If the user presses the "Enter" key on the keyboard
  //     if (event.key === "Enter") {
  //       // Cancel the default action, if needed
  //       event.preventDefault();
  //       // Trigger the button element with a click
  //       // document.getElementById("send").click();
  //       globalChat();
  //     }
  //   });
  // }

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
          onClick={() => OpenForm()}
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

            <input
              type="button"
              className="button"
              onClick={() => globalChat()}
              value="Send"
              id="send"
            />

            <button
              type="button"
              className="button"
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
