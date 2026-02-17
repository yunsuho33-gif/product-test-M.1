# Animal Face Test Website Blueprint

## Overview

A web application that uses a Teachable Machine image classification model to determine a user's "animal face" type. Users can either use their webcam in real-time or upload an image to get a prediction.

## Features

- **Real-time Prediction:** Uses a webcam to classify the user's face in real-time.
- **Image Upload:** Allows users to upload an image file for classification.
- **Result Display:** Shows the predicted animal face type with a confidence score.
- **Modern UI:** A clean, responsive, and intuitive user interface.

## Design and Style

- **Layout:** A centered, single-column layout that is easy to navigate.
- **Theme:** A light and friendly theme with a clean aesthetic.
- **Typography:** Clear and readable fonts.
- **Components:**
    - A main container for the webcam feed or uploaded image.
    - A control panel with buttons for starting the webcam or uploading a file.
    - A results area that dynamically displays the predictions as a list or bar chart.
- **Responsiveness:** The layout will adapt to different screen sizes for mobile and desktop use.

## Technical Plan

1.  **`index.html`**:
    -   Set up the basic HTML structure.
    -   Include CDN links for TensorFlow.js and `@teachablemachine/image`.
    -   Define the main elements: `<h1>`, instructions, `<div>` for the webcam/image, and a `<div>` for the results.
2.  **`style.css`**:
    -   Implement the modern design and responsive layout using Flexbox and media queries.
    -   Style the buttons, result bars, and containers for a polished look.
3.  **`main.js`**:
    -   Load the Teachable Machine model from the provided URL (`https://teachablemachine.withgoogle.com/models/NDLXa3bgJ/`).
    -   Implement the `init()` function to set up the webcam and start the prediction loop.
    -   Implement the `loop()` function for real-time predictions.
    -   Create a function to handle image file uploads and run predictions on them.
    -   Dynamically update the DOM to display the results.
