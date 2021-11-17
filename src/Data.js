import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Data = () => {
  const [Users, setUsers] = useState(null);
  const [AnotherData, setAnotherData] = useState(null);

  useEffect(() => {
    axios.get("https://api.github.com/users").then((response) => {
      setUsers(response.data);

      axios.get("https://api.github.com/users").then((res) => {
        res?.data &&
          res?.data?.map((d) =>
            axios.get(`${d?.url}`).then((res) => {
              setAnotherData(res?.data);
              console.log(res?.data);
            })
          );
      });
      console.log(Users);
    });
  }, []);

  return (
    <div className="row m-0 p-0 ">
      <div>
        <div className="row">
          {Users?.map((e) => (
            <div className="col-4 border border-primary text-center pt-4">
              <img src={e.avatar_url} className="image" />

              <span> </span>

              <p>{e.login}</p>
              <p>
                {" "}
                <a href={e.html_url}> github </a>{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Data;
