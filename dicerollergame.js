//##################################################################################################
// EVENTS MANAGER
//##################################################################################################

/**
 * Events manager
 */
class Events {
  /**
   * Load the events manager
   */
  constructor() {
    this.callbacks = {}
  }
  
  /**
   * Register an event
   * @param {string} name Event name
   * @param {object} callback Callback called when event fired
   */
  register(name, callback) {
    if (!this.callbacks[name]) {
      this.callbacks[name] = []
    }

    this.callbacks[name].push(callback)
  }
  
  /**
   * Fire events from his name
   * @param {string} name Event name
   */
  fire(name) {
    if (this.callbacks[name]) {
      for(let i = 0; i < this.callbacks[name].length; i++) {
        this.callbacks[name][i](...arguments)
      }
    }
  }
}

//##################################################################################################
// PLAYER
//##################################################################################################

/**
 * A player
 */
class Player extends Events {

  /**
   * Create new player
   * @param {string} name Player name
   */
  constructor(name) {
    super()

    this.htmlDom = null
    this.nameDom = null
    this.totalScoreDom = null
    this.currentScoreBoxDom = null
    this.currentScoreTitleDom = null
    this.currentScoreDom = null

    this.name = name

    this.currentScore = 0
    this.totalScore = 0

    this.register('currentScoreUpdated', this.currentScoreUpdated)
    this.register('totalScoreUpdated', this.totalScoreUpdated)

    this.domConstructor()
  }

  /**
   * Contruct the DOM element
   */
  domConstructor() {
    this.htmlDom = document.createElement('div')
    this.htmlDom.setAttribute('class', 'playerZone')

    this.nameDom = document.createElement('p')
    this.nameDom.setAttribute('class', 'playerName')
    this.nameDom.innerText = this.name
    this.htmlDom.appendChild(this.nameDom)

    this.totalScoreDom = document.createElement('p')
    this.totalScoreDom.setAttribute('class', 'playerTotalScore')
    this.totalScoreDom.innerText = this.totalScore
    this.htmlDom.appendChild(this.totalScoreDom)

    this.currentScoreBoxDom = document.createElement('div')
    this.currentScoreBoxDom.setAttribute('class', 'playerCurrentScoreBox')

    this.currentScoreTitleDom = document.createElement('p')
    this.currentScoreTitleDom.setAttribute('class', 'playerCurrentScoreTitle')
    this.currentScoreTitleDom.innerText = 'current'
    this.currentScoreBoxDom.appendChild(this.currentScoreTitleDom)
    
    this.currentScoreDom = document.createElement('p')
    this.currentScoreDom.setAttribute('class', 'playerCurrentScore')
    this.currentScoreDom.innerText = this.currentScore
    this.currentScoreBoxDom.appendChild(this.currentScoreDom)

    this.htmlDom.appendChild(this.currentScoreBoxDom)
  }
  
  /**
   * Reset all player scores
   */
  resetTotalScore() {
    this.setCurrentScore(0)
    this.setTotalScore(0)

    return this
  }
  
  /**
   * Set the current score
   * @param {number} score 
   */
  setCurrentScore(score) {
    this.currentScore = score

    this.fire('currentScoreUpdated', this)
    return this
  }

  /**
   * Set the total score
   * @param {number} score 
   * @returns 
   */
  setTotalScore(score) {
    this.totalScore = score;

    this.fire('totalScoreUpdated', this)
    return this
  }
  
  /**
   * Accept the current score.
   * Add to total and reset current score
   */
  acceptCurrentScore() {
    this.setTotalScore(this.totalScore + this.currentScore)
    this.setCurrentScore(0)

    return this
  }

  /**
   * Raise when a player update his current score
   * @param {string} fname Event name
   * @param {Player} player Expected player
   */
  currentScoreUpdated(fname, player) {
    player.currentScoreDom.innerText = player.currentScore
  }
  
  /**
   * Raise when a player update his total score
   * @param {string} fname Event name
   * @param {Player} player Expected player
   */
  totalScoreUpdated(fname, player) {
    player.totalScoreDom.innerText = player.totalScore
  }

  
}

//##################################################################################################
// DICE
//##################################################################################################

/**
 * The Dice!
 */
class Dice extends Events {
  
  /**
   * Create a new Dice
   */
  constructor() {
    super()
    
  }
  
  
}

//##################################################################################################
// GAME
//##################################################################################################

/**
 * The game.
 * Create and manage a new game.
 */
class DiceRollerGame extends Events {
  
  /**
   * Create a new game
   * @param {PLAYERnumber} playerCount Number of wanted player (min 2, max 4)
   */
  constructor(containerId, playerCount = 2) {
    super()

    this.container = document.getElementById(containerId)
    if (!this.container) {
      throw new Error('You must specify a valid DOM container.')
    }

    // load expected CSS modules
    this.initializeCss()

    if (playerCount < 2) {
      playerCount = 2
    }
    if (playerCount > 4) {
      playerCount = 4
    }

    // initialize players
    this.activePlayer = 0
    this.players = []
    for (let i = 0; i < playerCount; i++) {
      const player = new Player(`Player ${i+1}`)

      player.register('currentScoreUpdated', this.playerCurrentScoreUpdated)
      player.register('totalScoreUpdated', this.playerTotalScoreUpdated)
      
      this.players.push(player)
    }

    // initialize the dice
    this.dice = new Dice()
  }

  /**
   * Load expected CSS modules
   */
  initializeCss() {
    const heads = document.getElementsByTagName('head')
    if (!heads || heads.length == 0) {
      throw new Error('You must create a game instance in a valid HTML DOM document. No head tag found.')
    }

    const head = heads[0]

    const normalizeLink = document.createElement('link')
    normalizeLink.rel = 'stylesheet'
    normalizeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
    head.appendChild(normalizeLink)

    const drgLink = document.createElement('link')
    drgLink.rel = 'stylesheet'
    drgLink.href = './dicerollergame.css'
    head.appendChild(drgLink)
  }
  
  /**
   * Raise when a player update his current score
   * @param {string} fname Event name
   * @param {Player} player Expected player
   */
  playerCurrentScoreUpdated(fname, player) {
    console.log(fname, player.name, player.totalScore)
  }
  
  /**
   * Raise whPLAYERen a player update his total score
   * @param {string} fname Event name
   * @param {Player} player Expected player
   */
  playerTotalScoreUpdated(fname, player) {
    console.log(fname, player.name, player.totalScore)
  }

  /**
   * Render a new game
   */
  render() {
    this.container.innerHTML = ''
    this.container.setAttribute('class', 'container')

    for (let i = 0; i < this.players.length; i++) {
      this.container.appendChild(this.players[i].htmlDom)
    }

  }

  /**
   * Set the active player
   * @param {*} playerId Id of the player
   */
  setActivePlayer(playerId) {
    for (let i = 0; i < this.players.length; i++) {
      if (i !== playerId) {
        if (this.players[i].htmlDom.classList.contains('active')) {
          this.players[i].htmlDom.classList.remove('active')
        }
      } else {
        if (!this.players[i].htmlDom.classList.contains('active')) {
          this.players[i].htmlDom.classList.add('active')
        }

        this.activePlayer = i
      }
    }
  }

  /**
   * Start a new game
   */
  start() {
    this.render()
    this.setActivePlayer(0)
  }



}


