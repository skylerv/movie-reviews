# Movie Review Application

This Movie Review application is my first project using the MERN stack! I have yet to take on a tech stack and decided to learn with a step-by-step tutorial from "Beginning MERN Stack" written by Greg Lim. A link to the book will be provided below. Updates on my progress, accomplishments, and challenges during this little side project will be provided here in this readme, so be sure to check in once in a while (or read the full blog when it is done!). My plan after completing the tutorial is turning this into an Anime Log/Watchlist. One of my interests is watching anime and I actively use a different website to track all the anime I have watched. Since this movie review application works somewhat similarly to that website, I feel that would be a great segway into diving deeper into the MERN stack! Hopefully in the end, I will publish this for public use! Enjoy the updates until then!

## *Links!*
[LinkedIn](https://www.linkedin.com/in/skylervez/)\
[Website](https://skylervez.com/)\

[Beginning MERN Stack: Build and Deploy a Full Stack MongoDB, Express, React, Node.js App](https://www.amazon.com/Beginning-MERN-Stack-MongoDB-Express/dp/B0979MGJ5J/ref=asc_df_B0979MGJ5J/?tag=hyprod-20&linkCode=df0&hvadid=533317510260&hvpos=&hvnetw=g&hvrand=9364796927991666569&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9033471&hvtargid=pla-1366262022869&psc=1)


## *11/7/2021 - Building the Backend*
Today, I began building the backend for the movie review application. Prior to this, I had little to no experience building backends, so starting this was very exciting. The book is very straightforward, download this, download that, copy the code. However, the author gives a good enough explanation for me to follow along. I wanted to understand the code I was writing as much as possible, so I did take some time to research more on Node.js and Express as I proceeded through these chapters. 

I started off with the database, MongoDB Atlas, which leverages the cloud. After filling the database in with sample data, I created my project in VS Code and began writing the server. The server was to use CORS and Express as the middleware. After the server was finished, I proceeded with the index.js file, which was to act as the driver code for the application. In here, the application builds a connection with the database, gets a reference to the "movies" collection, and begins listening on the specified port. Afterwards, I built some of the API and DAO that the application will leverage in fetching the data from the database.

At this point, I tried running my application through the terminal. The terminal was supposed to output a message to the console stating what port the server was running on after establishing a connection, however, the message never outputted. I knew something was wrong, as the try block was to indicate that the server was either sucessfully and currently running or an error was thrown. I backtracked to the previous pages, ensuring that the code I wrote down was correct, word for word. After what seemed like hours of debugging (and frustration)...it turns out...it was merely a misplaced end bracket (isn't that great?) :). Of course, due to that minor issue, my application worked seamlessly. 

As of now, the application successfully fetches the data from the "movies" collection within my database and outputs it to the browser. I felt that this was a good stopping point and next, I will proceed with completing the backend and hopefully moving on the frontend soon!

