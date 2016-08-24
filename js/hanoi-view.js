class HanoiView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.startTowerIdx = null;
    this.setupTowers();

    this.$el.on("click", this.clickTower)
  }

  setupTowers() {
    for(var pileIdx = 0; pileIdx < 3; pileIdx++) {
      const $pile = $('<ul>').addClass("pile");
      for(var diskIdx = 0; diskIdx < 3; diskIdx++) {
        const $disk = $('<li>').addClass("disk").attr("data-pos", [diskIdx, pileIdx]);
        $pile.append($disk);
      }
      this.$el.append($pile);
    }
  }

  render() {

  }

  clickTower(event) {
    const clickIdx = $(event.currentTarget).index()
    if (this.startTowerIdx === null){
      this.startTowerIdx = clickIdx;
    } else if (!this.game.move(this.startTowerIdx, clickIdx)) {
      alert("This move is invalid");
    }
    this.startTowerIdx = null;
  }
}


module.exports = HanoiView;
