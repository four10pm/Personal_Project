<h1> Personal Project : Date Night </h1>
<h2> Purpose </h2>
The goal of this project is to create a date night finder. <br/>
There is an APi including date ideas, date examples, cities, and users. <br/> 
There is a view for various date ideas, as well as specific examples of those dates by cities (if they are not at-home dates). <br/>
The user can also see all date examples for a specific city. <br/>
There is a log-in and registration page.<br/>
If the user is logged in, they can add/remove favorite date ideas from their profile and save their city - the user must  be logged in to access this. <br/>
Logged in users can also add or delete date ideas, examples, and cities from the API - the user must be logged in to access this. <br/>
<br/>
<h2> Tech stack </h2>
Database is created using PostGres. <br/>
API is created using Node. <br/>
Front-end is done using react, inclduing UseEffect, UseState, and UseContext. <br/>
Front-end styling is done using CSS. <br/>
<br/>
<h2> Component definitions </h2>
Account - consists of 
<ul> 
  <li> Login, </li>
  <li> Registration </li>
 <li> account information, including the user's favorite date ideas, and examples for those date examples that are specific to their city. </li>
  </ul>
Cities - allows the user to choose a city and see all Date Examples in that city.
Context - set up for using React Context
Contribute - requires the user to be logged in; consists of 
<ul> 
  <li> Buttons to toggle specific forms </li>
  <li> Contribute New forms - for adding new date ideas, date examples, and cities </li>
  <li> Contribute Edit forms - for editing date ideas, date examples, and cities - this is not currently in use </li>
  <li> Contribute Delete forms - for deleting date ideas, date examples, and cities </li>
</ul>
Date List - function for displaying dates in Homepage, Example Page, Cities, and Favorites
Home page - consists of
<ul>
  <li> Date Ideas (general ideas for dates (ex. visiting a musem, at-home board game night, etc.)) </li>
  <li>Date Examples (specific examples of dates (ex. visiting a museum -> Metropolitan Museum of Art in NYC)  </li>
 <li> search bar, allowing user to filter for dates by type/at-home/price. </li>
</ul>
Navigation - navigation bar for getting between components; also displays the user's name if logged in <br/> 
<br/>
<h2> Future iterations </h2>
<ul> 
  <li> Ability for a logged-in user to save the last time they did a specific date idea </li>
  <li> Ability for a logged-in user to save whether or not they have been to a specific date examples </li>
  <li> Random date generator that gives you a date based on provided specifications </li>
  <li> Ability for a user to edit date ideas, date examples, or cities </li>
  <li> Community engagement - ability to share date ideas; ability to upload photos; ability to add comments; etc. </li>
</ul>
