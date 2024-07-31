import { ChildrenProp, ClassNameProp } from "../../types";

interface HeadlineProps extends ChildrenProp, ClassNameProp {
  level?: number;
  isBold?: boolean;
}

export default function Headline({
  level = 3,
  className = "",
  isBold = false,
  children,
}: HeadlineProps) {
  const extraClassName: string[] = [];
  if (isBold) {
    extraClassName.push(" font-bold");
  }

  className += extraClassName.join();
  
  switch (level) {
    case 1:
      return <h1 className={`text-7xl ${className}`}>{children}</h1>;
    case 2:
      return <h2 className={`text-5xl ${className}`}>{children}</h2>;
    case 3:
      return <h3 className={`text-3xl ${className}`}>{children}</h3>;
    case 4:
      return <h4 className={`text-2xl ${className}`}>{children}</h4>;
    default:
      return <h5 className={`text-xl ${className}`}>{children}</h5>;
  }
}
