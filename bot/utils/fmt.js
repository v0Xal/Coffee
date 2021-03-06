const illionLabels = [
	null, null, null, null,
	'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion',
	'Septillion', 'Octillion', 'Nonillion', 'Decillion',
	'Undecillion', 'Duodecillion', 'Tredecillion', 'Quattordecillion',
	'Quindecillion', 'Sexdecillion', 'Septendecillion', 'Octodecillion',
	'Novemdecillion', 'Vigintillion', 'Unvigintillion', 'Duovigintillion',
	'Trevigintillion', 'Quattuorvigintillion', 'Quinvigintillion', 'Sexvigintillion',
	'Septenvigintillion', 'Octovigintillion', 'Novemvigintillion', 'Trigintillion',
	'Untrigintillion', 'Duotrigintillion', 'Tretrigintillion', 'Quattuortrigintillion'
];
const illionaireLabels = [
	'New', 'Has Money', 'Millionaire', 'Billionaire',
	'Trillionaire', 'Quadrillionaire', 'Quintillionaire', 'Sextillionaire',
	'Septillionaire', 'Octillionaire', 'Nonillionaire', 'Decillionaire',
	'Undecillionaire', 'Duodecillionaire', 'Tredecillionaire', 'Quattordecillionaire',
	'Quindecillionaire', 'Sexdecillionaire', 'Septendecillionaire', 'Octodecillionaire',
	'Novemdecillionaire', 'Vigintillionaire'
];

let illionPrefixes = [
	'un', 'duo'
]

//`e`
//let a = Object.values(db.global.leaderboards); db.api.wrapper43('users',( collection )=>{db.api.wrapper43('users_backup', (cb)=>{ collection.find({id:{$exists:true}}).toArray((data)=>{function ggg(){if(data.length){ cb.push(data.pop()) }}}) })})
//`e`
//`e`
// db.api.wrapper43('users',( collection )=>{ collection.update({id:{$exists:true}}, {bpbal:"200",bpps:"0",bpitems:{}}); });
// db.api.wrapper43('users',( collection )=>{ collection.find({id:{$exists:true}}).toArray((err,data)=>{collection.update({id:{$exists:true}}, {bpbal:"200",bpps:"0",bpitems:{}}); })});
const radix = 36; // For compressing big integers
const BigInt = require("big-integer");
const BigNum = require('bignumber.js');
const ufmt = module.exports;
const defaultEmoji = "<:__:631412537790824448>";
// Adds commas to numbers

const embedWS = " ";
module.exports.embedWS = "\u200b";

function numPretty(n) { // bintc
	let f = figures(n);
	//if(!Number.isInteger(n)){ return String(n); }
	n = BigInt(n);
	let l = [],
		s = String(n).split('').reverse().join('');
	while (s.length) {
		l.push(s.substr(0, 3));
		s = s.substr(3);
	}
	return (l.join(',')).split('').reverse().join('');
}

/*So i don't have to write it over again, this is for the shop.*/
/*
let dat = require("./shop.json")
function randomValue(exponent){ return `${(Math.random()*4+1).toFixed(2)}` 
n = dat.catalogue.map((e, i)=>{ e.baseCost = randomValue( Math.round(i * i/14) + Math.ceil( (i+1)/8 ) * 2 ); e.baseIncome = randomValue(Math.round(i *i/14) + Math.ceil(i / 10)); return e; })
fs.writeFileSync('a.out',n);
*/

//bintc
function numPrettyIllion(n, t = 20) {
	//if(n>1000 && n <=10e+20){ n = parseInt(n); }
	n = BigInt(n);
	let f = figures(n);
	//if(!Number.isInteger(n)){ return String(n); }
	if (n.gt("10e+" + t)) {
		let l = 2;
		let zed = f + l;
		if (illionLabels[Math.floor(zed / 3)]) {
			let rollOver = zed % 3 + 1;
			let p = String(n).split('.').join('').slice(0, rollOver);
			return `${p} ${illionLabels[Math.floor(zed / 3) - 1]}`;
		}
		let z = String(n);
		let y = z[0];
		let w = z.slice(1,5);
		return `${y}.${w}e+${f}`;
	}

	return numPretty(n);
}

function formatCountable(name, amount, styleString = '') {
	return `"${name}" x${amount}`;
}

const illionThreshold = 36;

function formatBP(amount, styleString = '***', forceFull = false) {
	// if the amount exceeds a constant length
	if (amount.toString().length >= illionThreshold && !forceFull) {
		return formatBPi(amount, styleString);
	}
	let ssEnd = styleString.split('').reverse().join('');
	return `${surround(numPretty(amount), styleString)} BP`;
}

function formatBPs(amount, styleString = '***', forceFull = false) {
	// if the amount exceeds a constant length
	if (amount.toString().length >= illionThreshold && !forceFull) {
		return formatBPsi(amount, styleString);
	}
	let ssEnd = styleString.split('').reverse().join('');
	return `${surround(numPretty(amount), styleString)} BP/s`;
}

function formatBPi(amount, styleString = '***', t = 20) {
	let ssEnd = styleString.split('').reverse().join('');
	return `${surround(numPrettyIllion(amount, t), styleString)} BP`;
}

function formatBPsi(amount, styleString = '***', t = 20) {
	let ssEnd = styleString.split('').reverse().join('');
	return `${surround(numPrettyIllion(amount, t), styleString)} BP/s`;
}


function figures(amount) {
	return String(BigInt(amount)).length;
	return parseInt(parseFloat(amount).toExponential().split('+')[1]);
}

function illionaire(amount) {
	return illionaireLabels[Math.max(0, Math.ceil((figures(amount)) / 3) - 1)] || "Super Freaking Rich";
}

const progressCharacter = "▮";

function progressBar(n, max, label, len = 10, options = { label: 1, styleString: '`', percent: true }) {
	let interval = max / len;
	let bar = new Array(len).fill(`▯`).map((space, i) => {
		if (i * interval <= n) {
			return progressCharacter;
		}
		return space;
	});
	let output = `[${bar.join('')}]`;
	let data = '';
	if (options.percent) {
		data += ` ${parseInt(n / max * 100)}%`
	}
	if (options.label) {
		data += ` < ${label || n} >`;
	}
	let styleString = options.styleString || "`";
	return `${surround(output, styleString)}${data}`;
}

function name(userData, options = { styleString: "**", length: 100 }) {
	if (userData.isChicken) { userData = userData.userData }
	let name = (userData.nickname ? userData.nickname : userData.name || "New User");
	if (name.slice(0, options.length).length != name.length) {
		name = name.slice(0, options.length - 3) + "...";
	}
	return `${surround(name, options.styleString)}`;
}

// This was created because of the need to format a user's name based on a mention
function nameMention(user, options = { styleString: "`" }) {
	let name = user.username;
	return `${surround(name, options.styleString)}`;
}

// Surround text inside a block
function block(text, styleString = "***", autoFormat = true) {
	if (autoFormat && typeof (text) == 'string') {
		text = text.split("_").map(capitalize).join(' ');
	}
	return `[ ${surround(text, styleString)} ]`;
}

function surround(text, styleString) {
	let ssEnd = styleString.split('').reverse().join('');
	return `${styleString}${text}${ssEnd}`;
}

function capitalize(text) {
	return text[0].toUpperCase() + text.slice(1);
}

// 
/**
 * This was initially made for the whole lootbox-reveal thing.
 * @param {*} itemData 
 * @param {*} amount 1
 * @param {*} styleString "***"
 * @param {*} brackets true
 */
function item(itemData, amount, styleString = '***', brackets = true, namePadding = 0, amountPadding = 0, emoji=true) {
	let itemUtils = require("./item.js");
	if (!amount) { amount = itemData.amount; }
	let itemObject = itemUtils.getItemObject(itemData);
	var name;
	if (itemObject) {
		name = itemObject.formatName(itemData);
	}
	name = (name || itemData.name || itemObject.name || `noname#${itemObject.computeMetaHash(itemData)}` || "broken");
	name = name.split("_").map(capitalize).join(" ");
	if (namePadding) {
		name = padCenter(name, namePadding);
	}
	if (amountPadding) {
		amount = String(amount).padEnd(amountPadding, embedWS);
	}
	if(!itemObject){itemObject = {};}
	let skin = {};
	if(itemObject.skin){
		skin = itemObject.skin(itemData);
	}
	if(emoji){
		emoji = skin.emoji?skin.emoji : (itemObject||{emoji:'none'}).emoji;
	}else{
		emoji = "none";
	}
	return itemNameString(name, amount, styleString, brackets,  emoji || defaultEmoji);
}

// No logic, just the itemNameString
function itemNameString(name, amount = 1, styleString = '***', brackets = true, emoji) {
	return `${(emoji&&emoji!='none')?`[ ${emoji} ] `:''} ${brackets ?'[ ' : ''}${surround(name, styleString)}${brackets ? ' ]' : ''} ${amount ? `x${typeof(amount)=="number"?numPretty(amount):amount}` : ''}`;
}

// Creates mimic itemData and formats based on given name
function itemName(itemName, amount = 1, styleString = "", brackets = true) {
	return item({ name: itemName, emoji:'none' }, amount, styleString, brackets, 0, 0, false);
}


// Picks any number of entries out of an array, randomly.
function pick(array, amount) {
	let out = [];
	for (var i = 0; i < amount; i++) {
		out.push(array[Math.floor(array.length * Math.random())]);
	}
	return out;
}

function badge(name, styleString = "***") {
	let ssEnd = styleString.split('').reverse().join('');
	return `[ ${surround(name, styleString)} ]`;
}

function marquee(text, t, length = 60) {
	let content = text.padEnd(length, ' ');
	t = text.length - t * 3;
	let formatted = content.slice(t % content.length) + content.slice(0, t);
	return `\`[${formatted.slice(0, length)}]\``;
}

/**
 * Formats a time difference
 * hours, minutes
 * @param {*} currentDiff 
 * @param {*} goalDiff 
 * @param {*} styleString 
 */
function timeLeft(currentDiff, goalDiff, styleString = "***") {
	let ssEnd = styleString.split('').reverse().join('');
	let time = Math.floor((goalDiff - currentDiff) / 1000);

	// Determine the unit
	let unit = "seconds";
	let fmtTime = time;
	if (fmtTime > 60) { // if the time is more than 60 seconds
		fmtTime = Math.floor(fmtTime / 60);
		unit = "minutes";
	}
	if (fmtTime > 60) { // if time is more than 60 minutes
		fmtTime = Math.floor(fmtTime / 60);
		unit = "hours";
	}
	return `[ ${surround(fmtTime, styleString)} ] ${unit}`;
}

// Format for denoting something
function denote(label, value) {
	return `**${label}**: ${value}`;
}

// Turns a description array into an embed
function itemDesc(descArray) {
	return descArray.join('\n');
}

function padCenter(text, desiredSize) {
	let str = String(text);
	let len = str.length;
	let size = Math.max(len, desiredSize);
	//console.log(Math.floor(size/2)-Math.floor(len/2));
	return str.padStart(Math.floor(size / 2 + Math.ceil(len / 2)), embedWS).padEnd(size, embedWS);
}

// Singular/plural decision helper function
function plural(amount, singular, plural, none = null) {
	none = none || plural || singular;
	if (amount == 1) { return singular; }
	if (amount == 0) { return none; }
	if (amount > 1) { return plural; }
	return plural;
}

function join(array, joinString = "\n") {
	return array.join(joinString);
}

// Basically the opposite of denote, formatted like ~mine
function promote(label, value) {
	return `${label}\n**${value}**`;
}

// This is a helper function to split a string into an array where each
// member is a string with a maximum size of n;
function charLimitSplit(string, maxSize = 1000) {
	let s = string;
	let out = [];
	while (s.length > 0) {
		out.push(s.substr(0, maxSize));
		s = s.substr(maxSize);
	}
	return out;
}

function code(string, lang = "json") {
	return "```" + lang + "\n" + string + "```";
}

function itemNameNoBlock(string, styleString = "**") {
	return string.split("_").map((x) => { return capitalize(x); }).join(" ");
}

function joinGrid(arr, sep = ',', cols) {
	let out = [];
	let input = [...arr]; // Copy the array for safety
	while (input.length > 0) {
		out.push(input.splice(0, cols).join(sep));
	}
	return out.join(sep + '\n');
}

function inventory(inventoryObject, entriesPerPage = 20, page = 0, filter = () => { return true; }) {
	let itemUtils = require("./item.js");
	let out = "";
	let itemAccessors = Object.keys(inventoryObject);
	// Only show items that aren't amount 0
	let listOfTruths = itemAccessors.filter((itemAccessor) => {
		return inventoryObject[itemAccessor].amount > 0;
	}).sort((itemAccessorA, itemAccessorB) => {
		let itemDataA = inventoryObject[itemAccessorA];
		let itemDataB = inventoryObject[itemAccessorB];
		let itemRankA = itemUtils.getItemObject(itemDataA).getUniqueRank(itemDataA);
		let itemRankB = itemUtils.getItemObject(itemDataB).getUniqueRank(itemDataB);
		return itemRankA - itemRankB;
	}).filter((itemAccessor) => {
		let itemData = inventoryObject[itemAccessor];
		return filter(itemData);
	}).slice(page * entriesPerPage, page * entriesPerPage + entriesPerPage);
	if (listOfTruths.length == 0) { return null; }
	let itemNamePaddingLength = listOfTruths.map((accessor) => {
		let itemData = inventoryObject[accessor];
		let itemObject = itemUtils.getItemObject(itemData);
		return itemObject.formatName(itemData).length;
	}).reduce((acc, val) => { return Math.max(acc, val); }) + 2;
	let itemAmountPaddingLength = listOfTruths.map((itemAccessor) => {
		let itemData = inventoryObject[itemAccessor];
		return String(itemData.amount).length;
	}).reduce((acc, val) => { return Math.max(acc, val); }) + 2;

	return ufmt.join(listOfTruths.map((itemAccessor) => {
		let itemData = inventoryObject[itemAccessor];
		let itemObject = itemUtils.getItemObject(itemData);
		// ${ itemObject.consumable? "< usable >" : '' }
		// add back for usable label

		// Add back for rank
		//  (${new Array( itemObject.rank+1 ).fill('⭐').join("")})
		let output = `${ufmt.item(itemData, itemData.amount, '**')} *${(itemUtils.rankNames[itemObject.getUniqueRank(itemData)] || "Unranked").toLowerCase()}*`;
		if (itemData.accessor == "pickaxe") {
			//console.log(itemData);
			if (itemData.meta.perks[0]) {
				output += "\n" + (itemData.meta.perks.map((x) => { return `> *+ ${x}*` }).join("\n"));
			}
		};
		return output;

		// Discord broke my formatting thanks a bunch <3
		// return `\`${ ufmt.item(itemData, itemData.amount, '', true, itemNamePaddingLength, itemAmountPaddingLength) }\` *${(itemUtils.rankNames[ itemObject.getUniqueRank( itemData ) ]||"Unranked").toLowerCase()}*`;
	}));
}

function perkMessage(perkType, perkName, desc) {
	return {
		name: `${ufmt.block(perkType)} ${perkName}`,
		value: desc
	};
}

String.prototype.multiply = function (times) {
	return new Array(times).fill(this).join('');
}

function positiveOrZero(x) {
	return x >= 0 ? x : 0;
}

function elapsedTime(timestamp, styleString = '***') {
	timestamp = Math.floor(timestamp / 1000);
	let seconds = timestamp % 60;
	timestamp = Math.floor(timestamp - seconds) / 60;
	let minutes = timestamp % 60;
	timestamp = Math.floor(timestamp - minutes) / 60;
	let hours = timestamp % 24;
	timestamp = Math.floor(timestamp - minutes) / 24;
	let days = timestamp;
	let format = [hours, minutes, seconds];
	return ufmt.block(format.map(x => `${surround(Math.floor(x).toString().padStart(2, '0'), styleString)}`).join(' : '), '');
}

/**
 * Format the message that appears when an item gets used
 * @param {String} title 
 * @param {String[]} descArray 
 * @param {*} name 
 */
function itemUsedResponse(title, descArray, name) {
	let content = {
		embed: {
			title: title,
			description: descArray.join("\n")/*,
			footer:{
				text:`Tip: Use '~iteminfo ${name||this.accessor}' to see this item's information`
			}*/
		}
	};
	return content;
}

function aoran(str, a = 'a', an = 'an') {
	if (['a', 'e', 'i', 'o', 'u'].indexOf(str[0]) > -1) {
		return an;
	}
	return a;
}

// Change this to coffee emote later
function currency(amount, noEmoji=false){
	return `${noEmoji?'Silver ':`<a:s_:632110433490305046>`}x${ufmt.numPretty(amount)}`;
}

const colors = {
	skin:0xfec31b,
	invalid:0xff6666,
	neutral:0x666666,
	success:0x66ff66
}

// For stuff that is not done
function notDone(){
	return "Coming to a Discord server near you!";
}

module.exports.notDone = notDone;
module.exports.defaultEmoji = defaultEmoji;
module.exports.colors = colors;
module.exports.currency = currency;
module.exports.aoran = aoran;
module.exports.itemUsedResponse = itemUsedResponse;
module.exports.elapsedTime = elapsedTime;
module.exports.perkMessage = perkMessage;
module.exports.joinGrid = joinGrid;
module.exports.itemNameNoBlock = itemNameNoBlock;
module.exports.code = code;
module.exports.charLimitSplit = charLimitSplit;
module.exports.promote = promote;
module.exports.join = join;
module.exports.plural = plural;
module.exports.padCenter = padCenter;
module.exports.itemNameString = itemNameString;
module.exports.capitalize = capitalize;
module.exports.itemDesc = itemDesc;
module.exports.surround = surround;
module.exports.block = block;
module.exports.denote = denote;
module.exports.timeLeft = timeLeft;
module.exports.marquee = marquee;
module.exports.badge = badge;
module.exports.pick = pick;
module.exports.nameMention = nameMention;
module.exports.bp = formatBP;
module.exports.bps = formatBPs;
module.exports.bpi = formatBPi;
module.exports.bpsi = formatBPsi;
module.exports.name = name;
module.exports.progressBar = progressBar;
module.exports.formatCountable = formatCountable;
module.exports.numPretty = numPretty;
module.exports.formatBP = formatBP;
module.exports.formatBPs = formatBPs;
module.exports.formatBPi = formatBPi;
module.exports.formatBPsi = formatBPsi;
module.exports.figures = figures;
module.exports.illionaire = illionaire;
module.exports.numPrettyIllion = numPrettyIllion;
module.exports.inventory = inventory;
module.exports.item = item;
module.exports.itemName = itemName;