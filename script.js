const URL = "https://test-users-api.herokuapp.com/users/";

async function getUsers() {
    try {
        const user = await axios.get(URL);
        if (user.status == 200) {
            console.log(user.data.data)
            renderUsers(user.data.data)
        } else {
            throw new Error();
        }
    }
    catch (err) {
        console.log("Can't show users", err);
    }
}
getUsers();

function renderUsers(users) {
    users.forEach(item => {
        const container = document.querySelector(".container");
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML = `
        <p>Name: ${item.name}</p>
        <p>Age: ${item.age}</p>
        `
        container.append(userElement);
    })
}

async function createUsers(name, age){
    const createUser = await axios.post(URL, {name, age})
    try {
        if (createUser.status == 200) {
            console.log(createUser);
        }
        else {
            throw new Error
        }
    } catch(err) {
        console.log("can't create user", err);
    }
}

const button = document.querySelector('.add-user');

button.addEventListener('click', () => {
    const name = document.querySelector(".name").value;
    const age = document.querySelector(".age").value;
    createUsers(name, age);
})
