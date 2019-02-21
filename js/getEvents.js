const Root = 'https://www.googleapis.com/calendar/v3/calendars/'
const calendarID = 'lb4oacuhcit3fubqvjnv3lefgs@group.calendar.google.com'
const APIKey = 'AIzaSyDXGT6tr7HSR37T2TQ-KZFYeWDGRUzAfds'
const currentDate = moment().toISOString()

let maxResults = 3
let numberOfEvents = 0

function getEvents() {
  return $.ajax({
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
    excludePastEvents(data.items)
    return data
  })
}

function excludePastEvents(events) {
  if (moment(events[0].start.dateTime).diff(moment(), 'minutes')) {
    return events.shift()
  } else {
    return events.pop()
  }
}
