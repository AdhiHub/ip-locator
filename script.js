function isIPv6(ip) { return ip && ip.includes(":") }

async function lookupIP(ip) {
  const url = ip ? `https://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,zip,isp,org,as,mobile,proxy,hosting,query` : "https://ip-api.com/json/?fields=status,message,country,regionName,city,zip,isp,org,as,mobile,proxy,hosting,query"
  const res = await fetch(url)
  return res.json()
}

function showResult(data, el) {
  if (data.status === "fail") {
    el.textContent = "Invalid IP address. IPv6 is not supported by the free API."
    el.className = "result-box error"
    return
  }
  const flag = data.country ? String.fromCodePoint(...[...data.country.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65)) : ""
  el.innerHTML = `
    <div class="result-item"><span class="result-label">IP Address</span><span class="result-value highlight">${data.query}</span></div>
    <div class="result-item"><span class="result-label">Country</span><span class="result-value">${flag} ${data.country || "-"}</span></div>
    <div class="result-item"><span class="result-label">Region</span><span class="result-value">${data.regionName || "-"}${data.city ? ", " + data.city : ""}</span></div>
    <div class="result-item"><span class="result-label">ZIP Code</span><span class="result-value">${data.zip || "-"}</span></div>
    <div class="result-item"><span class="result-label">ISP</span><span class="result-value">${data.isp || "-"}</span></div>
    <div class="result-item"><span class="result-label">Organization</span><span class="result-value">${data.org || "-"}</span></div>
    <div class="result-item"><span class="result-label">AS Number</span><span class="result-value">${data.as || "-"}</span></div>
    <div class="result-item"><span class="result-label">Mobile</span><span class="result-value">${data.mobile ? "Yes" : "No"}</span></div>
    <div class="result-item"><span class="result-label">Proxy/VPN</span><span class="result-value">${data.proxy ? "Yes" : "No"}</span></div>
    <div class="result-item"><span class="result-label">Hosting</span><span class="result-value">${data.hosting ? "Yes" : "No"}</span></div>
  `
  el.className = "result-box"
}

document.getElementById("lookupBtn").addEventListener("click", async () => {
  const ip = document.getElementById("ipInput").value.trim()
  const el = document.getElementById("result")
  if (isIPv6(ip)) {
    el.textContent = "IPv6 is not supported by the free API. Try an IPv4 address."
    el.className = "result-box error"
    return
  }
  el.innerHTML = '<div class="loading">Looking up<span>.</span><span>.</span><span>.</span></div>'
  el.className = "result-box"
  const data = await lookupIP(ip)
  showResult(data, el)
})

document.getElementById("ipInput").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("lookupBtn").click()
})

window.addEventListener("load", async () => {
  const el = document.getElementById("result")
  el.innerHTML = '<div class="loading">Detecting your IP<span>.</span><span>.</span><span>.</span></div>'
  const data = await lookupIP("")
  showResult(data, el)
})