const AnimatedCircle = ({ checked, onToggle, classes }) => {
  return (
    <span
      onClick={onToggle}
      className={`
            ${classes}
              w-6 h-6 rounded-full cursor-pointer
              flex items-center justify-center
              transition-all duration-200
              ${
                checked
                  ? "bg-linear-to-br from-[#57ddff] to-[#c058f3]"
                  : "border border-accent hover:border-transparent hover:bg-linear-to-br hover:from-[#57ddff] hover:to-[#c058f3] p-0.5"
              }
          `}
    >
      {/* inner circle to simulate border effect */}
      {!checked && (
        <span className="w-full h-full rounded-full bg-surface"></span>
      )}

      {/* check icon */}
      {checked && (
        <img src="/images/icon-check.svg" alt="check" className="w-3 h-3" />
      )}
    </span>
  );
};

export default AnimatedCircle;
