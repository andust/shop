import { Children, ClassNameProp } from "../../types";

interface UnorderedListProps extends ClassNameProp {
  listItem: Children[]
}

export const UnorderedList = ({
  className = "",
  listItem
}: UnorderedListProps) => {
  return (
    <ul className={className}>
      {listItem.map((li) => <li>{li}</li>) }
    </ul>
  )
}
