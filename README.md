# IKEA Inspirational Website Project

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Application live: [IKEA Inspirations Website](https://ikea-inspirations-website.netlify.app/)

## Introduction

This project is a simple web application that provides an interactive platform for users to browse various IKEA room inspirations.

## Features

- **Home Page**: Displays a welcome message and navigation to different sections of the website.
- **Inspirations Page**: Shows a collection of room inspirations fetched from a local JSON file. Users can filter and browse different styles of rooms.
- **Favourites Page**: Allows authenticated users to see their favorite rooms.
- **Authentication**: Includes a simple authentication form for users to log in and access restricted features.

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **Material-UI**: For UI components and styling.
- **Context API**: For state management of authentication.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone  https://github.com/hajarmekamy/ikea-inspirational-website.git
   cd ikea-inspirational-website
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Start the development server**:
   ```sh
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Usage

- Navigate to the home page to explore the main features of the application.
- Go to the Inspirations page to view various room inspirations and add your favourites through the heart icon.
- Use the category filters to refine the list of inspirations.
- Log in using the authentication form to save your favorite rooms.
- Visit the Favourites page to see your saved rooms.
