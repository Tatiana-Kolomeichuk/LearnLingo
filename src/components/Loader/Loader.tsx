import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.wrapper} role="status" aria-label="Loading">
      <span className={css.loader}></span>
    </div>
  );
}