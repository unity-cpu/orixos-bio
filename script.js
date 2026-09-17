const canvas = document.getElementById("matrix-canvas")
const ctx = canvas.getContext("2d")

function coolThingy() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
coolThingy()
window.addEventListener("resize", coolThingy)

const chars = "アイウエオカキクケコ0123456789#$%"
const fontSize = 16
const cols = Math.floor(canvas.width / fontSize)
const drops = Array.from({ length: cols }, () => ({
  y: Math.random() * canvas.height,
  speed: 4 + Math.random() * 6,
}))

setInterval(() => {
  ctx.fillStyle = "rgba(0,0,0,0.12)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "#4ade80"
  ctx.font = fontSize + "px monospace"
  drops.forEach((drop, i) => {
    const ch = chars[Math.floor(Math.random() * chars.length)]
    ctx.fillText(ch, i * fontSize, drop.y)
    drop.y += drop.speed
    if (drop.y > canvas.height && Math.random() > 0.9) {
      drop.y = -Math.random() * 300
      drop.speed = 4 + Math.random() * 6
    }
  })
}, 35)

// Cursor sparkle particles
document.addEventListener("mousemove", (e) => {
  const s = document.createElement("div")
  s.className = "cursor-particle"
  s.style.left = e.clientX + "px"
  s.style.top = e.clientY + "px"
  s.style.setProperty("--dx", (Math.random() - 0.5) * 80 + "px")
  s.style.setProperty("--dy", (Math.random() - 0.5) * 80 + "px")
  document.body.appendChild(s)
  setTimeout(() => s.remove(), 1100)
})

// 3D tilt on the main profile card
const mainCard = document.querySelector(".main-card")
if (mainCard) {
  mainCard.addEventListener("mousemove", (e) => {
    const r = mainCard.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    const rotateY = x / 18
    const rotateX = -y / 18
    mainCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`
  })
  mainCard.addEventListener("mouseleave", () => {
    mainCard.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)"
  })
}

// Click overlay → show page + play music
const overlay = document.getElementById("click-overlay")
const mainPage = document.getElementById("main-page")
const audio = document.getElementById("bg-music")

setTimeout(() => {
  overlay.style.opacity = 1
}, 100)

overlay.addEventListener("click", () => {
  overlay.classList.add("fade-out")
  mainPage.classList.add("show")
  audio.play().catch(() => {})
  setTimeout(() => {
    overlay.style.display = "none"
  }, 600)
})

// Simple lightbox for gallery images
const lightbox = document.createElement("div")
lightbox.id = "lightbox"
const lightboxImg = document.createElement("img")
lightbox.appendChild(lightboxImg)
document.body.appendChild(lightbox)

document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src
    lightbox.classList.add("show")
  })
})

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("show")
})