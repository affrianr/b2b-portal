# B2B Portal

### Built With


* [![React][React.js]][React-url]
* [![Laravel][Laravel.com]][Laravel-url]

## Getting Started


### Prerequisites

This project require PHP (^8.3.4), PostgreqSQL (otherwise you can setting you own database on the env file) and a package manager (npm, bun, yarn, pnpm).

### Usage

To start the server setup the database first, cd to the server folder.
* Setup the database
  ```sh
  php artisan migrate
  ```
* Refresh the database
  ```sh
  php artisan migrate:fresh
  ```
* Start the server
  ```sh
  php artisan server
  ```
Let's start the client, cd to client folder.
* Install the dependencies
  ```sh
  bun install
  ```
* Start the project
  ```sh
  bun vite
  ```

  
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
