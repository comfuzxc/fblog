addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // This proxies your Pages application under the condition that your Worker script is deployed on the same custom domain as your Pages project
  const response = await fetch(request)
  
  // Clone the response so that it is no longer immutable
  const newResponse = new Response(response.body, response)

  // Add a custom header with a value
  newResponse.headers.append("Access-Control-Allow-Origin", "*")
  newResponse.headers.append("Access-Control-Allow-Methods", "POST")
  newResponse.headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Control-Type, Content-Type, token, Accept, x-access-sign, x-access-time")
  newResponse.headers.append("Content-type", "application/json;charset=utf-8")

  // Delete headers
  newResponse.headers.delete("x-header-to-delete")
  newResponse.headers.delete("x-header2-to-delete")
  newResponse.headers.delete("x-header-to-change")

  // Adjust the value for an existing header
  //newResponse.headers.set("x-header-to-change", "NewValue")

  return newResponse
}