function isIPv6(ip) { return ip && ip.includes(":") }

async function lookupIP(ip) {
  const url = ip ? "https://ipinfo.io/" + ip + "/json" : "https://ipinfo.io/json"
  const res = await fetch(url)
  if (!res.ok) throw new Error("API request failed")
  return res.json()
}

function showResult(data, el) {
  var flag = ""
  if (data.country) {
    try { flag = String.fromCodePoint.apply(null, data.country.toUpperCase().split("").map(function(c) { return 0x1F1E6 + c.charCodeAt(0) - 65 })) } catch(e) {}
  }
  el.innerHTML = "<div class=\"result-item\"><span class=\"result-label\">IP Address</span><span class=\"result-value highlight\">" + (data.ip || "-") + "</span></div><div class=\"result-item\"><span class=\"result-label\">Hostname</span><span class=\"result-value\">" + (data.hostname || "-") + "</span></div><div class=\"result-item\"><span class=\"result-label\">Country</span><span class=\"result-value\">" + flag + " " + (data.country || "-") + "</span></div><div class=\"result-item\"><span class=\"result-label\">Region</span><span class=\"result-value\">" + (data.region || "-") + (data.city ? ", " + data.city : "") + "</span></div><div class=\"result-item\"><span class=\"result-label\">ZIP Code</span><span class=\"result-value\">" + (data.postal || "-") + "</span></div><div class=\"result-item\"><span class=\"result-label\">Timezone</span><span class=\"result-value\">" + (data.timezone || "-") + "</span></div><div class=\"result-item\"><span class=\"result-label\">Organization</span><span class=\"result-value\">" + (data.org || "-") + "</span></div>"
  el.className = "result-box"
}

function doLookup() {
  var ip = document.getElementById("ipInput").value.trim()
  var el = document.getElementById("result")
  if (isIPv6(ip)) {
    el.textContent = "The free API does not support IPv6. Try an IPv4 address (e.g., 8.8.8.8)."
    el.className = "result-box error"
    return
  }
  el.innerHTML = "<div class=\"loading\">Looking up...</div>"
  el.className = "result-box"
  lookupIP(ip).then(function(data) { showResult(data, el) }).catch(function() { el.textContent = "Error: Could not fetch IP data. Try again later."; el.className = "result-box error" })
}

document.getElementById("lookupBtn").addEventListener("click", doLookup)

document.getElementById("ipInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") doLookup()
})

el = document.getElementById("result")
el.innerHTML = "<div class=\"loading\">Detecting your IP...</div>"
lookupIP("").then(function(data) { showResult(data, el) }).catch(function() { el.textContent = "Error: Could not detect IP. Check your connection."; el.className = "result-box error" })
