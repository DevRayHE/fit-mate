# FitMate

---

## Demo Screenshots

--- ![Screen Shot 2021-12-06 at 8 33 40 pm](https://user-images.githubusercontent.com/88652187/144822522-08c5089a-e9d5-40b1-9d8f-901db3124287.png)

![image (1)](https://user-images.githubusercontent.com/88652187/144824402-1974ea26-d481-452e-8006-f36ba37fc0da.png)



## Description

FitMate is an app for everyone who loves exercising. FitMate is a one-stop app to track your excercises and calories burnt daily. Losing weight isn't easy - we know. Study after study has confirmed the benefits of keeping track of the exercise activity you do. It's simple - the more consistently you track your exercises, the more likely you are to lose weight. That's why every successful weight management program suggests that you keep an activity log. But recording all the exercises without the right tools can be tedious at best, or simply impossible at worst. Hence we developed FitMate.

Link to the [Github repo](https://github.com/DevRayHE/fit-mate.git)

Link to the [Deployed site live on Heroku](https://morning-fortress-74236.herokuapp.com/)

---

## Table of Contents

- [Description](#Description)
- [Features](#Features)
- [Technologies](#Technologies)
- [Usage](#Usage)
- [Files structure](#file-structure)
- [Contributors](#Contributors)
- [License](#License)

---

## User Story

As a user, <br>
I can add excercise details such as exercise type, duration weight, <br>
THEN calories burnt are automatically calculated. <br>
I can then view the leaderboard which displays the rank of the users by clicking the Leaderboard button,<br>
THEN the details of the users is dispayed in a rank format dipalying sorted by the highest cla. <br>

---

## Features

- Restful API created using Node.js and Express.js
- Handlebar.js as the template engine
- MySQL and the Sequelize ORM for the database
- Impletementd GET, POST, PUT routes for retrieving, adding and updating new data
- Folder structure meets the MVC paradigm
- Include authentication - express session and cookies
- API keys and sentitive information protected with environment variables
- Deployed to Heroku with data
- Responsive and polished UI
- Interactive to user input

---

## Technologies used

- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
- ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
- ![GitHub Version Control](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
- Handlebars
- MySql2
- MVC
- NPM

---

## Usage

User can add the the type of exercises, duration and keep a track of the activity. The app will automatically calculate the calories burnt which will then be saved and viewed in the sxercise dashboard. In addition user will also be able to view the dashboard wihich have details of other users as well and will ranked as per them most calories burnt. This app assist the user to keep a track of their calories burnt and help achieve them thier desired fitness goals.

---

## File structure

```md
config/ // connection configuration
connection.js

controllers/ // Controller of MVC, routes definition
api/index.js
api/userRoutes.js
api/exerciseRecordRoutes.js
index.js
homeRoutes.js
dashboardRoutes.js
leaderboardRoutes.js

db/ // database
schema.sql

models/ // Model of MVC, Data model definition
index.js
User.js
Exercise.js
exerciseRecord.js

public/ // CSS files and Front end logic javascript files
css/jass.css
css/style.css
js/login.js
js/logout.js
js/profile.js
js/exercise.js

seeds/ // Website initial setup seed data
seed.js
userData.json
exerciseData.json
exerciseRecordData.json

utils/ // Helpfer function files
auth.js
helpers.js

views/ // View of MVC
layouts/home.handlebars
layouts/main.handlebars
partials/rank-details.handlebars
partials/record-details.handlebars
dashboards.handlebars
editProfile.handlebars
exerciseDisplayForm.handlebars
exerciseEditForm.handlebars
exerciseNewForm.handlebars
homepage.handlebars
leaderboard.handlebars
login.handlebars
signUp.handlebars
```

---

## Contributors

_[Ray He](https://github.com/DevRayHe)_ <br>
_[Kash Patel](https://github.com/kashpateltech)_ <br>
_[ETTA Ho](https://github.com/Etta0311)_ <br>
_The Univserity of Sydney | Trilogy Education Services_ <br>

---

## License

<img alt="GitHub License" src="https://img.shields.io/apm/l/vim-mode">

MIT License
Copyright (c) [2021] [fit-mate]
Permission is herby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limiation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject following coditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MECHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OF OTHER DEALINGS IN THE SOFTWARE.
