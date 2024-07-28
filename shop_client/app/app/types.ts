export interface FilterResponse<T> {
  results: T[];
}

export interface ChildrenProp {
  children: JSX.Element | string;
}
export interface ClassNameProp {
  className?: string;
}
