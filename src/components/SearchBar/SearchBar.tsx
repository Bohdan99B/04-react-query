import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <form
      className={css.form}
      action={(formData) => {
        const value = String(formData.get("query") || "").trim();
        if (!value) return;

        onSearch(value);
      }}
    >
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search movies..."
        required
      />
      <button className={css.btn} type="submit">
        Search
      </button>
    </form>
  );
}