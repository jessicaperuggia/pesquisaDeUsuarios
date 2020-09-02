let userData = null;
let userDetails = null;

let tabUser = null;
let tabDetails = null;

let allUsers = [];
let filterUsers = [];

let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-button');

let textUser = document.querySelector('#text-user');
let textDetail = document.querySelector('#text-detail');

userData = document.querySelector('#user-data');
userDetails = document.querySelector('#user-details');

tabUser = document.querySelector('#tab-user');
tabDetails = document.querySelector('#tab-details');

searchButton.addEventListener('click', handelButtonClick);

window.addEventListener('load', start);
async function start() {
    allUsers = await fetchUsers();

}

async function fetchUsers() {
    const res = await fetch('./js/users.json');
    const json = await res.json();

    return json.results.map(user => {

        return {
            name: user.name.first + ' ' + user.name.last,
            age: user.dob.age,
            gender: user.gender,
            picture: user.picture.large,
        };
    });

}


function render() {
    renderUrserList();
    renderStatisticList();
}

function renderUrserList() {
    textUser.innerHTML = ` ${filterUsers.length} usuário(s) encontrado(s)`;

    let usersHTML = '<div>';

    filterUsers.forEach(user => {
        const { name, age, picture } = user;

        const userHTML = `
        <div>
        <div>
        <img src="${picture}">
        </div>
        <div>
        <ul>
        <li>${name}</li>
        <li>${age}</li>
        </ul>
        </div>
        </div>
        `;

        usersHTML += userHTML;
    });

    usersHTML += '</div>';
    tabUser.innerHTML = usersHTML;
}

function renderStatisticList() {
    textDetail.innerHTML = '';
    const statisticsHTML = `
    <div>
    <h2>Estatísticas</h2>
    <ul>
    <li> Sexo masculino: ${countGenderM()}</li>
    <li> Sexo Feminio: ${countGenderF()}</li>
    <li> Soma das idades: ${sumAges()} </li>
    <li> Média das idades: ${averageAges().toFixed(2)}</li>
    </ul>
    </div>
    `;

    tabDetails.innerHTML = statisticsHTML;
}
function countGenderM() {

    return filterUsers.reduce((acumulator, current) =>
        (current.gender === 'male' ? ++acumulator : acumulator), 0);
}
function countGenderF() {

    return filterUsers.reduce((acumulator, current) =>
        (current.gender === 'female' ? ++acumulator : acumulator), 0);
}
function sumAges() {
    return filterUsers.reduce((acumulator, current) => {
        return acumulator + current.age;
    }, 0);
}

function averageAges() {
    return sumAges() / filterUsers.length;
}

function handelButtonClick() {
    filterUsers = allUsers.filter((user) => {

        return user.name.toLowerCase().includes(searchInput.value.toLowerCase());
    });

    render();
}
