// Dependencies
// =============================================================
const express = require('express')
const path = require('path')

// Sets up the Express App
// =============================================================
const app = express()
const PORT = 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Star Wars Characters (DATA)
// =============================================================
const characters = [
  {
    routeName: 'yoda',
    name: 'Yoda',
    role: 'Jedi Master',
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: 'darth-maul',
    name: 'Darth Maul',
    role: 'Sith Lord',
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: 'obiwan-kenobi',
    name: 'Obi Wan Kenobi',
    role: 'Jedi Master',
    age: 55,
    forcePoints: 1350
  }
]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'view.html'))
})

app.get('/add', function (req, res) {
  res.sendFile(path.join(__dirname, 'add.html'))
})

// Displays all characters
app.get('/api/characters', function (req, res) {
  return res.json(characters)
})

// Displays a single character, or returns false
app.get('/api/characters/:slug', function (req, res) {
  const slug = req.params.slug
  console.log(slug)

  for (const character of characters) {
    if (character.routeName === slug) {
      return res.json(character)
    }
  }

  return res.json(false)
})

// Create New Characters - takes in JSON input
app.post('/api/characters', function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newCharacter = req.body

  // Using a RegEx Pattern to remove spaces from newCharacter.name
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, '-').toLowerCase()

  console.log(newCharacter)

  characters.push(newCharacter)

  res.json(newCharacter)
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`))
