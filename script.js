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
        const closeButton = document.createElement('img');
        closeButton.classList.add('close-button');
        closeButton.src = "img/close.png"
        container.append(userElement);
        userElement.append(closeButton);
        closeButton.addEventListener('click', () => {deleteUser(item.id, userElement)});
    })
}

async function createUsers(name, age){
    const createUser = await axios.post(URL, {name, age})
    try {
        if (createUser.status == 200) {
            console.log(createUser);
            renderUsers([{ name, age }]);
        }
        else {
            throw new Error
        }
    } catch (err) {
        console.log("can't create user", err);
    }
}

const button = document.querySelector('.add-user');

button.addEventListener('click', () => {
    const name = document.querySelector(".name").value;
    const age = document.querySelector(".age").value;
    createUsers(name,age);
})


async function deleteUser(userId, box){
    const deleteUsers = await axios.delete(URL + `${userId}`)
    try {
        if (deleteUsers.status == 200) {
            box.remove();
            console.log(deleteUsers);
        }
        else throw new Error;
    }
    catch (err) {
        console.log("can't delete user", err);
    }
}
