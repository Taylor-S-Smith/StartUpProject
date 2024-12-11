# RPG Collaborative Text Application

## Description deliverable

NOTE: This is an extension of my previous 260 project. I only completed about 50% of the course's material. This pitch aims to build on the foundation and add additional features, along with the technologies that were never implemented the first time. For comparison, the previous project page can be found [here]( https://github.com/tss67/StartUpProject).

### Elevator pitch

The RPG Collaborative Text Application is a cooperative writing experience that takes inspiration from the gamebooks of the 80s and 90s (Choose Your Own Adventure, Lone Wolf, Fighting Fantasy, etc.). In such stories, the reader is an active participant who can make decisions that change the outcome of the story. In this application, users will all contribute to the same massive story, adding decisions and endings along the way. Anyone can create an account, add a new choice, and begin writing. Without the limitations of being a physical book, this application is free to grow and develop far beyond the scope of any of the gamebooks of old while encouraging creativity and cooperation. Additionally, I aim to create a few admin tools to monitor and manage the growth and development of the website.

### Design

Login Page
![Login Page](/Page%20Mock-Ups/LoginPage.PNG)

Reading Page
![Reading Page](/Page%20Mock-Ups/ReadingPage.PNG)

Story Addition Page
![Story Page](/Page%20Mock-Ups/StoryAdditionPage.PNG)

Story View Admin Page
![Story View](/Page%20Mock-Ups/StoryView.PNG)

Pending Approval Admin Page
![Pending Approval](/Page%20Mock-Ups/PendingApproval.PNG)

User View Admin Page
![User View](/Page%20Mock-Ups/UserView.PNG)

### Key features

- Ability to securely login
- Ability to read and play through the story so far
- Ablility to add choices, write new sections, and link up to existing portions of the story 
- Current story updated in realtime
- Current story and choice connections persistently stored
- Ability for admins to view pending story additions and approve or deny them
- Ability for admins to manage exising story elements, including a view to see the enture story created thus far
- Ability for admins to see contributions by user

### Technologies

Here are the technologies I will use with an explanation of how I will use them:

- **HTML** - Used in at least three user facing pages, the login page, the story playthrough page, and the writing addition page. Hyperlinks will be used to jump to different sections of the story. Also used in the admin pages, including the approval page, the contribution page, and story view page.
- **CSS** - Used to style the application to give it a modern look that dynamically adapts to different screen sizes.
- **JavaScript** - Used in login page and writing creation page to provide dynamic page elements, including the dynamic story view page.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving story text and choice connections
  - adding new story text and choice connections
  - retrieving user information
- **DB** - Stores users, story text, and choice connections in the database.
- **Login** - Register and login users. Credentials securely stored in database. Can't contribute to the story unless authenticated.
- **WebSocket** - The story, approval page, and story view will update in real time as portions are written and approved. People playing through the story will see it update in real time.

## HTML deliverable

All pages where given their HTML structure.

- [x] **HTML pages** - Six HTML page that represent the user and admin pages to read, create, and manage the evolving story
- [x] **Links** - All pages link to all others. Later we will make sure that only adimns can access the admin pages
- [x] **Text** -Text is used on all pages. One example is on in story.html where the text of the ongoing story is stored.
- [x] **Images** - On index.html I included an AI generated image to help set the tone of the website.
- [x] **DB/Login** - Included placeholders for login and submission. The story.html page will be populated by the database as will the users.html and weave.html admin pages.
- [x] **WebSocket** -  A realtime count of the total page and choice count will be displayed on weave.html.

## CSS deliverable

All pages were given CSS styling

- [x] **Header, footer, and main content body**
- [x] **Navigation elements** - Made the header organized and stand out
- [x] **Responsive to window resizing** - Made sure all elements, including images and navbar resize depending on screen size
- [x] **Application elements** - Used appealing elements
- [x] **Application text content** - Consistent fonts
- [x] **Application images** - Made images properly resize

Note: on the weave.html page (accessed by clicking "View All Story Segments") I still have my placeholder for the dependency graph. This is because I will be using a javascript library to display it, so I will wait until the Javascript section to implement it.

## React deliverable

I used javascript and react to make the backend cleaner, and to improve the user experience. Since my main functionality relies on a database, most of the data displayed on pages are just placeholders.

- [x] **Bundled and transpiled** - Did this
- [x] **Components** - Login, Pending, Story, Users, and Weave are all components. All data is mocked.
  - [x] **login** - Pressing the login button takes you to the story page
  - [x] **database** - My main functionality depends on data from the database. This is most prominant on the Users admin page. Currently data is hardcoded, but will be replaced later
- [x] **Router** - Routing between all components works
- [x] **Hooks** - Login, Edit, Pending, and Users all use the useNavigation hook to go to different URLs from a button press. Edit uses the useState hook to keep track of the Joke that it displays, though it won't properly work until we connect it to a third-party API, but is mocked out to the best of my current knowledge.
