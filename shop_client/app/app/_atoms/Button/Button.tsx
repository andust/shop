import { ChildrenProp, ClassNameProp } from "../../types";

interface Props extends ChildrenProp, ClassNameProp {
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  theme?: "base" | "primary";
}

const THEME_CLASSNAMES = {
  base: "px-3 py-2 border bg-white text-black",
  primary: "px-3 py-2 border bg-green text-white",
};

export default function Button({
  children,
  className = "",
  type = "button",
  onClick,
  theme = "primary",
}: Props) {
  return (
    <button
      className={`${className} ${THEME_CLASSNAMES[theme]}`}
      type={type}
      onClick={onClick && onClick}
    >
      {children}
    </button>
  );
}
