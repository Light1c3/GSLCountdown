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
    return data
  })
}
