document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";
  const currency = "usd";
  const apiUrlWithParams = `${apiUrl}?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

  // Fetch data from the CoinGecko API
  function fetchCryptoData() {
      fetch(apiUrlWithParams)
          .then(response => response.json())
          .then(data => {
              displayCryptoData(data);
          })
          .catch(error => {
              console.error("Error fetching data:", error);
          });
  }

  // Display the fetched cryptocurrency data
  function displayCryptoData(data) {
      const cryptoDataContainer = document.getElementById('crypto-data');
      cryptoDataContainer.innerHTML = '';

      data.forEach(crypto => {
          const row = document.createElement('tr');
          
          const priceChangeClass = crypto.price_change_percentage_24h > 0 ? 'change-positive' : 'change-negative';

          row.innerHTML = `
              <td><img src="${crypto.image}" alt="${crypto.name} icon"></td>
              <td>${crypto.name}</td>
              <td>$${crypto.current_price.toLocaleString()}</td>
              <td class="${priceChangeClass}">
                  ${crypto.price_change_percentage_24h.toFixed(2)}%
              </td>
          `;

          cryptoDataContainer.appendChild(row);
      });
  }

  // Fetch the data immediately when the page loads
  fetchCryptoData();
});
