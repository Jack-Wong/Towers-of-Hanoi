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
