import { useMediaQuery } from "react-responsive";

const Footer = ({ filter, setFilter, todos, setTodos }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  if (isSmallScreen) {
    return (
      <div>
        {/* Row 1: items left + clear completed */}
        <footer className="bg-surface py-4 px-6 rounded-b-lg flex justify-between items-center shadow-2xl">
          <p className="text-text-secondary text-sm">
            {activeCount} items left
          </p>
          <button
            className={`${completedCount === 0 ? "btn-disabled opacity-20" : "btn"}`}
            disabled={completedCount === 0}
            onClick={() => {
              setTodos((prev) => prev.filter((todo) => !todo.completed));
              setFilter("all");
            }}
          >
            Clear Completed
          </button>
        </footer>

        {/* Row 2: filter buttons */}
        <footer className="bg-surface mt-4 py-4 px-6 rounded-lg flex justify-center items-center shadow-2xl">
          <button
            className={`btn ${filter === "all" && "text-blue-700 font-bold"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`mx-4 ${filter === "active" && "text-blue-700 font-bold"} ${activeCount === 0 ? "btn-disabled opacity-20" : "btn"}`}
            disabled={activeCount === 0}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`${filter === "completed" && "text-blue-700 font-bold"} ${completedCount === 0 ? "btn-disabled opacity-20" : "btn"}`}
            disabled={completedCount === 0}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </footer>
      </div>
    );
  }

  return (
    <footer className="bg-surface py-4 px-6 rounded-b-lg flex justify-between items-center shadow-2xl">
      <p className="text-text-secondary text-sm">{activeCount} items left</p>
      <div>
        <button
          className={`btn ${filter === "all" && "text-blue-700 font-bold"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`mx-4 ${filter === "active" && "text-blue-700 font-bold"} ${activeCount === 0 ? "btn-disabled opacity-20" : "btn"}`}
          disabled={activeCount === 0}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`${filter === "completed" && "text-blue-700 font-bold"} ${completedCount === 0 ? "btn-disabled opacity-20" : "btn"}`}
          disabled={completedCount === 0}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div>
        <button
          className={`${completedCount === 0 ? "btn-disabled opacity-20" : "btn"}`}
          disabled={completedCount === 0}
          onClick={() => {
            setTodos((prev) => prev.filter((todo) => !todo.completed));
            setFilter("all");
          }}
        >
          Clear Completed
        </button>
      </div>
    </footer>
  );
};

export default Footer;
