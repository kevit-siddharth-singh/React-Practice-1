import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import "./Main.css";
import Search from "./Search";
import "./Search.css";

function Main() {
  const [Apidata, setApidata] = useState(null);
  const [search, setsearch] = useState("");

  console.log({ Apidata });

  function searchMethod(data) {
    console.log(data);
    setsearch(data);
  }
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users", {})
      .then((response) => {
        setTimeout(() => {
          setApidata(response.data);
        }, "800");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="main-container">
      {Apidata ? (
        <div className="data">
          <Search search={searchMethod} />
          <table className="table">
            <thead className="table-header">
              <tr className="table-rows">
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {Apidata.filter((item) =>
                item.name.toLowerCase().includes(search)
              ).map((item) => (
                <tr className="table-rows" key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Main;
