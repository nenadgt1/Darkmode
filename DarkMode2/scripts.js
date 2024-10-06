const cryptoApi = "https://api.coincap.io/v2/assets";

function fetchCryptoData() {
  fetch(cryptoApi)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("Request successful", data);
      populateTables(data.data);
    })
    .catch(error => {
      console.error('Error fetching crypto data:', error);
    });
}

function populateTables(data) {
  populateTable(data, "growthFutureTable", "priceUsd");
  populateTable(data, "bestGrowingTable", "changePercent24Hr");
  populateTable(data, "bestFallingTable", "changePercent24Hr", true);
}

function populateTable(array, tableId, sortBy, descending = false) {
  const table = document.getElementById(tableId);
  table.querySelector("tbody").innerHTML = "";

  array.sort((a, b) => descending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]);

  array.slice(0, 10).forEach((element, index) => {
    const tr = document.createElement("tr");

    const rowData = [
      index + 1,
      element.name,
      sortBy === "priceUsd" ? `$${parseFloat(element.priceUsd).toFixed(2)}` : `${parseFloat(element.changePercent24Hr).toFixed(2)}%`
    ];

    rowData.forEach((cellData) => {
      const td = document.createElement("td");
      td.textContent = cellData;
      tr.appendChild(td);
    });

    table.querySelector("tbody").appendChild(tr);
  });
}

fetchCryptoData();
setInterval(fetchCryptoData, 30000);
