const Root = 'https://www.googleapis.com/calendar/v3/calendars/'
const calendarID = 'lb4oacuhcit3fubqvjnv3lefgs@group.calendar.google.com'
const APIKey = 'AIzaSyDXGT6tr7HSR37T2TQ-KZFYeWDGRUzAfds'
const currentDate = moment().toISOString()

let maxResults = 2
let numberOfEvents = 0
let EventsDiv = document.getElementById('EventCards')

$(document).ready(function() {
  $.ajax({
    url:
      Root +
      calendarID +
      '/events?maxResults=' +
      maxResults +
      '&timeMin=' +
      currentDate +
      '&singleEvents=true' +
      '&orderBy=startTime' +
      '&q=GSL' +
      '&key=' +
      APIKey,
    method: 'GET'
  }).then(function(data) {
    events = data.items
    let items = data.items
    numberOfEvents = items.length
    for (let i = 0; i < items.length; i++) {
      let startTime = getDateTime(items[i].start)
      let endTime = getDateTime(items[i].end)

      let card =
        `
                <li class="card">
                    <div class="card--text">
                        <div class="text--container">
                            <div class="text--header">
                                <a class="addEvent-btn" href="${
                                  items[i].htmlLink
                                }" target="_blank"><i class="fas fa-calendar-plus"></i></a>
                                <h2 class="text--title">` +
        items[i].summary +
        `</h2>
                                    <p>` +
        getEventDate(startTime) +
        `</p>
                                    <p>` +
        getEventTime(startTime, items[i].start) +
        getEventEndTime(endTime, items[i].end) +
        `</p>
                                    ` +
        getEventDesc(items[i].description) +
        `
                                </div>
                            </div>
                        </div>
                </li>`
      EventsDiv.innerHTML += card
    }
    EventsDiv.style.width = `${450 * data.items.length}px`
  })
})

function getEventDesc(disc) {
  if (disc == null) {
    return ''
  } else {
    let websiteURL = disc.match(/\bhttps?:\/\/\S+/gi)
    let description = disc.replace(websiteURL, '')

    return `<div class="event-description"><p> ${description}</p><div class="event-link"><a href="${websiteURL}">Event Website</a></div></div>`
  }
}

function getEventDate(date) {
  let length = date.toUTCString().length - 13
  return (
    `<i class="far fa-calendar-alt"></i> ` +
    date.toUTCString().substring(0, length)
  )
}

function getDateTime(event) {
  if (event.date != null) {
    return (date = new Date(event.date))
  } else {
    return new Date(event.dateTime)
  }
}

function getEventTime(time, event) {
  let length = time.toLocaleTimeString().length
  if (event.date != null) {
    return `<i class="far fa-clock"></i> All day`
  }
  return (
    `<i class="far fa-clock"></i> ` +
    time.toLocaleTimeString().substring(0, length - 6) +
    time.toLocaleTimeString().substring(length - 3, length)
  )
}

function getEventEndTime(time, event) {
  let length = time.toLocaleTimeString().length
  if (event.date != null) {
    return ``
  }
  return (
    ` - ` +
    time.toLocaleTimeString().substring(0, length - 6) +
    time.toLocaleTimeString().substring(length - 3, length)
  )
}
