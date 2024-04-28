function fetchData() {
  // Get the keyword from the search input
  const keyword = document.getElementById("searchInput").value;

  // Fetch data from the backend API
  fetch(
    `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`
  )
    .then((response) => {
      // Check if the response is not OK and throw an error
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Get the results container element
      const resultsContainer = document.getElementById("results");

      // Check if the data is an array and has at least one item
      if (Array.isArray(data) && data.length > 0) {
        // Generate HTML for each item in the data array
        resultsContainer.innerHTML = data
          .map(
            (item) => `
                        <div>
                            <img src="${item.imageUrl}" alt="${item.title}" style="height: 100px;">
                            <p>${item.title}</p>
                            <p>Rating: ${item.rating}</p>
                            <p>Reviews: ${item.reviews}</p>
                        </div>
                    `
          )
          .join("");
      } else {
        // Handle empty array or non-array data
        resultsContainer.innerHTML =
          "<p>No results found or error in data format.</p>";
      }
    })
    .catch((error) => {
      // Log and display the error message
      console.error("Error:", error);
      const resultsContainer = document.getElementById("results");
      resultsContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    });
}
