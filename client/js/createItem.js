function onFormSubmit() {
  // console.log({ event });
  event.preventDefault();

  const formData = new FormData(event.target);
  console.log(formData);

  fetch("http://localhost:3000/inventory", {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      return response.json(); // parses JSON response into native JavaScript objects.
    })
    .then(function (apiJsonData) {
      formSubmitResponse(apiJsonData);
    });

  function formSubmitResponse(response) {
    console.log({ response });

    if (response.status) {
      window.alert("Item created successfully.");

      socket.emit("inventory-modified", response);

      window.location.href = "index.html";
    } else {
      window.alert("Error: " + response.message);
    }
  }
}
