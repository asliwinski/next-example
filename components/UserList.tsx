"use client";

import { User } from "@/types/User";
import UserCard from "./UserCard";
import { useEffect, useRef } from "react";
import { getUsers } from "@/actions/getUsers";
import { useInView } from "react-intersection-observer";
import { Store, useUsersStore } from "@/store/users";

type UserListProps = {
  initialUsers: User[];
};

const NUMBER_OF_USERS_TO_FETCH = 10;

export default function UserList({ initialUsers }: UserListProps) {
  const { users, addUsers } = useUsersStore<Store>((state) => state);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (isFirstRender.current) {
      addUsers(initialUsers);
      isFirstRender.current = false;
    }
  }, []);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);

  async function loadMoreUsers() {
    const apiUsers = await getUsers(users.length, NUMBER_OF_USERS_TO_FETCH);
    addUsers(apiUsers);
  }

  return (
    <div className="flex flex-col gap-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <div ref={ref}>Loading...</div>
    </div>
  );
}
