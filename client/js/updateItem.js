async function handleFormSubmit() {
  try {
    // console.log({ event });
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData);

    const url = "http://localhost:3000/inventory" + "/" + formData.get("eqp_id");
    console.log({ url });

    const response = await fetch(url, {
      method: "PUT",
      body: formData,
    });

    const data = await response.json(); // parses JSON response into native JavaScript objects.
    console.log({ data });

    if (data.status) {
      socket.emit("inventory-modified", response);

      window.location.href = "index.html";
    } else {
      window.alert("Error: " + data.message);
    }
  } catch (error) {
    return console.log(error);
  }
}
