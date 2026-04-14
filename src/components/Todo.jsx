import AnimatedCircle from "./AnimatedCircle";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Todo = ({ todo, index, setTodos, theme }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex task justify-between touch-none items-center py-5.5 px-6 border-b border-b-accent shadow-2xl bg-surface ${index === 0 && "rounded-t-lg"}`}
    >
      <div className="flex gap-4 items-center">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-text-secondary"
          aria-label="Drag todo"
        >
          ⋮⋮
        </button>

        <AnimatedCircle
          checked={todo.completed}
          onToggle={() =>
            setTodos((prev) =>
              prev.map((t) =>
                t.id === todo.id ? { ...t, completed: !t.completed } : t,
              ),
            )
          }
        />

        <p
          className={`cursor-pointer text-xl text-text-primary ${todo.completed && "line-through text-text-secondary"}`}
        >
          {todo.text}
        </p>
      </div>

      <button
        type="button"
        className="cursor-pointer"
        onClick={() =>
          setTodos((prev) => prev.filter((tod) => tod.id !== todo.id))
        }
      >
        <svg
          viewBox="0 0 10 10"
          width="1.4em"
          height="1.4em"
          stroke={theme === "light" ? "#494C6B" : "#C8CBE7"}
          strokeWidth="0.4"
        >
          <line x1="1" y1="1" x2="9" y2="9" />
          <line x1="9" y1="1" x2="1" y2="9" />
        </svg>
      </button>
    </div>
  );
};

export default Todo;
