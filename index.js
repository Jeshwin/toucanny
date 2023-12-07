// const serverless = require("serverless-http")
const express = require("express")
const path = require("path")

const app = express()

const { generateUsername, generateAvatar } = require("./utils")

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

    // Generate an avatar using the function from avatar.js
    const avatarData = generateAvatar(userid)

    // Set the content type to image/jpeg
    res.contentType("image/png")

    // Send the generated avatar as binary data
    res.send(avatarData)
})

// module.exports.handler = serverless(app)
app.listen(3030, () => {
    console.log("listening on port 3030")
})
