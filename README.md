
# Project Title  
Therapy Tracker 

## Badges  

Add badges from somewhere like: [shields.io](https://shields.io/)  
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)  
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://choosealicense.com/licenses/gpl-3.0/)  
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](https://choosealicense.com/licenses/gpl-3.0/)

# Table of contents  
1. [Introduction](#introduction)  
2. [Some paragraph](#paragraph1)  
    1. [Sub paragraph](#subparagraph1)  
3. [Another paragraph](#paragraph2)  

## Screenshots  

![App Screenshot](https://lanecdr.org/wp-content/uploads/2019/08/placeholder.png)

## Tech Stack  

**Backend**  
- Node.js (Express 4.21)  
- SQLite (file-based)  
- JWT Authentication  
- Bruno API Collections  

**Frontend**  
- React 18  
- Tailwind CSS 3  
- Recharts + Chart.js  

## Features  

- Secure Auth (JWT + bcryptjs)  
- Goal Management (CRUD operations)  
- Session Analytics (Chart.js visualizations)  
- Bruno API Testing (Git-friendly collections)  
- Responsive UI (React + Tailwind CSS)  


## Run Locally  

Clone the project  

~~~bash  
  git clone https://github.com/your-username/Therapy-tracker.git  
~~~

Go to the project directory  

~~~bash  
  cd Therapy-tracker  
~~~

Install dependencies  

frontend

~~~bash  
npm install
npm start 
~~~

backend  

~~~bash  
npm install  
echo "JWT_SECRET=your_strong_secret_here" > .env  
echo "PORT=5000" >> .env  
node server.js 
~~~

## API Documentation
Location: Therapy Tracker API/bruno/
Files:

TherapyTracker_API.bru (Main collection)

env.bru (Environment variables)

Example Request:
~~~bash  
POST http://localhost:5000/api/goals
headers {
  Authorization: {{JWT_TOKEN}}
}
body:json {
  "description": "Practice mindfulness daily"
}
~~~

##Project Structure
~~~bash 
therapy-tracker/
├── Therapy Tracker API/
│   └── bruno/              # Bruno API collections
├── backend/
│   ├── routes/             # Express endpoints
│   ├── .env                # Environment config
│   ├── db.js               # SQLite connection
│   └── server.js           # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── tailwind.config.js
└── README.md
~~~

##Available Scripts
frontend
~~~bash 
npm start      # Start dev server
npm run build  # Create production build
npm test       # Run tests
~~~

backend
~~~bash 
node server.js  # Start backend server
~~~

## Acknowledgements  

- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

## Feedback  

If you have any feedback, please reach out to us at fake@fake.com

## License  

[MIT](https://choosealicense.com/licenses/mit/)
