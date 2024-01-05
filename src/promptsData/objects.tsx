import { AnObject, AnObjectBase, CoreIdea, TypedObject } from "./Ideas";

const base: (AnObjectBase & TypedObject) = {
	type: "object",
	min: 1,
	max: 5,
	rateBy: 1,
	rateFavorsLower: true,
	plural: false,
	article: "a",
	numerals: false
};
const info: (Partial<AnObject> & CoreIdea)[] = [
	{
		id: "da00a76a-3984-44a4-8893-c756471f0c97",
		idea: "licorice"
	},
	{
		id: "b6f44e68-6415-4b90-bb3c-12ba814abfab",
		idea: "cotton candy"
	},
	{
		id: "333053be-337b-4caf-a140-165b91116b13",
		idea: "strangely-colored liquid"
	},
	{
		id: "cd2f631d-21da-48c9-94df-fe7ece87453a",
		idea: "whole wheat bread",
		modern: true
	},
	{
		id: "3d085e00-b774-472d-bc7c-8719aa786cd8",
		idea: "carbonated water",
		modern: true
	},
	{
		id: "a0e6f95d-b570-4ece-9a14-8e28f746e99a",
		idea: "nectarines",
		plural: true
	},
	{
		id: "1922d1b7-9fc3-4b44-87e8-defcf757d39d",
		idea: "pumpkin",
		plural: "s"
	},
	{
		id: "58d2cb01-5fcb-4807-86a3-acbf3c159541",
		idea: "a tandem bicycle"
	},
	{
		id: "3bcd2db5-1492-4865-be1a-462a176ef909",
		idea: "tanks",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		plural: true
	},
	{
		id: "71c7b421-d6cc-4b93-abe9-e0d2756dd056",
		idea: "very full shopping bag",
		plural: "s",
		max: 12,
		rateBy: 2
	},
	{
		id: "a3e1ad04-7add-4e52-87cd-54f79bd1089e",
		idea: "fireworks",
		plural: true
	},
	{
		id: "83e99737-1649-44f3-80c6-11542a093c27",
		idea: "rumpled sheets",
		sexual: true,
		plural: true
	},
	{
		id: "5c6ae761-bca9-4a11-823b-4d09b1e13664",
		idea: "tarts",
		plural: true
	},
	{
		id: "896f4252-2245-4d47-898d-7f8a639189ac",
		idea: "the vacuum cleaner"
	},
	{
		id: "df521eb3-f695-4c5e-addd-c085ec6650b1",
		idea: "a chrysalis"
	},
	{
		id: "55c6d887-c03e-4786-9484-38f234e6de37",
		idea: "posies",
		plural: true
	},
	{
		id: "56ca5729-40b1-49b4-ac34-0b8fa5c2a4f1",
		idea: "posters on a bedroom wall",
		plural: "",
		max: 15,
		min: 2
	},
	{
		id: "1eeee501-6f8f-4ecc-9257-efbff49a6a0a",
		idea: "a jump rope"
	},
	{
		id: "ddd7e8de-452f-4b3b-a7ec-3c8024b0825b",
		idea: "psychoactive drugs",
		illicitSubstances: true,
		plural: true
	},
	{
		id: "15e8e6a2-a6b8-45f9-906d-1063047e3065",
		idea: "whiskey",
		alcohol: true
	},
	{
		id: "c9e0b4bf-17ec-4435-a012-0b11932bb7e6",
		idea: "cyanide",
		humanDeath: true,
		humanDeathViolent: true,
		humanDistress: true
	},
	{
		id: "841a2a2f-7d98-45a3-8e44-c9371e12e12c",
		idea: "trees",
		plural: true
	},
	{
		id: "3f487688-bc33-49d3-b438-7009ae839f72",
		idea: "a sword that is also a key",
		modern: true,
		fantasy: true
	},
	{
		id: "e1d8e001-a5b7-4924-9001-4ff7e92b9b36",
		idea: "cocaine",
		illicitSubstances: true
	},
	{
		id: "b5bef760-ed1e-4e14-b296-d1e622083461",
		idea: "vodka",
		alcohol: true
	},
	{
		id: "7485a307-79f0-4d7b-81ee-a6f3f4b9e41b",
		idea: "tornadoes",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		plural: true
	},
	{
		id: "37dfaab4-e5f8-4b90-bcda-0e6efcaf5ce6",
		idea: "jello shots",
		alcohol: true,
		max: 10,
		min: 2,
		plural: ""
	},
	{
		id: "476fce53-bc26-4a53-a707-4a69ad524560",
		idea: "parasites",
		humanDistress: true,
		animalDistress: true,
		plural: true
	},
	{
		id: "36e20672-82c0-407c-ab49-b9bc79cbe062",
		idea: "underground fires",
		plural: true
	},
	{
		id: "df445653-ac4c-4c1d-89d5-490fc42a8ee8",
		idea: "a welcome mat"
	},
	{
		id: "b837714f-1c75-4e6f-884c-f385e2c0bb7e",
		idea: "iodine"
	},
	{
		id: "82a3710e-5139-4d7e-81e4-732dfa588668",
		idea: "a particular tattoo"
	},
	{
		id: "0e00c3c5-6f95-4701-bc37-49889e813914",
		idea: "a Star of David",
		mythsReligionsAndMetaphysics: true
	},
	{
		id: "47a454c0-ce3d-4446-9fd0-2b0df3b7e42c",
		idea: "calcium"
	},
	{
		id: "88c18882-96f5-44d0-b4f3-5cb39678d72e",
		idea: "vicodin"
	},
	{
		id: "08437030-2413-4d93-881f-f9f900b9e7aa",
		idea: "an aging star",
		scifi: true,
		spacefaring: true
	},
	{
		id: "92cb3353-2116-4d0a-bd1a-892248955c10",
		idea: "chalk"
	},
	{
		id: "152a441b-3852-4bec-8161-efa2c118a203",
		idea: "different melodies",
		plural: "",
		min: 2,
		rateBy: 2
	},
	{
		id: "abfedb16-f488-4a37-8293-c180c6bcf7ab",
		idea: "gravy"
	},
	{
		id: "2e2166bd-634c-4835-bed9-850bab0352aa",
		idea: "fresh fruit"
	},
	{
		id: "fa386f84-8c1f-4bea-9ed8-f45f5db504f8",
		idea: "ravioli"
	},
	{
		id: "21261e33-ddcd-4343-88c5-48d0bbb7c1c1",
		idea: "love letters",
		sexual: true,
		plural: true
	},
	{
		id: "0a44b1a1-30ca-4b50-9be3-0a7520f965e0",
		idea: "Webster's Dictionary",
		properName: true
	},
	{
		id: "3e8a21e0-f548-429b-9e32-e996fda4668e",
		idea: "a stomach"
	},
	{
		id: "cd5b1b79-4d20-4d08-8980-84267b2bdda9",
		idea: "baby shoes",
		plural: true
	},
	{
		id: "1ee89252-84cb-4dda-ac43-f8a49a4d34a9",
		idea: "kites",
		plural: true
	},
	{
		id: "b398e45c-f7e8-4b0d-a326-cad89957938e",
		idea: "lanterns",
		plural: true
	},
	{
		id: "678694cf-df0f-4813-b70a-8bcd51a1e813",
		idea: "menthol cigarettes",
		tobacco: true,
		plural: true
	},
	{
		id: "8ac80b01-241f-45bd-8e37-04eb1acb944f",
		idea: "helicopters",
		modern: true,
		plural: true
	},
	{
		id: "46415cf1-9c56-4083-a718-84ee894767fb",
		idea: "tulips",
		plural: true
	},
	{
		id: "90bffce2-e6ef-4081-ad2d-b3c94f337097",
		idea: "brightly-colored shoelaces",
		modern: true,
		plural: true
	},
	{
		id: "275b5569-26e9-4265-9c80-4a17331db0d3",
		idea: "hand sanitizer",
		modern: true
	},
	{
		id: "39aea43a-8cdb-490f-acf4-413c610d0edd",
		idea: "tuna fish sandwiches",
		plural: true
	},
	{
		id: "6e82f86d-86bf-4d43-83a0-17c6933b1266",
		idea: "a clear box"
	},
	{
		id: "a220df4d-5464-4e39-ae4c-abe24d0d6254",
		idea: "thunder without lightning"
	},
	{
		id: "6acdff36-d1d6-43a7-8fca-5a2e268db6ef",
		idea: "earmuffs",
		plural: true
	},
	{
		id: "5bc661c7-327a-423d-98a3-d4fdd0fa4fc0",
		idea: "zippers",
		plural: true
	},
	{
		id: "be65be5d-01a8-4545-996f-c27b1b7f0c83",
		idea: "razor blades",
		humanDistress: true,
		plural: true
	},
	{
		id: "1b1fc2b8-d8be-4c46-b150-be60cb18a353",
		idea: "silent windchimes",
		plural: true
	},
	{
		id: "c9425ccb-3f20-4998-a8ca-effba34a4ae5",
		idea: "a whip",
		humanDistress: true
	},
	{
		id: "555e8511-13a0-4185-aa90-9b7090282815",
		idea: "matches",
		plural: true
	},
	{
		id: "b50d30f9-5dc4-428c-b7de-2eb4e2ea1540",
		idea: "zoning permits",
		plural: true
	},
	{
		id: "56adebd3-f27c-458d-bd8a-50b8a155aa7b",
		idea: "thirty-three teeth",
		plural: true
	},
	{
		id: "b712c8d6-6e79-42aa-a5cd-42c75985b884",
		idea: "skull",
		humanDeath: true,
		humanDistress: true,
		animalDeath: true,
		animalDistress: true,
		plural: "s"
	},
	{
		id: "240ed398-38fa-496b-adc1-a2e80f8d7b5f",
		idea: "zebra-patterned fabric"
	},
	{
		id: "f6de0a85-6891-4a13-8ea5-f366b94fc974",
		idea: "grilled cheese sandwiches",
		plural: true
	},
	{
		id: "63bba68d-5d03-4ee9-80f2-b2444b8e3462",
		idea: "gum"
	},
	{
		id: "3d5e1439-860a-444a-9aae-b7eb1a8721eb",
		idea: "an arrow pointing to the left"
	},
	{
		id: "e2738737-5636-48ef-b58c-1bde7ab413d4",
		idea: "a long rubber hose",
		humanDistress: true,
		humanDeath: true
	},
	{
		id: "a7dca5fa-8fd5-4b5b-bc80-6e9116962233",
		idea: "Pandora's Box",
		mythsReligionsAndMetaphysics: true,
		greekRomanMyth: true
	},
	{
		id: "6a361fd3-ed08-48db-979b-32e9cd81679e",
		idea: "an out-of-tune organ"
	},
	{
		id: "8b6f75be-8659-4e94-b153-6979dc781071",
		idea: "radioactive material",
		modern: true,
		humanDistress: true
	},
	{
		id: "e6cdb7bc-0a4e-423d-85b4-611831110229",
		idea: "snap-button shirts",
		plural: true
	},
	{
		id: "9aa10541-31f8-4831-bf01-3b8dd8b8d9ab",
		idea: "a purple belt"
	},
	{
		id: "5dcd9387-ce5d-4974-aeb7-90e878d0af05",
		idea: "stained glass",
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "230b1563-bd5e-46ae-98bd-726c3bd4bb7c",
		idea: "ponytails",
		plural: true
	},
	{
		id: "c383859f-887c-4617-96cf-2ae9806e4eaa",
		idea: "melting clocks",
		plural: true
	},
	{
		id: "b6f5ec2b-97cb-4dc7-a5d5-ea291ea2f69f",
		idea: "a dead Jesus on a wall",
		mythsReligionsAndMetaphysics: true,
		christianity: true,
		humanDeath: true,
		humanDistress: true,
		humanDeathViolent: true
	},
	{
		id: "6ff925d0-4889-49cc-8258-005c9d19cc3c",
		idea: "a bra",
		sexual: true
	},
	{
		id: "d83922fa-83ab-45ff-825a-6c316a78f747",
		idea: "shoes that are too tight",
		plural: true
	},
	{
		id: "b2f7a98e-05a3-4be8-943f-bd85f56ea99e",
		idea: "cheap beer",
		alcohol: true
	},
	{
		id: "358d3af0-8794-4257-947d-ff112bafbe76",
		idea: "seashells",
		plural: true
	},
	{
		id: "33432ba2-dd85-4607-9208-f43414e16a2e",
		idea: "vomit",
		humanDistress: true
	},
	{
		id: "f36b0b82-b34e-4e4d-9e1e-22ead17ee0c1",
		idea: "clean pajamas",
		plural: true
	},
	{
		id: "a92740ef-a277-41e7-9010-6678fcbe5c16",
		idea: "a sunburn",
		humanDistress: true
	},
	{
		id: "10a9dd92-6070-42e4-8b41-588ab5a6dedd",
		idea: "old cologne"
	},
	{
		id: "54bcec04-d03d-40ee-807a-ad46e774f708",
		idea: "sulfur"
	},
	{
		id: "474cce5c-151b-46a7-9be2-4f1e5c3dd0d4",
		idea: "a new scar",
		humanDistress: true
	},
	{
		id: "834f7aa6-adf6-4368-9a22-db16c0229f53",
		idea: "cream pies",
		sexual: true,
		plural: true
	},
	{
		id: "bc911e48-8813-4650-ae1f-c1d4c2b8f8ee",
		idea: "a new hairdo"
	},
	{
		id: "c65ab847-b573-4a5c-80ec-df11d5230c41",
		idea: "a lost key"
	},
	{
		id: "72ce46d5-f78f-4d16-b10a-75233ddf31f4",
		idea: "a favorite shirt"
	},
	{
		id: "c08a3084-c9c6-4319-a9ce-b98dd9b62456",
		idea: "jelly beans",
		min: 5,
		max: 100,
		plural: ""
	},
	{
		id: "e3f0be83-6c6a-4c98-ab2c-efea3afc27ee",
		idea: "a rusty nail"
	},
	{
		id: "0c9ddb0d-79f9-4646-ae09-04e24d17e0c4",
		idea: "oily rags"
	},
	{
		id: "99642bf2-1a36-48d3-9b14-4eed5c3f0f33",
		idea: "soup that is too cold"
	},
	{
		id: "0b6dc39c-3696-4f57-a9ac-5c9df23c3bdf",
		idea: "a new street drug",
		illicitSubstances: true
	},
	{
		id: "4f083156-45e9-4ec3-9461-9fe69a5c87fe",
		idea: "the perfect outfit"
	},
	{
		id: "b949f6a5-b0ea-4119-865e-27d2b21d82af",
		idea: "a bloody piece of clothing",
		humanDistress: true
	},
	{
		id: "076c103d-2741-48a5-be08-807e4253a5e0",
		idea: "dark lenses",
		plural: true
	},
	{
		id: "0b17a892-7323-49bc-815c-ff30ada25470",
		idea: "oncoming traffic",
		modern: true,
		humanDistress: true
	},
	{
		id: "1ba7110c-8510-4e72-9d42-e59dd6230dbb",
		idea: "a newt",
		plural: true
	},
	{
		id: "46d6beda-2dee-4786-beaa-1876f6e42ed9",
		idea: "a silver trident",
		mythsReligionsAndMetaphysics: true,
		greekRomanMyth: true
	},
	{
		id: "5c195b9d-138c-49e9-8c29-c76059a4833a",
		idea: "Gorgonzola cheese",
		properName: true
	},
	{
		id: "db21b9d0-2e05-4607-ab26-8847aa4b4011",
		idea: "asteroids",
		scifi: true,
		spacefaring: true,
		plural: true
	},
	{
		id: "0584ebdb-4411-47b1-adc2-a64f46b1f5e1",
		idea: "planets",
		scifi: true,
		spacefaring: true,
		plural: true
	},
	{
		id: "74794d56-59ad-4cae-9d6a-f0c2e21bca83",
		idea: "galaxies",
		scifi: true,
		spacefaring: true,
		plural: true
	},
	{
		id: "c4416292-5663-4cfc-bc45-834b76f34d02",
		idea: "star systems",
		scifi: true,
		spacefaring: true,
		plural: true
	},
	{
		id: "c6b0b335-d51f-4827-ae4b-4e239359b685",
		idea: "jumbo shrimp"
	},
	{
		id: "f5bd1f23-c8c8-4472-94f7-c66a650aab8f",
		idea: "a muddy flag"
	},
	{
		id: "b1f9642d-6090-4dea-9f92-a5f41305e165",
		idea: "juniper bushes",
		plural: true
	},
	{
		id: "08294127-0870-450a-8c71-e5378ce3037e",
		idea: "cloudy water"
	},
	{
		id: "aba5a339-a938-4a98-a2d5-b52441ac944a",
		idea: "dog poop"
	},
	{
		id: "6e9fe0f7-5af3-440b-9501-17f5a4eab8b6",
		idea: "fangs",
		animalDistress: true,
		humanDistress: true,
		plural: true
	},
	{
		id: "76450372-7ae6-4b5e-a8ec-594cbbf8969d",
		idea: "elevators",
		plural: true
	},
	{
		id: "df025dae-d8c3-49cd-919e-841bcd0ea3cd",
		idea: "an electrical socket"
	},
	{
		id: "08a7696b-248f-4dac-a942-c50c5f02211e",
		idea: "a jukebox"
	},
	{
		id: "758e9d5f-abbf-45d9-8353-702daabe53ce",
		idea: "a plank of wood",
		plural: [
			"",
			" planks of wood"
		]
	},
	{
		id: "cd24b05a-c7bb-4b4d-8eb7-25bed79976e8",
		idea: "a small piece of metal"
	},
	{
		id: "3bdfb0bb-ffbe-4c00-b42d-3e25cae741a3",
		idea: "lost credit cards",
		modern: true,
		plural: true
	},
	{
		id: "d7b0925a-5b35-4820-9296-8a1ee25e2e1e",
		idea: "a cornucopia"
	},
	{
		id: "8ab53e88-88a4-492a-b228-7eb325bc9b0a",
		idea: "two front teeth",
		plural: true
	},
	{
		id: "282bb059-06d5-46c2-94e8-8e544da77bbe",
		idea: "a treasure chest",
		fantasy: true,
		historicalFiction: true
	},
	{
		id: "474647d2-358f-4aee-aece-e0e1c02cbb8f",
		idea: "rings around a planet",
		scifi: true,
		spacefaring: true,
		plural: true
	},
	{
		id: "fbde6662-4a0f-4a12-87ae-dfc6471b7a6c",
		idea: "a tourniquet",
		humanDistress: true
	},
	{
		id: "8643aa92-04c0-47bc-b80f-4e95a48fd75a",
		idea: "a Molotov cocktail",
		humanDistress: true
	},
	{
		id: "6db38df2-add6-4211-8794-d034df2245ff",
		idea: "peanuts",
		plural: true
	},
	{
		id: "ffde7220-e144-4ceb-9d31-bd7531a4c599",
		idea: "too much popcorn"
	},
	{
		id: "0cf5ea9b-c55b-4588-8f7f-f0c58914cacf",
		idea: "a bad hairpiece"
	},
	{
		id: "f53a3dd4-3f96-49c9-b159-122db2d6bd8a",
		idea: "a broken hard drive",
		modern: true
	},
	{
		id: "db0b08f5-b52f-4888-9aab-708a9f748137",
		idea: "a special camera"
	},
	{
		id: "7a408437-4cb3-492f-957a-1abee58f0159",
		idea: "a surprising amount of hair",
		sexual: true
	},
	{
		id: "4276cc73-5b4c-46f4-b8a9-8f1be012730a",
		idea: "a corpse",
		humanDistress: true,
		humanDeath: true
	},
	{
		id: "7e5c9054-741e-45a3-aa3c-4f5a46121542",
		idea: "lottery tickets",
		modern: true,
		plural: true
	},
	{
		id: "52582b1f-46e5-4ba4-b71a-faeddafc5b1d",
		idea: "tears of joy",
		plural: true
	},
	{
		id: "4bbfb12b-65e9-4c15-b69f-90927685cdcc",
		idea: "a blank expression"
	},
	{
		id: "62f6689a-2750-4286-bc55-273373619a1a",
		idea: "eyeglasses",
		plural: true
	},
	{
		id: "43f9177b-bccf-4aeb-b417-80248a97c52c",
		idea: "a defective condom",
		sexual: true,
		modern: true
	},
	{
		id: "6f9d1765-b63d-4e40-ba5b-88227b3805b7",
		idea: "a mesh shirt",
		sexual: true
	},
	{
		id: "d6c956b7-91c0-42f2-8b7d-7db480a4923e",
		idea: "hairpins",
		plural: true
	},
	{
		id: "d8c42106-4ba3-4124-b7aa-08f15768e362",
		idea: "handcuffs",
		humanDistress: true,
		sexual: true,
		plural: true
	},
	{
		id: "ba2a8982-278b-4971-a05e-505a7d9f1fc2",
		idea: "a jalopy"
	},
	{
		id: "2cacd168-ad19-4118-9a20-3709ccf6dded",
		idea: "trampolines"
	},
	{
		id: "6a5e473c-54fe-4a2d-88c3-685558b866d9",
		idea: "a fishnet",
		sexual: true
	},
	{
		id: "b6c62ffa-8ddd-41e3-a67e-3bb13960f4ae",
		idea: "canned peas",
		plural: true
	},
	{
		id: "0ff25089-8d75-4c39-988e-f55fb8125597",
		idea: "an unopened letter"
	},
	{
		id: "fc288019-7e1f-40f2-a8dc-5c160635010d",
		idea: "a firecracker"
	},
	{
		id: "945fe83b-6304-45a9-afbf-84b2af55acc8",
		idea: "a Newton's cradle",
		properName: true
	},
	{
		id: "31fed50f-29d9-4e86-bd16-8bc7bda8aa44",
		idea: "a new fossil"
	},
	{
		id: "48ba30a3-86bd-4936-bc45-8d2f21e12501",
		idea: "a cross",
		fantasy: true,
		medievalFantasy: true,
		horror: true,
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "39e74245-14a5-4f33-9436-1d291744ebc7",
		idea: "turnips"
	},
	{
		id: "a9c3b1f9-f132-46b5-8b50-a8f72a74d25f",
		idea: "giant diapers",
		plural: true
	},
	{
		id: "2f503a7d-9e1d-45c5-97db-ee053ad9d2ea",
		idea: "electric eels"
	},
	{
		id: "8569eaa1-7173-496f-a445-cc8f6d958f0c",
		idea: "piranhas",
		plural: true
	},
	{
		id: "052e8a4d-3319-436d-9e56-f9eee9c7bbdd",
		idea: "a fly"
	},
	{
		id: "a264eed0-c8de-44e3-b5a0-d486a96d794e",
		idea: "markers",
		plural: true
	},
	{
		id: "a87c1193-49aa-4ef9-a3a8-a7cbd37f1caf",
		idea: "a broken guitar"
	},
	{
		id: "0be29b1f-ed6e-415c-b5a7-959631a5ffd4",
		idea: "a loaf of bread"
	},
	{
		id: "0d64f10d-3b01-4711-a246-f83c139d1edd",
		idea: "a phallus",
		sexual: true
	},
	{
		id: "1b77d67b-8f5f-40ce-aa47-c3a82ac487a2",
		idea: "a crowbar"
	},
	{
		id: "6c2bb05b-d7b9-43d4-b976-2610d0e32455",
		idea: "flat tire",
		plural: "s"
	},
	{
		id: "a0edd1ac-f070-4364-8d57-e51a20928417",
		idea: "a trenchcoat"
	},
	{
		id: "7cfb493c-5a20-4c5f-a97b-10264c4f63e9",
		idea: "Twinkies",
		properName: true,
		modern: true,
		plural: true
	},
	{
		id: "38b76373-f990-441b-a02e-79505d708263",
		idea: "a strange scar"
	},
	{
		id: "ee7aa74c-db55-49b3-86bd-d36ff3a532ed",
		idea: "a golf club"
	},
	{
		id: "3967216b-dc55-4e11-8099-2d514e02bb6e",
		idea: "a stop sign"
	},
	{
		id: "b13c89cf-6cee-4b3b-bc82-e75bff371c03",
		idea: "a picnic basket"
	},
	{
		id: "b55b7069-d7ec-4be9-b061-a45fc8080866",
		idea: "horseradish"
	},
	{
		id: "1c8a977b-948e-412a-9c3d-eee3e41f979e",
		idea: "a bill"
	},
	{
		id: "1da8f1bf-c9e1-4ad1-87f2-af1bb5315415",
		idea: "tacos",
		plural: true
	},
	{
		id: "c36c23f9-4dd0-4ffb-b22b-e4bdd0da3d7c",
		idea: "dirty clothes",
		plural: true
	},
	{
		id: "9e5ad79e-3853-4692-9cfb-083825588779",
		idea: "sweet and sour sauce"
	},
	{
		id: "3a1b1380-c9b0-4322-bfd2-f5365d9b2a5f",
		idea: "a new piano"
	},
	{
		id: "952a1abf-2419-4439-b99a-caa0a07889df",
		idea: "a broken piano"
	},
	{
		id: "9da16daa-a394-4dfc-9843-b311a1559071",
		idea: "soy sauce"
	},
	{
		id: "10e9a046-6f64-46aa-9a86-cac4345fb821",
		idea: "a new recipe"
	},
	{
		id: "e38153d2-25dd-45a2-8f29-af5cad5e74f9",
		idea: "hard hats",
		plural: true
	},
	{
		id: "7a713aab-0f6d-44f7-8d90-bc11feb448cd",
		idea: "a statue of an angel",
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "34ef3327-e0a2-40ea-ae0e-5b9f1a84367e",
		idea: "a Happy Meal",
		properName: true,
		modern: true
	},
	{
		id: "279cc233-36b6-45b6-8dc2-4cc90336398d",
		idea: "an atomic bomb",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "497eeb6c-b0b2-4b1d-aa0b-48b3381fcf44",
		idea: "a bikini",
		sexual: true
	},
	{
		id: "f61db8dd-84a0-4379-89e9-048d6de0e12b",
		idea: "olive oil"
	},
	{
		id: "95504316-4245-4cae-b9fe-0544d1bec47c",
		idea: "lead-based paint"
	},
	{
		id: "b46a8a33-e3ba-43d2-940a-eaf2df299b87",
		idea: "an erection",
		sexual: true
	},
	{
		id: "7e571113-a313-4bc2-b175-a123e8ab361f",
		idea: "pants that are too tight",
		sexual: true,
		plural: true
	},
	{
		id: "e183c6c8-7755-4b51-8a92-f8a1c8fc045a",
		idea: "ketchup"
	},
	{
		id: "a71cc338-e847-4222-b07c-37d7011f057a",
		idea: "diamond dust"
	},
	{
		id: "c76ef1bc-6034-4ab1-b68c-b83d98ef51fc",
		idea: "peanut butter"
	},
	{
		id: "ac248d2f-3b5e-4ba5-8be1-263c7f30eaa3",
		idea: "a garishly wrapped present"
	},
	{
		id: "3bae5656-9379-410d-8715-825c42bf8ce6",
		idea: "a wistful smile"
	},
	{
		id: "c696fe2d-66f9-4c70-b00a-c21dc3c6f32a",
		idea: "a magic potion",
		fantasy: true,
		medievalFantasy: true
	},
	{
		id: "3e5fac1c-e07c-4c44-af65-2ea942a5999b",
		idea: "a pot of boiling water"
	},
	{
		id: "c1e04043-820b-499e-8b0a-ab9b6d4a487a",
		idea: "molten gold"
	},
	{
		id: "129eea3b-aa3b-49be-8e95-8ec862933d9c",
		idea: "a stick of dynamite"
	},
	{
		id: "0bdc3d01-364b-488d-9fc9-cb694039d782",
		idea: "a rifle",
		humanDistress: true,
		animalDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		animalDeath: true
	},
	{
		id: "1eb74b99-51f1-4f3f-8625-d42098f0d6e2",
		idea: "a car that flies",
		fantasy: true,
		scifi: true,
		modern: true
	},
	{
		id: "c2f65e27-e062-415f-bc6f-2f0e088b0fc4",
		idea: "a dusty bookshelf"
	},
	{
		id: "bb61980d-7be7-40d8-a6bf-718d716f4eb1",
		idea: "a shrinkwrapped box",
		modern: true
	},
	{
		id: "acb7919d-d1a9-41d5-b70b-525d426868ae",
		idea: "a used condom"
	},
	{
		id: "a55adeb5-59ab-464f-85b3-fba6ad44ff9f",
		idea: "a dreamcatcher"
	},
	{
		id: "c99eb750-5b2a-482c-bb79-b7745c9e86d8",
		idea: "a secret smile"
	},
	{
		id: "89a61e23-fe05-42a3-93dd-92ef671a4ec0",
		idea: "a fake smile"
	},
	{
		id: "1ef96153-de06-4ea6-a1bb-5af8850b5001",
		idea: "an ugly frown"
	},
	{
		id: "7d18e952-7c25-4f28-b2cc-2a92af091dcb",
		idea: "bared teeth"
	},
	{
		id: "dafe84d7-6f89-4ccb-baab-7d0aa99afbeb",
		idea: "a wink"
	},
	{
		id: "571c9fdc-e7f7-47b2-9302-e75ad982da66",
		idea: "a perforated eardrum",
		humanDistress: true
	},
	{
		id: "672f7b64-dd32-4c4c-affc-b8106bbe12cd",
		idea: "two raw eggs",
		plural: true
	},
	{
		id: "7fe08f3a-f8fe-40d9-ae0b-9a9ee8bda199",
		idea: "stale bread"
	},
	{
		id: "5b27e442-c7dd-4e9c-8dbe-53444c8804f3",
		idea: "defective brakes",
		humanDistress: true,
		modern: true,
		plural: true
	},
	{
		id: "1ef385c5-81ba-41f7-b7a9-38a5975dc378",
		idea: "broken shoelaces",
		plural: true
	},
	{
		id: "1564dcf7-91a7-42be-b8ec-4c0e5b5d1618",
		idea: "a trough"
	},
	{
		id: "94a557f2-6d5d-4176-bf21-2c7d5042e868",
		idea: "a sandwich"
	},
	{
		id: "06c8c2f1-a2da-49ef-8e16-fe6c3b8f0ced",
		idea: "hair dye"
	},
	{
		id: "173f2d72-8e9c-45de-af85-1bca2c4890cd",
		idea: "a paperback novel"
	},
	{
		id: "3544c315-9e80-4f4d-809d-3799a27fcb62",
		idea: "a heavy tome"
	},
	{
		id: "2fbeeec9-5a3d-410a-b357-67619ea1815d",
		idea: "a bag of schoolbooks"
	},
	{
		id: "238b6388-5513-49e3-9b1d-ea708fe78307",
		idea: "a suppository"
	},
	{
		id: "7cdc95ba-45e3-4df6-9de8-e28d60739457",
		idea: "bagpipes",
		plural: true
	},
	{
		id: "3c9a403f-26a6-489f-b031-259d2a07b185",
		idea: "carrots",
		plural: true
	},
	{
		id: "15ec1eed-b79d-4dac-9407-a6e0485d6051",
		idea: "celery"
	},
	{
		id: "a235ed5f-e688-4b38-8dcc-8b86df829a04",
		idea: "erotic art",
		sexual: true
	},
	{
		id: "fa807a22-2e2f-41df-9077-176589d3519b",
		idea: "a magnetic board",
		modern: true
	},
	{
		id: "271bc23e-0c28-4249-b1e2-87235876e886",
		idea: "a dry-erase board",
		modern: true
	},
	{
		id: "48b037ed-09b4-4f19-a2a6-49d2eaf20d5e",
		idea: "cardboard boxes",
		modern: true,
		plural: true
	},
	{
		id: "4c075606-9332-4dd4-b47d-2b3718f0d54d",
		idea: "an email",
		modern: true
	},
	{
		id: "993d6208-6f04-41ce-b2d6-b31b11d0774a",
		idea: "confetti"
	},
	{
		id: "03515d37-18dd-4cc9-bf17-6b41034b1091",
		idea: "safety scissors",
		modern: true,
		plural: true
	},
	{
		id: "d0c11102-757b-4f9a-911f-d9d56af72391",
		idea: "tapioca pudding"
	},
	{
		id: "f50e8302-6f74-48b7-8e10-983dddf5238a",
		idea: "leg hair"
	},
	{
		id: "225ac0af-39bb-4bf5-8c2f-8e2315260ebe",
		idea: "deodorant"
	},
	{
		id: "c45aecbb-fcd7-4491-8d95-f80042ca5727",
		idea: "a ring"
	},
	{
		id: "8dcd45a5-2387-4f49-b2db-84beab28d549",
		idea: "an open drain"
	},
	{
		id: "da32dd4c-bf97-4b3b-9588-bcff26bc6d85",
		idea: "a balloon animal"
	},
	{
		id: "66ef13cd-57f1-4591-9094-79245d51be46",
		idea: "an orchestra"
	},
	{
		id: "97e6644b-6502-4804-b4a1-b2810fdb5656",
		idea: "rotten food"
	},
	{
		id: "3fb23103-f0a5-411b-9a81-d6a499534180",
		idea: "a tentacle",
		fantasy: true,
		horror: true
	},
	{
		id: "8c28b962-187f-413e-aeea-6b34b79379bf",
		idea: "a chemistry set"
	},
	{
		id: "f40c2620-5384-4c73-9b97-7e0c4dab02c4",
		idea: "a flickering light"
	},
	{
		id: "38b68c51-da11-44e5-b92b-579114914bbc",
		idea: "$1",
		plural: [
			"$",
			""
		],
		max: 25000,
		numerals: true
	},
	{
		id: "c9ca11e5-77ab-4438-993e-0bf18876ba25",
		idea: "a six-pack",
		alcohol: true
	},
	{
		id: "0d5fdd45-be00-4ce7-b7c9-86166c394474",
		idea: "land mines",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		plural: true
	},
	{
		id: "933c02e8-7998-4fe7-8242-9c1fa22cd056",
		idea: "a violin"
	},
	{
		id: "90af9bbc-48b4-4fd9-8d80-2101c62f9652",
		idea: "a tell-all book"
	},
	{
		id: "d380690b-7aa7-4879-87b8-57023e7fe801",
		idea: "a thesis"
	},
	{
		id: "1e0e0b78-a410-4654-ad9c-6115c234176e",
		idea: "a calculator"
	},
	{
		id: "2a2248b3-51c0-4aed-aa74-89f344425b13",
		idea: "a polka-dot dress"
	},
	{
		id: "7f4ab596-524d-49d0-8c13-b2ec20aa7311",
		idea: "a striped necktie"
	},
	{
		id: "d8a427e1-969e-46ff-a8fb-33ec87037998",
		idea: "a bowtie"
	},
	{
		id: "b1b627b7-b4d6-4f98-88aa-776d1e2fa503",
		idea: "an ascot"
	},
	{
		id: "14c1ff8e-8b98-4df0-9eee-be643d51f029",
		idea: "a spilled drink"
	},
	{
		id: "33ad9607-9e4d-4808-8033-ff85448c5a8f",
		idea: "a drink of water"
	},
	{
		id: "e6f3349f-5275-4010-b68a-368b4c928902",
		idea: "a blue star",
		scifi: true,
		spacefaring: true
	},
	{
		id: "29c20216-b693-4cf2-bd49-2056fb472fa6",
		idea: "a crucifix",
		mythsReligionsAndMetaphysics: true,
		christianity: true,
		fantasy: true,
		horror: true
	},
	{
		id: "adc09f4f-ddfa-4d07-bd07-27dfd36bd1a6",
		idea: "a tuba"
	},
	{
		id: "ea537f3e-d3dc-43fe-871d-065c9dd67e71",
		idea: "a tube of toothpaste",
		plural: [
			"",
			" tubes of toothpaste"
		]
	},
	{
		id: "b3ad8a09-610a-4ed7-a36f-4f0b57b08b51",
		idea: "smelly socks",
		plural: true
	},
	{
		id: "d8404a9c-12f7-4bd6-890b-8fcec1c4356d",
		idea: "an electrical hazard",
		humanDistress: true
	},
	{
		id: "e75b451c-2142-49e8-b719-f3038b382fed",
		idea: "a butter knife"
	},
	{
		id: "78080dcd-4341-4fc5-a34d-e4843d644482",
		idea: "a letter opener"
	},
	{
		id: "122928b1-9fb2-44b9-9796-fca8a0464bc7",
		idea: "a stopped watch"
	},
	{
		id: "3dbfaba4-f7a4-40fa-b6cf-a64ad37d9c77",
		idea: "a window decal",
		modern: true
	},
	{
		id: "0b7ff515-4fff-437c-981b-04c851ed5b2b",
		idea: "a scale"
	},
	{
		id: "aee67678-2582-4a2b-b7ab-fdd2adddbeb2",
		idea: "a ticket stub"
	},
	{
		id: "dcfa3248-6cef-4830-84ca-a1f083c772c3",
		idea: "a jar of mustard"
	},
	{
		id: "f6222a83-6dd6-4b27-a00f-35b138246591",
		idea: "a black veil"
	},
	{
		id: "3d5755de-d279-4efb-ae0f-8c207c475f67",
		idea: "a belt"
	},
	{
		id: "1edfe21e-36d9-4683-a06b-f1f0bdc4ee07",
		idea: "chalk dust"
	},
	{
		id: "bd5ee5c9-0e79-479b-8e1f-8be1099d1be3",
		idea: "chest hair"
	},
	{
		id: "ca06d49f-ad10-46fc-b7ab-e38f1ce32f32",
		idea: "pubic hair",
		sexual: true
	},
	{
		id: "ed4035b2-b729-4719-a749-4f1a9bcb85ce",
		idea: "nose hair"
	},
	{
		id: "5b6ef2b3-8c43-4014-8171-d35c2e39c038",
		idea: "underarm hair"
	},
	{
		id: "36d325b0-15d8-460c-9680-f333645cae71",
		idea: "crickets at night"
	},
	{
		id: "2f4fa696-bd42-4c6c-a711-31f54b17c91f",
		idea: "a missing fingernail",
		humanDistress: true
	},
	{
		id: "a2d9f807-8434-413b-bd9f-0ec94b0ba627",
		idea: "shower curtains",
		plural: true
	},
	{
		id: "750b61cb-ab99-4d99-99bd-1c984f87bc1c",
		idea: "rubies",
		plural: true
	},
	{
		id: "8668d70f-513c-4269-9e58-cf996e566d1f",
		idea: "eyebrows",
		plural: true
	},
	{
		id: "4a299bb2-3b0a-4edd-81f6-c51e51a0d3f7",
		idea: "corduroy pants",
		modern: true,
		plural: true
	},
	{
		id: "b8c487d2-396c-41bf-912e-887357ffeda6",
		idea: "a handful of beans",
		plural: true
	},
	{
		id: "d6b8bcdd-504c-4bfa-b207-a7041a8fcca6",
		idea: "macaroni and cheese"
	},
	{
		id: "2f019fa8-b9c0-4e1a-9c09-9780c45ba278",
		idea: "spaghetti and meatballs"
	},
	{
		id: "c7eb65a4-0f0d-4a65-b4d4-810355888c2e",
		idea: "a milk crate"
	},
	{
		id: "eed37277-c1bb-4756-a27c-1becb6186bd7",
		idea: "cranberry juice"
	},
	{
		id: "7fffb3f3-9d0f-46cc-99ae-ee5958170a08",
		idea: "pieces of eight",
		plural: true
	},
	{
		id: "a5d9e099-e408-4faa-939b-1153579a8a46",
		idea: "a half-empty glass"
	},
	{
		id: "f85ce1e5-5a17-4c5b-be8a-b8b48bf6e3e9",
		idea: "a half-full glass"
	},
	{
		id: "e1043f3b-69cb-41e9-b1c1-275acfb12c78",
		idea: "a dead battery"
	},
	{
		id: "554d3ebe-3be1-43f2-b032-1651511b4ca2",
		idea: "a leaky faucet"
	},
	{
		id: "fc390cae-117b-4c77-bcbf-a45f96277099",
		idea: "lost teeth",
		humanDistress: true,
		plural: true
	},
	{
		id: "dd5393dc-5907-4364-8199-35e391042885",
		idea: "a dirty toothbrush"
	},
	{
		id: "e0086560-df16-4afe-ac9d-dcf3bafd0306",
		idea: "milk of magnesia"
	},
	{
		id: "6019b1ee-8639-424a-b27b-764ef41eb890",
		idea: "plaster of paris"
	},
	{
		id: "8343fdc9-333e-412a-9430-d3905751f9e9",
		idea: "a tower of empty cans",
		alcohol: true
	},
	{
		id: "67950960-1018-41b7-b4c7-12c2a9451055",
		idea: "a glass eye"
	},
	{
		id: "e06c61a9-1148-4349-92d5-9fae4688607e",
		idea: "dryer lint"
	},
	{
		id: "a1b9d3b5-a4f5-47de-8f4d-6abdeb1564ca",
		idea: "collarbones"
	},
	{
		id: "7cbe2248-8202-4ea2-9144-149f25c2eda5",
		idea: "a trap",
		humanDistress: true,
		animalDistress: true
	},
	{
		id: "6ab4e2ce-dc54-453e-9884-e018356e1ae9",
		idea: "tall grass"
	},
	{
		id: "f2439b05-8008-4868-9fe6-bdd6d6c58050",
		idea: "circles",
		plural: true
	},
	{
		id: "11e380e5-c9c0-470d-a496-d4b8c3b63499",
		idea: "squares",
		plural: true
	},
	{
		id: "520491db-9ff6-4218-a4f4-46233c9fe8eb",
		idea: "triangles",
		plural: true
	},
	{
		id: "71cf9c53-f2f7-439f-9c05-e255f3b5f3d5",
		idea: "a trapezoid"
	},
	{
		id: "30b22c2e-c619-4fb3-89ab-71b3fa336a33",
		idea: "old wine",
		alcohol: true
	},
	{
		id: "f864b9a4-11b0-4a89-8d40-841a31067262",
		idea: "pirate loot",
		historicalFiction: true
	},
	{
		id: "259dd3e6-e7c6-4919-b286-ce867f131cd9",
		idea: "a canary in a coal mine",
		animalDistress: true,
		humanDistress: true
	},
	{
		id: "baa46a00-04c9-4163-abe8-3c9327f2223c",
		idea: "bloody bandages",
		humanDistress: true,
		plural: true
	},
	{
		id: "9b082ebd-03c6-42e5-8d11-f5923e8bd03a",
		idea: "relaxed-fit jeans",
		modern: true,
		plural: true
	},
	{
		id: "35643426-dca5-4c48-97bf-314cc9952778",
		idea: "cut-offs",
		modern: true,
		plural: true
	},
	{
		id: "4c83d531-31f9-463f-8e89-30842fdd86af",
		idea: "skinny jeans",
		modern: true,
		plural: true
	},
	{
		id: "a0f7b3f4-fc46-48d0-a135-908b69142cf7",
		idea: "watermelon"
	},
	{
		id: "ce03b192-5e88-4971-8179-6f1bbeb1fc65",
		idea: "a jock strap",
		sexual: true,
		modern: true
	},
	{
		id: "62dc25a7-61d7-41d3-974d-f49b5008d2ce",
		idea: "a tombstone"
	},
	{
		id: "2ef5bf80-0a3c-445d-b257-b157964694af",
		idea: "a sundial"
	},
	{
		id: "6864e098-f790-4abd-b633-99644b09637b",
		idea: "navels",
		plural: true
	},
	{
		id: "0a99ce5f-3fd1-4dfa-a52b-a555985cc78c",
		idea: "greasy hair"
	},
	{
		id: "857936d8-af0e-47c5-b2d3-cd18803d3090",
		idea: "fingernail clippings",
		plural: true
	},
	{
		id: "52d04044-afbd-4f9b-bc29-66605701dcfe",
		idea: "high heels",
		plural: true
	},
	{
		id: "9a6a19cd-1140-43ae-a19b-7dc124c1edf8",
		idea: "boots",
		plural: true
	},
	{
		id: "07eac4b7-55e1-4755-b01f-9b4eb4849aba",
		idea: "a crack in the wall"
	},
	{
		id: "c8c623cb-ad71-416a-99f7-c8524afaf66c",
		idea: "plastic forks",
		plural: true
	},
	{
		id: "695eca08-dbac-4a5b-94a2-1f25945a8ba4",
		idea: "sporks",
		plural: true
	},
	{
		id: "dd2f41ed-23c0-4bfc-bbab-f0cfcd598e44",
		idea: "a silver spoon"
	},
	{
		id: "cf321f76-702c-4972-8e49-77cba2aea17f",
		idea: "yellow lights",
		plural: true
	},
	{
		id: "bf7d97d7-8d61-493f-82fa-1d40d7fa9f7a",
		idea: "a torpedo"
	},
	{
		id: "a5922466-5121-4fc1-9923-46dbc9119ce0",
		idea: "chimneys",
		plural: true
	},
	{
		id: "f265eb49-3067-4186-8265-582af40a191e",
		idea: "a diary"
	},
	{
		id: "243d7a2f-e70f-49a6-a624-21b45c14d505",
		idea: "homemade cookies",
		plural: true
	},
	{
		id: "fb93d257-83c5-4db8-a404-beae4f810de8",
		idea: "testicles",
		sexual: true,
		plural: true
	},
	{
		id: "c1d7964c-0fcb-413f-ae42-931f4481333c",
		idea: "a record player"
	},
	{
		id: "43aa02f3-589f-4866-b928-e7d3ea6ca2c4",
		idea: "a pot pie"
	},
	{
		id: "32ef0459-8d65-4e61-98f9-f02ea81ed910",
		idea: "motes of dust",
		plural: true
	},
	{
		id: "e4ec22bd-464c-4d17-b487-8d0acc2fba61",
		idea: "bad wigs",
		plural: true
	},
	{
		id: "e739a20a-6fba-4b75-a822-048a923d09e0",
		idea: "a splinter",
		humanDistress: true
	},
	{
		id: "f205080d-e7d3-4fab-9d18-df499ae1f496",
		idea: "a fancy hat"
	},
	{
		id: "05cb1be1-58ba-410e-bde6-bde8cb4929f6",
		idea: "a love potion",
		fantasy: true
	},
	{
		id: "4b285ea7-7110-4326-b220-1019c4745142",
		idea: "a teacup"
	},
	{
		id: "b6468b1f-175e-41da-8869-e819e03bce37",
		idea: "a centrifuge"
	},
	{
		id: "b09a9648-1b4f-4f20-b550-f05171ea1a1f",
		idea: "wings",
		plural: true
	},
	{
		id: "279aaa06-790b-4dc4-bf75-099e7e86410f",
		idea: "an eyebrow piercing"
	},
	{
		id: "bb302768-53c8-46d2-97e5-6e4877279189",
		idea: "a ray gun",
		scifi: true
	},
	{
		id: "7e25d2ad-e8a2-4dad-b368-361871dc9a54",
		idea: "a cardboard cutout",
		modern: true
	},
	{
		id: "dab5411c-5423-48bd-b4cb-fe6c738d4544",
		idea: "hot tea"
	},
	{
		id: "20c8bcce-bb55-469d-989f-bb47e1574c28",
		idea: "iced tea"
	},
	{
		id: "dac4db20-1860-4e09-b36d-cf24156a38c8",
		idea: "parachutes",
		plural: true
	},
	{
		id: "386ab247-67e3-46d7-90d3-79e66604c189",
		idea: "pipes",
		plural: true
	},
	{
		id: "0a2a5858-991f-400c-a790-2ce431c3fb8f",
		idea: "coffee"
	},
	{
		id: "e781d7b2-a232-457c-aadc-4361f56ab01f",
		idea: "visible underwear",
		sexual: true
	},
	{
		id: "3a4c93a8-3a5f-453d-ba2c-206c20009782",
		idea: "a pinch",
		humanDistress: true
	},
	{
		id: "ae9970c6-a448-4fca-849e-39675f78f0b3",
		idea: "a beauty mark"
	},
	{
		id: "3c7c8240-e675-4053-accf-a9c14507104e",
		idea: "pizza"
	},
	{
		id: "c58ccea6-7014-493b-b793-25bb22006557",
		idea: "orchids",
		plural: true
	},
	{
		id: "1c91e3ef-93cb-455f-890c-e13710725752",
		idea: "jambalaya"
	},
	{
		id: "4a0dce08-2738-4e02-9cb2-3b68aff08d83",
		idea: "a magic wand",
		fantasy: true,
		medievalFantasy: true
	},
	{
		id: "2a53d2ae-bc61-4c01-bbd1-108925cfba38",
		idea: "dirty dishes",
		plural: true
	},
	{
		id: "dd499612-ff0c-4224-ac08-6d9eddaf6eb9",
		idea: "a staff",
		fantasy: true,
		medievalFantasy: true
	},
	{
		id: "b238645e-055f-4ffc-abf1-cd40d8b054ab",
		idea: "an unreadable expression"
	},
	{
		id: "dc37ae44-8718-4897-9360-9726f61074e0",
		idea: "a helmet"
	},
	{
		id: "c84039a0-b56b-4268-9a38-90b71c8f518a",
		idea: "diseased fleas",
		animalDistress: true,
		humanDistress: true,
		plural: true
	},
	{
		id: "2c455384-e23c-4ee9-b351-bfdcee0d6d35",
		idea: "an exit sign"
	},
	{
		id: "3f0b8108-4483-45e2-97d9-4747e53ecf48",
		idea: "corrugated metal",
		modern: true
	},
	{
		id: "c50239a5-a79c-443d-862f-d9713cfc98ad",
		idea: "corrugated cardboard",
		modern: true
	},
	{
		id: "4016781c-acc8-4db5-9091-4e8b5c3e9d1e",
		idea: "an empty socket",
		humanDistress: true
	},
	{
		id: "be5722bb-111e-4601-9008-45b63f60143b",
		idea: "a skylight"
	},
	{
		id: "7aae71a3-3652-429c-b52a-920fdf2ebcc7",
		idea: "a jammed keyboard"
	},
	{
		id: "4563beae-594c-414e-b52e-1664539eb958",
		idea: "charcoal"
	},
	{
		id: "a281a774-174f-4bd8-931f-72ca73478544",
		idea: "a bouquet of something that isn't flowers"
	},
	{
		id: "0628d5ee-f15b-49e7-b304-14122de297f0",
		idea: "explosives",
		humanDistress: true,
		plural: true
	},
	{
		id: "d6677fa0-aa43-4154-8a89-4ea7008475e8",
		idea: "a crumpled roadmap"
	},
	{
		id: "83abb5e1-75f2-4d60-bcc0-0fb9f824f140",
		idea: "opium",
		illicitSubstances: true
	},
	{
		id: "7d3b6a33-5419-493f-8526-9b7879c52bf2",
		idea: "a pot belly (beer belly)",
		alcohol: true
	},
	{
		id: "486dc68b-ac6a-4e91-8f03-2f0752ef132c",
		idea: "ridiculous clothes",
		plural: true
	},
	{
		id: "9c59acec-56c8-4b0d-a45f-284572816b02",
		idea: "a large oven"
	},
	{
		id: "2db4a5a9-5a05-49fd-9bbd-033ee2ea9776",
		idea: "a crown"
	},
	{
		id: "8c41640c-5323-4be2-80f1-b15a3b52c2d9",
		idea: "lava lamps",
		plural: true
	},
	{
		id: "1cacdafb-11ff-420c-9842-55e922f78308",
		idea: "kitty litter"
	},
	{
		id: "be0ce3de-e830-4cb9-933e-8ba06497e8de",
		idea: "melting ice"
	},
	{
		id: "4438c691-c0e7-4a04-a5fc-35884e311f85",
		idea: "skimpy outfits",
		sexual: true,
		plural: true
	},
	{
		id: "4eba7165-3ebd-4e1f-a064-bb686f500de9",
		idea: "a jam jar"
	},
	{
		id: "21f54e87-b340-48ec-a3e9-d2bce11b0641",
		idea: "dancing lights in the distance",
		fantasy: true,
		plural: true
	},
	{
		id: "b56c501d-9919-42dc-9f9c-e1d4cae782fb",
		idea: "a cheese danish"
	},
	{
		id: "5a0011c2-6b29-4689-9c92-afa8c85368db",
		idea: "melted chocolate"
	},
	{
		id: "4c77e86f-7732-43dd-bc40-858a22789be7",
		idea: "a shiny new knife",
		humanDistress: true
	},
	{
		id: "5b2ec9a2-d007-4e3e-b2f8-791458e7477d",
		idea: "an old, rusted blade",
		humanDistress: true,
		fantasy: true,
		medievalFantasy: true
	},
	{
		id: "f4f7072f-f36d-47b9-b6ab-be6a9689ea54",
		idea: "an old calendar"
	},
	{
		id: "eaf35eeb-df07-4d40-956a-12e64f3b135e",
		idea: "a cellar door"
	},
	{
		id: "d239cb62-e955-4c9f-8452-688919d5b646",
		idea: "a bloody fingerprint",
		humanDistress: true
	},
	{
		id: "b4612ff9-a523-421c-bcd9-b6c7426b4554",
		idea: "an arcane symbol",
		fantasy: true
	},
	{
		id: "07cb6824-75e7-484e-a1b6-a919b86bba45",
		idea: "cave paintings",
		plural: true
	},
	{
		id: "7699eed1-dafc-47b2-8913-90452928a375",
		idea: "petroglyphs",
		plural: true
	},
	{
		id: "5819718e-1cf1-4c89-ba95-f0a1e6de87a0",
		idea: "a phone charger",
		modern: true
	},
	{
		id: "2c4b5eb0-3dff-4d56-801a-08399e8bff1d",
		idea: "a suspiciously placed rock"
	},
	{
		id: "a0fc2741-e16c-48ad-bc1f-5a64c9495e39",
		idea: "stalactites and stalagmites",
		plural: true
	},
	{
		id: "e5479454-d81b-44d6-bc1d-dfed907f7bf1",
		idea: "torn-out pages",
		plural: true
	},
	{
		id: "7edb81da-de0e-4fe2-b692-961819b363e4",
		idea: "an ugly carpet"
	},
	{
		id: "4bff8732-a449-42c4-8a1e-d1800541e53d",
		idea: "a gourd"
	},
	{
		id: "cec3d59e-4d05-4406-8989-dfb4a3eff2cc",
		idea: "funny-tasting water"
	},
	{
		id: "d2ab52f8-39c7-4a74-984f-fca08df28893",
		idea: "ears",
		plural: true
	},
	{
		id: "53767cb8-8a59-44f1-9a04-c2613114c86a",
		idea: "dirty feet",
		plural: true
	},
	{
		id: "c66ba40d-b6dc-4b7a-8d59-ccb475de756b",
		idea: "clean hair"
	},
	{
		id: "5b0943d3-4cf4-4a3c-b1e3-3e4411acb58d",
		idea: "hairspray"
	},
	{
		id: "a2bd5cdf-fc3b-40d2-89f5-31145aac99ec",
		idea: "yeast"
	},
	{
		id: "7480eefe-f1c0-4afa-a2ab-5fa3950cec61",
		idea: "buffalo",
		plural: true
	},
	{
		id: "f20615e9-ca56-4120-b8f6-113af1e6010a",
		idea: "turpentine"
	},
	{
		id: "c36c12f7-87ff-45b0-ad5f-fe47016934c4",
		idea: "mistletoe"
	},
	{
		id: "9467a9dd-08f9-42e1-824f-b21887fee7c5",
		idea: "fertilizer"
	},
	{
		id: "5ec1cc91-98f1-4934-baeb-79479d7564cb",
		idea: "garlic"
	},
	{
		id: "69e48e1d-f4f1-41df-a2f3-c97f4c122a2b",
		idea: "sushi"
	},
	{
		id: "7c906060-d799-44a0-9d32-c5878727b80d",
		idea: "seaweed"
	},
	{
		id: "85b64ec8-553f-406a-8db1-5f22c1aee653",
		idea: "food that is the wrong color"
	},
	{
		id: "fbe215f4-6d2d-4607-affe-ca900cbfab28",
		idea: "the last of the rations",
		humanDistress: true
	},
	{
		id: "60d36d73-94a8-4885-947c-9f26a7118aff",
		idea: "a bloody nose",
		humanDistress: true
	},
	{
		id: "ac8c9134-d097-425b-8808-63e895847078",
		idea: "a black eye",
		humanDistress: true
	},
	{
		id: "28d6301f-fc4e-44ee-a70f-ee8b71e326a2",
		idea: "a missing tooth",
		humanDistress: true
	},
	{
		id: "3a91cf7d-a4fd-43c1-8a1e-e34b3f4c0c6c",
		idea: "a dislocated joint",
		humanDistress: true
	},
	{
		id: "cc11d0c5-0fa5-4cc9-b0c1-3bc37c618f7b",
		idea: "ground beef"
	},
	{
		id: "01856a2d-3c0d-41b3-a7ff-d9a1435330fa",
		idea: "flat hair"
	},
	{
		id: "d74aeef2-5c23-4e38-9b42-cb39673434a4",
		idea: "curly hair"
	},
	{
		id: "32a6ebdf-c7a1-4a87-9889-dad2ae10e201",
		idea: "a dose of antibiotics",
		humanDistress: true
	},
	{
		id: "e7d15e65-2010-4400-9d02-a806000702ce",
		idea: "dark clouds",
		plural: true
	},
	{
		id: "63597436-dd8f-4db5-ae30-2235138a6b96",
		idea: "slit wrists",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		plural: true
	},
	{
		id: "3cd6e4b7-b968-4d50-a1f7-0f9d7b1f233b",
		idea: "curling toes",
		sexual: true,
		plural: true
	},
	{
		id: "523609d2-aee2-4ce5-adb9-c465e967079e",
		idea: "a fireball",
		fantasy: true,
		medievalFantasy: true,
		humanDistress: true
	},
	{
		id: "32657f92-6fd9-4b4c-b549-fb823d7e5852",
		idea: "calamari"
	},
	{
		id: "04ff3088-d121-4927-bcad-ed37f921941d",
		idea: "marijuana",
		illicitSubstances: true
	},
	{
		id: "28f144ba-0e37-413e-a3c5-e33c444a7e8e",
		idea: "an ad for a lawyer",
		humanDistress: true
	},
	{
		id: "c39ab6c2-83f4-48ed-b0b2-5142be834d69",
		idea: "water"
	},
	{
		id: "05547917-97a9-400f-bfb2-fedba3ad9f17",
		idea: "video games",
		modern: true,
		plural: true
	},
	{
		id: "98af157e-b003-4bbd-9738-9ad67e0225ec",
		idea: "sheet music",
		plural: [
			"",
			" pages of sheet music"
		]
	},
	{
		id: "5f1eed2b-90bc-4a4b-930c-38a6765da34f",
		idea: "polka dots",
		plural: true
	},
	{
		id: "ea1c9f38-4a8a-4183-9a4d-29be973e2fdc",
		idea: "metallic echoes",
		plural: true
	},
	{
		id: "0a1b8e23-2d67-413e-bb8f-e8886df5972f",
		idea: "glitter"
	},
	{
		id: "64b3760c-3c78-456f-83f2-601a2917aa59",
		idea: "fog"
	},
	{
		id: "fe7bd189-cdf3-4685-856a-13b2cb3ce757",
		idea: "zinc"
	},
	{
		id: "158dac37-31f3-4190-b5df-1c325904d435",
		idea: "frost"
	},
	{
		id: "642599fc-99b9-4325-9bbb-4950b169f608",
		idea: "origami"
	},
	{
		id: "f8842a3a-c1ff-41ac-b2b7-52f1a2aa62ef",
		idea: "aspirin",
		humanDistress: true
	},
	{
		id: "9bb2cd7a-3fea-43e1-937d-127991bc49a2",
		idea: "sand"
	},
	{
		id: "5d2759e5-e8b1-4af2-b778-f4bba2451751",
		idea: "lava"
	},
	{
		id: "a77074d0-9ed0-4e6c-bbde-20b09b767a18",
		idea: "gravel"
	},
	{
		id: "e8ef9b0b-0b2d-4642-8646-20684c41d964",
		idea: "monkeys everywhere",
		plural: true
	},
	{
		id: "4899f53f-1a3a-4e20-837c-0c9ccc3cfcb4",
		idea: "smog"
	},
	{
		id: "9ea92364-93ea-4e1b-b6e3-6a650b57e0a2",
		idea: "pointed ears",
		fantasy: true,
		scifi: true,
		medievalFantasy: true,
		plural: true
	},
	{
		id: "cbf984b8-3906-4544-b79e-ea223e20baba",
		idea: "smoke",
		tobacco: true,
		humanDistress: true
	},
	{
		id: "6bf32356-fcb9-46a8-8dcd-071e65fb1d29",
		idea: "too much salt"
	},
	{
		id: "c41170ac-bd58-4a34-b13a-bde4c1c7f23b",
		idea: "carbon nanotubes",
		scifi: true,
		plural: true
	},
	{
		id: "82fc5a9c-b494-4df5-babe-9f7e8941cc8c",
		idea: "gun oil",
		humanDeath: true,
		humanDeathViolent: true,
		humanDistress: true
	},
	{
		id: "9427ac55-e97c-4843-a5d3-0374b47a42c5",
		idea: "the minutes of the meeting",
		modern: true,
		plural: true
	},
	{
		id: "d15a8e69-0e7f-4100-a730-119bafb028c6",
		idea: "silver"
	},
	{
		id: "20dbf9b1-fb90-4e2a-a46e-3d062ae2093c",
		idea: "ions",
		scifi: true,
		plural: true
	},
	{
		id: "ceb31195-59ee-44d5-9600-aa7ca8af32a5",
		idea: "a blip on the radar"
	},
	{
		id: "2626d160-38a8-49b5-896c-7c142e4da7ee",
		idea: "checkers",
		plural: true
	},
	{
		id: "a454d3d6-838e-4f1e-947b-4beb64bf355b",
		idea: "mother of pearl"
	},
	{
		id: "e1a305b7-c654-4a21-a48d-ce8397f18a82",
		idea: "root beer"
	},
	{
		id: "d44086c6-ff7f-4736-b89c-8fe2937ce172",
		idea: "a navy"
	},
	{
		id: "68357f28-87ef-496d-85c5-e77c26b62893",
		idea: "toenail fungus",
		humanDistress: true
	},
	{
		id: "ed4b34eb-17e6-427b-bdb0-713ddd6dd6d0",
		idea: "living furniture"
	},
	{
		id: "86d44b3c-5b04-4993-b63f-923ae4187f28",
		idea: "goosebumps",
		humanDistress: true,
		plural: true
	},
	{
		id: "f2008d46-0cd8-43f6-88d4-28a77ae8a16a",
		idea: "lather"
	},
	{
		id: "1bc4ad39-f5ad-445f-b4f1-1b09f61780b5",
		idea: "acid",
		illicitSubstances: true,
		humanDistress: true
	},
	{
		id: "75f31637-1e2d-42de-bfbe-f2d124327c6b",
		idea: "dog slobber"
	},
	{
		id: "af81b3f1-ce6f-46b0-b4ff-466251c68b7a",
		idea: "ripples",
		plural: true
	},
	{
		id: "182bffc8-69ef-4a5a-bb7e-f44490458cf9",
		idea: "the wind"
	},
	{
		id: "3b6b0539-ef81-408b-ae49-0cee9a47069c",
		idea: "crumbling infrastructure",
		modern: true,
		humanDistress: true
	},
	{
		id: "5d6e6008-69a6-4879-80cc-e00eab75cbcd",
		idea: "those mountains in the distance",
		plural: true
	},
	{
		id: "a78c2665-a064-478d-bb27-ac0f82f829bc",
		idea: "an out-of-control blaze",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		animalDeath: true,
		animalDistress: true
	},
	{
		id: "49851daf-72ca-4ede-a6b9-d9bf3fa3ecbf",
		idea: "fake snow"
	},
	{
		id: "35c2ba61-aadc-407c-be1b-fff1a6687c94",
		idea: "a dreidel",
		mythsReligionsAndMetaphysics: true,
		judaism: true
	},
	{
		id: "361d2d24-ae2b-46af-95f9-f4eb9561a840",
		idea: "a lit menorah",
		mythsReligionsAndMetaphysics: true,
		judaism: true
	},
	{
		id: "2fb630c1-ee85-47d6-a8b9-f1bad68c9cb3",
		idea: "a Ouiji board",
		mythsReligionsAndMetaphysics: true,
		metaphysics: true
	},
	{
		id: "f6c7a650-8047-43dd-9b86-9367a7d3c8d5",
		idea: "a dowsing rod",
		mythsReligionsAndMetaphysics: true,
		metaphysics: true
	},
	{
		id: "897ca8c9-646d-4695-83ce-742335436f1e",
		idea: "ectoplasm",
		mythsReligionsAndMetaphysics: true,
		metaphysics: true
	},
	{
		id: "2d51b3a8-5913-4085-be4c-3de008f08e70",
		idea: "crop circles",
		plural: true,
		mythsReligionsAndMetaphysics: true,
		metaphysics: true
	},
	{
		id: "d8e23274-2a07-4e95-907b-a0d7e1da9526",
		idea: "a campfire"
	},
	{
		id: "2457bda6-7cbe-484d-8045-62338ca36fac",
		idea: "sleeping bag",
		plural: "s"
	},
	{
		id: "0c037d4c-ea7b-4dc5-9312-9992dcd26187",
		idea: "an empty coffin",
		horror: true,
		humanDistress: true,
		humanDeath: true
	},
	{
		id: "9c8bc77e-dd3a-4c75-90eb-8db067a3a498",
		idea: "strange shadows",
		plural: true,
		horror: true
	},
	{
		id: "373458a6-d120-444f-9848-ad5ad943eec6",
		idea: "pyramid",
		plural: "s",
		rateBy: 2,
		max: 3
	},
	{
		id: "4c90adbf-5c54-4a2a-8cd3-94364e27eda3",
		idea: "a bag of sand",
		plural: [
			"",
			" bags of sand"
		],
		rateBy: "incremental",
		max: 15
	},
	{
		id: "5d5a05c9-2a0e-4a15-b303-37f25a19b625",
		idea: "apple",
		plural: "s",
		article: "an"
	},
	{
		id: "ecdb4f60-235e-4e12-8af5-658b5a38da2d",
		idea: "orange",
		plural: "s",
		article: "an"
	},
	{
		id: "711e0790-9b42-48bd-87bb-191cf2905e27",
		idea: "bright red hair"
	},
	{
		id: "f3f06715-18f2-4d41-b260-a0a640c0ec79",
		idea: "frozen yogurt",
		modern: true
	},
	{
		id: "ccac9f4f-3999-4bc6-b3ae-e79099c2729d",
		idea: "shrunken laundry"
	},
	{
		id: "e57cfed7-6d38-4f3d-9887-7f5ed91599bb",
		idea: "ceiling fan",
		plural: "s"
	},
	{
		id: "623f1d36-b609-4569-9470-11fa28a179e9",
		idea: "gauzy scarves",
		plural: true
	},
	{
		id: "f26d8302-62ea-4af3-b941-f483e7f39fa6",
		idea: "a package",
		sexual: true
	},
	{
		id: "f3a451dd-679c-496d-a0a7-a29d67a9b2b0",
		idea: "stack of books",
		plural: [
			"",
			" stacks of books"
		],
		rateFavorsLower: false
	},
	{
		id: "3c804f57-584a-411d-9952-cc9366be92d8",
		idea: "protein shake",
		plural: "s"
	},
	{
		id: "009ca5be-dc26-4a79-bde1-d372c889bb44",
		idea: "a set of pom-poms"
	},
	{
		id: "7c7e9e93-56fd-4ab1-ae69-f1d4c3bea683",
		idea: "a Bible",
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "7b179f39-0a19-49f6-a488-ebbd9aebc94e",
		idea: "a copy of the Koran",
		mythsReligionsAndMetaphysics: true,
		islam: true
	},
	{
		id: "4e171c82-327d-45fa-be75-fa33ae5f429f",
		idea: "a thimble"
	},
	{
		id: "85683ca8-36e5-444f-8fe3-7f1ce0106183",
		idea: "a hammer"
	},
	{
		id: "76a6c01e-7476-4d6f-aa97-8166145ffbc5",
		idea: "a jackhammer"
	},
	{
		id: "43609d7a-2dda-4232-a016-e093f6cc40b6",
		idea: "a meteorite"
	},
	{
		id: "06b32495-8c43-4d87-9688-e682c4b66113",
		idea: "crayon",
		plural: "s",
		max: 16
	},
	{
		id: "620113d4-7d0c-4a60-8786-b4d33b541b34",
		idea: "a pencil"
	},
	{
		id: "bd8416cb-e9a9-41fb-99e6-41e6212b0534",
		idea: "a pen"
	},
	{
		id: "8471f25a-c354-4877-ba8f-2e983912d2b0",
		idea: "hot peppers",
		plural: true
	},
	{
		id: "d8b83405-f7d0-4659-88de-5d73be4b9551",
		idea: "katana",
		plural: "s",
		max: 2,
		historicalFiction: true,
		samurai: true
	},
	{
		id: "4c7db7d6-ab13-4f31-83ef-58b41caf06d7",
		idea: "cherry blossoms",
		plural: true,
		historicalFiction: true,
		samurai: true
	},
	{
		id: "405d5c4c-eff7-4e7b-ae29-cac6e22a3b92",
		idea: "a lump of gristle"
	},
	{
		id: "8d30be78-e618-4deb-b04f-4a560779a7a2",
		idea: "a bottle of Hennessy",
		properName: true,
		alcohol: true
	},
	{
		id: "c4dcb998-61fc-433d-a601-f759e3a3f920",
		idea: "back hair"
	},
	{
		id: "22534519-66b5-4df7-bd98-e699a533fd13",
		idea: "a vending machine"
	},
	{
		id: "bd5c4dd5-e650-469c-876a-384313c105b8",
		idea: "the number 1",
		plural: [
			"the number ",
			""
		],
		min: 1,
		max: 99,
		rateFavorsLower: true
	},
	{
		id: "db3a898b-ff58-488b-a8c5-4f329c0425e2",
		idea: "a block of polished marble"
	},
];

const objects: AnObject[] = info.map(bit => ({ ...base, ...bit }));

export default objects;
