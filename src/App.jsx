import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowsymbol, setAllowSymbol] = useState(false);
  const [copytext, setCopytext] = useState("Copy");
  // This is the function which Generator a password----------------
  const refOfButton = useRef(null);

  let passwordGenerator = useCallback(() => {
    let st = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNumber) {
      st += "1234567890";
    }
    if (allowsymbol) {
      st += "!@#$%^&*()_+=-[]{};'.,<>?/|";
    }
    let pass = "";
    for (let i = 1; i <= length; i++) {
      let random = Math.round(Math.random() * st.length + 1);
      pass += st.charAt(random);
    }
    setPassword(pass);
  }, [length, setPassword, allowNumber, allowsymbol]);
  // here we are write dependency array because of optimize the program .
  // ------------------------------------------------------------------

  // This is for copy password.
  function copyPass() {
    // refOfButton.current.select();
    setCopytext("Copied ✅");
    window.navigator.clipboard.writeText(password); // That is how we can also copy things on our clipbord.
  }
  // ----------------------------------------------------------------------

  // Through this useEffect hook we can run a function .
  useEffect(() => {
    passwordGenerator();
    setCopytext("Copy");
  }, [length, allowNumber, allowsymbol, setPassword, passwordGenerator]);
  // we are use dependency array in useEffect because if any kind of changes happend in dependency like "lenght","allowNumber",so on .. .then the changes also reflect on UI or webapp.

 
 
 
 
 
  return (
    <>
      <div className=" w-screen h-screen bg-black flex flex-col justify-center items-center py-11">
        <h1 className=" text-white text-5xl mb-8 ">Password Generator</h1>
        <div className="mb-6">
          <input
            className=" px-6 py-2 w-96 rounded-full cursor-pointer outline-none"
            type="text"
            ref={refOfButton}
            id="length"
            readOnly
            placeholder="Password"
            value={password}
          />
          <button
            className=" px-5 py-2 ml-4 rounded-full bor transition-all bg-orange-500  hover:bg-orange-600 duration-300 ..."
            onClick={copyPass}
          >
            {copytext}
          </button>
        </div>
        <div className="flex items-center">
          <input
            className="mr-2"
            type="range"
            value={length}
            min="8"
            max="30"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-white mr-5">The length is {length}</label>
          <label htmlFor="number" className=" text-white mr-2">
            Number
          </label>
          <input
            type="checkbox"
            id="number"
            className="mr-4"
            onClick={() => setAllowNumber((priv) => !priv)}
          />
          <label htmlFor="symbols" className=" text-white mr-2">
            Symbols
          </label>
          <input
            type="checkbox"
            id="symbols"
            className="mr-4 "
            onClick={() => setAllowSymbol((priv) => !priv)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
