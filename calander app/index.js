const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();
let monthEl = document.getElementById("select-month-el")
const grid = document.getElementById("calender-grid")
const renderCalendar = () => {

const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

// const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate()

function updateCalendar(currentMonth, currentYear) {
  const dayElements = document.querySelectorAll(".grid")
  const monthName = months[currentMonth]
  const monthWithYear = `${monthName} - ${currentYear}`
  monthEl.innerText = monthWithYear;
  let dayCounter = 1

  for(let i = 0; i < dayElements.length; i++) {
    const day = dayElements[i]

    let dayNumber = day.querySelector('.day-number')
    if (i >= firstDay && dayCounter <= lastDay) {
      dayNumber.innerText = dayCounter;
      dayCounter++
    } else {
      dayNumber.innerText = ""
    }
  }
}

function generateGrid(){
  removeEl()
  grid.style.gridTemplateColumns = "repeat(7 , 1fr)"
  grid.style.gridTemplateRows = "repeat(6 , 1fr)"
  for(let i = 0; i < 42; i++) {
  gridElements = document.createElement("div")
    gridElements.classList.add("grid")
    gridElements.innerHTML = `
    <p class="day-text">${days[i%7]}</p>
    <p class="day-number"></p>
    `
    grid.appendChild(gridElements)
}
}

function removeEl(){
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
    }
}

//Current Time
function currentTime() {
  const interval = setInterval(function(){
    let currentDate = new Date()
    let hours = currentDate.getHours()
    let minutes = currentDate.getMinutes()
    let seconds = currentDate.getSeconds()

    let hoursId = document.getElementById("hour-current")
    let minutesId = document.getElementById("minute-current")
    let secondsId = document.getElementById("second-current")

    if (seconds > 9) {
      secondsId.innerHTML = `${seconds}`
    } 
    else {
      secondsId.innerHTML = `0${seconds}`
    }

    if (minutes > 9) {
      minutesId.innerHTML = `${minutes}`
    }
     else {
      minutesId.innerHTML = `0${minutes}`
    }
     
     if (hours > 9) {
      hoursId.innerHTML = `${hours}`
    }
     else {
      hoursId.innerHTML = `0${hours}`
     }

//Current Date

    let day = days[currentDate.getDay()]
    let month = months[currentDate.getMonth()]
    let date = currentDate.getDate()
    let year = currentDate.getFullYear()

    const nthNumber = (number) => {
        if (number > 3 && number < 21) return "th";
        switch (number % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };

    document.getElementById("date-current").innerHTML = `${day} ${date}${nthNumber(date)} ${month} ${year}`
  },1000)
}

currentTime()
generateGrid()
updateCalendar(currentMonth, currentYear)

}
document.getElementById("right-button").addEventListener("click", function() {
    if (currentMonth <= 10){
      currentMonth ++
      today.setMonth(today.getMonth()+1)
      renderCalendar()
      console.log("month increase", currentMonth)
    } else if (currentMonth == 11 ) {
      currentMonth = 0
      currentYear ++
      today.setMonth(today.getMonth()+1)
      renderCalendar()
      console.log("year increase", today)
    }
  })

  document.getElementById("left-button").addEventListener("click", function() {
    console.log("clicked")
    if (currentMonth >= 1 ){
      currentMonth --
      today.setMonth(today.getMonth()-1)
      renderCalendar()
      console.log("month decrease", currentMonth)
    } else if (currentMonth == 0 ) {
      currentMonth = 11
      currentYear --
      today.setMonth(today.getMonth()-1)
      renderCalendar()
      console.log("year decrease", today)
    }
  })

  renderCalendar()