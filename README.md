# Flappy Bird AI Game

This repository contains an AI-powered version of the Flappy Bird game. Players can control the bird's movement by showing gestures (like or dislike) to the camera. The game is built using HTML, CSS, and JavaScript, with rendering optimized using the HTML5 Canvas. For AI hand detection, it utilizes MediaPipe.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project reimagines the classic Flappy Bird game by integrating AI for gesture recognition, enabling players to interact with the game through their webcam for a unique and engaging experience. The game is rendered efficiently using Canvas for smooth performance.

## Features

- **AI Gesture Recognition**

  - Use "like" and "dislike" gestures to control the bird's movement via the webcam.

- **Scoreboard**

  - Tracks and displays the player's score.

- **Pause and Resume**

  - Allows pausing the game and resuming later without losing progress.

- **Canvas Rendering**

  - Utilizes the HTML5 Canvas API for high-performance graphics and gameplay rendering.

- **Classic Flappy Bird Gameplay**

  - Navigate the bird through obstacles and earn points.

## Installation

### Prerequisites

Ensure you have the following installed:

- A modern web browser
- A webcam for gesture recognition

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MAQilH/flappy-bird.git
   ```
2. Navigate to the project directory:
   ```bash
   cd flappy-bird
   ```
3. Open `index.html` or `index2.html` in your browser to start the game.

## Usage

1. Open the game in your browser by opening `index.html` or `index2.html`.
2. Ensure your webcam is connected and positioned correctly.
3. Use "like" and "dislike" gestures to control the bird:
   - **Like**: Move the bird up.
   - **Dislike**: Let the bird fall.
4. Monitor your score on the scoreboard.
5. Pause the game using the pause button and resume it later as needed.

## Project Structure

```plaintext
flappy-bird/
├── .idea/
├── .parcel-cache/
├── dist/
├── node_modules/
├── src/
│   ├── css/
│   ├── img/
│   ├── js/
│   │   ├── controller/
│   │   ├── entity/
│   │   ├── handler/
│   │   ├── libs/
│   │   ├── models/
│   │   ├── view/
│   │   ├── config.js
│   │   ├── handDetection.js
│   │   ├── stage.js
│   │   └── util.js
├── .gitignore
├── index.html
├── index2.html
├── package-lock.json
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and descriptive messages.
4. Push your changes to your fork.
5. Open a pull request to the main repository.

## License

This project is licensed under the [MIT License](./LICENSE).

---

Enjoy playing the AI-powered Flappy Bird! Feedback and suggestions are always welcome.
