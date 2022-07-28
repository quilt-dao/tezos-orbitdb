import { tezos } from "./tezos";
import { getId, createDB, getDB } from "../database/index";

//Tezos doesnt accept decimals
// async function hi() {
//   let id = await getId();
//   console.log(id.publicKey);
//   let db = await getDB(
//     "/orbitdb/zdpuAwnWHePSv4qnkCyH2FKJsvthJVHseYyHynuaDTMbYkhca/quilt"
//   );
//   // let db = await createDB("jhjntygv", "feed", "public");
//   console.log(db.address.toString());
// }
// hi();

export const generateKeys = async () => {
  let id = await getId();
  const x = id.publicKey;

  let db = await createDB(id.publicKey, "feed", "public");
  const y = db.address.toString();

  try {
    const contract = await tezos.wallet.at(
      "KT1STdXhtaGLKXHdopCrMpoQWtez9e2rmmfF"
    );
    const op = await contract.methods.setUserKey(x, y).send();
    localStorage.setItem("publicKey", `{x}{y}`);
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};
