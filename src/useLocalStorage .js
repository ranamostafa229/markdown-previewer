import React, { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    const newValue = JSON.stringify(value);
    localStorage.setItem(key, newValue);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
