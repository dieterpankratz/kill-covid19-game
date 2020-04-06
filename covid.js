function getSurvivedInterval() {
    Date.now() + 1000;
}

function getGoneIntervall() {
    Date.now() + Math.floor(Math.random() * 18000) + 2000;
}
const covids = [
    {
        status: 'survived',
        next: getSurvivedInterval(),
        node: document.querySelector('#hole-0')
    },
    {
        status: 'survived',
        next: getSurvivedInterval(),
        node: document.querySelector('#hole-1')
    },
    {
        status: 'survived',
        next: getSurvivedInterval(),
        node: document.querySelector('#hole-2')
    },
    {
        status: 'survived',
        next: getSurvivedInterval(),
        node: document.querySelector('#hole-3')
    },
    {
        status: 'survived',
        next: getSurvivedInterval(),
        node: document.querySelector('#hole-4')
    },
    {
        status: 'survived',
        next: getSurvivedInterval(),
        node: document.querySelector('#hole-5')
    },
    {
        status: 'survived',
        next: getSurvivedInterval(),
        node: document.querySelector('#hole-6')
    },
    {
        status: 'survived',
        next: getSurvivedInterval(),
        node: document.querySelector('#hole-7')
    },
    {
        status: 'survived',
        next: getSurvivedInterval(),
        node: document.querySelector('#hole-8')
    },
    {
        status: 'survived',
        next: getSurvivedInterval(),
        node: document.querySelector('#hole-9')
    }
];

function getNextStatus (covid) {
    switch(covid.status) {
        case 'survived':
            covid.next = getSurvivedInterval();
            covid.status = 'leaving';
            covid.node.children[0].src = './images/covid19-leaving.png';
            break;
        case 'leaving':
            covid.next = getGoneIntervall();
            covid.status = 'gone';
            covid.node.children[0].classList.add('gone');
            break;
        case 'gone':
            covid.next = getAliveIntervall();
            covid.status = 'alive';
            covid.node.children[0].classList.add('alive');
            covid.node.children[0].classList.remove('gone');
            covid.node.children[0].src = './images/covid19.png';
    }
}
let runAgainAt = Date.now + 100;

function nextFrame () {
    const now = Date.now();

    if(runAgainAt <= now) {
        for (let i = 0; i < covids.length; i++) {
            if(covids[i].next <= now) {
                getNextStatus(covids[i]);
            }
        }
        runAgainAt = now + 100;
    }
    requestAnimationFrame(nextFrame);
}