import { IoTriangleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const counterRef = doc(db, "hateCounter", "globalCounter");
  useEffect(() => {
    const unsubscribe = onSnapshot(counterRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setCounter(docSnapshot.data().count);
      } else {
        setDoc(counterRef, { count: 0 });
      }
    });

    return () => unsubscribe();
  }, []);

  const incHate = async () => {
    try {
      const docSnapshot = await getDoc(counterRef);
      const currentCount = docSnapshot.exists() ? docSnapshot.data().count : 0;

      await setDoc(counterRef, { count: currentCount + 1 });
    } catch (err) {
      console.error("error hating israel :", err);
    }
  };

  return (
    <>
      <div className="counter col-12">
        <h1>{counter}</h1>
        <h2 className="m-0 p-0">hates for israel</h2>
      </div>
      <div className="incHate col-12">
        <button onClick={incHate}>
          <IoTriangleSharp />
        </button>
      </div>
    </>
  );
}
