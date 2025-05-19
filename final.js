/* Home Browse */
function findProduct(event) {
    event.preventDefault();

    const query = document.getElementById("makeup_name").value.toLowerCase();
    const loading = document.getElementById("loading_results");
    const tableHead = document.querySelector("#result_Table thead");
    const resultsBody = document.getElementById("productResults");

    loading.textContent = "Searching...";
    resultsBody.innerHTML = "";
    tableHead.style.display = "none";

    fetch("https://makeup-api.herokuapp.com/api/v1/products.json")
      .then(response => response.json())
      .then(data => {
        const matchedProducts = data.filter(product =>
          product.name && product.name.toLowerCase().includes(query)
        );

        if (matchedProducts.length === 0) {
          loading.textContent = "No results found.";
          return;
        }

        loading.textContent = "";
        tableHead.style.display = "";

        matchedProducts.forEach(product => {
          const row = document.createElement("tr");

          const nameCell = document.createElement("td");
          nameCell.textContent = product.name;

          const brandCell = document.createElement("td");
          brandCell.textContent = product.brand || "N/A";

          const priceCell = document.createElement("td");
          priceCell.textContent = product.price ? `$${product.price}` : "N/A";

          row.appendChild(nameCell);
          row.appendChild(brandCell);
          row.appendChild(priceCell);
          resultsBody.appendChild(row);
        });
      })
      .catch(error => {
        loading.textContent = "Error fetching products.";
        console.error(error);
      });
  }


const tagsOption = document.getElementById('tags-option');
  const tags2Label = document.getElementById('tags-2-label');
  const tags2Select = document.getElementById('tags-2');

  tagsOption.addEventListener('change', () => {
    if (tagsOption.value === 'yes') {
      tags2Label.style.display = 'block';
      tags2Select.style.display = 'block';
    } else {
      tags2Label.style.display = 'none';
      tags2Select.style.display = 'none';
      tags2Select.value = ''; 
    }
});

/* Core - Quiz */
function findMakeup() {
    const productType = document.getElementById("product-type").value;
    const priceRange = document.getElementById("price-range").value;
    const tag = document.getElementById("tags").value;
    const loading = document.getElementById("loading_results2");
    const resultsContainer = document.getElementById("results");

    loading.textContent = "Loading...";
    resultsContainer.innerHTML = "";

    if (!productType) {
        loading.textContent = "Please select a product type.";
        return;
    }

    let priceMin = 0, priceMax = 100;
    switch (priceRange) {
        case "low-price": priceMin = 0; priceMax = 15; break;
        case "medium-price": priceMin = 15; priceMax = 30; break;
        case "high-price": priceMin = 30; priceMax = 45; break;
        case "highest-price": priceMin = 45; priceMax = 100; break;
    }

    let url = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${encodeURIComponent(productType)}`;
    if (tag) {
        url += `&product_tags=${encodeURIComponent(tag)}`;
    }
    url += `&price_greater_than=${priceMin}&price_less_than=${priceMax}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Not work");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                loading.textContent = "No products found matching your criteria.";
                return;
            }

            loading.textContent = "";

            data.forEach(product => {
                const card = document.createElement("div");
                card.className = "result-card";

                const img = document.createElement("img");
                img.src = product.image_link || product.api_featured_image || "";
                img.alt = product.name;

                const info = document.createElement("div");
                info.className = "result-info";

                const name = document.createElement("p");
                name.innerHTML = `<strong>Product:</strong> ${product.name}`;

                const price = document.createElement("p");
                price.innerHTML = `<strong>Price:</strong> $${product.price || "N/A"}`;

                const tags = document.createElement("p");
                tags.innerHTML = `<strong>Tags:</strong> ${(product.tag_list || []).join(", ") || "None"}`;

                info.appendChild(name);
                info.appendChild(price);
                info.appendChild(tags);

                card.appendChild(img);
                card.appendChild(info);
                resultsContainer.appendChild(card);
            });
        })
}


  