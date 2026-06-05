# 🌐 IP Locator

> Look up any IP address — see country, city, ISP, and more.  
> 🔗 **Live Demo:** [https://adhihub.github.io/ip-locator/](https://adhihub.github.io/ip-locator/)

---

## 🔧 What It Does

Enter an IP address and get:
- **Country** (with flag)
- **Region & City**
- **ISP & Organization**
- **AS Number**
- **Mobile / Proxy / Hosting** detection

Leave the input blank to look up your own IP.  
Auto-detects your IP on page load.

---

## 🔍 How to Find Someone's IP — Full Guide

This tool **looks up** IP addresses — it does not **find** them for you.  
Below are the common methods people use to get someone's IP address.

---

### 1. Your Own IP (Easiest)
- Open the tool and leave the input blank
- It automatically shows your own public IP and location
- No steps needed — works on page load

### 2. Website / Server Logs
- Every website you visit records your IP in their server logs
- If you own a website, check your server logs (Apache, Nginx, cPanel, etc.)
- You will see every visitor's IP, browser, and timestamp
- **How:** Login to your hosting panel → access logs → see all IPs

### 3. Discord — During a Call
- Start a direct voice/video call with someone
- Right-click on the call window → select **"Copy IP Address"**
- This only works during an active direct call (not group calls)
- **Note:** Discord has been patching this — may not work on all versions

### 4. IP Logger Services (e.g., Grabify)
- Go to a service like **grabify.link** or **iplogger.org**
- Paste any URL (YouTube video, website link, etc.)
- The service creates a **tracking link** (looks like a normal short URL)
- Send that link to the person (via chat, email, social media)
- When they click it, you get their IP, location, browser, and device info
- **Step by step:**
  1. Go to grabify.link
  2. Enter any URL (e.g., a YouTube video link)
  3. Click "Create URL"
  4. Copy the generated tracking link
  5. Send the link to the target person
  6. Open the grabify tracker page to see results

### 5. Email Headers
- When someone sends you an email, the raw email contains their IP
- **Gmail:** Open email → three dots → "Show original" → look for "Received: from" or "X-Originating-IP"
- **Outlook:** Open email → File → Properties → Internet headers
- **Yahoo:** Open email → "More" → "View raw message"
- The IP is usually near the top in the "Received" headers

### 6. Game Servers
- Some multiplayer games show connected players' IPs
- Check server logs if you host a game server
- Games like Minecraft, CS:GO, Rust, etc. show IPs in server admin panels

### 7. Social Media / Messaging Apps
- **Telegram:** Bots can see your IP when you click a link
- **Snapchat:** Snap Map can show approximate location (not exact IP)
- **WhatsApp / Signal:** Calls are peer-to-peer — your IP is visible to the other person during a call
- Most platforms hide IPs by default, but some expose them during calls

---

## 🧪 Example IPs to Test With

| If you enter | You should see |
|-------------|---------------|
| `8.8.8.8` | Google DNS — Mountain View, California, USA |
| `1.1.1.1` | Cloudflare DNS — USA |
| `208.67.222.222` | OpenDNS — San Francisco, USA |
| Leave blank | Your own public IP and location |

---

> ⚠️ **Ethical use only.** Tracking someone's IP without consent can be illegal in many countries. Use only on your own devices or with explicit permission.

---

## 🚀 How to Use

Open `index.html` in any browser. No installation needed.

---

## 📡 API

Powered by [ip-api.com](https://ip-api.com) — free, no API key required for non-commercial use.

---

## 🛠️ Tech Stack

- **HTML5** — structure
- **CSS3** — dark cyber theme
- **JavaScript** — fetch API + display logic

---

## 🙋‍♂️ About

Built by [AdhiHub](https://github.com/AdhiHub)  
Web Developer · Cyber Enthusiast