# module name: README.me 
# student name: Muhammad Muqarrab Ghori
# student number: 47111496

# COMP2110 Bob's Jobs Frontend

This project implements the front-end code for Bob's Jobs.


I have commented out .env and .tmp files from all .gitingore files so Strapi can work on both laptop and PC

Level 2 spec of cypress will fail unitl the test is ran minimum of 3 times, so when you ran the test the fourth time it will pass

Some level 4 spec cypress test fail on the first two or more initial tries but works fine after. Press the reload button in cypress and let the test run have some multiple runs

# Level 1 
Web application to have a main title of "Bob's Jobs"
index.html page to be linked to CSS stylesheet
home page to have text `About Us` and URL `/#!/about` which when clicked describes website function and to include `"Bob's Jobs is a revolution in career planning brought to you
by Bob Bobalooba himself!"`
Also to have `Applicant Help` page and href link for that page
A navigation menu was implemented that changed class name to "selected" depending on the url

Everything was achieved in this level

# Level 2
This level required the web applicaton to display 10 most recent jobs on the homepage by the order supplied and each job to have title, location and type attributes visible and to be contain inside a div element of class job
It also involved implementation of jobs href link which display a detailed view of the selected job and same implementation for companies too were it displayed companys jobs openings
if the url path was unknown the website to have error view

Everything was achieved in this level
# Level 3
This level includes just setting up strapi backend and connecting to our frontend, essentially pulling data from strapi rather than sampledata.json file.
This allowed us to implement query request from strapi which sorts the jobs in backend and then sends to frontend
Creating a search form and implementing so when submit search term is searched for the website goes to /search url with the search term added to front. Essentially the search function search keywords in jobs description and returned an array of the mathches it to found, which then got displayed on the page.

Everything was achieved in this level
# Level 4
This level involved adding common functionality to the web page such as login forms and user page.

Everything was achieved in this level

