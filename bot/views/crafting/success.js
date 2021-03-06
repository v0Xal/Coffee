/**
 * Invoked when crafting is successful
 */

const itemUtils = require("../../utils/item.js");
const ufmt = require("../../utils/fmt.js");
const recipes = itemUtils.craftingRecipes;

module.exports = function( Chicken, itemData, ingredientsUsedInventory ){
	  let desc = ufmt.join([
			`You successfully craft ${ufmt.item(itemData)}!\n`,
			`Ingredients used:`,
			ufmt.inventory( ingredientsUsedInventory )
	  ])
	  
	  const payload = {
		"embed": {
			"title": "You've done it!",
			"description": desc,
				  "color": 0x66ff66,
				  "author":{
				"name":"Coffee",
				"icon_url": "https://i.imgur.com/Rx4eoje.png"
			}
		}
	  }
	  
	  return payload;
}