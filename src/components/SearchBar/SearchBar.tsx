import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { useRef } from "react";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = (formData: FormData) => {
    const value = String(formData.get("query") || "").trim();
    if (!value) {
      toast.error("No movies found for your request");
      return;
    }

    onSubmit(value);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} className={css.form} action={handleAction}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search movies..."
      />
      <button className={css.btn} type="submit">
        Search
      </button>
    </form>
  );
}
