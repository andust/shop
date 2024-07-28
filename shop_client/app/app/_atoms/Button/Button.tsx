import { ChildrenProp, ClassNameProp } from "../../types";

interface Props extends ChildrenProp, ClassNameProp {
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  className = "",
  type = "button",
}: Props) {
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}
