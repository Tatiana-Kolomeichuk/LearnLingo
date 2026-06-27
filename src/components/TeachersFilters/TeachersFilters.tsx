import css from "./TeachersFilters.module.css";
import Button from "../Button/Button";

interface TeachersFiltersProps {
  language: string;
  level: string;
  price: string;
  onLanguageChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onClearFilters: () => void;
}

const languages = [
  "French",
  "English",
  "German",
  "Ukrainian",
  "Polish",
  "Spanish",
  "Italian",
];

const levels = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
];

const prices = ["10", "20", "30", "40"];

export default function TeachersFilters({
  language,
  level,
  price,
  onLanguageChange,
  onLevelChange,
  onPriceChange,
  onClearFilters,
}: TeachersFiltersProps) {
  const hasActiveFilters = Boolean(language || level || price);
  return (
    <div className={css.filters}>
      <label className={css.field}>
        <span className={css.label}>Languages</span>
        <div className={css.selectWrapper}>
          <select
            className={css.select}
            value={language}
            onChange={(event) => onLanguageChange(event.target.value)}
          >
            <option value="">All languages</option>
            {languages.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </label>

      <label className={css.field}>
        <span className={css.label}>Level of knowledge</span>
        <div className={css.selectWrapper}>
          <select
            className={css.select}
            value={level}
            onChange={(event) => onLevelChange(event.target.value)}
          >
            <option value="">All levels</option>
            {levels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </label>

      <label className={css.field}>
        <span className={css.label}>Price</span>
        <div className={css.selectWrapper}>
          <select
            className={`${css.select} ${css.priceSelect}`}
            value={price}
            onChange={(event) => onPriceChange(event.target.value)}
          >
            <option value="">Any price</option>
            {prices.map((item) => (
              <option key={item} value={item}>
                {item} $
              </option>
            ))}
          </select>
        </div>
      </label>
      {hasActiveFilters && (
        <Button
          variant="primary"
          onClick={onClearFilters}
          className={css.clearBtn}
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
