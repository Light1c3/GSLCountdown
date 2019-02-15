const Root = 'https://www.googleapis.com/calendar/v3/calendars/'
const calendarID = '162osjakh2mr7594d7fsk37lat3juf60@import.calendar.google.com'
const APIKey = 'AIzaSyDXGT6tr7HSR37T2TQ-KZFYeWDGRUzAfds'

let maxResults = 4
let numberOfEvents = 0
let currectDate = new Date().toISOString()
let EventsDiv = document.getElementById('EventCards')

$(document).ready(function() {
  $.ajax({
    url:
      Root +
      calendarID +
      '/events?maxResults=' +
      maxResults +
      '&timeMin=' +
      currectDate +
      '&singleEvents=true&orderBy=startTime' +
      '&key=' +
      APIKey,
    method: 'GET'
  }).then(function(data) {
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
        getEventDisc(items[i].description) +
        `
                                </div>
                            </div>
                        </div>
                </li>`
      EventsDiv.innerHTML += card
    }
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].location != null) {
        mapInitilization(data.items[i].location, [i])
      }
    }
    EventsDiv.style.width = `${450 * data.items.length}px`
  })
})

$(window).resize(function() {
  $('#log').append('<div>Handler for .resize() called.</div>')
})

function getEventDisc(disc) {
  if (disc == null) {
    return ''
  } else {
    let websiteURL = disc.match(/\bhttps?:\/\/\S+/gi)
    let description = disc.replace(websiteURL, '')

    return `<div"><p> ${description}</p><div class="event-description"><a href="${websiteURL}">Event Website</a></div></div>`
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
