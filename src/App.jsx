import { createContext, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Todos from "./components/Todos";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeObj = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <main className="relative bg-bg min-h-screen">
      <div className="absolute inset-0 w-full h-[37%] bg-no-repeat bg-cover bg-[image:var(--image-desktop)] z-0" />

      <ThemeContext.Provider value={themeObj}>
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Todos theme={theme} />
        </div>
      </ThemeContext.Provider>
    </main>
  );
}

export default App;
