# HTML

## Elements

<ol></ol> - Ordered List

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

