const serverless = require("serverless-http")
const express = require("express")
const path = require("path")
const cors = require("cors")

const app = express()

app.use(cors())

const { generateUsername, generateAvatar } = require("./utils")

// Serve static files from the 'public' directory
app.use(express.static("public"))

// Define the home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

// Define the '/username' route
app.get("/username", (req, res) => {
    const userId = req.query.userid
    if (!userId) {
        return res.status(400).send("Error: userid parameter is missing.")
    }

    const username = generateUsername(userId)
    res.json({ username })
})

// Define the '/avatar' route
app.get("/avatar", (req, res) => {
    const userid = req.query.userid
    if (!userid) {
        return res.status(400).send("Error: userid parameter is missing.")
    }
    const width = Number(req.query.w || 420)

    // Generate an avatar using the function from avatar.js
    const avatarData = generateAvatar(userid, width)
    console.log(avatarData)

    // Set the content type to image/jpeg
    res.type("image/png")

    // Send the generated avatar as binary data
    res.send(avatarData)
})

app.listen(3030, () => {
    console.log("listening on port 3030")
})
// module.exports.handler = serverless(app, {
//     binary: ["image/*"],
// })
