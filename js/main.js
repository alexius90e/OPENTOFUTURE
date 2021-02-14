const downloadsContainer = document.querySelector('main .downloads');

let response =  fetch("https://mydatacapsule.com/api/otf_getitems?skip=0&take=8")
    .then(res => res.json())
    .then(data => {
        for (obj of data){
            let downloadsCard = document.createElement('div');
            downloadsCard.classList.add('downloads-card');
            downloadsCard.innerHTML = createCard(obj)
            downloadsContainer.appendChild(downloadsCard)
            console.log(obj.files);
        }
        return console.log(data);
    });


function createCard(obj){
    let links = '';
    let linkStart = 'https://mydatacapsule.com/download/otf/';
    counter = 0;
    for (variable in obj.files){
        let a = `<div>${counter + 1}. <a href="${linkStart + variable}">${obj.files[variable][0]}</a> ${obj.files[variable][1]} Mb</div>`;
        links += a;
        counter++
        console.log(variable);
    }
    return `
            <div class="downloads-header">
                <img src="./images/card-icon.svg" alt="card-icon">
                <div class="">
                    <div class="downloads-date">${addDate(obj)}</div>
                    <div class="downloads-qty">${addFilesQty(obj)} files</div>
                </div>
            </div>
            <hr>
            <div class="downloads-body">
                ${links}
            </div>
        `
}    
function addDate(obj){
    let currDate = new Date(Date.now() - new Date(obj.time));
    let month = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month = month[currDate.getMonth()];
    let day = `${currDate.getDate() / 10 >= 1 ? currDate.getDate() : '0' + currDate.getDate()} ${month} ${currDate.getFullYear()}`;
    let hours = currDate.getHours() / 10 >= 1 ? currDate.getHours() : '0' + currDate.getHours();
    let minutes = currDate.getMinutes() / 10 >= 1 ? currDate.getMinutes() : '0' + currDate.getMinutes();
    let time = `${hours}:${minutes}`
    return `${day} at ${time}`;
}
function addFilesQty(obj){
    return Object.keys(obj.files).length;
}