import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  address: { street: string; city: string; zipCode: string };
}

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, "id">) => void;
  loading: boolean;
  error: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const transformed = res.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          address: {
            street: user.address.street,
            city: user.address.city,
            zipCode: user.address.zipcode,
          },
        }));
        setUsers(transformed);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const addUser = (user: Omit<User, "id">) => {
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id: newId, ...user }]);
  };

  return (
    <UserContext.Provider value={{ users, addUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
