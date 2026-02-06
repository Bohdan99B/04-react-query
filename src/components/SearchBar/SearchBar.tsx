import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = String(formData.get("query") || "").trim();
    if (!value) {
      toast.error("No movies found for your request");
      return;
    }

    onSubmit(value);
    event.currentTarget.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
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
