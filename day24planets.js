/*Develop a small application which calculate a weight of an object in a certain planet. 
The gif image is not complete check the video in the starter file.
*/


const urlsForImg = {
    galaxy: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/galaxy.gif',
    earth: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/earth.png',
    jupiter: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/jupiter.png',
    mars: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/mars.png',
    mercury: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/mercury.png',
    moon: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/moon.png',
    neptune: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/neptune.png',
    pluto: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/pluto.png',
    saturn: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/saturn.png',
    uranus: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/uranus.png',
    venus: 'https://raw.githubusercontent.com/Asabeneh/30-Days-Of-JavaScript/master/24_Day_Project_solar_system/24_day_starter/images/venus.png'
}

let inputValue;
let inputPlanet
let flag = true;


getBackground(urlsForImg.galaxy);
createResult();


async function getBackground(url) {
    try {
        const res = await axios.get(url);
        document.body.style.background = `url(${res.config.url})`;
    } catch(err) {
        console.error(err);
        document.body.style.backgroundColor = 'black';
    }
}


async function getPlanet(url) {
    try {
        if(isNaN(inputValue)) {
            delPlanet();
        }

        flag = true;
        const div = document.querySelector('.flex-item-image');
        const img = document.createElement('img');
        const res = await axios.get(url);
        img.className = 'planet-img'
        img.setAttribute('src', res.config.url);
        div.appendChild(img);

    } catch(err) {
        console.error(err);
    }
}


function delPlanet(){
    const div = document.querySelector('.flex-item-image');
    const img = div.querySelector('img');
    div.removeChild(img);

    flag = false;
}


function createResult() {
    const descriptionDiv = document.querySelector('.flex-item-description');
    
    const rectangle = document.createElement('div');
    const circle = document.createElement('div');

    rectangle.className = 'rectangle';
    circle.className = 'circle';

    const button = document.querySelector('button')
    const inputForm = document.querySelector('#mass');
    const planet = document.querySelector('select');

    inputForm.addEventListener('input', (e) => {
        inputValue = e.target.value;
    })
    planet.addEventListener('input', (e) => {
        inputPlanet = e.target.value;
    });


    button.addEventListener('click', () => {
        if (flag) {
            delPlanet();
        }

        if (isNaN(inputValue) || inputValue == 0) {
            rectangle.style.height = '25%';
            rectangle.innerHTML = `Mass is required`;
            descriptionDiv.append(rectangle);
            return;
        }
        if (inputPlanet === undefined || inputPlanet === 'none') {
            rectangle.style.height = '25%';
            rectangle.innerHTML = `Select planet`;
            descriptionDiv.append(rectangle);
            return;
        }
        
        getPlanet(urlsForImg[inputPlanet]);

        const count = (coefficient) => circle.innerHTML = `<b>${(inputValue * coefficient).toFixed(2)} N</b>`;

        switch (inputPlanet) {
            case 'earth':
                count(9.8);
                break
            case 'jupiter':
                count(24.8);
                break
            case 'mars':
                count(3.9);
                break
            case 'mercury':
                count(3.7);
                break
            case 'moon':
                count(1.6);
                break
            case 'neptune':
                count(11.1);
                break
            case 'pluto':
                count(0.7);
                break
            case 'saturn':
                count(10.4);
                break
            case 'uranus':
                count(8.9);
                break
            case 'venus':
                count(8.9);
                break
            default:
                break
        }
        
        rectangle.innerHTML = `<span>The weight of the object on <span class="planet-name"> <b>${inputPlanet.toUpperCase()}</b></span></span>`;
        rectangle.append(circle);
        descriptionDiv.style.width = '60%';
        descriptionDiv.append(rectangle);
        console.log(inputValue == 0);
    })       
}
