import { useState, useCallback, useEffect, useRef } from "react";
// Code to generate from password generator
function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [lowercaseallowed, setlowercaseallowed] = useState(true);
  const [uppercaseallowed, setuppercaseallowed] = useState(true);
  const [numbersallowed, setnumbersallowed] = useState(false);
  const [symbolsallowed, setsymbolsallowed] = useState(false);

  // using useRef Hook
  const passwordRef = useRef(null);
  // function to copy in the window clipboard
  const copyToclipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let chars = "";
    if (lowercaseallowed) chars += "abcdefghijklmnopqrstuvwxyz";
    if (uppercaseallowed) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbersallowed) chars += "0123456789";
    if (symbolsallowed) chars += "!@#$%^&*()_+";
    let password = "";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * chars.length + 1);
      password += chars.charAt(char);
    }
    setPassword(password);
  }, [
    length,
    numbersallowed,
    symbolsallowed,
    lowercaseallowed,
    uppercaseallowed,
    setPassword,
  ]);

  useEffect(() => {
    passwordGenerator();
  }, [
    length,
    numbersallowed,
    symbolsallowed,
    lowercaseallowed,
    uppercaseallowed,
  ]);
  return (
    <>
      <div className="grid items-center gap-8 px-4 py-12 mx-auto md:px-6 lg:gap-12 max-w-xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">🐱 Generate a Cat Password 🐾</h1>
          <p className="text-gray-500 dark:text-gray-400">
            🐈 Customize your cat-themed password with the options below. 🐈
          </p>
        </div>
        <div className="grid items-start w-full gap-4">
          <div className="grid items-center gap-2">
            <label className="text-sm font-medium" htmlFor="password-length">
              Password Length
            </label>
            <output className="text-sm font-medium" id="password-length-output">
              {length}
            </output>
          </div>
          <input
            className="w-full bg-green-500"
            defaultValue="12"
            id="password-length"
            max="32"
            min="8"
            type="range"
            onChange={(e) => {
              e.preventDefault();
              setLength(e.target.value);
            }}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Uppercase Letters</span>
            <input
              checked={uppercaseallowed}
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              onClick={() => setuppercaseallowed(!uppercaseallowed)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Lowercase Letters</span>
            <input
              checked={lowercaseallowed}
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              onClick={() => setlowercaseallowed(!lowercaseallowed)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Numbers</span>
            <input
              checked={numbersallowed}
              type="checkbox"
              onClick={() => setnumbersallowed(!numbersallowed)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Symbols</span>
            <input
              checked={symbolsallowed}
              onClick={() => setsymbolsallowed(!symbolsallowed)}
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <input
            ref={passwordRef}
            type="text"
            readOnly
            value={password}
            className="w-full px-4 py-2 text-gray-700 bg-white border border-orange-300 rounded"
          />
          <button
            onClick={copyToclipboard}
            className="px-4 py-2 rounded-md border border-orange-600  text-sm font-semibold text-orange-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            🐈‍⬛Copy
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
