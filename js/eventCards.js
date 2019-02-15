let maxResults = 3
let numberOfEvents = 0
let currectDate = new Date().toISOString()
let EventsDiv = document.getElementById('EventCards')
const TODAY = moment()

$(document).ready(function() {
  let currentEvents = 0
  for (let i = 0; i < GSL.length && currentEvents < maxResults; i++) {
    if (0 > TODAY.diff(GSL[i].time)) {
      console.log(TODAY.diff(GSL[i].time))
      let startDate = GSL[i].time
        .toString()
        .substring(0, GSL[i].time.toString().length - 18)
      let startTime = GSL[i].time
        .toString()
        .substring(15, GSL[i].time.toString().length - 9)

      let card = `
        <li class="card">
            <div class="card--text">
                <div class="text--container"> 
                    <span class="startDate">${startDate}</span>
                    <br>
                    <span class="startTime">${startTime}</span>
                </div>                    
            </div>
        </li>`
      EventsDiv.innerHTML += card
      console.log(i)
      currentEvents++
    }
  }
})
