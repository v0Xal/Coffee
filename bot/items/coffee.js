let Item = require("../class/item");
const ufmt = require("../utils/fmt.js");
const locale = require("../data/EN_US");

class ItemCoffee extends Item {
	constructor() {
		super();
		this.name = "Coffee"; // Required
		this.accessor = "coffee"; // Virtural

		this.consumable = true;
		this.value = 0;
		this.rank = 1;
		this.meta = {};
		this.emoji = "<:coffee:631422259386384414>";
		this.icon = "https://i.imgur.com/PSzoHfE.png";

		this.effect = "Resets your mining cooldown and lets you immediately mine again. Only use this after you've just mined.";
		this.useDialogue = 'You drink some coffee';
		this.isDroppedByLunchbox = true;
		this.isDroppedByLootbox = true;
	}


	use(Chicken, itemData) {
		Chicken.userData.lastmine = 0; // Percent
		Chicken.send(Item.fmtUseMsg(this.useDialogue, [ufmt.denote('Effect', this.effect)]));
	}

	desc(Chicken, itemData) {
		return `*"A good source of energy!"*\nType: ${ufmt.block('Cooldown Reduction')}\nUsage: ${this.effect}`;
	}
}

module.exports = new ItemCoffee();