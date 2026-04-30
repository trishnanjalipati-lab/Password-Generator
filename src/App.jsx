import { useState } from "react";
import { useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const num = "0123456789";
    const character = "~!@#$%^&*(){}<>?`[];',./";
    if (number) {
      str += num;
    }
    if (char) {
      str += character;
    }
    for (let i = 1; i <= length; i++) {
      const random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [number, char, length, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md text-center mx-auto px-3 py-1 text-white bg-blue-400 my-10 shadow-gray-500 shadow-md">
        <p className="font-bold text-xl">Password Generator</p>
        <div className="flex mb-4 mt-1 overflow-hidden rounded-xl">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-1 px-1 bg-white text-black"
            readOnly
            ref={passwordRef}
          ></input>
          <button
            className="bg-gray-400 text-white px-3 py-0.5 shrink-0 cursor-pointer"
            onClick={copyToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-5">
          <div className="flex gap-x-1 items-center">
            <input
              type="range"
              max={64}
              min={4}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            ></input>
            <label>Length:{length}</label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              defaultChecked={char}
              id="charInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
