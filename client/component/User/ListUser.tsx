import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { loadUsers } from "../GraphQl/Queries";

export const ListUser = () => {
  const [user, setUser] = useState([]);
  const { error, loading, data } = useQuery(loadUsers);

  useEffect(() => {
    if (data) {
      setUser(data?.users);
      console.log(data?.users);
    }
  }, [data]);
  return (
    <React.Fragment>
      {user?.map((item: any, index: number) => {
        return <h3 key={index + 1}>{item?.name}</h3>;
      })}
    </React.Fragment>
  );
};
