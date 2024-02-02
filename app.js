document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.querySelector('#toggleSwitch');
  
    if (toggleSwitch) {
      toggleSwitch.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme', toggleSwitch.checked);
      });
    } else {
      console.error("Element with ID 'toggleSwitch' not found");
    }
  });
  
  
// Call the function on page load
document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'http://localhost:4000/api/crypto';
  
    async function fetchData() {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        console.log('fetched data from api' ,data);  // Move this line above the return statement
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error for further handling if needed
      }
    }

    fetchData(); 
});

    // async function populateTable() {
    //   const tableBody = document.getElementById('cryptoTableBody');
  
    //   try {
    //     const cryptoData = await fetchData();
  
    //     cryptoData.forEach(crypto => {
    //       const row = document.createElement('tr');
    //       Object.values(crypto).forEach(value => {
    //         const cell = document.createElement('td');
    //         cell.textContent = value;
    //         row.appendChild(cell);
    //       });
    //       tableBody.appendChild(row);
    //     });
    //   } 
    //   catch (error) {
    //     // Handle error, e.g., display an error message to the user
    //     console.error('Error Populating table:', error);
    //   }
    // }
  
    // // Call the function to populate the table
    // populateTable();
//   });
  
  