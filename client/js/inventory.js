socket.on("inventory-modified", (msg) => {
  console.log(`Emit: ${msg}`);
  window.location.reload();
});

/**
 *
 *
 */

fetch("http://localhost:3000/inventory")
  .then(function (response) {
    console.log();
    return response.json();
  })
  .then(function (apiJsonData) {
    console.log(apiJsonData);
    renderDataInTheTable(apiJsonData.data);
  });

/**
 *
 *
 */

function renderDataInTheTable(collection) {
  const mytable = document.getElementById("inventory__table");
  collection.forEach((doc) => {
    console.log(doc);
    let newRow = document.createElement("tr");

    let eqp_id = document.createElement("td");
    eqp_id.innerText = doc.eqp_id;
    newRow.appendChild(eqp_id);

    let user_id = document.createElement("td");
    user_id.innerText = doc.user_id;
    newRow.appendChild(user_id);

    let startedAt = document.createElement("td");
    startedAt.innerText = doc.startedAt;
    newRow.appendChild(startedAt);

    let time = document.createElement("td");
    time.innerText = doc.time;
    newRow.appendChild(time);

    let status = document.createElement("td");
    status.innerText = doc.status;
    newRow.appendChild(status);


    mytable.appendChild(newRow);
  });
}
