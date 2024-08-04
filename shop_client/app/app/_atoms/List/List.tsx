import { Children, ClassNameProp } from "../../types";

interface ListItem {
  id: string | number
  item: Children
}

interface UnorderedListProps extends ClassNameProp {
  listItems: ListItem[]
}

export const UnorderedList = ({
  className = "",
  listItems
}: UnorderedListProps) => {
  return (
    <ul className={className}>
      {listItems.map(({ id, item }) => <li key={id}>{item}</li>) }
    </ul>
  )
}
