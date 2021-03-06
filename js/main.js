const downloadsContainer = document.querySelector('main .downloads');
const loadMoreButton = document.querySelector('.load-button');
const take = 5;
const skip = skipCounter();
const lang = document.querySelector('html').getAttribute('lang');
const langTitle = document.querySelector('.lang-tittle');

const dict = {
    en : {
        month : ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        moreFiles : 'More files',
        href : './',
    },
    ru : {
        month : ['Января','Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
        moreFiles : 'Еще файлы',
        href : '../../',
    },
    es : {
        month : ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        href : '../../',
    },
    de : {
        month : ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        href : '../../',
    },
    fr : {
        month : ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        href : '../../',
    },
    pt : {
        month : ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        href : '../../',
    },
    hi : {
        month : ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        href : '../../',
    },
    ko : {
        month : ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        href : '../../',
    },
    ja : {
        month : ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        href : '../../',
    },
    zh : {
        month : ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        href : '../../',
    },
}


langTitle.innerHTML = lang;
document.querySelector('.lang-wrapper').addEventListener('click', function(event){
    const langPanel = document.querySelector('.lang-dropdown');
    if (langPanel.classList.contains('dropdown')){
        langPanel.classList.remove('dropdown');
    } else {
        langPanel.classList.add('dropdown');
    }
});

document.body.addEventListener('click', function(event){
    if (!event.target.closest('.lang-wrapper')) {
        document.querySelector('.lang-dropdown').classList.remove('dropdown');
    }
});

makeResponse();
loadMoreButton.addEventListener('click', () => {
    makeResponse();
    activateMoreButton();
})


function skipCounter() {
    let count = 0;
    return function() {
      return count ++;
    };
}

function makeResponse(){
    let url = `https://mydatacapsule.com/api/otf_getitems?skip=${skip() * take}&take=${take}`;
    let response =  fetch(url)
    .then(res => res.json())
    .then(data => {
        for (obj of data){
            let downloadsCard = document.createElement('div');
            downloadsCard.classList.add('downloads-card');
            downloadsCard.innerHTML = createCard(obj);
            downloadsContainer.appendChild(downloadsCard);
            addDownloadItem(obj, downloadsCard);
        }
        return data;
    })
    .then(data => {
        activateMoreButton();
        return data;
    });
}

function createCard(obj){
    let visibleLinks = '';
    let hiddenLinks = '';
    let linkStart = 'https://mydatacapsule.com/download/otf/';
    counter = 0;
    for (variable in obj.files){
        let downloadItem = `
            <div class="downloads-body__item">
                <div class="item__title">${counter + 1}.    ${obj.files[variable][0]}</div>
                <div class="item__size">${(obj.files[variable][1] / 1024**2 + 0.05).toFixed(1)} Mb</div>
                <button class="item__copy-button">
                    <img src="${dict[lang].href}images/copy-link-icon.svg" alt="copy-link-icon">
                </button>
                <a class="item__download-button" href="${linkStart + variable}">
                    <img src="${dict[lang].href}images/fluent_arrow-icon.svg" alt="copy-link-icon">
                </a>
            </div>
        `;
        if (counter < 4) {
            visibleLinks += downloadItem;
        } else {
            hiddenLinks += downloadItem;
        }
        counter++
    }
    return `
        <div class="downloads-header">
            <div class="downloads-date">${addDate(obj)}</div>
            <div class="downloads-qty">${addFilesQty(obj)} files</div>
        </div>
        <hr>
        <div class="downloads-body__visible">
            ${visibleLinks}
        </div>
        <div class="downloads-body__hidden hide">
            ${hiddenLinks}
        </div>
    `;
}    

function activateMoreButton() {
    document.querySelectorAll('.more-files__button').forEach(item => {
        item.addEventListener('click', function() {
            let hiddenItems = this.parentNode.parentNode.querySelector('.downloads-body__hidden');
            if (hiddenItems.classList.contains('hide')){
                hiddenItems.classList.remove('hide');
            } else {
                hiddenItems.classList.add('hide')
            }
        });
    });
}

function addDate(obj){
    let currDate = new Date(obj.time * 1000);

    let month = dict[lang].month;
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

function addDownloadItem(obj, downloadsCard){
    if (Object.keys(obj.files).length > 4) {
        let showMoreButton = document.createElement('button');
        showMoreButton.classList.add('more-files__button');
        showMoreButton.innerText = dict[lang].moreFiles;
        let downloadsCardFooter = document.createElement('div');
        downloadsCardFooter.classList.add('downloads-footer');
        downloadsCard.appendChild(downloadsCardFooter);
        downloadsCardFooter.appendChild(showMoreButton);
    }
}

