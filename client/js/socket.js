const socket = io();

socket.on("inventory-modified", (msg) => {
  console.log("Emit: ", msg);
});
