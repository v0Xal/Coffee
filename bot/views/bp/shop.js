const ufmt = require("../../utils/fmt.js");
const pN = ufmt.numPretty;
const fBP = ufmt.formatBP;
const fBPs = ufmt.formatBPs;
const { calcCost, calcMax } = require("../../utils/bp");
const bp = require("../../utils/bp");
const  shop = require("../../data/shop.json");
delete require.cache[ require.resolve("../../data/shop.json") ];

const illionThreshold = 38; 
let u = ''; //(cost<=bal) ? '' : "~~";

/**
 * Formatting with no colors, ideal for 
 * mobile users
 * @param {*} entries 
 * @param {*} userData 
 */
function fmtDefault( entries, userData ){
	
	let field = [];
	entries.map( ( {item, userItemAmount, cost, max} )=>{
		// Converting full number into illions
		let production = bp.calcGenProduction_x1( userData, item.alias );
		let figuresCost = cost.toString().length;
		let figuresProduction = production.toString().length;

		let costFormat = fBP( cost, '' )
		let productionFormat = fBPs( production, '' );

		field.push({
			name: `[ **${item.alias}** ] "${item.name}"${u}\n${costFormat}\n +${ productionFormat }`,
			value: `${pN( userItemAmount )} owned, ${ pN( max ) } available`,
		})
	} )
	return field;
}

/**
 * Formatting with colors, ideal
 * for desktop users.
 * @param {*} entries 
 * @param {*} userData 
 */
function fmtColorful( entries, userData ){
	let field = {name:"Shop",value:"```md\n"};
	entries.map( ( {item, userItemAmount, cost, max} )=>{
		// Converting full number into illions
		let production = bp.calcGenProduction_x1( userData, item.alias );
		let figuresCost = cost.toString().length;
		let figuresProduction = production.toString().length;

		let costFormat = fBP( cost, '' )
		let productionFormat = fBPs( production, '' );

		let fmt = [
			`\n[ ${item.alias} ][ "${item.name}" ] <Lvl. ${bp.getGenLevel_UD( userData, item.alias )}>`,
			`<${costFormat}>`,
			`< + ${productionFormat} >`,
			`> "${item.desc}"`,
			`< ${pN( userItemAmount )} > owned, <${pN( max )}> available\n`
		]
		field.value += fmt.join("\n");
	});
	field.value+="\n```";
	return [field];
}

let fmts = [ fmtColorful, fmtDefault, fmtColorful, null ];

const ENTRIES_PER_PAGE = 4;
module.exports = function( Chicken, bal, page = 0 ){
	var fields = [];
	let extra = 1;
	let fieldFmter = fmts[ Chicken.userData.fmt_pref ] || fmts[ 0 ];

	// Mobile
	if( Chicken.mobile ){
		fieldFmter = fmtDefault;
	}

	var embed = {
		"embed": {
			"title": `"${ufmt.name( Chicken )}, Here's what I have to offer."`,
			"description": `${ufmt.name(Chicken)}, You have ${fBP(bal)}!`,
			"color": 0xfec31b,
			"author":{
				"name":"Mr. B.P. Banker",
				"icon_url": "https://i.imgur.com/9AKha1V.png"
			},
			"fields": fields
		}
	}

	/*if(bal<1000){
		embed.embed.footer = {
			"icon_url": "https://i.imgur.com/OyakNYo.png",
			"text": "Tip: \"~buy MSPS\" to buy Myspace Stocks."
		};
	}*/

	if(page){
		page = Math.min( Math.max(1, page), Math.ceil(shop.catalogue.length/ENTRIES_PER_PAGE) );
		Chicken.mArgs.page = page;
		// Regular view
		fields.push({
			"name":"\u200B",
			"value":`Page ${ page }/${Math.ceil(shop.catalogue.length/ENTRIES_PER_PAGE)}\u200B`
		});

		let entries = shop.catalogue.slice( (page-1) * ENTRIES_PER_PAGE, (page-1) * ENTRIES_PER_PAGE + ENTRIES_PER_PAGE ).map( (item, i )=>{
			let userItemAmount = Chicken.userData.bpitems[item.alias] || 0;
			let cost = calcCost( item.alias, 1, userItemAmount );
			let max = calcMax( item.alias, bal, userItemAmount );
			return { item:item, userItemAmount:userItemAmount, cost:cost, max:max };	
		});
		fieldFmter( entries, Chicken.userData ).map( (x)=>{
			fields.push(x);
		});
	}else{
		// Best 4 options
		/*fields.push({
			"name":"Here are the best BP generators available to you.",
			"value":`Sorted By income`
		});*/

		//New: ${ufmt.block( 'Levels' )}\nEvery 80 purchases will increase the generator's level.\nLevels *increase base income*!

		embed.embed.footer = {
			"icon_url": "https://i.imgur.com/OyakNYo.png",
			"text": "Tip: use \"~store < page >\" to view all available purchasing options!"
		};

		let entries = [...shop.catalogue].sort( (a,b)=>{
			// Sort from highest cost to lowest cost
			let userItemAmountA = Chicken.userData.bpitems[a.alias] || 0;
			let userItemAmountB = Chicken.userData.bpitems[b.alias] || 0;
			// Changed to sort by income basec on level
			let costA = bp.calcGenProduction_x1( Chicken.userData, a.alias );
			let costB = bp.calcGenProduction_x1( Chicken.userData, b.alias );
			return costB - costA;  // BINTCONV
		}).filter( ( item )=>{
			// Filter out the ones that can't be bought
			let userItemAmount = Chicken.userData.bpitems[item.alias] || 0;
			let max = calcMax( item.alias, bal, userItemAmount );
			return max > 0;
		}).slice(0, 4).map( (item, i )=>{
			// Append the 4 best choices
			let userItemAmount = Chicken.userData.bpitems[item.alias] || 0;
			let cost = calcCost( item.alias, 1, userItemAmount );
			let max = calcMax( item.alias, bal, userItemAmount );
			return { item:item, userItemAmount:userItemAmount, cost:cost, max:max }
		});
		fieldFmter( entries, Chicken.userData ).map( (x)=>{
			fields.push(x);
		});

		if( bal < 1000000 ){  // BINTCONV
			embed.embed.footer = {
				"icon_url": "https://i.imgur.com/OyakNYo.png",
				"text": "Tip: use \"~buy MSPS\" to buy myspace stocks!"
			};
		}

		if( bal < 1800 ){  // BINTCONV
			embed.embed.footer = {
				"icon_url": "https://i.imgur.com/OyakNYo.png",
				"text": "Tip: use \"~mine\" to get some extra BP!"
			};
		}

		// If there aren't enough entries
		if( fields.length == 0 ){
			embed.embed.footer = {
				"icon_url": "https://i.imgur.com/OyakNYo.png",
				"text": "Tip: use \"~mine\" to get some BP if you need some!"
			};
		}
	}
	
	return embed;
}
