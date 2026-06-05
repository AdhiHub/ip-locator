function isIPv6(ip) { return ip && ip.includes(":") }

async function lookupIP(ip) {
  const url = ip ? `https://ipinfo.io/${ip}/json` : "https://ipinfo.io/json"
  const res = await fetch(url)
  if (!res.ok) throw new Error("API request failed")
  return res.json()
}

function showResult(data, el) {
  const flag = data.country ? String.fromCodePoint(...[...data.country.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65)) : ""
  el.innerHTML = [
    '<div class="result-item"><span class="result-label">IP Address</span><span class="result-value highlight">' + (data.ip || "-") + '</span></div>',
    '<div class="result-item"><span class="result-label">Hostname</span><span class="result-value">' + (data.hostname || "-") + '</span></div>',
    '<div class="result-item"><span class="result-label">Country</span><span class="result-value">' + flag + ' ' + (data.country || "-") + '</span></div>',
    '<div class="result-item"><span class="result-label">Region</span><span class="result-value">' + (data.region || "-") + (data.city ? ", " + data.city : "") + '</span></div>',
    '<div class="result-item"><span class="result-label">ZIP Code</span><span class="result-value">' + (data.postal || "-") + '</span></div>',
    '<div class="result-item"><span class="result-label">Location</span><span class="result-value">' + (data.loc || "-") + '</span></div>',
    '<div class="result-item"><span class="result-label">Timezone</span><span class="result-value">' + (data.timezone || "-") + '</span></div>',
    '<div class="result-item"><span class="result-label">Organization</span><span class="result-value">' + (data.org || "-") + '</span></div>'
  ].join("")
  el.className = "result-box"
}

document.getElementById("lookupBtn").addEventListener("click", async () => {
  const ip = document.getElementById("ipInput").value.trim()
  const el = document.getElementById("result")
  if (isIPv6(ip)) {
    el.textContent = "The free API does not support IPv6. Try an IPv4 address (e.g., 8.8.8.8)."
    el.className = "result-box error"
    return
  }
  el.innerHTML = '<div class="loading">Looking up<span>.</span><span>.</span><span>.</span></div>'
  el.className = "result-box"
  try {
    const data = await lookupIP(ip)
    showResult(data, el)
  } catch (e) {
    el.textContent = "Error: Could not fetch IP data. Try again later."
    el.className = "result-box error"
  }
})

document.getElementById("ipInput").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("lookupBtn").click()
})

window.addEventListener("load", async () => {
  const el = document.getElementById("result")
  el.innerHTML = '<div class="loading">Detecting your IP<span>.</span><span>.</span><span>.</span></div>'
  try {
    const data = await lookupIP("")
    showResult(data, el)
  } catch (e) {
    el.textContent = "Error: Could not detect IP. Check your connection."
    el.className = "result-box error"
  }
})