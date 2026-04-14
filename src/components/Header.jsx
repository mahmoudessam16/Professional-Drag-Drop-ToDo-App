const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="relative z-10 flex items-center justify-between mb-8 pt-20 pb-6">
      <h1 className="text-5xl font-sans font-semibold text-white tracking-[10px]">
        TODO
      </h1>
      <button onClick={toggleTheme} className="cursor-pointer">
        {theme === "light" ? (
          <img src="./images/icon-moon.svg" alt="icon-moon" />
        ) : (
          <img src="./images/icon-sun.svg" alt="icon-sun" />
        )}
      </button>
    </header>
  );
};

export default Header;
