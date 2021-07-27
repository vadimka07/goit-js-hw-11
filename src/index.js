import './sass/main.scss';
//----------------------------------task 1---------------------------------------
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timeoutId = null;
let startTimer = false;
if(startButton) {
  startButton.addEventListener('click',()=> {
    if(startTimer) {
      return
    }
    startTimer =true;
    console.log('click start');
    timeoutId = setInterval(setColor, 1000);
  });

}
if(stopButton) {
  stopButton.addEventListener('click', ()=> {
    if(!startTimer) {
      return
    }
    startTimer = false;
    console.log('click stop');
    clearInterval(timeoutId);
  })
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function setColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}


//----------------------------------task 2---------------------------------------


const refs = {
  getStartTime :        document.getElementById('date-selector'),
  startCountdownTimer : document.querySelector('[data-start-timer]'),
  updateDays :          document.querySelector('[data-days]'),
  updateHours :         document.querySelector('[data-hours]'),
  updateMinutes :       document.querySelector('[data-minutes]'),
  updateSeconds :       document.querySelector('[data-seconds]')

}
refs.startCountdownTimer.addEventListener('click', function() {
  dateTime.start();
// console.log(new Date(refs.getStartTime.value).getTime());
})

class CountDown {

  constructor({onTick, timeExpired}) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.timeExpired = timeExpired;
  }
  pad(value) {
    return value.toString().padStart(2, '0');
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }
  start(){

     if(this.isActive) {
      return;
    }

    const startTime = new Date(refs.getStartTime.value).getTime();
    if(!Boolean(startTime) || startTime - Date.now() <= 0) {
      alert('Дата введена не корректно');
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(()=> {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if(deltaTime <= 0) {
        this.stop();

      }
      // const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
      const time = this.convertMs(deltaTime);
      // console.log(time);
      this.onTick(time);
      // console.log(`${days}:${hours}:${minutes}:${seconds}`);


    }, 1000)
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;

  }

}

const dateTime = new CountDown({
  onTick: updateTimer,
  timeExpired: refs.getStartTime.value,
});
console.log(dateTime.timeExpired);

function updateTimer({days, hours, minutes, seconds}) {
  refs.updateDays.textContent = days;
  refs.updateHours.textContent = hours;
  refs.updateMinutes.textContent = minutes;
  refs.updateSeconds.textContent = seconds;

}


//----------------------------------task 3---------------------------------------

//3.1

const delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(ms), ms);
  })
};

//3.2

const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
  return new Promise(resolve => {
    const updatedUsers = allUsers.map(user =>
      user.name === userName ? { ...user, active: !user.active } : user,
    );

    resolve(updatedUsers);
  })
};

const logger = updatedUsers => console.table(updatedUsers);

toggleUserState(users, 'Mango').then(logger);
toggleUserState(users, 'Lux').then(logger);

// Вызовы функции для проверки
delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms


//3.3

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = ({id, amount}) => {
  const delay = randomIntegerFromInterval(200, 500);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const canProcess = Math.random() > 0.3;

      if (canProcess) {
        resolve({id, time: delay});
      }

      reject(id);
    }, delay);
  })

};

const logSuccess = ({id, time}) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

makeTransaction({ id: 70, amount: 150 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 71, amount: 230 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 72, amount: 75 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 73, amount: 100 })
  .then(logSuccess)
  .catch(logError);