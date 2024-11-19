async function handleGetItemSubmit() {
  try {
    // console.log({ event });
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(formData);

    const url = "http://localhost:3000/inventory" + "/" + formData.get("id");
    console.log({ url });

    const response = await fetch(url, {
      method: "GET",
    });

    const res = await response.json(); // parses JSON response into native JavaScript objects.
    console.log({ res });

    if (res.status) {
      console.log(res);
      window.alert("Fetched Item-details successfully.");

      const main = document.getElementById("main__getItemById");

      let p1 = document.createElement("p");
      p1.innerText = "Eqp_id:  " + res.data.eqp_id;

      let p2 = document.createElement("p");
      p2.innerText = "User_id:  " + res.data.user_id;

      let p3 = document.createElement("p");
      p3.innerText = "StartedAt:  " + res.data.startedAt;

      let p4 = document.createElement("p");
      p4.innerText = "Status:  " + res.data.status;

      let p5 = document.createElement("p");
      p5.innerText = "Time:  " + res.data.time;

      main.appendChild(p1);
      main.appendChild(p2);
      main.appendChild(p3);
      main.appendChild(p4);
      main.appendChild(p5);
      
    } else {
      window.alert("Error: " + res.message);
    }
  } catch (error) {
    return console.log(error);
  }
}
