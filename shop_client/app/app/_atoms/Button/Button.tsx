import { ChildrenProp, ClassNameProp } from "../../types";

interface Props extends ChildrenProp, ClassNameProp {
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  className = "",
  type = "button",
  onClick,
}: Props) {
  return (
    <button className={className} type={type} onClick={onClick && onClick}>
      {children}
    </button>
  );
}
