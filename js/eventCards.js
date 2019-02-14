let maxResults = 4
let numberOfEvents = 0
let currectDate = new Date().toISOString()
let EventsDiv = document.getElementById('EventCards')

$(document).ready(function() {
  console.log(
    GSL[0].time.toString().substring(0, GSL[i].time.toString().length - 9)
  )
  for (let i = 0; i < GSL.length && i < 4; i++) {
    let startTime = GSL[i].time
      .toString()
      .substring(0, GSL[i].time.toString().length - 9)

    let card = `
        <li class="card">
            <div class="card--text">
                <div class="text--container"> 
                    ${startTime} 
                </div>                    
            </div>
        </li>`
    EventsDiv.innerHTML += card
  }
})
