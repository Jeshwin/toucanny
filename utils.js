const crypto = require("crypto")
const { createCanvas } = require("canvas")
const seedrandom = require("seedrandom")

// Arrays of adjectives, nouns, and verbs
const adjectives = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "black",
    "white",
    "yellow",
    "light",
    "dark",
    "clear",
    "hard",
    "soft",
    "smooth",
    "rough",
    "solid",
    "liquid",
    "shy",
    "confident",
    "happy",
    "sad",
    "angry",
    "suprised",
    "excited",
    "bored",
    "tired",
    "average",
    "modern",
    "old",
    "secret",
    "normal",
    "spicy",
    "sweet",
    "salty",
    "sour",
    "creamy",
    "chewy",
    "easy",
    "difficult",
    "stubborn",
    "quiet",
    "loud",
    "crazy",
    "awful",
    "many",
    "few",
    "several",
    "married",
    "friendly",
    "pretty",
    "ugly",
    "crunchy",
    "empty",
    "partial",
    "colorful",
    "bland",
    "smart",
    "complex",
    "simple",
    "short",
    "long",
    "wide",
    "thin",
    "smelly",
]
const nouns = [
    "nights",
    "houses",
    "bones",
    "animals",
    "thoughts",
    "hoses",
    "songs",
    "rays",
    "puddles",
    "pipes",
    "bubbles",
    "squirrels",
    "balls",
    "rakes",
    "pots",
    "grapes",
    "papers",
    "sticks",
    "winds",
    "donkeys",
    "turkeys",
    "tomatoes",
    "helmets",
    "eyes",
    "marbles",
    "cars",
    "flasks",
    "wires",
    "rails",
    "pens",
    "umbrellas",
    "sheep",
    "boards",
    "numbers",
    "crackers",
    "planets",
    "mittens",
    "guitars",
    "dogs",
    "planks",
    "coins",
    "collars",
    "chairs",
    "teeth",
    "shirts",
    "trains",
    "candles",
    "windows",
    "spheres",
    "tents",
    "pianos",
    "keyboards",
    "koalas",
    "shoes",
    "dice",
    "plants",
    "flutes",
    "leaves",
    "soaps",
    "plates",
    "cubs",
    "pigs",
    "crystals",
    "cursors",
]
const verbs = [
    "allow",
    "jam",
    "record",
    "grate",
    "note",
    "tickle",
    "answer",
    "punch",
    "snatch",
    "tease",
    "wrap",
    "rub",
    "float",
    "mix",
    "strap",
    "wreck",
    "slap",
    "support",
    "sprinkle",
    "return",
    "possess",
    "decay",
    "claim",
    "paste",
    "see",
    "drown",
    "mend",
    "love",
    "leave",
    "marry",
    "grow",
    "guide",
    "supply",
    "drop",
    "explain",
    "twist",
    "paddle",
    "cure",
    "fold",
    "bless",
    "wriggle",
    "mock",
    "tire",
    "order",
    "accept",
    "strip",
    "arrest",
    "end",
    "attempt",
    "trip",
    "grease",
    "sneeze",
    "lighten",
    "stamp",
    "drag",
    "mark",
    "shrug",
    "flap",
    "scorch",
    "squash",
    "work",
    "slide",
    "earn",
    "hug",
]

const hexString = (s) => {
    return crypto.createHash("sha256").update(s).digest("hex")
}

const generateUsername = (userId) => {
    var numWords = 0
    const randomString = hexString(userId)

    // Function to pick a random word from an array using the hash of the userId as a seed
    const getRandomWord = (array) => {
        const randomIndex = randomString.charCodeAt(numWords) % array.length
        numWords += 1
        return array[randomIndex]
    }

    return `${getRandomWord(adjectives)}-${getRandomWord(
        nouns
    )}-${getRandomWord(verbs)}-${getRandomWord(adjectives)}-${getRandomWord(
        nouns
    )}`
}

// Helper function to generate a random integer in a range
const getRandomInt = (min, max, rng) => {
    return Math.floor(rng() * (max - min + 1)) + min
}

// Helper-helper function to convert HSL to RGB
const hslToRgb = (h, s, l) => {
    let r, g, b

    if (s === 0) {
        r = g = b = l // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

// Helper function to generate random colors
const generateColor = (rng) => {
    const r = getRandomInt(0, 255, rng)
    const g = getRandomInt(0, 255, rng)
    const b = getRandomInt(0, 255, rng)
    // Convert to hex
    const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b)
        .toString(16)
        .slice(1)}`

    return hex
}

// Helper function to generate less saturated random colors
const generateBgColor = (rng) => {
    const h = getRandomInt(0, 360, rng) // Random hue
    const s = getRandomInt(30, 70, rng) // Saturation constrained between 30 and 70
    const l = getRandomInt(60, 80, rng) // Lightness constrained between 60 and 80

    // Convert HSL to RGB
    const [r, g, b] = hslToRgb(h / 360, s / 100, l / 100)
    // Convert to hex
    const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b)
        .toString(16)
        .slice(1)}`

    return hex
}

// Helper function to interpolate between colors
function interpolateColors(color1, color2, factor) {
    // Convert hex to RGB
    const r1 = parseInt(color1.slice(1, 3), 16)
    const g1 = parseInt(color1.slice(3, 5), 16)
    const b1 = parseInt(color1.slice(5, 7), 16)

    const r2 = parseInt(color2.slice(1, 3), 16)
    const g2 = parseInt(color2.slice(3, 5), 16)
    const b2 = parseInt(color2.slice(5, 7), 16)

    // Interpolate RGB values
    const r = Math.round(r1 + (r2 - r1) * factor)
    const g = Math.round(g1 + (g2 - g1) * factor)
    const b = Math.round(b1 + (b2 - b1) * factor)

    // Convert back to hex
    const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b)
        .toString(16)
        .slice(1)}`

    return hex
}

// Function to generate a random toucan avatar based on the userId
const generateAvatar = (userId) => {
    const randomString = hexString(userId)
    const rng = seedrandom(randomString)

    // Canvas dimensions
    const canvasSize = 256
    const padding = 38
    const squareSize = (canvasSize - padding * 2) / 3
    const radius = squareSize

    // Colors to use
    const bgColor = generateBgColor(rng)
    const bodyColor = generateColor(rng)
    const innerBodyColor = interpolateColors("#ffffff", bodyColor, 0.3)
    const colors = Array.from({ length: 5 }, (_) => generateColor(rng))

    const canvas = createCanvas(canvasSize, canvasSize)
    const context = canvas.getContext("2d")

    // Background color
    context.fillStyle = bgColor
    context.fillRect(0, 0, canvasSize, canvasSize)

    // Draw quarter circles and square
    const centerX = canvasSize / 2
    const centerY = canvasSize / 2

    // Draw head as quarter circles
    context.beginPath()
    context.fillStyle = bodyColor
    context.moveTo(centerX - squareSize / 2, centerY)
    context.arc(
        centerX - squareSize / 2,
        centerY,
        radius,
        Math.PI,
        Math.PI * 1.5,
        false
    )
    context.fill()

    context.beginPath()
    context.fillStyle = "#ffffff"
    context.moveTo(centerX - squareSize / 2, centerY)
    context.arc(
        centerX - squareSize / 2,
        centerY,
        radius * 0.707,
        Math.PI,
        Math.PI * 1.5,
        false
    )
    context.fill()

    // Draw eye as circle
    context.beginPath()
    context.fillStyle = "#000000"
    context.moveTo(
        centerX - squareSize / 2 - radius * 0.3,
        centerY - radius * 0.3
    )
    context.arc(
        centerX - squareSize / 2 - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.125,
        0,
        Math.PI * 2.0,
        false
    )
    context.fill()

    // Draw colored beak
    for (let i = 0; i < 4; i++) {
        const x = centerX - squareSize / 2 + i * (squareSize / 4)
        const y = centerY - squareSize
        context.fillStyle = colors[i]
        context.fillRect(x, y, squareSize / 4, squareSize)
    }

    context.beginPath()
    context.fillStyle = colors[4]
    context.moveTo(centerX + squareSize / 2, centerY)
    context.arc(
        centerX + squareSize / 2,
        centerY,
        radius,
        Math.PI * 1.5,
        Math.PI * 2.0,
        false
    )
    context.fill()

    // Draw body as quarter circles
    context.beginPath()
    context.fillStyle = bodyColor
    context.moveTo(centerX - squareSize / 2, centerY)
    context.arc(
        centerX - squareSize / 2,
        centerY,
        radius,
        Math.PI * 0.5,
        Math.PI * 1.0,
        false
    )
    context.fill()

    context.beginPath()
    context.fillStyle = innerBodyColor
    context.moveTo(centerX - squareSize / 2, centerY)
    context.arc(
        centerX - squareSize / 2,
        centerY,
        radius * 0.707,
        Math.PI * 0.5,
        Math.PI * 1.0,
        false
    )
    context.fill()

    context.beginPath()
    context.fillStyle = bodyColor
    context.moveTo(centerX - squareSize / 2, centerY + squareSize)
    context.arc(
        centerX - squareSize / 2,
        centerY + squareSize,
        radius,
        Math.PI * 1.5,
        Math.PI * 2.0,
        false
    )
    context.fill()

    // Save the canvas as a PNG file
    return canvas.toBuffer("image/png")
}

module.exports = {
    generateUsername,
    generateAvatar,
}
