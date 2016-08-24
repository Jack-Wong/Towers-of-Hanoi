class HanoiView {
  constructor(HanoiGame, $el) {
    this.HanoiGame = HanoiGame;
    this.$el = $el;
    this.towerIdx = null;
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

  }
}


module.exports = HanoiView;
