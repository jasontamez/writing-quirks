import { CoreIdea, Topic, TypedObject } from "./Ideas";

const base: TypedObject = {
	type: "topic"
};
const info: (Partial<Topic> & CoreIdea)[] = [
	{
		id: "7d2c2fbe-b3c5-4a7f-9cf1-ebbad47bff47",
		idea: "film noir"
	},
	{
		id: "7ddf16e2-d11d-4fed-a79e-53a01ca5455b",
		idea: "unrequited love"
	},
	{
		id: "8445ff71-1744-480f-a1d2-d977e70edf5f",
		idea: "ghosts",
		fantasy: true,
		horror: true,
		mythsReligionsAndMetaphysics: true,
		metaphysics: true
	},
	{
		id: "d2f0d9fc-c1f6-4b51-923f-abe3c29ce35b",
		idea: "sex",
		sexual: true
	},
	{
		id: "850e2b4f-0b6d-4820-ae1d-af7150360f55",
		idea: "OCD",
		humanDistress: true
	},
	{
		id: "b3f1ed62-3292-43c7-8a7c-7dff9b515efb",
		idea: "quantum physics",
		scifi: true
	},
	{
		id: "818baef8-be17-4384-8d94-2615e097f13b",
		idea: "translucent colors"
	},
	{
		id: "6b2892c4-a836-4996-962a-fa1015a2cd29",
		idea: "the color red"
	},
	{
		id: "44404285-d1e1-4a32-b6f6-41370b0d1f4d",
		idea: "the color orange"
	},
	{
		id: "c9f12857-bd04-49b2-886d-36cb5f908d3b",
		idea: "the color yellow"
	},
	{
		id: "367c56d0-243a-4f73-bc39-c7a0ef09c574",
		idea: "the color green"
	},
	{
		id: "d8d06cab-117a-4b7b-b00c-a1b65aae786a",
		idea: "the color blue"
	},
	{
		id: "7d7a3e81-47fa-4aff-bebd-a19bb0cfea44",
		idea: "the color purple"
	},
	{
		id: "2c2d1743-6dd1-46ed-a905-8e34e6ccaba1",
		idea: "the color violet"
	},
	{
		id: "2a6d974d-e23f-408f-858d-3e198304fdd3",
		idea: "the color black"
	},
	{
		id: "9b7aa18d-21e6-44d8-af6f-fc03d7e2c0ac",
		idea: "the color white"
	},
	{
		id: "ff91e7f6-4fab-4dea-ae92-017b2026976d",
		idea: "the color gray"
	},
	{
		id: "b7aefc3c-1d3a-4704-b3fe-0abb2b6cec02",
		idea: "the color brown"
	},
	{
		id: "bdf2626f-e9a2-41a4-a773-b29261a1c1d2",
		idea: "the color pink"
	},
	{
		id: "4a0cc66c-d9fb-448d-80cc-b88843ca2b7d",
		idea: "silence"
	},
	{
		id: "3b39b575-366c-441e-ad92-c78e6f59ea57",
		idea: "alien life",
		scifi: true,
		spacefaring: true
	},
	{
		id: "0f4ea001-2198-48b3-bf7b-c415af9b9f29",
		idea: "prime numbers"
	},
	{
		id: "67638ac8-6265-4d41-b14d-64098d181faf",
		idea: "westerns"
	},
	{
		id: "8c03da62-28fc-4df0-9974-44a10f1d7428",
		idea: "Wikipedia",
		properName: true,
		modern: true
	},
	{
		id: "31f604f7-5b54-4604-a5c2-0f95621a9ecd",
		idea: "\"the other\""
	},
	{
		id: "d9e195f9-bbdc-4a5c-b610-fc30619383b6",
		idea: "happiness"
	},
	{
		id: "0283f29a-e985-48e3-969c-5b48c2dfe102",
		idea: "animal magnetism"
	},
	{
		id: "7ff995a2-e5fb-420e-ba31-b5a1422a4f03",
		idea: "Pokemon",
		properName: true,
		modern: true
	},
	{
		id: "6ba35a22-ab9d-4bcb-9564-b9906dc9e688",
		idea: "stupidity"
	},
	{
		id: "4bbd8929-b336-477f-908e-540ab38e7ed2",
		idea: "reality TV",
		modern: true
	},
	{
		id: "7123800d-1db8-4daa-bc8b-9411701c2c67",
		idea: "too much free time"
	},
	{
		id: "0df5467e-c873-492c-b3a7-940d68d3e52f",
		idea: "introspection"
	},
	{
		id: "ff966140-58a8-459a-a8f4-36bc9241738c",
		idea: "WiFi",
		modern: true
	},
	{
		id: "e61e00c6-37d0-4ab1-9e11-7839dbf3adf6",
		idea: "electricity"
	},
	{
		id: "0a587948-bdc2-4569-8dec-1a13f4d985ca",
		idea: "the need for a night light",
		humanDistress: true
	},
	{
		id: "b65c9c83-7efd-4103-951d-28c21d1fd2f0",
		idea: "xenophobia"
	},
	{
		id: "129a5b52-ad13-4b39-96b4-cbcaf4934f16",
		idea: "car racing"
	},
	{
		id: "9c7384c2-1ee0-4e2d-be2c-479f8508c21b",
		idea: "umami"
	},
	{
		id: "a639b8a2-a2ca-4acb-b0c4-bd85451a6ec4",
		idea: "youth"
	},
	{
		id: "988a77ac-5f3d-48bd-bdc7-e417b47d5aa8",
		idea: "locomotion"
	},
	{
		id: "ddb5d210-62e1-417b-8d45-4c0d9d1e3c2b",
		idea: "cancer",
		humanDistress: true
	},
	{
		id: "da0fb449-5591-4278-abec-b7a64be45960",
		idea: "bronze"
	},
	{
		id: "1499636c-fbf4-47ce-bc95-fa33ed7fc780",
		idea: "indoor plumbing"
	},
	{
		id: "e502b5f5-5751-4436-b406-f1aebb9c45c8",
		idea: "joy"
	},
	{
		id: "c2897c69-c227-44b1-a901-3248f5c09336",
		idea: "tie dye"
	},
	{
		id: "003d08f8-33cf-4e16-b8f3-6e0d85c81328",
		idea: "pornography",
		sexual: true
	},
	{
		id: "8068e1fe-13db-47e6-954b-c379968a614c",
		idea: "the best value"
	},
	{
		id: "3a6a2d4a-ec18-4d7d-bc3c-7d89d96f917d",
		idea: "math"
	},
	{
		id: "585a920f-f1f3-482b-9a38-445b7c49a5d2",
		idea: "the number zero"
	},
	{
		id: "e4ee45b2-1de5-4ff4-bcfb-821ec5f3d63c",
		idea: "amputation",
		humanDistress: true
	},
	{
		id: "f09bf733-b6e9-4829-b873-62a20ed027d4",
		idea: "adult circumcision",
		sexual: true,
		humanDistress: true
	},
	{
		id: "6ceb7607-479a-444a-8b01-fea3bbc5c68e",
		idea: "lactose intolerance",
		humanDistress: true
	},
	{
		id: "a61ef21f-00de-41ab-abe3-428448876523",
		idea: "quality"
	},
	{
		id: "8dfbde22-4eb8-4a93-8a74-c8f2cfcf9a97",
		idea: "boredom"
	},
	{
		id: "9d94f688-3a7e-4a52-920d-2cdd22e471ef",
		idea: "victory"
	},
	{
		id: "d089e061-2301-4df0-bba5-6f2c4e1a53f8",
		idea: "high-pitched voices"
	},
	{
		id: "ce2ae3de-1c82-4a15-925b-0a2837e55c4d",
		idea: "the smell of bacon"
	},
	{
		id: "409b90c7-8ed7-40c5-b325-f90ce9cf368a",
		idea: "telekinesis",
		fantasy: true,
		scifi: true
	},
	{
		id: "9d390e90-43a5-46b7-9e1e-8e697afb0e45",
		idea: "voodoo",
		fantasy: true,
		mythsReligionsAndMetaphysics: true
	},
	{
		id: "01a4f143-c63e-49ba-8716-f1909f28d8e0",
		idea: "gentrification",
		modern: true
	},
	{
		id: "f5a3ceae-aa6e-43bc-8605-f9cb0d88c036",
		idea: "racial profiling",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		modern: true
	},
	{
		id: "d82c49be-b7ff-4884-b6a4-e52acfddc021",
		idea: "plaid"
	},
	{
		id: "c6e2890f-ea45-4c08-b811-da0f9beb775f",
		idea: "mad science",
		scifi: true
	},
	{
		id: "90d0c40d-aa2c-4f15-8a5f-67ead7350cdb",
		idea: "professional football",
		modern: true
	},
	{
		id: "6a553f60-caf5-4887-850c-9ab4881a34c0",
		idea: "ballet"
	},
	{
		id: "3e5f705b-0135-4ccd-8f6d-22107dc50c40",
		idea: "gossip"
	},
	{
		id: "e328cc65-4113-42fd-af21-a04f951dc35f",
		idea: "jazz"
	},
	{
		id: "1c7bd058-c60d-461d-baa3-08a26e90b233",
		idea: "nepotism"
	},
	{
		id: "d552a701-7ce5-4b74-a6ad-ddbd26837284",
		idea: "the Anasazi",
		properName: true
	},
	{
		id: "5f0be154-0c95-4e1e-ab1c-b446257ccd12",
		idea: "a trademark"
	},
	{
		id: "9dd3aa09-5b30-4c62-834e-2f8e8aead1dd",
		idea: "terminal velocity",
		humanDistress: true
	},
	{
		id: "84a98016-0807-4135-814d-389e67317f4e",
		idea: "a twanging sound"
	},
	{
		id: "875a61dc-5809-4564-aae9-b19aaffbdf64",
		idea: "vanilla"
	},
	{
		id: "00879cb5-ef8e-4a3c-9ccf-e731781b1b97",
		idea: "Star Trek",
		properName: true,
		scifi: true,
		spacefaring: true,
		modern: true
	},
	{
		id: "1829c2ba-f3ba-472e-af30-9bcfac81821f",
		idea: "sarcasm"
	},
	{
		id: "4ac90223-745b-4f30-9b9c-c68f1734fd44",
		idea: "identity theft",
		humanDistress: true
	},
	{
		id: "c2dbcefd-df2d-469f-9787-850036cc8fec",
		idea: "bacterial meningitis",
		humanDistress: true,
		humanDeath: true,
		humanDeathNatural: true
	},
	{
		id: "1479b508-fbae-40be-bf35-dfa062014f0c",
		idea: "surprising news"
	},
	{
		id: "85a998ca-4313-4ccb-bad5-1e3bcc1c91a0",
		idea: "quickness"
	},
	{
		id: "ecd8908a-da55-4423-8688-e73fb22036d9",
		idea: "karaoke",
		modern: true
	},
	{
		id: "b2c3d5b1-632e-4436-949d-1dd9109e37ee",
		idea: "the game \"Simon Says\""
	},
	{
		id: "2e86e41b-eacf-4c10-aaca-b008d5383933",
		idea: "that \"new car\" smell",
		modern: true
	},
	{
		id: "d6a9a22e-ec74-4ae4-ad32-37b74ad6301f",
		idea: "molestation",
		humanDistress: true
	},
	{
		id: "d1fb33a3-64e2-4899-a7cb-dc958c4f6796",
		idea: "domestic violence",
		humanDistress: true
	},
	{
		id: "d4b819e2-f1db-4db9-bacb-23aef6dcf520",
		idea: "the happiest day"
	},
	{
		id: "7ec92662-9039-4b88-b327-f2c03dc2ad5b",
		idea: "pure luck"
	},
	{
		id: "ca145741-9ac3-4359-8eaa-18858bc22325",
		idea: "Victorian values",
		properName: true,
		humanDistress: true,
		historical: true
	},
	{
		id: "98a5a486-777d-4be4-831f-7180ca3426df",
		idea: "body deformities",
		humanDistress: true
	},
	{
		id: "d69f93e2-dabc-4e76-a59b-cba1e0e88a44",
		idea: "public nudity",
		sexual: true,
		humanDistress: true
	},
	{
		id: "25fbc42e-03b8-4f54-8b8d-94b59eb498ef",
		idea: "Snapchat"
	},
	{
		id: "0fbc7d51-0dd8-4914-85ab-1363ed9615f6",
		idea: "complete surrender",
		humanDistress: true
	},
	{
		id: "f79aab99-acd1-46a2-8765-82e9c3c3747b",
		idea: "hope"
	},
	{
		id: "528bd9d6-d553-4caf-9fa3-eb31136eed0f",
		idea: "morality"
	},
	{
		id: "8bc8f918-0392-418e-8dd6-e47f4b5b3647",
		idea: "the lesser of two evils"
	},
	{
		id: "297c129e-44d3-4531-aa36-77a027ca18dc",
		idea: "gothic horror",
		horror: true
	},
	{
		id: "1c64f467-c3ee-4a2a-b2d9-734298b2c957",
		idea: "night blindness"
	},
	{
		id: "ff171358-7035-42c8-8078-544b7feef3dc",
		idea: "when a dog needs grooming",
		animalDistress: true
	},
	{
		id: "6aac2214-f9dd-4855-8f04-da2b0356860c",
		idea: "wedding vows"
	},
	{
		id: "906e1044-38fe-431e-83f8-a9628710b068",
		idea: "a chill down someone's spine"
	},
	{
		id: "b4deb88b-9b04-4120-9b5b-d1a63a44d977",
		idea: "bisexuality",
		sexual: true
	},
	{
		id: "b33beb16-4b6f-47e8-89bf-cd2ae9b838d5",
		idea: "truth"
	},
	{
		id: "0d6f35a9-1223-4892-b5a7-29455422ed85",
		idea: "justice"
	},
	{
		id: "beaaeb6a-eeb6-4bbf-ac73-49b69c09e65c",
		idea: "metaphors"
	},
	{
		id: "2519ef00-f984-402e-89e6-7a9c7dce5ddf",
		idea: "a Disney song",
		properName: true,
		modern: true
	},
	{
		id: "fa3f74c9-b1b6-4264-a8f5-fa39b12172e3",
		idea: "multiplication tables"
	},
	{
		id: "f0017de3-36d7-4878-aa67-6e4ada02d924",
		idea: "calculus"
	},
	{
		id: "ef3474b9-1a70-43da-b6ef-117dc3de414c",
		idea: "geometry"
	},
	{
		id: "6078ddfe-66d9-4035-9059-3e91959f6c53",
		idea: "biology"
	},
	{
		id: "6e1bed73-9b22-4d61-867f-e9db20ece0da",
		idea: "physics"
	},
	{
		id: "e4bdcd1b-c289-4c0b-b066-3862b2fd62d2",
		idea: "the speed of light"
	},
	{
		id: "5001f233-0475-4ef5-a185-eddcec956bee",
		idea: "a rerun on TV"
	},
	{
		id: "06403976-91ef-4493-b6a3-c339da0d2993",
		idea: "a podcast",
		modern: true
	},
	{
		id: "65b91600-30ac-4a74-8dcd-51c95d924304",
		idea: "YouTube",
		properName: true,
		modern: true
	},
	{
		id: "d6c55995-25f5-439c-be7d-1355d6b1cbff",
		idea: "a fad diet",
		modern: true,
		humanDistress: true
	},
	{
		id: "757dbfd9-5a5c-4e28-a8d7-705e2bd16990",
		idea: "the downtown skyline"
	},
	{
		id: "09a9c6cd-fec1-487b-93ab-c4531605486a",
		idea: "liquid gold"
	},
	{
		id: "beec2f89-77b0-4721-a5ed-0b68d203ec8d",
		idea: "pirouettes"
	},
	{
		id: "f234e706-9662-4b1c-8b44-74f95cf6d94c",
		idea: "the flu",
		humanDistress: true
	},
	{
		id: "055395a8-9963-4364-a464-1c9b2262b134",
		idea: "unwanted attention",
		humanDistress: true
	},
	{
		id: "6f1cafb4-73d9-4e83-b1b2-ee940f6c1ea2",
		idea: "nightmares",
		humanDistress: true
	},
	{
		id: "e6fa1e75-257f-481b-a345-369c1b1b5141",
		idea: "a suntan"
	},
	{
		id: "3100e13b-8642-4a1b-ba48-e49e51228c51",
		idea: "NPR",
		properName: true,
		modern: true
	},
	{
		id: "1317346d-d895-4fdb-8c7d-a7a0f754f9df",
		idea: "morse code"
	},
	{
		id: "7aa700e6-87d3-40f9-8d37-bcf0ef3bb240",
		idea: "braille"
	},
	{
		id: "3c03980b-8400-4752-baec-e4c869ec6d01",
		idea: "sign language"
	},
	{
		id: "a84098fa-ad65-4b92-8636-ce7e89069101",
		idea: "mindless repetition"
	},
	{
		id: "a426e1e7-057c-485b-a6df-d922e2d70ac3",
		idea: "echoes"
	},
	{
		id: "ae1ed542-0f37-4d62-9661-6da2e5f93ff5",
		idea: "Amazon.com",
		properName: true,
		modern: true
	},
	{
		id: "9b2f7c7b-4e3b-4937-a7b7-787571371ebe",
		idea: "trench warfare",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "9c91f82a-0054-4379-8800-591b3e778e3c",
		idea: "a deep, dark secret",
		humanDistress: true
	},
	{
		id: "314d6d19-2284-4af3-9ea4-e5fcea4717eb",
		idea: "sex without condoms",
		sexual: true
	},
	{
		id: "9970786d-f869-434a-b29a-4dbed559727c",
		idea: "unlawful penetration",
		sexual: true,
		humanDistress: true
	},
	{
		id: "363f3ec6-eb10-4169-9e7a-5fba10728f88",
		idea: "LSD",
		illicitSubstances: true
	},
	{
		id: "ba81ffd4-4689-4de2-bf1c-ab5b0209e3a6",
		idea: "the number 666",
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "7f403f92-3fe6-45e3-bff2-548b8e97f1d7",
		idea: "amnesia",
		humanDistress: true
	},
	{
		id: "d8c8ccd6-3c2b-4849-8b30-83206685c3f7",
		idea: "a sonic boom"
	},
	{
		id: "8c6a83ae-4ffa-466f-8f99-9fa7c4ec258d",
		idea: "a superhero movie"
	},
	{
		id: "ca436427-f479-43d3-afde-9333482d7dfd",
		idea: "quiet reflection"
	},
	{
		id: "e0d10869-9bb1-4bbb-be37-05fcf7fcac53",
		idea: "gingivitis",
		humanDistress: true
	},
	{
		id: "7341e93e-22d9-4acb-acfd-d59dd774b638",
		idea: "conjunctivitis",
		humanDistress: true
	},
	{
		id: "b83d5d00-1929-47d0-ac8d-ab2494e56cb7",
		idea: "unnecessary surgery",
		humanDistress: true
	},
	{
		id: "8a092df7-ba08-4ef2-94df-3f315b1bd729",
		idea: "corruption",
		humanDistress: true
	},
	{
		id: "6a228893-e49b-4b8e-8278-2b1c06e81c46",
		idea: "deception",
		humanDistress: true
	},
	{
		id: "1521f1e8-bf86-4b56-82be-aee5a1e4a841",
		idea: "anxiety",
		humanDistress: true
	},
	{
		id: "efca896a-f3c5-494c-a9ef-82ea7f903658",
		idea: "cruelty",
		humanDistress: true
	},
	{
		id: "edbde4a8-b4c9-4029-a697-8a22391404f9",
		idea: "loyalty"
	},
	{
		id: "1b1eceee-81f6-4d8d-8937-641c8795d288",
		idea: "survival"
	},
	{
		id: "36265f68-e90f-4975-8a95-2566a09c623b",
		idea: "the one that got away"
	},
	{
		id: "822baacf-99dd-4663-ba11-3ff235c97d2b",
		idea: "a lifetime"
	},
	{
		id: "4619b80b-16df-4900-9de2-1783ada395a9",
		idea: "the unknown"
	},
	{
		id: "91bf6b85-38e8-4362-a160-b59eb4f82e01",
		idea: "black and white"
	},
	{
		id: "e23767f0-8a58-4827-8111-b58770294452",
		idea: "power over life and death",
		fantasy: true,
		scifi: true
	},
	{
		id: "5dd7854c-8e09-4381-ad6d-7c71ca38c3fe",
		idea: "an empty bank account"
	},
	{
		id: "fcbe2a32-debd-4b02-b1a2-c261e3b35fd4",
		idea: "darkness"
	},
	{
		id: "d0ba395e-63fe-4c68-a5d3-d43bca432fe7",
		idea: "unspeakable horror",
		fantasy: true,
		horror: true
	},
	{
		id: "b75869b6-ee78-4249-ab0e-69cd95f255a6",
		idea: "lucky number seven",
		mythsReligionsAndMetaphysics: true
	},
	{
		id: "b2c4b530-2601-41e1-987f-b3545beca796",
		idea: "carpel tunnel syndrome",
		modern: true
	},
	{
		id: "52075c4a-4911-4855-890b-54d1e1c39319",
		idea: "Freudian imagery",
		properName: true,
		sexual: true
	},
	{
		id: "34ce0249-941f-4366-9ee1-3634f15424e4",
		idea: "hypergraphia",
		modern: true
	},
	{
		id: "64de22a9-4f52-494f-a83c-c8e1418d5458",
		idea: "hyperactivity"
	},
	{
		id: "5b70e29b-66a0-4f7d-ab16-1237dcd3483d",
		idea: "a familiar fragrance"
	},
	{
		id: "71d697e0-a1b5-4a0f-9ebf-2c28ee413da8",
		idea: "laughter in the rain"
	},
	{
		id: "0f092633-ab7f-48b2-8e4d-ef8cd167d7e7",
		idea: "hysterics",
		humanDistress: true
	},
	{
		id: "009a7f58-5261-47bb-9290-21041f886101",
		idea: "tic-tac-toe"
	},
	{
		id: "1fe5870e-b9ff-4c0c-818e-ede3deba5e4f",
		idea: "dueling banjos",
		humanDistress: true
	},
	{
		id: "78aaee6a-3bcb-4d3c-8df5-f9e3c3c65b8b",
		idea: "planetary exploration",
		scifi: true,
		spacefaring: true
	},
	{
		id: "46859a31-b4a0-475d-948d-22a8705c877d",
		idea: "\"coursing through veins\"",
		illicitSubstances: true
	},
	{
		id: "1a608dbf-1e57-49c3-9c86-8dc566d9ee18",
		idea: "courage"
	},
	{
		id: "6b4ecf11-6acf-4b16-b714-39d8fc7c83d1",
		idea: "a bad haircut",
		humanDistress: true
	},
	{
		id: "5cc2574a-0b3b-4261-9e11-2c0eb2765847",
		idea: "hair of the dog",
		alcohol: true
	},
	{
		id: "53b46ed9-c7a7-479b-bd67-eb6c6d31cd86",
		idea: "a chirping noise"
	},
	{
		id: "e5133118-e899-4532-a897-1926a57b9cef",
		idea: "liposuction",
		modern: true
	},
	{
		id: "a746be14-6be9-4b6e-a8eb-13fe73c93c4a",
		idea: "criticism",
		humanDistress: true
	},
	{
		id: "007adadf-c174-4037-86cb-a8a8b8957b82",
		idea: "oxygen",
		scifi: true
	},
	{
		id: "4045d61d-2b88-4ca6-ad2b-1501dfa50004",
		idea: "carbon monoxide",
		modern: true
	},
	{
		id: "a58529bd-f61c-4c42-b6ef-eb7fdb31b284",
		idea: "a true story"
	},
	{
		id: "13f6ee03-82cc-4e2b-a5be-c136d6dacd8a",
		idea: "jack squat"
	},
	{
		id: "8f52d6f2-2283-483f-8cc6-2082dc2548ae",
		idea: "equal rights",
		humanDistress: true
	},
	{
		id: "16103684-4621-4795-8a15-4f6c562271c4",
		idea: "a foreign accent"
	},
	{
		id: "62538df9-7a1f-49f7-a4ee-5e206cad21ca",
		idea: "epilepsy",
		humanDistress: true
	},
	{
		id: "502c993e-3f6a-45d8-ab64-e808bbade194",
		idea: "willpower"
	},
	{
		id: "b7938e7b-bee8-44d8-941a-9588475fcd74",
		idea: "triumph"
	},
	{
		id: "330ce4e2-7446-47cc-b49a-2feae0f12cdd",
		idea: "shots nearby",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "ebaf1ba8-4f60-4d28-af78-2120ee601c07",
		idea: "over the hill"
	},
	{
		id: "68123b3b-4d2c-46e4-865c-7afebea5c5a6",
		idea: "body odor"
	},
	{
		id: "70bd2f37-188e-4693-ab5f-7756f8cc3cc7",
		idea: "bad breath"
	},
	{
		id: "3f978db1-97fb-4097-bf41-4394844f073f",
		idea: "dry cleaning",
		modern: true
	},
	{
		id: "19892650-4fbc-472a-87c1-1c185263752b",
		idea: "underage drinking",
		alcohol: true
	},
	{
		id: "12182073-83ae-4a1f-b44c-5e1ea275e8bf",
		idea: "a speed limit"
	},
	{
		id: "1d8a66a7-dd68-4e05-a524-256cac4b60ed",
		idea: "sorcery"
	},
	{
		id: "3898bd83-c74d-4f78-8be6-fd469733dd1f",
		idea: "cliques",
	},
	{
		id: "6e114183-a020-4bc4-bef9-12d556cb99ea",
		idea: "a great movie"
	},
	{
		id: "0b64baa7-7278-49d8-8d38-2ff5d34551e3",
		idea: "computer animation",
		modern: true
	},
	{
		id: "fc35d5d0-663f-4799-b786-49bb5be1e160",
		idea: "a sour note"
	},
	{
		id: "5c3f37ac-f0d4-47bd-8e2b-a9d2e9ae19c8",
		idea: "a GED",
		modern: true
	},
	{
		id: "8ac6b2f5-b895-49ac-9b59-f9e85e3f8a37",
		idea: "a dog's tools"
	},
	{
		id: "1912ccaa-6178-4c5f-8774-1ab2c0d5860e",
		idea: "memory error",
		modern: true,
		scifi: true
	},
	{
		id: "1922ee48-6759-47a7-9e84-c0587ef0f8df",
		idea: "historical fiction"
	},
	{
		id: "cf766f6a-8cd2-4cde-9108-b72e1c9599e7",
		idea: "global warming",
		humanDistress: true,
		animalDistress: true
	},
	{
		id: "2782e914-b4cf-4c3d-b3b0-ab3fa2fee519",
		idea: "a made-up language"
	},
	{
		id: "78029b33-3858-43b7-b13b-4b1be789157b",
		idea: "a foreign language"
	},
	{
		id: "024bdc02-f388-434a-bc6e-702be6c73fdc",
		idea: "the holy sacraments",
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "8795a4f9-7fd6-4601-90fc-5b2bc4f2d3c8",
		idea: "child endangerment",
		humanDistress: true
	},
	{
		id: "8d158e2d-b7c9-4dd5-a166-37051ead1f38",
		idea: "Minecraft",
		modern: true
	},
	{
		id: "22265c5f-13d4-41ee-8fa3-5a5159f4c97c",
		idea: "crazed ramblings",
		humanDistress: true
	},
	{
		id: "99e29f03-ae8a-4dc5-abd7-83cf99beb011",
		idea: "mortality",
		humanDistress: true,
		humanDeath: true,
		humanDeathNatural: true
	},
	{
		id: "8f791c22-5016-43db-9650-abd82f584c32",
		idea: "strip poker",
		modern: true,
		sexual: true
	},
	{
		id: "62327ad3-649c-41fe-b13a-ba17e9f9ac61",
		idea: "Cards Against Humanity",
		modern: true
	},
	{
		id: "9fe78c20-0a99-4b58-9aa9-e8583e89dd07",
		idea: "serious allegations",
		humanDistress: true
	},
	{
		id: "ebbfe681-1569-4451-984f-0f871a7ead83",
		idea: "hashtags",
		modern: true
	},
	{
		id: "d57675bc-148c-42fb-8872-2000d9ff2aea",
		idea: "abortion",
		sexual: true,
		humanDistress: true
	},
	{
		id: "62bf012d-5a96-4403-99de-51f633407977",
		idea: "a joke that went too far",
		humanDistress: true
	},
	{
		id: "63838fee-f7a8-4e96-b76e-1593c3b15f80",
		idea: "sunbeams"
	},
	{
		id: "97add347-62b3-446f-b009-68ed4e8e2ba8",
		idea: "sexual dreams",
		sexual: true
	},
	{
		id: "38d6b356-97cb-4707-b470-eb49692dcf54",
		idea: "cold feet"
	},
	{
		id: "04504374-766d-4160-8db3-e0f179b282a0",
		idea: "mindreading",
		fantasy: true,
		scifi: true
	},
	{
		id: "0bbb1c7e-588c-44f3-958c-ee7279a0581b",
		idea: "a secret in a castle",
		fantasy: true,
		medievalFantasy: true
	},
	{
		id: "092196a1-1a38-49dc-b9ea-6b6332ef36a5",
		idea: "well-earned praise"
	},
	{
		id: "3f75abf2-f123-4a1e-8085-8892b73b77a4",
		idea: "tennis"
	},
	{
		id: "431af06a-d7f4-4287-9fe0-1b8d90aedced",
		idea: "paranormal investigations",
		modern: true
	},
	{
		id: "fd7c7169-40cd-4c6a-bd49-da00ce8b5845",
		idea: "subterfuge"
	},
	{
		id: "2e585654-fc55-420a-ba66-7fea0f516d07",
		idea: "shock and terror",
		humanDistress: true
	},
	{
		id: "45b83a2b-d4be-4dd8-b659-d9de24752d4c",
		idea: "taxidermy",
		animalDistress: true
	},
	{
		id: "53d9c9ed-821e-41e6-a0e6-f088a55bd6bf",
		idea: "stock options",
		modern: true
	},
	{
		id: "869cb841-2d94-468e-89f8-f71a139c0e08",
		idea: "taxes"
	},
	{
		id: "f5042182-df41-4b3e-9ef7-93ac0cbf2fc6",
		idea: "an overwhelming odor"
	},
	{
		id: "d3c679b9-1a25-4c6e-a473-c3c0d205b2b7",
		idea: "pumpkin spice",
		modern: true
	},
	{
		id: "7f3d7775-7d50-4370-87fe-6667a0a4f9f4",
		idea: "cramps"
	},
	{
		id: "3161e5d5-35bf-4847-8949-3fc51ab4bb4e",
		idea: "chance"
	},
	{
		id: "12f4a6a3-ed1f-47c4-8a8a-cc0e1ff5c572",
		idea: "that \"not-so-fresh\" feeling",
		sexual: true
	},
	{
		id: "c55b60d7-d686-4b61-b3eb-de45d98fd9a3",
		idea: "a knife in the back",
		humanDistress: true
	},
	{
		id: "2f6db833-c669-4625-9517-0ce73d748399",
		idea: "endless refills"
	},
	{
		id: "ed66b093-7869-42f7-86a5-0fd55f419a18",
		idea: "strong cologne"
	},
	{
		id: "e95cfbf6-15e1-4620-a356-974e6ec85576",
		idea: "PTSD",
		humanDistress: true
	},
	{
		id: "bb752e3c-2d3a-4f4b-b778-05f71e8e33d4",
		idea: "absolute freedom"
	},
	{
		id: "fcb695f1-5404-4ae2-aaea-652b690cea42",
		idea: "national anthems"
	},
	{
		id: "efcd33bd-3ba8-4b69-a41a-335c27438ddc",
		idea: "focus"
	},
	{
		id: "bdc88945-dff2-467d-95e4-3f4378b72fa6",
		idea: "brain damage",
		humanDistress: true
	},
	{
		id: "b56db35d-55bf-42f9-84c6-482d8c264eb2",
		idea: "self-service"
	},
	{
		id: "7febe0b8-93d9-49f9-ae8c-c74393ee7272",
		idea: "local cuisine"
	},
	{
		id: "c943a6a1-7f16-4859-88bb-5ce5c09b0294",
		idea: "endurance"
	},
	{
		id: "e2cff246-b2f0-4d11-b106-918a0205267d",
		idea: "untold riches"
	},
	{
		id: "42cf5a64-af7d-49fa-afa2-f5f7a5a59181",
		idea: "hunger",
		humanDistress: true
	},
	{
		id: "19908303-82dd-4e6d-8dc6-4f92ee4ff31a",
		idea: "the shape of a teardrop"
	},
	{
		id: "3c0eb06b-b31e-4721-98dd-ff129856a1f4",
		idea: "applause"
	},
	{
		id: "dbb29a59-0ece-4c7f-a275-09ebbde630bc",
		idea: "depth perception"
	},
	{
		id: "a8357ab5-835b-4c24-a1a7-a3b82916c248",
		idea: "voiced implosives"
	},
	{
		id: "a6231845-0742-4f8f-8612-2206c2bc3bcd",
		idea: "large hadrons",
		scifi: true,
		modern: true
	},
	{
		id: "65eae969-b9ca-43db-b972-9e34dec295bc",
		idea: "a blanket statement"
	},
	{
		id: "f29636d6-5459-4737-9d22-d85a167a2b0d",
		idea: "unspecified problems"
	},
	{
		id: "16432d85-4e64-4424-a3fd-93c79463ec71",
		idea: "migration"
	},
	{
		id: "4fa8c485-0c88-4799-baf2-eb9433e8bac1",
		idea: "cheap thrills",
		sexual: true
	},
	{
		id: "3a54f2a0-2714-4028-be53-2645d661f5ad",
		idea: "a damp, musty smell"
	},
	{
		id: "4ffa51f4-0678-4ab6-a4f3-1f43c6be7264",
		idea: "archaeology"
	},
	{
		id: "a465c9c7-11b2-4e13-bf14-adb8c8c3839c",
		idea: "intimacy",
		sexual: true
	},
	{
		id: "a13affc0-90db-45ca-a779-98aae2912c16",
		idea: "correct authorization",
		modern: true
	},
	{
		id: "6d8861ed-94ca-4bb1-b8f9-1b84d6ed72c0",
		idea: "wish fulfillment"
	},
	{
		id: "e196f03d-19e7-4d9e-aa81-bc2b9c8e7fd2",
		idea: "a low health bar",
		modern: true
	},
	{
		id: "f7bf054a-4677-4922-8f8a-4bd5df6e50b6",
		idea: "misunderstandings"
	},
	{
		id: "da0056f2-9ae9-4b03-8f61-1b28466e3595",
		idea: "torque"
	},
	{
		id: "58ba2ef2-532f-43b5-ac59-068b67bd541b",
		idea: "denim"
	},
	{
		id: "b99b0d25-9d9b-45a1-af4c-744ce2e274c6",
		idea: "calming, relaxing music"
	},
	{
		id: "8bdaed37-9d42-44f7-8170-0226b5ecb576",
		idea: "energizing music"
	},
	{
		id: "6c81fc9e-e70a-4e46-b2be-340c8eae76b7",
		idea: "what some might call music"
	},
	{
		id: "0b6933df-fd02-440e-b519-9add4ead05a1",
		idea: "a 404 \"page not found\" error",
		modern: true
	},
	{
		id: "36e8a592-43cc-48b1-a1a3-e06184ee7b9a",
		idea: "a lack of privacy",
		modern: true,
		humanDistress: true
	},
	{
		id: "14eaee5b-9e01-425f-8819-655ca61362ec",
		idea: "mistaken identity"
	},
	{
		id: "03b2f462-f12b-423d-a777-01d80bad8eda",
		idea: "\"the ole one-two punch\"",
		humanDistress: true
	},
	{
		id: "6abbca8c-ee5b-4710-888e-4a92c63bf3b7",
		idea: "ancient technology",
		scifi: true,
		fantasy: true
	},
	{
		id: "ad316aff-cec5-4338-a7bb-83a1a43e35e7",
		idea: "a faked accent"
	},
	{
		id: "99dc27e5-2691-40a7-a771-f3a7c38b2393",
		idea: "free hugs",
		modern: true
	},
	{
		id: "93ee4424-28f5-4ad5-addf-a3165a83fca6",
		idea: "thumb sucking"
	},
	{
		id: "bb83c8d3-69e2-497d-a0d8-c56d0f8d79e3",
		idea: "a closure due to bad weather"
	},
	{
		id: "6dc923ee-7b71-4734-828e-266ce7694c29",
		idea: "COVID-19",
		modern: true,
		humanDistress: true,
		humanDeath: true,
		humanDeathNatural: true
	},
	{
		id: "1dadb740-f21f-4781-bb97-be6fdbb87aa2",
		idea: "cybernetic enhancements",
		scifi: true
	},
	{
		id: "cfdb03e0-9951-4003-9f70-2eb49070ca9c",
		idea: "the Hajj",
		mythsReligionsAndMetaphysics: true,
		islam: true
	},
	{
		id: "529ab548-2ebf-4007-b71d-7f7af82805f7",
		idea: "Hanukkah",
		mythsReligionsAndMetaphysics: true,
		judaism: true
	},
	{
		id: "153d1a64-9270-4946-97d8-1c61e5be7eb3",
		idea: "an app that does nothing but make fart noises",
		modern: true
	},
	{
		id: "964b25c9-5883-45dd-86de-88f3de4f2030",
		idea: "ghost hunting",
		modern: true,
		mythsReligionsAndMetaphysics: true,
		metaphysics: true
	},
	{
		id: "6d231828-f320-4b8a-a3c1-669073f00c04",
		idea: "incest",
		sexual: true,
		humanDistress: true
	},
	{
		id: "91a5e763-39d8-4461-9c48-c8f2d6c1d403",
		idea: "side effects",
		humanDistress: true
	},
	{
		id: "8090001b-afa6-47ec-8221-11c6fa16433c",
		idea: "an unexpected reaction"
	},
	{
		id: "30bb9958-a5bc-48af-9074-3376b1989650",
		idea: "the government"
	},
	{
		id: "02936831-2e8c-4f2e-8629-e363b06d195a",
		idea: "teleportation",
		scifi: true
	},
	{
		id: "d5357944-7651-4040-9caf-55f8cc441168",
		idea: "x-ray vision",
		fantasy: true,
		superhero: true,
		scifi: true
	},
	{
		id: "a6c34757-c4c2-4524-9dce-a9f9e75bff7e",
		idea: "integrity"
	},
	{
		id: "0d14d8a1-62c9-4b19-bbbc-bad212446e9e",
		idea: "empathy"
	},
	{
		id: "efd0abbf-df99-46df-9175-b74ae5aa54b1",
		idea: "honor"
	},
	{
		id: "ba2851dc-a00e-473a-a4ac-75fe871afd8e",
		idea: "constipation",
		humanDistress: true
	},
	{
		id: "d9da4f53-ce74-4878-a32b-af1de6b0379a",
		idea: "a childhood nickname"
	},
	{
		id: "e2e68718-453d-4e24-ad5a-0951eb52960f",
		idea: "deep regret",
		humanDistress: true
	},
	{
		id: "cb922b9b-48f8-4c02-b72b-567c207e6017",
		idea: "ramen noodles"
	},
	{
		id: "07904d9c-bb93-44d7-b19e-0fd3d6c1c02b",
		idea: "a poltergeist",
		mythsReligionsAndMetaphysics: true,
		metaphysics: true,
		horror: true
	},
	{
		id: "1489c434-d56a-4c2e-87ed-73bb701c52fe",
		idea: "an itch in a hard-to-reach place"
	},
	{
		id: "5d776da2-cdbb-4e02-9af3-58f070f5a695",
		idea: "Child Protective Services",
		humanDistress: true
	},
	{
		id: "98659d85-ee2c-4d21-932c-50533dfa8c02",
		idea: "a peculiar idea of fun"
	},
	{
		id: "7af7e033-8315-40ae-9846-157b3a688a14",
		idea: "the concept of infinity"
	},
	{
		id: "cd4e2a77-379c-41b8-b6c6-33cba20b077c",
		idea: "animals that can sense evil",
		animalDistress: true,
		horror: true
	},
	{
		id: "78bdbfd1-1a23-4680-8b32-4488e0f9eadc",
		idea: "pure evil",
		horror: true
	},
	{
		id: "f1273f26-1f3d-488e-a997-bad0d3fa3c49",
		idea: "holiday music"
	},
	{
		id: "929b9e67-395c-4a67-a81c-fe25b897fb3c",
		idea: "digital distortion",
		modern: true
	},
	{
		id: "c8400e63-fea1-495d-b8d0-cd76053c75e3",
		idea: "the sport of golf"
	},
	{
		id: "6c4e7026-4d58-4123-bded-b91a29fe96d7",
		idea: "TikTok",
		modern: true
	},
	{
		id: "13a73839-710d-4184-b0e9-a15f37f3b41e",
		idea: "gaslighting",
		humanDistress: true
	},
	{
		id: "0ab33a6b-05b0-4c56-83b0-1e21b8228dba",
		idea: "the power of friendship"
	},
	{
		id: "2366f2e0-868d-4462-89ce-90e41395cd16",
		idea: "muscle memory"
	},
	{
		id: "434af933-156c-4765-961a-2e938a1e9a05",
		idea: "some stupid shit",
		profanity: true
	},
	{
		id: "a1a49391-df26-4db8-9fbe-07c1f58cd834",
		idea: "pretending that a child is an adult",
		humanDistress: true
	},
	{
		id: "7974ac58-5c08-42d7-b2d8-da97d69aaf46",
		idea: "a grave mistake",
		humanDistress: true
	},
	{
		id: "234b37ef-62d2-4b23-a49b-babb522acec9",
		idea: "the hula"
	},
	{
		id: "ed4b34eb-17e6-427b-bdb0-713ddd6dd6d0",
		idea: "using people as furniture",
		humanDistress: true,
		sexual: true
	}
];

const topics: Topic[] = info.map(bit => ({...base, ...bit}));

export default topics;
