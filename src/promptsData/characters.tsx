import { Character, CharacterBase, CoreIdea, TypedObject } from "./Ideas";

const base: (CharacterBase & TypedObject) = {
	type: "character",
	min: 1,
	max: 5,
	rateBy: 2,
	rateFavorsLower: true,
	plural: "s",
	article: "a",
	numerals: false,
	realPerson: false,
	genderPossessive: false,
	fictionalCharacter: false,
	monster: false,
	linkToAnAction: " "
};
const info: (Partial<Character> & CoreIdea)[] = [
	{
		id: "1a6a5235-4ef2-470e-92b1-df081b3961f9",
		idea: "dragon",
		fantasy: true,
		medievalFantasy: true,
		monster: true
	},
	{
		id: "d0dccb05-c5a3-4a58-b970-94ef5e8d57ec",
		idea: "tortoise"
	},
	{
		id: "d6eaf0cc-77f2-40e5-9805-aa7fe9672240",
		idea: "chinchilla"
	},
	{
		id: "6bd27f3a-4718-4d40-a7d1-5c5b9d807183",
		idea: "ostrich",
		plural: "es",
		article: "an"
	},
	{
		id: "ccddf829-8cae-4130-9a28-a6732063349f",
		idea: "whale"
	},
	{
		id: "579eb878-ae1b-4dc3-a00a-7afe9cc0c76c",
		idea: "dentist",
		max: 2,
		rateBy: 20,
		article: "the"
	},
	{
		id: "0325677f-33b2-491b-9013-847a39f493d9",
		idea: "Garfield",
		properName: true,
		modern: true,
		plural: false,
		genderPossessive: "his",
		fictionalCharacter: true
	},
	{
		id: "1f509d4b-f554-4a90-83f7-c1f1452cc553",
		idea: "long-haired cat",
		max: 10,
		rateBy: 1
	},
	{
		id: "f90c6d80-0719-456f-9112-06c42968dd74",
		idea: "a same-sex couple",
		plural: true
	},
	{
		id: "4ff0c8d4-ecad-4d0e-9f66-fccc5720e416",
		idea: "librarian"
	},
	{
		id: "246ed9d9-adf6-4863-8534-d8f5de9eec87",
		idea: "dance partners",
		plural: true
	},
	{
		id: "39e56645-4433-46f5-a441-25cbf36d7b58",
		idea: "elephant",
		article: "an"
	},
	{
		id: "9fb60713-4f08-411c-8251-584ecaa71d2e",
		idea: "fish in a bucket",
		linkToAnAction: " that is ",
		plural: false
	},
	{
		id: "2c355f68-4aee-4b92-a9e2-9b122a70c55f",
		idea: "koala"
	},
	{
		id: "0c48c8d2-681d-4ba9-b3b6-ffd3b9d69d4a",
		idea: "octopus",
		plural: "es",
		article: "an"
	},
	{
		id: "79dd6e00-257d-414d-a095-ed2cd5a3c5b4",
		idea: "dinosaur",
		monster: true
	},
	{
		id: "7e2df445-bae0-4ef6-92b3-02b0c474df4a",
		idea: "a leprechaun",
		fantasy: true,
		plural: false,
		mythsReligionsAndMetaphysics: true,
		fairyTalesAndUrbanLegends: true,
		genderPossessive: "his"
	},
	{
		id: "627b71a7-0265-442d-9ccf-9e099b793138",
		idea: "dead ruler",
		humanDistress: true,
		humanDeath: true
	},
	{
		id: "9cc64f64-73a3-4b52-8956-6bdcb189dd66",
		idea: "unicorn",
		fantasy: true,
		medievalFantasy: true
	},
	{
		id: "8dd777c4-2452-4ebb-8cdd-4a9d18271ce6",
		idea: "normal people",
		plural: true
	},
	{
		id: "b1aa802a-d90e-4c66-b90f-26aa89ab9a99",
		idea: "vampire",
		fantasy: true,
		medievalFantasy: true,
		horror: true,
		monster: true
	},
	{
		id: "1e8cda12-2025-4659-8309-29f0bcfcb442",
		idea: "monsters under the bed",
		plural: true,
		fairyTalesAndUrbanLegends: true,
		linkToAnAction: " that are ",
		monster: true
	},
	{
		id: "f52fa91b-b004-4deb-acbe-2da5d8398ed4",
		idea: "Leonardo da Vinci",
		properName: true,
		plural: false,
		historical: true,
		genderPossessive: "his",
		realPerson: true
	},
	{
		id: "d950bd09-1422-4a4c-9c1e-d7a7bd46fe1a",
		idea: "crow"
	},
	{
		id: "46f51a98-99d6-4b1d-a0ef-4464da30e996",
		idea: "wicked witch",
		fantasy: true,
		plural: "es",
		genderPossessive: "her"
	},
	{
		id: "2a8ea2b0-4b06-47b9-a83e-21275401f88f",
		idea: "geese",
		plural: "",
		min: 2,
		max: 10,
		rateBy: "incremental"
	},
	{
		id: "95042791-2b8c-42a9-b62f-aa4dc1f1059d",
		idea: "private investigator"
	},
	{
		id: "5717d1a3-ea7c-48ee-9b3a-d1d76920150e",
		idea: "scientist"
	},
	{
		id: "b8f3edd1-691b-4d55-91c6-a8fab80ddc72",
		idea: "seeing-eye dog",
		modern: true,
		rateBy: 100,
		max: 3
	},
	{
		id: "de18788c-545e-43a7-bfae-b1588dde265b",
		idea: "the undead",
		fantasy: true,
		horror: true,
		plural: true,
		monster: true
	},
	{
		id: "736c3ef1-56fe-4da5-9b21-214fd79e1863",
		idea: "Superman",
		properName: true,
		fantasy: true,
		superhero: true,
		plural: false,
		genderPossessive: "his",
		fictionalCharacter: true
	},
	{
		id: "12e32c9a-5fec-4d8c-9298-3d98444ffd1f",
		idea: "camel"
	},
	{
		id: "2fc508b9-58c0-41de-9022-420a92c1df3e",
		idea: "vulture"
	},
	{
		id: "b8d0c244-0267-4348-b6a7-fa46ece315bd",
		idea: "drugged animals",
		animalDistress: true,
		modern: true,
		plural: true
	},
	{
		id: "9842241a-66bd-482c-a291-8e4294c0894b",
		idea: "a supermodel",
		modern: true,
		plural: false,
		genderPossessive: "her"
	},
	{
		id: "1672932a-0efe-4375-bde4-e76b6e0a0212",
		idea: "owl",
		article: "an"
	},
	{
		id: "7a0aa503-a909-4aec-80d6-fb8439dc472d",
		idea: "electrician",
		modern: true,
		article: "an"
	},
	{
		id: "c56b8ad5-1ab7-422e-a566-25e72d3d7c6e",
		idea: "ferret"
	},
	{
		id: "d3042bb5-dfaa-442d-aadf-68fadf8a0a78",
		idea: "porcupine"
	},
	{
		id: "a30600ee-ee93-45ea-9c37-807cfaea75fe",
		idea: "Harry Potter",
		properName: true,
		modern: true,
		plural: false,
		genderPossessive: "his",
		fictionalCharacter: true
	},
	{
		id: "d635c559-5eda-4a64-bdc6-76254b957f4b",
		idea: "the Pope",
		properName: true,
		realPerson: true,
		plural: false,
		genderPossessive: "his"
	},
	{
		id: "583f5f76-a1f7-4c9d-8017-9bb1c505a125",
		idea: "Napoleon",
		properName: true,
		realPerson: true,
		historical: true,
		plural: false,
		genderPossessive: "his"
	},
	{
		id: "d707aa11-a4c9-40aa-9338-a7179a73b73c",
		idea: "George Washington",
		properName: true,
		realPerson: true,
		historical: true,
		plural: false,
		genderPossessive: "his"
	},
	{
		id: "adaabaee-d2a9-41e8-8845-a2d1cb553ab0",
		idea: "Dr. Seuss",
		properName: true,
		realPerson: true,
		historical: true,
		plural: false,
		genderPossessive: "his"
	},
	{
		id: "a6b313bf-b380-4667-91e7-cdfe6174a5f2",
		idea: "albatross",
		plural: "es",
		article: "an"
	},
	{
		id: "b4c4fde8-3dfa-494f-87a6-5e75bdab028c",
		idea: "gangster",
		modern: true
	},
	{
		id: "5378e966-04ae-4881-9be4-759a4987ccb4",
		idea: "leopards that change their spots",
		linkToAnAction: " that are ",
		plural: true
	},
	{
		id: "c427dc5d-4a1a-4b54-9adc-6c199974d5e2",
		idea: "a turtle laying on its back",
		animalDistress: true,
		linkToAnAction: " that is also ",
		plural: false
	},
	{
		id: "14d0bd11-af46-492a-9965-296575b12ecc",
		idea: "a captured royal",
		humanDistress: true,
		linkToAnAction: " that is ",
		plural: false
	},
	{
		id: "da74c004-9cd5-41a7-8b36-a2c2db5fe906",
		idea: "lifeguard"
	},
	{
		id: "ad156cb4-b050-43c2-8d8a-5b768bf24169",
		idea: "the last of its species",
		linkToAnAction: " that is ",
		plural: false
	},
	{
		id: "16b73888-fb23-48b9-8857-de682cdd85bd",
		idea: "foreign investor",
		modern: true
	},
	{
		id: "7064dbfa-a895-4956-8865-11a655ced245",
		idea: "wrestler"
	},
	{
		id: "77624a0d-d325-4064-9f97-207dd0d7187b",
		idea: "identical twins",
		plural: true
	},
	{
		id: "da8d64f4-8f88-4198-b0cf-de1bb2dc71ba",
		idea: "penguin"
	},
	{
		id: "2037bcd8-fcb0-49a0-b3be-3e9308fa6296",
		idea: "Cthulhu",
		fantasy: true,
		horror: true,
		plural: false,
		genderPossessive: "its",
		monster: true,
		fictionalCharacter: true
	},
	{
		id: "1ae5394c-c28b-4b54-9a4a-90ce4b254425",
		idea: "bumbling robber",
		humanDistress: true
	},
	{
		id: "bbd51888-e869-4bfc-9d24-6a5cee1d986c",
		idea: "cheerleader",
		max: 12,
		rateBy: "incremental",
		rateFavorsLower: false
	},
	{
		id: "bd4fd053-7f42-41ff-85fe-7da62e565140",
		idea: "an old wizard",
		fantasy: true,
		medievalFantasy: true,
		linkToAnAction: " who is ",
		plural: false
	},
	{
		id: "b79a8019-1de7-4f8e-8ecd-4c1ed5e81588",
		idea: "a werewolf",
		fantasy: true,
		medievalFantasy: true,
		plural: false
	},
	{
		id: "2ac60f1e-83db-4b1d-b583-0edb703ea27d",
		idea: "a fortune teller",
		plural: false,
		linkToAnAction: " who is ",
		mythsReligionsAndMetaphysics: true,
		metaphysics: false
	},
	{
		id: "2b7267fd-5120-46c8-a421-42dbb09d91eb",
		idea: "a lost child",
		humanDistress: true,
		linkToAnAction: " who is ",
		plural: false
	},
	{
		id: "427bfc71-2a2b-4daa-a252-19557ed61e7b",
		idea: "caribou",
		plural: ""
	},
	{
		id: "8dc21817-ea0f-4485-8161-3c4e21334cb5",
		idea: "a babysitter",
		plural: false
	},
	{
		id: "88767676-caae-4e62-9ca5-9179d8f82b26",
		idea: "a talking fish",
		fantasy: true,
		linkToAnAction: " that is ",
		plural: false
	},
	{
		id: "29c3908b-8666-4b6d-b345-f8f385517a76",
		idea: "the Tooth Fairy",
		mythsReligionsAndMetaphysics: true,
		fairyTalesAndUrbanLegends: true,
		plural: false,
		fictionalCharacter: true,
		genderPossessive: "her"
	},
	{
		id: "a5a1c3cd-e490-49e5-aaa9-feb6ec9e3ad9",
		idea: "a basket case",
		humanDistress: true,
		linkToAnAction: " that is ",
		plural: false
	},
	{
		id: "1196c375-f1af-4643-aaf2-35d273f639bf",
		idea: "triplets",
		plural: true
	},
	{
		id: "5f279f33-59fb-4fbe-8653-10186e825fd0",
		idea: "a mother-in-law",
		plural: true,
		genderPossessive: "her"
	},
	{
		id: "c95458fc-06dd-4325-be6b-68a9b864e188",
		idea: "Godzilla",
		fantasy: true,
		properName: true,
		plural: false,
		genderPossessive: "his",
		monster: true,
		fictionalCharacter: true
	},
	{
		id: "7f6808ed-dde7-4ac9-9393-e069a58f2c57",
		idea: "turkey"
	},
	{
		id: "317e9e6f-be66-40bb-a894-537cb5acd1e9",
		idea: "a flock of seagulls",
		linkToAnAction: " that is ",
		plural: false
	},
	{
		id: "a26b4ab0-2523-4eec-8ed3-917b3840b2a6",
		idea: "a hissing snake",
		plural: false
	},
	{
		id: "bdc4a113-805e-40d0-9271-9c7e1c9a8ecb",
		idea: "the quiet man next door",
		linkToAnAction: " who is ",
		plural: false,
		genderPossessive: "his"
	},
	{
		id: "0a43f4f2-87ef-40fd-b077-e53db452c853",
		idea: "zombie",
		fantasy: true,
		horror: true
	},
	{
		id: "f2d10ad3-3e38-401b-97d4-b266ae8dad1b",
		idea: "a man holding a brain",
		humanDistress: true,
		plural: false,
		genderPossessive: "his",
		linkToAnAction: " who is also ",
		scifi: true
	},
	{
		id: "7e434b3b-e41b-417f-81a9-945aafc74f38",
		idea: "a monkey with a banana",
		plural: false
	},
	{
		id: "ec978091-6d4c-424c-a8cf-faccc1ff53b2",
		idea: "carnies",
		plural: true
	},
	{
		id: "d37946b0-7e2d-45a3-a2a6-2c282e0845b4",
		idea: "the President of the United States",
		properName: true,
		realPerson: true,
		plural: false
	},
	{
		id: "c553fbed-f3dc-494a-82da-bb3e990eb93d",
		idea: "the Prime Minister of Canada",
		properName: true,
		realPerson: true,
		plural: false
	},
	{
		id: "81c80b95-a2a6-4f31-a8c6-098e27310a97",
		idea: "a nun",
		mythsReligionsAndMetaphysics: true,
		christianity: true,
		plural: false,
		genderPossessive: "her"
	},
	{
		id: "0f67fee6-049a-4709-9352-c3f1d9a4c40d",
		idea: "weasel"
	},
	{
		id: "53027be4-5db0-4608-9833-192e28f3af9a",
		idea: "Shakespeare",
		properName: true,
		realPerson: true,
		plural: false,
		historical: true,
		genderPossessive: "his"
	},
	{
		id: "7155b78b-a28e-46b0-a469-28ace3a84d36",
		idea: "a bald man",
		plural: false,
		genderPossessive: "his"
	},
	{
		id: "ce6c5acc-d522-40c5-9174-d5182e8b9ffc",
		idea: "Chuck Norris",
		properName: true,
		realPerson: true,
		modern: true,
		plural: false,
		genderPossessive: "his"
	},
	{
		id: "aa72d1b3-af05-481a-8cd1-61b00efdfb8a",
		idea: "a John or Jane Doe",
		humanDistress: true,
		plural: false
	},
	{
		id: "34921991-e475-4d00-be11-a3d9b920e412",
		idea: "shark",
		rateBy: 20
	},
	{
		id: "ac50b421-d5df-44f6-92ab-a9d036cc5c50",
		idea: "a babydaddy",
		sexual: true,
		modern: true,
		plural: false,
		genderPossessive: "his"
	},
	{
		id: "30ee011e-ded6-4b29-814d-d386fb0521b5",
		idea: "a babymomma",
		sexual: true,
		modern: true,
		plural: false,
		genderPossessive: "her"
	},
	{
		id: "0ebb6b41-a887-44ff-8e7d-571b64e5a176",
		idea: "missing child",
		humanDistress: true,
		plural: "ren"
	},
	{
		id: "306d447d-d84f-4355-a67f-11ee842c94ce",
		idea: "rabbit",
		min: 2,
		max: 10
	},
	{
		id: "02b19cf5-0b52-45ec-8a6b-d90d8d670bea",
		idea: "ogre",
		fantasy: true,
		medievalFantasy: true,
		monster: true
	},
	{
		id: "8177b7fd-e872-4565-a49c-514d737e75fa",
		idea: "oxen",
		plural: true
	},
	{
		id: "7a31f483-d4f0-478a-aedb-315de910b27c",
		idea: "a dalmatian",
		plural: false
	},
	{
		id: "f3134aee-12d9-4d73-9b75-850f1bc56952",
		idea: "umpire",
		article: "an"
	},
	{
		id: "58657f2f-be59-4c56-91c5-7f5682d1a0ac",
		idea: "the devil",
		fantasy: true,
		horror: true,
		mythsReligionsAndMetaphysics: true,
		judaism: true,
		christianity: true,
		islam: true,
		plural: false,
		genderPossessive: "his",
		monster: true
	},
	{
		id: "18875500-21d3-41c0-a001-2efbd0fa1eee",
		idea: "a monster",
		fantasy: true,
		horror: true,
		plural: false,
		monster: true
	},
	{
		id: "0c8f8991-b0de-41f3-82c8-a2cc3c0648bb",
		idea: "a new priest",
		mythsReligionsAndMetaphysics: true,
		christianity: true,
		plural: false
	},
	{
		id: "cd5b1699-6778-41e1-81a3-871264eeea09",
		idea: "the leader of the tribe",
		linkToAnAction: ", who is ",
		plural: false
	},
	{
		id: "da863685-2050-4ca6-ae50-09411d0f1628",
		idea: "pheasant"
	},
	{
		id: "6290ea63-d9e7-4a4c-9037-e156b4c02590",
		idea: "peasant"
	},
	{
		id: "e5e52c0b-808c-4e38-b960-c1d70890dd2a",
		idea: "tramp"
	},
	{
		id: "b89e87e2-5413-43cc-9309-43e80510b983",
		idea: "pig"
	},
	{
		id: "3d0af532-9ec2-4bbd-80f1-6217a7d0a552",
		idea: "rodeo clown"
	},
	{
		id: "ea0aa16f-04db-4cf1-b1d9-cb62991da63d",
		idea: "average, silly, unremarkable, yet utterly terrifying clown",
		max: 3,
		article: "an",
		humanDistress: true,
		horror: true
	},
	{
		id: "d0922a00-92f4-4330-bbe6-545c53b7bd59",
		idea: "your first pet",
		plural: false
	},
	{
		id: "0011dc68-6b53-4123-bfea-b67e85f85f67",
		idea: "Nazis",
		properName: true,
		realPerson: true,
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		plural: true
	},
	{
		id: "2dad3d0b-3dbe-4594-95cc-beae1bd2cd3d",
		idea: "a deer in the headlights",
		linkToAnAction: " that is ",
		plural: false
	},
	{
		id: "0f7e2de3-663a-4788-927a-77c9119d15c3",
		idea: "rich parents",
		plural: true
	},
	{
		id: "d4348360-bfec-4168-8b25-dd97c32dff36",
		idea: "a treehugger in a tree",
		linkToAnAction: " who is ",
		plural: false
	},
	{
		id: "309c0216-59ec-4047-80a2-74b1d23579f7",
		idea: "a flying horse",
		fantasy: true,
		medievalFantasy: true,
		mythsReligionsAndMetaphysics: true,
		greekRomanMyth: true,
		linkToAnAction: " that is ",
		plural: false
	},
	{
		id: "d2acc2d6-7fd2-407c-874c-af234d399324",
		idea: "too many people crammed into a van",
		linkToAnAction: ", and they are ",
		plural: true
	},
	{
		id: "cb249295-51cf-4811-a5f6-ba58062725fe",
		idea: "a samurai",
		historical: true,
		samurai: true,
		plural: false,
		genderPossessive: "his"
	},
	{
		id: "15a8307d-1c19-4436-b347-68d5e16b725d",
		idea: "a gunslinger",
		historical: true,
		western: true,
		plural: false
	},
	{
		id: "ed9aab48-e9cf-42a9-a68d-7094e85e1cc7",
		idea: "chipmunk"
	},
	{
		id: "f6347c8c-d606-448d-b66d-f3188ae4dc33",
		idea: "goblin",
		fantasy: true,
		medievalFantasy: true
	},
	{
		id: "82db9ffc-733c-4740-846b-d18cfacb83f0",
		idea: "frog"
	},
	{
		id: "57ffa61b-7504-4741-9ae0-ccdfd5bbe8a8",
		idea: "hummingbird"
	},
	{
		id: "305b03d5-9b3e-4ca1-80ec-167197b88030",
		idea: "a pregnant teenager",
		sexual: true,
		plural: false,
		genderPossessive: "her"
	},
	{
		id: "864ce45e-19b5-4f55-90c3-717d6162c253",
		idea: "a foreign prince",
		plural: false,
		genderPossessive: "her"
	},
	{
		id: "25b29691-0668-4fb4-b325-4b9eb20805a7",
		idea: "an outlaw",
		historical: true,
		western: true,
		plural: false
	},
	{
		id: "d41a381a-4d31-4a8a-9e36-e30b7804ca9c",
		idea: "a swashbuckler",
		historical: true,
		plural: false
	},
	{
		id: "74360c9a-1d88-411c-a02b-3b02698b0d9b",
		idea: "robots",
		modern: true,
		plural: true
	},
	{
		id: "e499eeeb-6796-49e9-8676-7712462fc2d1",
		idea: "a lapdog",
		plural: false
	},
	{
		id: "5b4fb5d4-cfe4-40c0-956b-a399bf8413fd",
		idea: "a swarm of bees",
		linkToAnAction: " that is ",
		plural: false
	},
	{
		id: "603ebd91-f0a7-41ff-8f2c-582f4b299456",
		idea: "the UN Security Council",
		properName: true,
		realPerson: true,
		plural: false
	},
	{
		id: "5354b4d6-715d-48af-8350-9aa125287e23",
		idea: "a crowing rooster",
		plural: false,
		linkToAnAction: " that is also ",
		genderPossessive: "his"
	},
	{
		id: "199ac560-6800-4af3-9283-75b23461156d",
		idea: "Parliament",
		properName: true,
		realPerson: true,
		plural: false
	},
	{
		id: "9103a7fb-2c02-4bc7-b3f2-39dff534e943",
		idea: "Congress",
		properName: true,
		realPerson: true,
		plural: false
	},
	{
		id: "654eff58-fc87-4cbe-afcc-22e11f472bb4",
		idea: "dead parents",
		humanDeath: true,
		humanDistress: true,
		plural: true
	},
	{
		id: "6f9cfc3e-3004-4acb-879e-19c5e52ddd6c",
		idea: "kittens",
		plural: true
	},
	{
		id: "543ed252-c1ae-45df-98be-b16e92acc351",
		idea: "an owlbear",
		fantasy: true,
		medievalFantasy: true,
		plural: false,
		monster: true
	},
	{
		id: "8468e93b-d96c-4002-8aab-93488e96d34f",
		idea: "scarab beetles",
		historical: true,
		horror: true,
		plural: true
	},
	{
		id: "0dd6f58a-00ab-43d3-8d12-190ea9c437ab",
		idea: "giant bug",
		monster: true
	},
	{
		id: "b50aaea2-439d-4605-9a0d-e8f7ff2ead2c",
		idea: "loud birds",
		plural: true
	},
	{
		id: "fca15f89-06c3-4a51-9d7b-b5b447cc6d93",
		idea: "white rabbits",
		plural: true
	},
	{
		id: "f04ee32a-8dc1-4023-aa1a-169be7fd3ebd",
		idea: "bumblebees",
		plural: true
	},
	{
		id: "ef3da529-17b6-4a46-8fb8-a22bd6fec782",
		idea: "grasshoppers",
		plural: true
	},
	{
		id: "a6f12bf3-64b1-460b-8b8c-099e4ce65f39",
		idea: "spiders",
		plural: true
	},
	{
		id: "aa7100bf-1274-44c2-a43b-b48676d1d943",
		idea: "zoo animals",
		animalDistress: true,
		plural: true
	},
	{
		id: "e0ba2a71-79e7-4a47-9cdf-758edcb44731",
		idea: "bunnies",
		plural: true
	},
	{
		id: "11ed4b46-c945-4d4e-8181-26a7bcbf6e41",
		idea: "mosquitoes",
		humanDistress: true,
		plural: true
	},
	{
		id: "82ae001f-e42a-4dc9-abe5-b872bfb8d892",
		idea: "ventrilloquist"
	},
	{
		id: "4ced3562-1f8c-4ab1-9cb4-79602339c6c4",
		idea: "a ventrilloquist's dummy",
		horror: true,
		linkToAnAction: " that is ",
		plural: false
	},
	{
		id: "2f9f8c7b-c8e1-492c-8ac9-97802c1c79d7",
		idea: "moose",
		plural: "",
		max: 25
	},
	{
		id: "5131919b-c2e2-4766-bea0-3ba29e58ab3e",
		idea: "a genie in a bottle",
		plural: false,
		mythsReligionsAndMetaphysics: true,
		linkToAnAction: " who is ",
		islam: true
	},
	{
		id: "31cd2c7c-7e01-434d-b52e-7d5a430b8daa",
		idea: "a djin",
		plural: false,
		mythsReligionsAndMetaphysics: true,
		islam: true
	},
	{
		id: "e6dde08c-62cd-4e43-814b-267667ec898f",
		idea: "ghost",
		mythsReligionsAndMetaphysics: true,
		metaphysics: true,
		max: 13,
		rateBy: "incremental"
	},
	{
		id: "d1020e6f-977b-417f-8e76-746121b5ba22",
		idea: "demons",
		plural: true,
		metaphysics: true,
		mythsReligionsAndMetaphysics: true,
		christianity: true,
		monster: true
	},
	{
		id: "02a531f8-8a5e-4a3f-87aa-2512b217d017",
		idea: "angels",
		plural: true,
		metaphysics: true,
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "74d0ba0a-fe00-4ccf-be40-9fb5656a8964",
		idea: "elves",
		plural: true,
		fantasy: true,
		medievalFantasy: true,
		fairyTalesAndUrbanLegends: true
	},
	{
		id: "6cddc533-4061-45cb-a305-0827c0cd0b23",
		idea: "Slenderman",
		plural: false,
		fairyTalesAndUrbanLegends: true,
		horror: true,
		mythsReligionsAndMetaphysics: true,
		fictionalCharacter: true,
		genderPossessive: "his"
	},
	{
		id: "3e63fc26-e1c1-40fc-aee7-253b80d1c4b3",
		idea: "a frog that is actually royalty",
		plural: false,
		fantasy: true,
		fairyTalesAndUrbanLegends: true,
		linkToAnAction: " and is ",
		medievalFantasy: true
	},
	{
		id: "bd8bd138-b1a9-4fca-84f9-ae66987a0d2a",
		idea: "the big bad wolf",
		plural: false,
		fairyTalesAndUrbanLegends: true,
		genderPossessive: "his"
	},
	{
		id: "059dba29-b5ad-41cc-9a69-704093b1ff3c",
		idea: "a mermaid",
		plural: false,
		fairyTalesAndUrbanLegends: true,
		fantasy: true,
		genderPossessive: "her"
	},
	{
		id: "11254fb0-141b-4246-9f28-5885b67d387e",
		idea: "James Bond",
		plural: false,
		fictionalCharacter: true,
		scifi: true,
		genderPossessive: "his"
	},
	{
		id: "eabd58a9-f766-4ee9-ac66-c37323fdcb1c",
		idea: "Batman",
		plural: false,
		fictionalCharacter: true,
		fantasy: true,
		superhero: true,
		genderPossessive: "his"
	},
	{
		id: "549c45b5-9f17-4775-9f77-595a8f5b1bc6",
		idea: "Captain America",
		plural: false,
		fictionalCharacter: true,
		fantasy: true,
		superhero: true,
		genderPossessive: "his"
	},
	{
		id: "081652f7-3333-4b06-9d5a-45c5ca95453c",
		idea: "mariachi band",
		min: 4,
		max: 7,
		plural: [
			"a ",
			"-man mariachi band"
		]
	},
	{
		id: "6d2e8a77-3070-4d92-8014-1d4770fd9923",
		idea: "an orchestra's conductor",
		plural: false
	},
	{
		id: "fddf1dca-a9bd-484e-a264-8a80cbf20c1b",
		idea: "a train conductor",
		plural: false
	},
	{
		id: "e4e33a24-7433-4ed5-91b7-dce7b7aca221",
		idea: "mad scientist"
	},
	{
		id: "eb446852-0a88-4eab-ab5c-b151e8170025",
		idea: "game show host"
	},
	{
		id: "61035916-1d2a-4591-9891-726ed4c7e4ae",
		idea: "a judge on TV",
		plural: false,
		linkToAnAction: " who is ",
		modern: true
	},
	{
		id: "b71fe62e-68ec-4b31-acd6-6367810d6171",
		idea: "a bucking bronco",
		plural: false,
		animalDistress: true,
		linkToAnAction: " that is "
	},
	{
		id: "7194864d-0517-4811-bd34-1c20e07854d7",
		idea: "Frankenstein's monster",
		plural: false,
		fictionalCharacter: true,
		scifi: true,
		horror: true
	},
	{
		id: "70d432d9-004f-4e58-bb35-1e2c9f616cba",
		idea: "barber"
	},
	{
		id: "5a74164b-9565-4c06-b0ad-596a66b5ca27",
		idea: "prisoners of war",
		plural: "",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		min: 2,
		linkToAnAction: " that are "
	},
	{
		id: "25abb747-48ea-4cf3-be69-5c2914b1361c",
		idea: "police officer",
		humanDeath: true,
		humanDeathViolent: true,
		humanDistress: true
	},
	{
		id: "3b900388-2373-4de3-ad0d-7b47170e9790",
		idea: "spy",
		plural: [
			"",
			"spies"
		],
		humanDeath: true,
		humanDeathViolent: true,
		humanDistress: true,
		max: 3
	},
	{
		id: "dbc8e1bb-d9e9-402a-8636-610f764f062b",
		idea: "a serial killer",
		plural: false,
		humanDeath: true,
		humanDeathViolent: true,
		humanDistress: true
	},
	{
		id: "f037eac2-f3e0-4944-ace1-1ff378f69ef5",
		idea: "Winston Churchill",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		historical: true,
		realPerson: true,
		plural: false,
		genderPossessive: "his",
		properName: true
	},
	{
		id: "66c1bd17-496b-4334-b981-047f7a622ada",
		idea: "Marie Curie",
		realPerson: true,
		plural: false,
		historical: true,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "4a4ccf81-61f9-4659-b8b6-156cad12e426",
		idea: "Oprah",
		realPerson: true,
		plural: false,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "c7b2520f-aafd-48d0-b724-4178e7f2cd6c",
		idea: "Cher",
		realPerson: true,
		plural: false,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "19b1df87-8213-43ab-9a82-ab78838c23fd",
		idea: "Mary Poppins",
		fictionalCharacter: true,
		fantasy: true,
		plural: false,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "4b65cbd4-fa15-4a65-b516-a7d8f6319953",
		idea: "Joan of Arc",
		realPerson: true,
		properName: true,
		humanDeath: true,
		humanDeathViolent: true,
		historical: true,
		plural: false,
		humanDistress: true,
		genderPossessive: "her"
	},
	{
		id: "5edc5998-a69f-4022-8021-d88250558c76",
		idea: "Wonder Woman",
		fictionalCharacter: true,
		fantasy: true,
		superhero: true,
		properName: true,
		plural: false,
		genderPossessive: "her"
	},
	{
		id: "dc97c36c-74d7-4b8f-b76f-3246dc819aef",
		idea: "barking dog",
		animalDistress: true,
		humanDistress: true
	},
	{
		id: "be0e2609-9886-44b3-a59f-15f888754710",
		idea: "too many cooks",
		plural: true
	},
	{
		id: "8a285c98-8d91-46e3-840a-b46c611d06e8",
		idea: "Julia Child",
		realPerson: true,
		plural: false,
		historical: true,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "1f4f0514-be8d-4d08-aa48-f7d8b478d5bc",
		idea: "Queen Victoria",
		realPerson: true,
		plural: false,
		historical: true,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "8c1e21cf-9721-4704-8d4d-bc969f335670",
		idea: "Cleopatra",
		realPerson: true,
		plural: false,
		properName: true,
		historical: true,
		roman: true,
		genderPossessive: "her"
	},
	{
		id: "acd5668e-5f1e-4b02-886a-7b3ebcbeb373",
		idea: "Eleanor Roosevelt",
		realPerson: true,
		plural: false,
		historical: true,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "b6ef8fd2-078d-4088-af53-6c77fa06236d",
		idea: "Amelia Earhart",
		realPerson: true,
		plural: false,
		properName: true,
		historical: true,
		humanDeath: true,
		genderPossessive: "her"
	},
	{
		id: "82202b7e-55c9-4270-91ea-d3ba0817e618",
		idea: "Mata Hari",
		realPerson: true,
		properName: true,
		humanDeath: true,
		humanDeathViolent: true,
		historical: true,
		plural: false,
		humanDistress: true,
		genderPossessive: "her"
	},
	{
		id: "4bc221ee-30fc-4fb4-9a11-7bb814240dbc",
		idea: "Catharine the Great",
		realPerson: true,
		plural: false,
		properName: true,
		historical: true,
		genderPossessive: "her"
	},
	{
		id: "b2e5cfff-db0a-46c8-9415-bd63e28e00fb",
		idea: "Virginia Woolf",
		realPerson: true,
		plural: false,
		properName: true,
		humanDistress: true,
		historical: true,
		genderPossessive: "her"
	},
	{
		id: "0e7560bf-7404-46e3-b360-0599632191ff",
		idea: "Ada Lovelace",
		realPerson: true,
		plural: false,
		properName: true,
		historical: true,
		genderPossessive: "her"
	},
	{
		id: "38f9a112-529d-4d6f-9dbf-a8f5a7d083c4",
		idea: "Margaret Thatcher",
		realPerson: true,
		plural: false,
		properName: true,
		humanDistress: true,
		historical: true,
		genderPossessive: "her"
	},
	{
		id: "b400e6b4-16b5-4bd4-add8-6612b15c87a9",
		idea: "Florence Nightingale",
		realPerson: true,
		plural: false,
		properName: true,
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		historical: true,
		genderPossessive: "her"
	},
	{
		id: "a70dfc34-0411-4393-88f4-00a4e03cf1f6",
		idea: "Jane Austen",
		realPerson: true,
		plural: false,
		properName: true,
		historical: true,
		genderPossessive: "her"
	},
	{
		id: "d28521b8-555b-4a7d-8036-b1655c4d396b",
		idea: "Josephine Baker",
		realPerson: true,
		plural: false,
		properName: true,
		historical: true,
		genderPossessive: "her"
	},
	{
		id: "77fed6fd-337c-40d2-b384-1b105a15fd4c",
		idea: "Denzel Washington",
		realPerson: true,
		plural: false,
		properName: true,
		genderPossessive: "his"
	},
	{
		id: "aeefaf0b-9190-4971-a3b6-a4bfbff930d2",
		idea: "Bruce Lee",
		realPerson: true,
		plural: false,
		properName: true,
		genderPossessive: "his"
	},
	{
		id: "501d05e2-6694-4972-8599-43cefcfcd89d",
		idea: "King Kong",
		fantasy: true,
		properName: true,
		plural: false,
		genderPossessive: "his",
		monster: true,
		fictionalCharacter: true
	},
	{
		id: "ae226a5a-5dc8-43e9-8e2f-9aa64c06c3db",
		idea: "a non-binary person",
		genderPossessive: "their",
		plural: false
	},
	{
		id: "669d3af8-035f-41b3-85b3-c6e3c1d71ba0",
		idea: "a transgender man",
		genderPossessive: "his",
		plural: false
	},
	{
		id: "eac8dcce-d3c0-4ad2-a666-18b4f3040708",
		idea: "a transgender woman",
		genderPossessive: "her",
		plural: false
	},
	{
		id: "c69dc61d-c781-4c5d-8288-f64178be8234",
		idea: "a very sleepy person",
		plural: false
	},
	{
		id: "2bf19f53-43b9-46a7-8778-83be28fcc02a",
		idea: "car mechanic"
	},
	{
		id: "4035ea63-1f99-4663-89ec-eca19aa03f89",
		idea: "airplane mechanic"
	},
	{
		id: "ce04cac5-994a-4b7e-93ca-79106f8f2f45",
		idea: "an insurance salesman",
		plural: false
	},
	{
		id: "d05a13c9-1311-46c6-b1e3-d1448ee2a7bb",
		idea: "a server in a restaurant",
		linkToAnAction: " who is ",
		plural: false
	},
	{
		id: "ce6c03ac-afa2-4ed8-87a1-7035615d4fe9",
		idea: "Lady Gaga",
		realPerson: true,
		plural: false,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "98b6d415-f0ca-4a6b-a646-4e21c035a701",
		idea: "The Cat in the Hat",
		fictionalCharacter: true,
		plural: false,
		properName: true,
		genderPossessive: "his",
		linkToAnAction: ", who is "
	},
	{
		id: "d6b7fe40-37a5-4982-9759-e11a55c31f49",
		idea: "Goldilocks",
		fairyTalesAndUrbanLegends: true,
		fictionalCharacter: true,
		plural: false,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "c86208ae-2efd-4867-b7bb-3efc3ac1e906",
		idea: "a competitive eater",
		plural: false,
		linkToAnAction: " who is "
	},
	{
		id: "d9191f67-f25c-4efd-b36f-bf3eed1cf4e9",
		idea: "flamingo"
	},
	{
		id: "adeadda0-5315-4ff4-a540-da2cddecaa8b",
		idea: "a wedding planner",
		plural: false
	},
	{
		id: "9c8c7f96-7cb0-4b64-9642-db3018598e14",
		idea: "a millionaire",
		plural: false
	},
	{
		id: "9a3bf32e-40a5-46b1-a6f5-1cd1acf4ccc0",
		idea: "a billionaire",
		plural: false
	},
	{
		id: "cff04d05-2856-4b86-8bc8-a26139c443ba",
		idea: "a bankrupt person",
		plural: false
	},
	{
		id: "94138b9c-b566-42d9-9a70-e2b61008af79",
		idea: "Prince Charming",
		fairyTalesAndUrbanLegends: true,
		fictionalCharacter: true,
		plural: false,
		properName: true,
		genderPossessive: "his"
	},
	{
		id: "0d52d1fc-4995-4ae3-8e96-e74328d735c0",
		idea: "Cinderella",
		fairyTalesAndUrbanLegends: true,
		fictionalCharacter: true,
		plural: false,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "1def8496-c4a5-43eb-8223-3c792ff87e02",
		idea: "Snow White",
		fairyTalesAndUrbanLegends: true,
		fictionalCharacter: true,
		plural: false,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "ce0fee37-f390-4d86-a711-8e5cd9347910",
		idea: "Sleeping Beauty",
		fairyTalesAndUrbanLegends: true,
		fictionalCharacter: true,
		plural: false,
		properName: true,
		genderPossessive: "her"
	},
	{
		id: "8bb4e435-d830-4881-8435-e72b64e8b876",
		idea: "Marty McFly",
		fictionalCharacter: true,
		scifi: true,
		plural: false,
		properName: true,
		genderPossessive: "his"
	},
	{
		id: "0117a234-ae86-47ce-8ed8-0712b926b1f4",
		idea: "a wise, older person",
		plural: false,
		linkToAnAction: " who is "
	},
	{
		id: "5e756271-562a-4625-acd7-dd04d57ae660",
		idea: "stranger",
		max: 7,
		rateFavorsLower: false,
		rateBy: "incremental"
	},
	{
		id: "ddd60090-18a8-4f33-b91b-38f27697fd47",
		idea: "some dumbfuck",
		plural: false,
		linkToAnAction: " who is ",
		profanity: true
	},
	{
		id: "0cdf81fc-cd57-43ed-b3a0-f92a1e78a6ce",
		idea: "an asshole",
		plural: false,
		linkToAnAction: " who is ",
		profanity: true
	},
	{
		id: "a9c6d84f-7238-418f-bd50-734dbf2a331d",
		idea: "a mother",
		plural: false
	},
	{
		id: "3c97769e-d4be-4db6-9746-cb1df90c0fe5",
		idea: "a father",
		plural: false
	},
	{
		id: "ac40f9da-5c1a-4975-ac45-3757f3acda87",
		idea: "a gladiator",
		plural: false,
		historical: true,
		roman: true
	},
	{
		id: "789e5674-e0ab-4008-ad91-513af8d69857",
		idea: "Julius Caesar",
		plural: false,
		historical: true,
		roman: true
	},
	{
		id: "00ad15e7-69c9-4eb1-8b05-999c51caeb5e",
		idea: "Homer Simpson",
		plural: false,
		fictionalCharacter: true,
		modern: true
	},
	{
		id: "223533c3-0522-40da-a3ab-e370141e05b7",
		idea: "Ru Paul",
		plural: false,
		realPerson: true,
		modern: true
	}
];

const characters: Character[] = info.map(bit => ({ ...base, ...bit }));

export default characters;
