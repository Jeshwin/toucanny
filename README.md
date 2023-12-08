<p align="center">
  <a href="" rel="noopener">
 <img width=768px height=256px src="Toucanny Collage.png" alt="Project logo"></a>
</p>

<h1 align="center">Toucanny</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/Jeshwin/toucanny)](https://github.com/Jeshwin/toucanny)
[![GitHub Repo stars](https://img.shields.io/github/stars/Jeshwin/toucanny)](https://github.com/Jeshwin/toucanny)
[![GitHub issues](https://img.shields.io/github/issues/Jeshwin/toucanny)](https://github.com/Jeshwin/toucanny/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">
  Toucanny is a default username and avatar generation service
  <br> 
</p>

## 📝 Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Installing](#installing)
-   [Usage](#usage)
-   [Deployment](#deployment)
-   [Built Using](#built_using)
-   [References](#references)

## 🧐 About <a name = "about"></a>

While working on another one of my personal projects, [CodeNest](https://www.codenest.space), I wanted a custom solution for generating a default username and avatar when a user signs up. Currently, we are using [Auth0](https://auth0.com) to handle user login and signup, and they already create a default avatar using [Gravatar](https://gravatar.com), but I found it to be too boring, just the user's initials and a background color 😴. So, I decided to make my own version, and add a username generator on top.

My objective for this project was to create a username and avatar generator that

1. Generates a unique username and avatar for each new user (no duplicates)
2. Creates a memorable and interesting output, not just random characters and a bland image

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing <a name = "installing"></a>

Clone the repository

```
git clone https://https://github.com/Jeshwin/toucanny.git
```

Change to the `toucanny` directory

```
cd toucanny
```

Download the node dependencies

```
npm install
```

Run the development build

```
npm run start
```

The instance will be available on `localhost:3030`

## 📥 Usage <a name="usage"></a>

There are two main routes that the Toucanny API uses.

### `/username?userid={userid}`

This route takes in a required query parameter `userid` that is used to seed a random number generator. This way, every user gets a unique output, and it will always be the same output for the same user. To make the username interesting, it is formatted as a random sentence with five words of the form `adjective-noun-verb-adjective-noun`. Using a list of 64 adjectives, nouns, and verbs each, this leads to more than 1 billion usernames!

The output is a json object of the form `{ username : "adjective-noun-verb-adjective-noun" }`.

### `/avatar?userid={userid}&w={width}`

This route takes in a required query parameter `userid` that is used to seed a random number generator. It also takes an optional query parameter `w` that is used to define the width and height of the output image. The output image is a toucan made from 9 uniquely generated colors, 6 for the beak and 1 each for the body, background, and branch colors. This creates over $1 \times 10^{65}$ possible avatars! (It's actually a bit less because the background color has fewer possibilities, but at this order of magnitude, it doesn't really make a difference) Some example avatars generated using Toucanny are in the header image of this README.

The output is an image with the specified width and height, or 420x420 px by default.

## 🚀 Deployment <a name = "deployment"></a>

Toucanny is deployed using [Serverless](https://www.serverless.com/) on [AWS](https://aws.amazon.com/) and is publicly available [here](https://api.toucanny.net)!

## ⛏️ Built Using <a name = "built_using"></a>

-   [Express.js](https://expressjs.com/) - Node.js API Framework
-   [node-canvas](https://www.npmjs.com/package/canvas) - Image Creation Library
-   [AWS](https://aws.amazon.com/) - Web Hosting
-   [Serverless](https://www.serverless.com/) - Serverless Deployment

## 📜 References <a name = "references"></a>

-   [Toucan reference image](https://dribbble.com/shots/3706929-Toucan)
-   Inspired by [Peardeck's](https://www.peardeck.com/) word-based code generator
