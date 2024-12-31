# HTML

## Elements

<ol></ol> - Ordered List
<a href="https://www.example.com">Example</a>
<img src="example.jpg" alt="Description of Image" width="500" height="600">


### Input

| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |
| Type           | Meaning                           |
| -------------- | --------------------------------- |
| text           | Single line textual value         |
| password       | Obscured password                 |
| email          | Email address                     |
| tel            | Telephone number                  |
| url            | URL address                       |
| number         | Numerical value                   |
| checkbox       | Inclusive selection               |
| radio          | Exclusive selection               |
| range          | Range limited number              |
| date           | Year, month, day                  |
| datetime-local | Date and time                     |
| month          | Year, month                       |
| week           | Week of year                      |
| color          | Color                             |
| file           | Local file                        |
| submit         | button to trigger form submission |


## Videos

Tag - <video></video>

Note that you may need to include the crossorigin="anonymous" attribute if you are requesting files from a different domain than the one serving your content.

## Internal Media

Tag - <canvas></canvas>

Use javascript to draw

# CSS

## Flexbox

Example of flex box columns:

body {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}

Children need to "flex" property specified in the format of {Fractional unit} {height}

## Media Query

Example queries:

```
@media (orientation: portrait) {
  main {
    flex-direction: column;
  }
}

@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
}
```

## Bootstrap

Include it in npm project:

npm install bootstrap@5.2.3


# JavaScript


## General

You can add new properties to a Javascript object dynamically

## Arrays

Array functions:

| Function | Meaning                                                   | Example                       |
| -------- | --------------------------------------------------------- | ----------------------------- |
| push     | Add an item to the end of the array                       | `a.push(4)`                   |
| pop      | Remove an item from the end of the array                  | `x = a.pop()`                 |
| slice    | Return a sub-array                                        | `a.slice(1,-1)`               |
| sort     | Run a function to sort an array in place                  | `a.sort((a,b) => b-a)`        |
| values   | Creates an iterator for use with a `for of` loop          | `for (i of a.values()) {...}` |
| find     | Find the first item satisfied by a test function          | `a.find(i => i < 2)`          |
| forEach  | Run a function on each array item                         | `a.forEach(console.log)`      |
| reduce   | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)`   |
| map      | Run a function to map an array to a new array             | `a.map(i => i+i)`             |
| filter   | Run a function to remove items                            | `a.filter(i => i%2)`          |
| every    | Run a function to test if all items match                 | `a.every(i => i < 3)`         |
| some     | Run a function to test if any items match                 | `a.some(i => i < 1)`          |

## DOM

The browser provides access to the DOM through a global variable name *document*

Select Element Example

```js
const listElements = document.querySelectorAll('p');
for (const el of listElements) {
  console.log(el.textContent);
}
```

Insert Example

```js
function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}

insertChild('#courses', 'new course');
```

Delete Example

```js
function deleteElement(elementSelector) {
  const el = document.querySelector(elementSelector);
  el.parentElement.removeChild(el);
}

deleteElement('#courses div');
```

NOTE: Be careful when using innerHTML, common attack vector

## Event Listener

Example:

```js
const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});
```

## Create a new subdomain

Step 1: Access AWS server with `ssh -i "/c/Users/home/Documents/CS 260/Repos/StoryWeaveProduction.pem" ubuntu@44.219.4.176`

Step 2: Update Caddyfile with your new domain. It should look like this:
```
new-subdomain.storyweave.click {
   reverse_proxy * localhost:5000
   header Cache-Control no-store
   header -etag
   header -server
   header Access-Control-Allow-Origin *
}
```
NOTE: Because each points to a unique service, each will need a unique port number in the Caddyfile. The above port is 5000. Remember your chosen port for future steps.

End with restarting caddy using `sudo service caddy restart`

Step 3: Create a new service. This can be accomplished by:
- Navigating to the /services folder
- Creating a new folder named the same as your subdomain
- Creating a new node server using `npm install express` inside the new folder
- Create an index.js file. Use the following template, but replace the value 5000 with your chosen port number from Step 2 and replace 'subdomain' with the name of your subdomain.

```
const express = require('express');
const app = express();

// The service port defaults to 5001 or is read from the program arguments
const port = process.argv.length > 2 ? process.argv[2] : 5000;

// Text to display for the service name
const serviceName = process.argv.length > 3 ? process.argv[3] : 'subdomain';

// Serve up the static content
app.use(express.static('public'));

// Provide the version of the application
app.get('/config', (_req, res) => {
  res.send({ version: '1.0.0', name: serviceName });
});

// Return the homepage if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

Step 4: Start the node service by using `pm2 start index.js --name new-subdomain -- 5000 new-subdomain` replacing the name 'new-subdomain' and the number '5000' with you r subdomain name and port number.

You can verify that it is running properly by using pm2 status. Remember you can always remove your running services by using `pm2 stop process-name` and optionally `pm2 delete process-name`.

NOTE: Processes you manually start will not service if you restart the aws server. Until you learn more about service management (ChatGPT reccommended Systemd) you will need to manually start up each subdomain that is not simon or startup.

Step 5: Deploy!



# React

## Components

### Function Style

```
<div>Component: <Demo who="Walke" /><div>

function Demo(props) {
  return <b>Hello {props.who}</b>;
}

<div>Component: <b>Hello Walke</b></div>
```

Component with internal state:

```
const Clicker = () => {
  const [clicked, updateClicked] = React.useState(false);

  const onClicked = (e) => {
    updateClicked(!clicked);
  };

  return <p onClick={(e) => onClicked(e)}>clicked: {`${clicked}`}</p>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```


### Literal Style
```
const hello = <div>Hello</div>;

ReactDOM.render(hello, document.getElementById('root'));

```

## Router

```
// Inject the router into the application root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // BrowserRouter component that controls what is rendered
  // NavLink component captures user navigation requests
  // Routes component defines what component is routed to
  <BrowserRouter>
    <div className='app'>
      <nav>
        <NavLink to='/'>Home</Link>
        <NavLink to='/about'>About</Link>
        <NavLink to='/users'>Users</Link>
      </nav>

      <main>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/about' element={<About />} />
          <Route path='/users' element={<Users />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
```
# TODO:
## Account Page
- Exists
- Has your pending submissions w/ a status (submitted, approved, changes requested)
## Story Traversal
- Users should have a back button to freely traverse the story. I may limit this to only admins one day, but for now there are far too many dead ends. Perhaps one day stories will only be allowed to be added in chunks, unless a person opts in to play in an "unstable realm"
## Admin Status
- Only admins should be able to access admin pages
## The Weave
- Connections should display by chapter name, rather than _id.
- Integrate third-party library to display a directed graph, rather than a static table
## Edit
- Users should be able to connect to an already existing chapter, but possibly with different choice text.
- Chapters should not be allowed to have the same name as another chapter.
- Users should have more text editing options, which should be properly displayed on the story page.
## Pending
- Admins should be taken to another window/popup to view the story, instead of it being in the table.
- Admins should be able to suggest changes or comment on a request. This should then be answerable by the user.
## Syle
- Website theme needs a more fanasy feel
- Story page should be exceptionally well styled as it is what we should be spending the most time on. It should be immersive to the fantasy world.
## Database
- Add more code structure. E.g. schemas. See mongoose for an obstraction of what we want, except we don't want to use mongoose. Think about using something like the repo/service structure
## Backend
- Make it more secure. You will need to ask a chatbot, but at least configure CORS to only allow your frontend to ask it. Also look into security headers, session security options, app.disable('x-powered-by');, and rate limiting# HTTP

## Fetch Example

```
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'test title',
    body: 'test body',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```
