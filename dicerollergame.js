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

    this.name = name
    this.resetTotalScore()
  }
  
  /**
   * Reset all player scores
   */
  resetTotalScore() {
    this.currentScore = 0
    this.totalScore = 0

    this.fire('currentScoreUpdated', this)
    this.fire('totalScoreUpdated', this)
  }
  
  /**
   * Set the current score
   * @param {number} score 
   */
  setCurrentScore(score) {
    this.currentScore = score

    this.fire('currentScoreUpdated', this)
  }
  
  /**
   * Accept the current score.
   * Add to total and reset current score
   */
  acceptCurrentScore() {
    this.totalScore += this.currentScore
    setCurrentScore(0)

    this.fire('totalScoreUpdated', this)
  }
}

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

/**
 * The game.
 * Create and manage a new game.
 */
class DiceRollerGame extends Events {
  
  /**
   * Create a new game
   * @param {number} playerCount Number of wanted player
   */
  constructor(playerCount = 2) {
    super()

    this.players = []
    for (let i = 0; i < playerCount; i++) {
      const player = new Player(`Player ${i+1}`)

      player.register('currentScoreUpdated', this.playerCurrentScoreUpdated)
      player.register('totalScoreUpdated', this.playerTotalScoreUpdated)
      
      this.players.push(player)
    }

    this.dice = new Dice()
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
   * Raise when a player update his total score
   * @param {string} fname Event name
   * @param {Player} player Expected player
   */
  playerTotalScoreUpdated(fname, player) {
    console.log(fname, player.name, player.totalScore)
  }
}

const g = new DiceRollerGame()
