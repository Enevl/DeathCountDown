async function getStartTime() {
    let timeIs = await fetch("http://192.168.1.74:5500/trecorrded.json"); // change port accordingly
    let jsonFormat = await timeIs.json()
    let time = jsonFormat["timeREcorded"]
    return parseInt(time)
}




const deathDate = new Date("2080-09-21T01:20:00").getTime(); // death estimate
const startTime = await getStartTime()



const pastDate = new Date("2000-09-21T01:20:00").getTime(); // Reference past date

async function countDown() {
    let curdatetime = Date.now();
    let timeleft = (deathDate - curdatetime) / 1000;
    let timeElapsed = (curdatetime - startTime) / 1000; // Time elapsed since start
    let timeSincePast = (curdatetime - pastDate) / 1000; // Time since 2006-05-02 1:20 AM

    let days = Math.floor(timeleft / (60 * 60 * 24));
    let hours = Math.floor((timeleft % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((timeleft % (60 * 60)) / 60);
    let seconds = Math.floor(timeleft % 60);

    let elapsedDays = Math.floor(timeElapsed / (60 * 60 * 24));
    let elapsedHours = Math.floor((timeElapsed % (60 * 60 * 24)) / (60 * 60));
    let elapsedMinutes = Math.floor((timeElapsed % (60 * 60)) / 60);
    let elapsedSeconds = Math.floor(timeElapsed % 60);

    let pastDays = Math.floor(timeSincePast / (60 * 60 * 24));
    let pastHours = Math.floor((timeSincePast % (60 * 60 * 24)) / (60 * 60));
    let pastMinutes = Math.floor((timeSincePast % (60 * 60)) / 60);
    let pastSeconds = Math.floor(timeSincePast % 60);

    document.querySelector(".timecountdown").innerHTML = `
        <span class="days">${days}D</span>:<span class="hours">${hours}H</span>:<span class="minutes">${minutes}M</span>:<span class="seconds">${seconds}S</span>`;

    document.querySelector(".timeelapsed").innerHTML = `
        <span class="days">${elapsedDays}D</span>:<span class="hours">${elapsedHours}H</span>:<span class="minutes">${elapsedMinutes}M</span>:<span class="seconds">${elapsedSeconds}S</span>`;

    document.querySelector(".timesincepast").innerHTML = `
        <span class="days">${pastDays}D</span>:<span class="hours">${pastHours}H</span>:<span class="minutes">${pastMinutes}M</span>:<span class="seconds">${pastSeconds}S</span>`;

    setTimeout(() => {
        countDown();
    }, 1000);
}

countDown();
