/**
 * Get a random number
 * @param {number} max Max of random number
 * @returns A random number
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

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
   * Add to the current score
   * @param {number} score 
   */
  addToCurrentScore(score) {
    this.currentScore += score

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
   * Add to total score
   * @param {number} score 
   * @returns 
   */
  addToTotalScore(score) {
    this.totalScore += score

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
  
  rolling = false

  /**
   * Create a new Dice
   */
  constructor() {
    super()
    
    this.domConstructor()

    this.setFace(getRandomInt(6) + 1)
  }

  /**
   * Contruct the DOM element
   */
  domConstructor() {
    this.htmlDom = document.createElement('div')
    this.htmlDom.setAttribute('class', 'dice')
    this.htmlDom.setAttribute('onClick', 'DiceRollerGame.game().dice.roll()')

    this.cubeDom = document.createElement('div')
    this.cubeDom.setAttribute('class', 'cube')

    this.frontDom = document.createElement('div')
    this.frontDom.setAttribute('class', 'face one')
    this.cubeDom.appendChild(this.frontDom)

    this.backDom = document.createElement('div')
    this.backDom.setAttribute('class', 'face six')
    this.cubeDom.appendChild(this.backDom)

    this.rightDom = document.createElement('div')
    this.rightDom.setAttribute('class', 'face four')
    this.cubeDom.appendChild(this.rightDom)

    this.leftDom = document.createElement('div')
    this.leftDom.setAttribute('class', 'face three')
    this.cubeDom.appendChild(this.leftDom)

    this.topDom = document.createElement('div')
    this.topDom.setAttribute('class', 'face two')
    this.cubeDom.appendChild(this.topDom)

    this.bottomDom = document.createElement('div')
    this.bottomDom.setAttribute('class', 'face five')
    this.cubeDom.appendChild(this.bottomDom)

    this.tooltipDom = document.createElement('span')
    this.tooltipDom.setAttribute('class', 'tooltiptext')
    this.tooltipDom.innerText = 'click to roll me!'
    this.htmlDom.appendChild(this.tooltipDom)

    this.htmlDom.appendChild(this.cubeDom)
  }

  /**
   * Set the dice face from her number
   * @param {number} faceNumber Face number
   */
  setFace(faceNumber) {
    if (faceNumber < 1) {
      faceNumber = 1
    }
    if (faceNumber > 6) {
      faceNumber = 6
    }

    this.cubeDom.setAttribute('class', `cube active${faceNumber}`)
  }

  /**
   * Roll the Dice
   */
  roll() {
    if (this.rolling) {
      return
    }
    this.rolling = true

    this.tooltipDom.innerText = 'rolling...'
    this.htmlDom.style.cursor = 'not-allowed'

    let i = getRandomInt(20)
    this.roller = setInterval(() => {
      const score = getRandomInt(6) + 1;
      this.fire('diceRolling', score)

      this.setFace(score)
      i -= 1
      if (i < 0) {
        this.stop(score)
      }
    }, 250)
  }

  /**
   * Stop the roller
   */
  stop(score = 0) {
    if (this.roller) {
      clearInterval(this.roller)
    }

    this.htmlDom.style.cursor = 'pointer'
    this.tooltipDom.innerText = 'click to roll me!'
    this.fire('diceRolled', score)
    
    this.rolling = false
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
  
  static _instance = null
  static _containerId = ''

  /**
   * Get an instance of a DiceRollerGame
   * @param {string} containerId 
   * @returns The instance
   */
  static game(containerId = '') {
    if (DiceRollerGame._containerId === '' && containerId !== '') {
      DiceRollerGame._containerId = containerId
    }

    if (DiceRollerGame._instance === null) {
      DiceRollerGame._instance = new DiceRollerGame(DiceRollerGame._containerId)
    }

    return DiceRollerGame._instance
  }

  /**
   * Create a new game
   */
  constructor(containerId) {
    super()

    this.container = document.getElementById(containerId)
    if (!this.container) {
      throw new Error('You must specify a valid DOM container.')
    }

    // load expected CSS modules
    this.initializeCss()

    // initialize players
    const playerCount = 2
    this.activePlayer = 0
    this.players = []
    for (let i = 0; i < playerCount; i++) {
      const player = new Player(`Player ${i+1}`)
      this.players.push(player)
    }

    // initialize the dice
    this.dice = new Dice()
    this.dice.register('diceRolling', (fname, score) => {
      this.holdDom.style.display = 'none'
    })
    this.dice.register('diceRolled', (fname, score) => {
      if (score === 1) {
        this.players[this.activePlayer].setCurrentScore(0)
        this.activatedNextPlayer()
      } else {
        this.players[this.activePlayer].addToCurrentScore(score)

        this.holdDom.style.display = 'block'
      }
    })
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
   * Render a new game
   */
  render() {
    this.container.innerHTML = ''
    this.container.setAttribute('class', 'container')

    for (let i = 0; i < this.players.length; i++) {
      this.players[i].setCurrentScore(0)
      this.players[i].setTotalScore(0)
      this.container.appendChild(this.players[i].htmlDom)
    }

    this.startDom = document.createElement('a')
    this.startDom.setAttribute('class', 'startLink')
    this.startDom.innerText = 'new game'
    this.startDom.href = 'javascript: DiceRollerGame.game().start()'
    this.container.appendChild(this.startDom)

    this.holdDom = document.createElement('a')
    this.holdDom.setAttribute('class', 'holdLink')
    this.holdDom.innerText = 'hold'
    this.holdDom.href = 'javascript: DiceRollerGame.game().hold()'
    this.container.appendChild(this.holdDom)

    this.container.appendChild(this.dice.htmlDom)
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

      this.players[i].setCurrentScore(0)
    }
    if (this.activePlayer < 0) {
      this.activePlayer = 0
    }
    if (this.activePlayer > 1) {
      this.activePlayer = 1
    }
  }

  /**
   * Activate next player
   */
  activatedNextPlayer() {
    let currentPlayer = this.activePlayer

    currentPlayer += 1
    if (currentPlayer > (this.players.length - 1)) {
      currentPlayer = 0
    }

    this.setActivePlayer(currentPlayer)
  }

  /**
   * Start a new game
   */
  start() {
    this.render()
    this.setActivePlayer(getRandomInt(2))
  }

  /**
   * Hold the current score. Add the current score to the total score.
   */
  hold() {
    this.holdDom.style.display = 'none'

    this.players[this.activePlayer].addToTotalScore(this.players[this.activePlayer].currentScore)
    this.players[this.activePlayer].setCurrentScore(0)

    if (this.players[this.activePlayer].totalScore >= 100) {
      alert(`${this.players[this.activePlayer].name} win the game!`)
      this.start()
      return
    }

    this.activatedNextPlayer()
  }




}

