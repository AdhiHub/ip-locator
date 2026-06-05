function isIPv6(ip) { return ip && ip.indexOf(":") > -1 }

function apiUrl(ip) {
  if (ip) return "https://ipinfo.io/" + ip + "/json"
  return "https://ipinfo.io/json"
}

function fallbackUrl(ip) {
  if (ip) return "https://ip-api.com/json/" + ip + "?fields=status,message,country,regionName,city,zip,isp,org,as,mobile,proxy,hosting,query"
  return "https://ip-api.com/json/?fields=status,message,country,regionName,city,zip,isp,org,as,mobile,proxy,hosting,query"
}

function showResult(data, el, source) {
  if (source === "ip-api" && data.status === "fail") {
    el.textContent = "Error: " + (data.message || "Invalid IP")
    el.className = "result-box error"
    return
  }
  var flag = ""
  if (data.country) {
    try { flag = String.fromCodePoint.apply(null, data.country.toUpperCase().split("").map(function(c) { return 0x1F1E6 + c.charCodeAt(0) - 65 })) } catch(e) {}
  }
  el.innerHTML = "<div class=\"result-item\"><span class=\"result-label\">IP Address</span><span class=\"result-value highlight\">" + (data.ip || data.query || "-") + "</span></div><div class=\"result-item\"><span class=\"result-label\">Country</span><span class=\"result-value\">" + flag + " " + (data.country || "-") + "</span></div><div class=\"result-item\"><span class=\"result-label\">Region</span><span class=\"result-value\">" + (data.region || data.regionName || "-") + (data.city ? ", " + data.city : "") + "</span></div><div class=\"result-item\"><span class=\"result-label\">Organization</span><span class=\"result-value\">" + (data.org || "-") + "</span></div>"
  el.className = "result-box"
}

function doLookup() {
  var ip = document.getElementById("ipInput").value.trim()
  var el = document.getElementById("result")
  
  if (isIPv6(ip)) {
    el.textContent = "IPv6 is not supported. Try an IPv4 address (e.g., 8.8.8.8)."
    el.className = "result-box error"
    return
  }
  
  el.innerHTML = "<div class=\"loading\">Looking up...</div>"
  el.className = "result-box"
  
  fetch(apiUrl(ip)).then(function(r) { return r.json() }).then(function(data) {
    showResult(data, el, "ipinfo")
  }).catch(function() {
    fetch(fallbackUrl(ip)).then(function(r) { return r.json() }).then(function(data) {
      showResult(data, el, "ip-api")
    }).catch(function() {
      el.textContent = "Error: Could not fetch IP data. Try again later."
      el.className = "result-box error"
    })
  })
}

document.getElementById("lookupBtn").addEventListener("click", doLookup)
document.getElementById("ipInput").addEventListener("keydown", function(e) { if (e.key === "Enter") doLookup() })

var el = document.getElementById("result")
el.innerHTML = "<div class=\"loading\">Detecting your IP...</div>"
fetch(apiUrl("")).then(function(r) { return r.json() }).then(function(data) {
  showResult(data, el, "ipinfo")
}).catch(function() {
  fetch(fallbackUrl("")).then(function(r) { return r.json() }).then(function(data) {
    showResult(data, el, "ip-api")
  }).catch(function() {
    el.textContent = "Error: Could not detect IP."
    el.className = "result-box error"
  })
})
