import "./App.css";
import React, { useState, useEffect, useRef } from "react";

function useLocalStorage(
  key,
  defaultVal,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [status, setStatus] = useState(() => {
    const x = window.localStorage.getItem(key);
    if (x) {
      return deserialize(x);
    }
    return typeof defaultVal === "function" ? defaultVal() : defaultVal;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      console.log("changed")
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(status));
  }, [key, serialize, status]);
  return [status, setStatus];
}

function App({ initialName = "" }) {
  function handleChange(event) {
    setName(event.target.value);
  }

  const [name, setName] = useLocalStorage("name2", initialName);

  return (
    <>
      <h1>Hello {name}</h1>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        id="name"
      />
    </>
  );
}

export default App;
