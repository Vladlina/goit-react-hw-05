import { Link } from "react-router-dom";
import { BiSolidMessageError } from "react-icons/bi";
import { IoArrowUndoSharp } from "react-icons/io5";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <p className={css.error}>
        <BiSolidMessageError color="red" size="30" />
        Opps! Page not found! Sorry!
      </p>
      <p className={css.message}>
        Please visit <IoArrowUndoSharp color="orangered" />
        <Link to="/">home page</Link>
      </p>
    </div>
  );
}