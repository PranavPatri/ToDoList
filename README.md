# ToDoList App
This is a basic ToDoList Application buit using `Nodejs` and for running server, `Expressjs` framework is used.
## Prerequesites
* A stable version of <a href='https://nodejs.org/en/download'>node</a> should be installed.
* After cloning the repo, install node modules:
  ```js
  npm -i
  ```
  This installs all the node modules mentioned in the `package.json` file.
## About
1. It is a multi-page application (i.e., user is able to add a multiple ToDoLists based on their category) which only has a single dynamic HTML page `.ejs file`
2. It is connected to a NOSQL databasse `MongoDB` from a free remote storage tier from aws using **MongoDB Atlas**.
   This is connected by using <a href='https://www.npmjs.com/package/mongoose'>mongoose</a> library which is simpler in syntax and makes lot easier for all CRUD operations than its <a href='https://www.npmjs.com/package/mongodb'>Native MongoDB Driver</a> which is difficult in syntax and understanding.
3. <a href='https://www.npmjs.com/package/lodash'>lodash</a> library is used to avoid case sensitivity.
4. <a href='https://www.npmjs.com/package/body-parser'>body-parser</a> library is used to extract the data from the user to the server.
