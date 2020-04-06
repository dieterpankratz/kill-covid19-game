const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 20000;
const SURVIVED_INTERVALL = 1000;
const ALIVE_INTERVALL = 2000;
const wormContainer = document.querySelector(".worm-container");
let score = 0;

const getInterval = () =>
  Date.now() + MIN_INTERVAL + Math.floor(Math.random() * MAX_INTERVAL);
const getSurvivedInterval = () => Date.now() + SURVIVED_INTERVALL;
const getAliveInterval = () => Date.now() + ALIVE_INTERVALL;

const covids = [
  {
    status: "survived",
    next: getSurvivedInterval(),
    node: document.getElementById("hole-0")
  },
  {
    status: "survived",
    next: getSurvivedInterval(),
    node: document.getElementById("hole-1")
  },
  {
    status: "survived",
    next: getSurvivedInterval(),
    node: document.getElementById("hole-2")
  },
  {
    status: "survived",
    next: getSurvivedInterval(),
    node: document.getElementById("hole-3")
  },
  {
    status: "survived",
    next: getSurvivedInterval(),
    node: document.getElementById("hole-4")
  },
  {
    status: "survived",
    next: getSurvivedInterval(),
    node: document.getElementById("hole-5")
  },
  {
    status: "survived",
    next: getSurvivedInterval(),
    node: document.getElementById("hole-6")
  },
  {
    status: "survived",
    next: getSurvivedInterval(),
    node: document.getElementById("hole-7")
  },
  {
    status: "survived",
    next: getSurvivedInterval(),
    node: document.getElementById("hole-8")
  },
  {
    status: "survived",
    next: getSurvivedInterval(),
    node: document.getElementById("hole-9")
  }
];

const getNextStatus = covid => {
  switch (covid.status) {
    case "killed":
        covid.next = getSurvivedInterval();
        covid.node.children[0].classList.toggle("gone", true);
        break;
    case "survived":
      covid.next = getSurvivedInterval();
      covid.node.children[0].src = "./images/covid-leaving.png";
      covid.status = "leaving";
      break;
    case "leaving":
      covid.next = getInterval();
      covid.node.children[0].classList.toggle("gone", true);
      covid.status = "gone";
      break;
    case "alive":
      covid.node.children[0].classList.toggle("alive", false);
      covid.node.children[0].src = "./images/covid-survived.png";
      covid.status = "survived";
      covid.next = getSurvivedInterval();
      break;
    case "gone":
      covid.status = "alive";
      covid.next = getAliveInterval();
      covid.node.children[0].classList.toggle("alive", true);
      covid.node.children[0].classList.toggle("gone", false);
      covid.node.children[0].src = "./images/covid-alive.png";
      break;
  }
};

const kill = e => {
  if (e.target.tagName !== "IMG" || !e.target.classList.contains("alive")) {
    return;
  }

  const covid = covids[+e.target.dataset.index];

  covid.status = "killed";
  covid.next = getSurvivedInterval();
  covid.node.children[0].classList.toggle("alive", false);
  covid.node.children[0].src = "./images/covid-killed.png";
  score += 10;

  if (score >= 100) {
    win();
    return;
  }

//   wormContainer.style.width = `${score}%`;
};

const win = () => {
  document.querySelector(".background").classList.toggle("hide", true);
  document.querySelector(".win").classList.remove("hide", true);
};

document.querySelector(".background").addEventListener("click", kill);

const nextFrame = () => {
  const now = Date.now();
  for (let i = 0; i < covids.length; i++) {
    if (covids[i].next < now) {
      getNextStatus(covids[i]);
    }
  }
  requestAnimationFrame(nextFrame);
};

requestAnimationFrame(nextFrame);



// const getSurvivedInterval = () => {
//     return Date.now() + 1000;
// }

// const getGoneIntervall = () => {
//     return Date.now() + Math.floor(Math.random() * 18000) + 2000;
// }

// const getAliveIntervall = () => {
//     return Date.now() + Math.floor(Math.random() * 2000) + 3000;
// }
// const covids = [
//     {
//         status: 'survived',
//         next: getSurvivedInterval(),
//         node: document.querySelector('#hole-0')
//     },
//     {
//         status: 'survived',
//         next: getSurvivedInterval(),
//         node: document.querySelector('#hole-1')
//     },
//     {
//         status: 'survived',
//         next: getSurvivedInterval(),
//         node: document.querySelector('#hole-2')
//     },
//     {
//         status: 'survived',
//         next: getSurvivedInterval(),
//         node: document.querySelector('#hole-3')
//     },
//     {
//         status: 'survived',
//         next: getSurvivedInterval(),
//         node: document.querySelector('#hole-4')
//     },
//     {
//         status: 'survived',
//         next: getSurvivedInterval(),
//         node: document.querySelector('#hole-5')
//     },
//     {
//         status: 'survived',
//         next: getSurvivedInterval(),
//         node: document.querySelector('#hole-6')
//     },
//     {
//         status: 'survived',
//         next: getSurvivedInterval(),
//         node: document.querySelector('#hole-7')
//     },
//     {
//         status: 'survived',
//         next: getSurvivedInterval(),
//         node: document.querySelector('#hole-8')
//     },
//     {
//         status: 'survived',
//         next: getSurvivedInterval(),
//         node: document.querySelector('#hole-9')
//     }
// ];

// const getNextStatus = (covid) => {
//     switch(covid.status) {
//         case 'survived':
//             covid.next = getSurvivedInterval();
//             covid.status = 'leaving';
//             covid.node.children[0].src = './images/covid19-leaving.png';
//             break;
//         case 'leaving':
//             covid.next = getGoneIntervall();
//             covid.status = 'gone';
//             covid.node.children[0].classList.add('gone');
//             break;
//         case 'gone':
//             covid.next = getAliveIntervall();
//             covid.status = 'alive';
//             covid.node.children[0].classList.add('alive');
//             covid.node.children[0].classList.remove('gone');
//             covid.node.children[0].src = './images/covid19.png';
//             break;
//         case 'alive':
//             covid.status = 'survived';
//             covid.next = getSurvivedInterval();
//             covid.node.children[0].classList.remove('alive');
//             covid.node.children[0].src = './images/covid19-survived.png';
//             break;
//     }
// };
// let runAgainAt = Date.now + 100;

// const nextFrame = () => {
//     const now = Date.now();

//     if(runAgainAt <= now) {
//         for (let i = 0; i < covids.length; i++) {
//             if(covids[i].next <= now) {
//                 getNextStatus(covids[i]);
//             }
//         }
//         runAgainAt = now + 100;
//     }
//     requestAnimationFrame(nextFrame);
// }
// nextFrame();