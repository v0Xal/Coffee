const Command = require("../class/command");
const env = require("../env");
const loader = require("../loader");
const views = loader("./bot/views/botinfo", "./views/botinfo");
//const localeReload = loader("./bot/data", "./data");
const locale = require("../data/EN_US");
const itemUtils = require("../utils/item.js");
const ufmt = require("../utils/formatting.js");
const recipies = itemUtils.craftingRecipies;
class CommandCraft extends Command {
	constructor() {
		super();
		this.wip = true;
	}
	get botAdminOnly() {
		return false;
	}
	get usesDatabase() {
		return true;
	}
	get accessors() {
		return ['craft'];
	}
	get mimics() {
		return [];
	}
	get help() {
		return null;
	}
	get helpExamples() {
		return [
			['craft', '', 'View a list of available crafting options!'],
			['craft', '< item name >', 'craft an item!']
		];
	}
	get helpGroup() {
		return "Crafting";
	}
	get helpName() {
		return "Crafting";
	}
	get helpPage() {
		return 2;
	}
	modifyArgs(args) {
		return args;
	}
	async execute(lToken) {
		function searchForAvailableCraftingOptions( userData ){
			let availableOptions = Object.keys( recipies ).filter(( product )=>{
				let ingredients = recipies[product].ingredients;
				let available = ingredients.map( ( ingredientData )=>{
					return itemUtils.userHasItem( userData, ingredientData.key, ingredientData.amount ) | 0;
				}).reduce((p, t)=>{return p+t;}) == ingredients.length;

				return available;
			});
			return availableOptions;
		}

		let availableCraftingOptions = searchForAvailableCraftingOptions( lToken.userData );
		lToken.send( availableCraftingOptions.map(x=>ufmt.itemName(x, 1)).join("\n") );
	}
}

module.exports = new CommandCraft();