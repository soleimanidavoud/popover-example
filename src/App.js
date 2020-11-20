import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import { ThemeContext } from "./utils/theme-context";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = (_) => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Home />
    </ThemeContext.Provider>
  );
}

export default App;
