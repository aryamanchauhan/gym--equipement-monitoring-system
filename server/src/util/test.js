const user_ids = [0, 20, 30, 40, 50];

function getRandom(arr) { 
    const randomIndex = Math.floor(Math.random() * arr.length); 
    return arr[randomIndex]; 
} 

function getRandomInteger(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const eqp_id = 123;

async function update(data) {

    const url = "http://localhost:3000/inventory" + "/" + eqp_id;
    console.log({ url });

    const jsonData = JSON.stringify(data);

    console.log(jsonData);

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function repeatedTesting() {
  while (true) {
    let cur_user = getRandom(user_ids);
    let cur_datetime = new Date();
    let time = cur_user === 0 ? getRandomInteger(50, 60) : getRandomInteger(40, 60);
    let status = cur_user === 0 ? "free" : "in-use";

    for (let i = 0; i <= time; i+=5) {
        const activity = {
            eqp_id: eqp_id,
            user_id: cur_user,
            startedAt: cur_datetime,
            time: i,
            status: status
        }
        update(activity);
        await sleepNow(5000)
    }
  }
}

repeatedTesting()

