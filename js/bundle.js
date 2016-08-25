/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new Game();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class HanoiView {
	  constructor(game, $el) {
	    this.game = game;
	    this.$el = $el;
	    this.startTowerIdx = null;
	    this.setupTowers();
	    this.render();

	    this.$el.on("click", "ul", this.clickTower.bind(this));
	  }

	  setupTowers() {
	    for(var pileIdx = 0; pileIdx < 3; pileIdx++) {
	      const $pile = $('<ul>').addClass("pile");
	      for(var diskIdx = 0; diskIdx < 3; diskIdx++) {
	        const $disk = $('<li>').addClass("disk");
	        $pile.append($disk);
	      }
	      this.$el.append($pile);
	    }
	  }

	  clickTower(event) {
	    event.preventDefault();
	    const clickIdx = $(event.currentTarget).index();
	    if (this.startTowerIdx === null){
	      this.startTowerIdx = clickIdx;
	    } else {
	      if (!this.game.move(this.startTowerIdx, clickIdx)) {
	        alert("This move is invalid");
	      }
	      this.startTowerIdx = null;
	    }

	    this.render();

	    if (this.game.isWon()) {
	      this.$el.off("click");
	      alert("You Win!");
	    }
	  }

	  render() {
	    const $piles = this.$el.find('ul');
	    $piles.removeClass();

	    if (this.startTowerIdx !== null) {
	      $piles.eq(this.startTowerIdx).addClass("selected");
	    }

	    this.game.towers.forEach((disks, towerIdx) => {
	      const $disks = $piles.eq(towerIdx).children();
	      $disks.removeClass();

	      disks.forEach((diskWidth, diskIdx) => {
	        $disks.eq(-(diskIdx + 1)).addClass('disk' + diskWidth);
	      });
	    });
	  }
	}


	module.exports = HanoiView;


/***/ }
/******/ ]);