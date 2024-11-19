async function handleDeleteItemSubmit() {
  try {
    // console.log({ event });
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData);

    const url = "http://localhost:3000/inventory" + "/" + formData.get("id");
    console.log({ url });

    const response = await fetch(url, {
      method: "DELETE",
    });

    const res = await response.json(); // parses JSON response into native JavaScript objects.
    console.log({ res });

    if (res.status) {
      console.log(res);
      window.alert("Item deleted successfully.");

      socket.emit("inventory-modified", response);

      window.location.href = "index.html";
    } else {
      window.alert("Error: " + res.message);
    }
  } catch (error) {
    return console.log(error);
  }
}
