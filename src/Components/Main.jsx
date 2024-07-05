// src/Main.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import Search from './Search';
import './Main.css';
import './Search.css';

function Main() {
  const [Apidata, setApidata] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  function searchMethod(data) {
    setSearchLoading(true);
    setTimeout(() => {
      setSearch(data);
      setSearchLoading(false);
    }, 500); // Simulate a delay for the search loader
  }

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users', {})
      .then((response) => {
        setTimeout(() => {
          setApidata(response.data);
          setLoading(false);
        }, 800);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-container">
      {loading ? (
        <Loader />
      ) : (
        <div className="data">
          <Search search={searchMethod} />
          {searchLoading ? (
            <Loader />
          ) : (
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
                {Apidata.filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : item.name.toLowerCase().includes(search.toLowerCase());
                }).map((item) => (
                  <tr className="table-rows" key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
