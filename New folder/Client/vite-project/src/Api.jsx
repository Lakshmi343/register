// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Api = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/registered');
//       setData(response.data.users);
//       console.log(response)
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setError(error.message || 'An error occurred while fetching data.');
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Data</h1>
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         data.map((item) => (
//           <div key={item.id}>
//             <p>{item.name}</p>
//             <p>{item.email}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Api;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/registered');
      console.log(response);
      setUsers(response.data.users); // Corrected setData to setUsers
      console.log(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message || 'An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Registered Users</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
