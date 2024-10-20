import type { User } from "../interfaces";
import useSwr from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(`http://localhost:3000${url}`).then((res) => res.json());

export default function Index() {
  const { data, error, isLoading } = useSwr<User[]>("/users", fetcher);
 
  if (error) return <div>Failed to load users</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <Link href="/user/[id]" as={`/user/${user.id}`}>
            { `User Id: ${user.id}  User Name:${user.name}` ?? `User ${user.id}`}
          </Link>
        </li>
      ))}
    </ul>
  );
}
