import { createContext, useEffect, useState } from "react";

import { getUser, User } from "../_models/user";
import { ChildrenProp } from "../types";

interface UserContextProps {
  user?: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: undefined,
  setUser: () => {},
});

export const UserProvider = ({ children }: ChildrenProp) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser().then(async (result) => {
      if (result.ok) {
        setUser(await result.json());
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
