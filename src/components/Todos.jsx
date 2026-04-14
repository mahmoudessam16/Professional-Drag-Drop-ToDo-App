import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import AnimatedCircle from "./AnimatedCircle";
import Footer from "./Footer";
import Todo from "./Todo";

const Todos = ({ theme }) => {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);

  const handleAddTodo = () => {
    if (!input.trim()) return;

    if (
      todos.some((t) => t.text.toLowerCase() === input.trim().toLowerCase())
    ) {
      const notify = () =>
        toast.warn("Todo already exists!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      notify();
      return;
    }

    const todo = {
      id: Date.now(),
      text: input,
      completed: newTaskCompleted,
    };

    setTodos((prev) => [...prev, todo]);
    setInput("");
    setNewTaskCompleted(false);
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const getTaskPos = (id) => todos.findIndex((t) => t.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTodos((tasks) => {
      const originalPos = tasks.findIndex((t) => t.id === active.id);
      const newPos = tasks.findIndex((t) => t.id === over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Persist todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="pb-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="w-full relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTodo();
          }}
          placeholder="Create a new todo..."
          className={`w-full py-4.5 pl-16 shadow-2xl caret-blue-600 rounded-lg bg-surface border-none outline-none text-xl font-light text-text-primary placeholder:text-text-secondary`}
        />
        <AnimatedCircle
          checked={newTaskCompleted}
          classes={"absolute top-1/2 left-6 -translate-y-1/2"}
          onToggle={() => setNewTaskCompleted((prev) => !prev)}
        />
      </div>

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="mt-4">
          <SortableContext
            items={visibleTodos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            {visibleTodos.map((todo, index) => (
              <Todo
                key={todo.id}
                todo={todo}
                index={index}
                setTodos={setTodos}
                theme={theme}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      {todos.length > 0 && (
        <Footer
          filter={filter}
          setFilter={setFilter}
          todos={todos}
          setTodos={setTodos}
        />
      )}
    </div>
  );
};

export default Todos;
