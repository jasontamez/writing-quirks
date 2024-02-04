import { CoreIdea, Locale, LocaleBase, TypedObject } from "./Ideas";

const base: (LocaleBase & TypedObject) = {
	type: "locale",
	preposition: "in"
};
const info: (Partial<Locale> & CoreIdea)[] = [
	{
		id: "1ad76381-a303-4707-989b-92ddaa89c513",
		idea: "Jamaica",
		properName: true,
		americas: true,
		geographical: true,
		political: true,
		mediumSize: true
	},
	{
		id: "7c7cd72e-b754-459c-bd56-16bacb5aec76",
		idea: "Amsterdam",
		properName: true,
		europe: true,
		political: true,
		smallSize: true
	},
	{
		id: "efdbe218-d0a2-44c2-b9e2-3ef67294041b",
		idea: "a beaver dam",
		americas: true,
		preposition: "by",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "296c2b45-dd16-4d33-963b-2fc2735d3142",
		idea: "heaven",
		mythsReligionsAndMetaphysics: true,
		judaism: true,
		christianity: true,
		islam: true,
		construct: true
	},
	{
		id: "242a9c88-4691-4c42-a377-a0bb91e35976",
		idea: "an igloo",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "51aa66b8-f90f-4d10-8172-b86079fbb8fd",
		idea: "India",
		properName: true,
		westAsia: true,
		political: true,
		largeSize: true
	},
	{
		id: "e03c6449-01c4-411e-835c-a6cb0bf46503",
		idea: "Scotland",
		properName: true,
		europe: true,
		political: true,
		mediumSize: true
	},
	{
		id: "79e24848-55e1-4412-a837-de9e4d8becb5",
		idea: "a dome",
		preposition: "inside",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "990baf03-22eb-46b2-8778-9b8aa5e8555b",
		idea: "Cambodia",
		properName: true,
		eastAsia: true,
		political: true,
		mediumSize: true
	},
	{
		id: "0ae69526-6c64-4c4f-b141-7bdda388a606",
		idea: "Australia",
		properName: true,
		oceania: true,
		geographical: true,
		political: true,
		largeSize: true
	},
	{
		id: "f7c1e943-1fe0-43bb-902d-fa06fd86eab0",
		idea: "Ecuador",
		properName: true,
		americas: true,
		political: true,
		mediumSize: true
	},
	{
		id: "3c1e5fe6-b4b6-49ff-a2e2-076cc42ab3ba",
		idea: "a large newspaper",
		preposition: "at",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "01cb1f89-9686-40b7-83cf-2fd941a7fda5",
		idea: "an island of horrors",
		preposition: "on",
		fantasy: true,
		horror: true,
		nonSpecific: true,
		construct: true,
		smallSize: true
	},
	{
		id: "ad39a6dd-27d3-4761-9eb7-9526c09a1ea6",
		idea: "Madagascar",
		properName: true,
		africa: true,
		geographical: true,
		political: true,
		mediumSize: true
	},
	{
		id: "86690787-8c12-4982-814b-b23ca9abd439",
		idea: "Israel",
		properName: true,
		westAsia: true,
		mythsReligionsAndMetaphysics: true,
		judaism: true,
		christianity: true,
		islam: true,
		political: true,
		mediumSize: true
	},
	{
		id: "201cde56-3426-483d-9d71-108fdf9ac641",
		idea: "Siberia",
		properName: true,
		eastAsia: true,
		geographical: true,
		political: true,
		mediumSize: true
	},
	{
		id: "a8209700-e479-41df-9093-cbf600ffcb50",
		idea: "a temple",
		mythsReligionsAndMetaphysics: true,
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "f0f4b25a-891d-4c07-93f2-4e6f0d0de9e2",
		idea: "a boat on land",
		preposition: "on",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "0c64b836-9998-4360-82d3-b0d7fb994814",
		idea: "Singapore",
		properName: true,
		eastAsia: true,
		geographical: true,
		political: true,
		smallSize: true
	},
	{
		id: "28564aea-f499-4f3d-8304-8f320eca7167",
		idea: "your hometown",
		political: true,
		smallSize: true
	},
	{
		id: "ed323fa2-b6f9-451e-81e1-d1cf2ecdd90f",
		idea: "Japan",
		properName: true,
		eastAsia: true,
		political: true,
		mediumSize: true
	},
	{
		id: "ec20c0e0-4327-43a0-b9f3-38815f3cf868",
		idea: "Saudi Arabia",
		properName: true,
		westAsia: true,
		political: true,
		mediumSize: true
	},
	{
		id: "1ba323c1-85af-490b-8eb8-a103c8ccb6c7",
		idea: "Denmark",
		properName: true,
		europe: true,
		political: true,
		mediumSize: true
	},
	{
		id: "0be6291f-518f-4e7a-9152-d932fe2801f4",
		idea: "Kenya",
		properName: true,
		africa: true,
		political: true,
		mediumSize: true
	},
	{
		id: "e7226bc3-936d-4418-92c0-2fc6223463e3",
		idea: "Germany",
		properName: true,
		europe: true,
		political: true,
		mediumSize: true
	},
	{
		id: "3723d420-ed01-476d-8cd3-2ecaa3622abd",
		idea: "Canada",
		properName: true,
		americas: true,
		political: true,
		largeSize: true
	},
	{
		id: "4785e7b0-ec0d-4ae7-bfef-e0af19385b2c",
		idea: "the USA",
		properName: true,
		americas: true,
		political: true,
		largeSize: true
	},
	{
		id: "ea11944d-c18c-437f-a2fd-39bfe80e9023",
		idea: "a hammock",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "81b7f225-5e69-4cf4-bc7e-fcac631f5008",
		idea: "Oklahoma",
		properName: true,
		americas: true,
		political: true,
		mediumSize: true
	},
	{
		id: "b9a878bf-a1d0-4c05-9213-f9ad7f0660fb",
		idea: "along the Nile",
		properName: true,
		africa: true,
		geographical: true,
		preposition: "somewhere",
		largeSize: true
	},
	{
		id: "f5741827-8988-48df-82b0-7302bf7b591d",
		idea: "the Amazon basin",
		properName: true,
		americas: true,
		geographical: true,
		largeSize: true
	},
	{
		id: "6ef76256-a149-433b-8bb7-1b578473a1c0",
		idea: "Notre Dame",
		preposition: "at",
		properName: true,
		europe: true,
		tinySize: true
	},
	{
		id: "be5275f7-a7d7-4473-8334-d4d118bf9635",
		idea: "a brick road",
		preposition: "on",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "92bb04f6-0ec1-4280-b197-482e19b50fac",
		idea: "a city on fire",
		humanDistress: true,
		nonSpecific: true,
		construct: true,
		smallSize: true
	},
	{
		id: "31c2e6f7-1575-44a4-80e4-af5a5a367b03",
		idea: "a famous birthplace",
		nonSpecific: true,
		smallSize: true
	},
	{
		id: "7b5b6860-b4d3-43e8-bbf0-fea96e31d6fc",
		idea: "a rainy forest",
		nonSpecific: true,
		geographical: true,
		smallSize: true
	},
	{
		id: "81134a94-6426-4359-8c91-f8629514a617",
		idea: "a black hole",
		preposition: "near",
		scifi: true,
		spacefaring: true,
		nonSpecific: true,
		geographical: true,
		tinySize: true
	},
	{
		id: "7aacedc8-d207-493a-b1d4-b0feec189a82",
		idea: "a circus tent",
		preposition: "under",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "e3e9d77f-17c5-4041-9ac6-d636b3c631de",
		idea: "New York City",
		properName: true,
		americas: true,
		political: true,
		smallSize: true
	},
	{
		id: "dbe970c1-a2b4-46f7-bcbb-e46123fa8309",
		idea: "Paris",
		properName: true,
		europe: true,
		political: true,
		smallSize: true
	},
	{
		id: "6b8a03ac-763f-4dc3-9bd3-8aab299e8065",
		idea: "London",
		properName: true,
		europe: true,
		political: true,
		smallSize: true
	},
	{
		id: "d0dcb513-4092-4e6d-bd80-22a2a00ac526",
		idea: "Yellowstone National Park",
		properName: true,
		americas: true,
		political: true,
		mediumSize: true
	},
	{
		id: "aee94b83-5bf5-4af2-a534-da9aa0a6cbf8",
		idea: "Antarctica",
		properName: true,
		geographical: true,
		largeSize: true
	},
	{
		id: "40a1657c-879d-415c-a303-8916c423c5d4",
		idea: "the TARDIS",
		preposition: "inside",
		properName: true,
		americas: true,
		modern: true,
		scifi: true,
		spacefaring: true,
		construct: true,
		tinySize: true
	},
	{
		id: "73471c43-1c61-42ed-b90a-c6d3432985b8",
		idea: "a train platform",
		preposition: "on",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "a0e3e608-2cd0-4412-a72b-3e9bf804e0b4",
		idea: "Mother Russia",
		properName: true,
		europe: true,
		political: true,
		largeSize: true
	},
	{
		id: "ccb1aef0-a82d-412d-bb29-87196d3a008a",
		idea: "South Africa",
		properName: true,
		africa: true,
		political: true,
		mediumSize: true
	},
	{
		id: "f1fc8bfd-8910-4c2d-bf07-2315c4db9f96",
		idea: "Brazil",
		properName: true,
		americas: true,
		political: true,
		largeSize: true
	},
	{
		id: "f814d66d-6098-4e25-94cd-b03fb5071085",
		idea: "Athens",
		properName: true,
		europe: true,
		political: true,
		smallSize: true
	},
	{
		id: "fef17799-5680-422f-bf89-9a9a047493cc",
		idea: "Chernobyl",
		preposition: "at",
		properName: true,
		europe: true,
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		smallSize: true
	},
	{
		id: "e70cfc8d-7b06-4dbb-b735-0b61faeeab76",
		idea: "a country club",
		preposition: "at",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "b0100eb6-9324-4339-8226-7b219744d5b0",
		idea: "a crib",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "6f41570a-ea46-4dea-85cb-166b9af58ea7",
		idea: "a cathedral",
		mythsReligionsAndMetaphysics: true,
		christianity: true,
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "074724d7-321a-48ec-8361-1e66f2da2bbe",
		idea: "China",
		properName: true,
		eastAsia: true,
		political: true,
		largeSize: true
	},
	{
		id: "77513018-8f18-41ae-a474-340ee840adc3",
		idea: "a country no one has heard of",
		nonSpecific: true,
		political: true,
		smallSize: true
	},
	{
		id: "ec592382-e17b-49de-9104-67e62c15460b",
		idea: "a courtroom",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "7f637766-c525-4594-ba9e-0dfbca6596b2",
		idea: "a farm",
		preposition: "on",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "3f2ef1e9-fe62-47ab-aaee-bc9b57ca41bf",
		idea: "a cave",
		nonSpecific: true,
		geographical: true,
		smallSize: true
	},
	{
		id: "9f9f31fe-b31a-4b79-a618-83856776ab83",
		idea: "a condo",
		modern: true,
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "2b3b0313-49b0-4cce-a5a3-e9e5c29c1aac",
		idea: "an apartment",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "b7cb3019-7c3e-45ac-b310-8982b38f79e6",
		idea: "a duplex",
		modern: true,
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "962bce48-e7c9-4def-a6cc-dc73d5477fda",
		idea: "a mobile home",
		modern: true,
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "ba4cb17f-4c99-4cd9-a82a-9347555097f5",
		idea: "a Winnebago",
		properName: true,
		modern: true,
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "6b15f678-ec89-4884-8cc1-eeb4d1d80d1b",
		idea: "a houseboat",
		preposition: "on",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "52c4d61b-f30b-450d-af29-108c246a795f",
		idea: "a yacht",
		preposition: "on",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "dc67c573-a4cf-4152-ab9f-61e0b6d48951",
		idea: "a doghouse",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "299bebab-79f1-44c8-ad04-c5c1cdd60156",
		idea: "a shack in the woods",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "9853707e-c279-4b2a-8dcf-adef51a5556d",
		idea: "within an underpass",
		preposition: "beneath",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "599e8f20-2179-45f6-bdf2-ccccf0d43d12",
		idea: "a 7-11",
		preposition: "at",
		properName: true,
		modern: true,
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "8993a33a-8ffc-4326-b73f-054ea57ec152",
		idea: "a ferris wheel",
		preposition: "on",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "cc50ed2c-4a25-47a2-94f9-32750bc88ea6",
		idea: "a submarine",
		preposition: "on",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "b2696a21-268e-4e09-a740-dfea4c564336",
		idea: "grandmother's mansion",
		preposition: "at",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "6ca92ab9-54e1-48e6-aabd-d5fb34e71572",
		idea: "a fork in the road",
		preposition: "at",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "d7a9cbd8-514c-4656-a809-1e117a7b444c",
		idea: "a crippled plane",
		preposition: "on",
		humanDistress: true,
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "e4b6dfa4-7f18-4cdc-8daa-217f08496b0c",
		idea: "an empire",
		nonSpecific: true,
		political: true,
		mediumSize: true
	},
	{
		id: "99a5f184-2712-44ff-b09e-9a2d74f43136",
		idea: "Cuba",
		properName: true,
		americas: true,
		geographical: true,
		political: true,
		mediumSize: true
	},
	{
		id: "e111c780-7f74-49fb-96d9-cc2d814459b4",
		idea: "the post office",
		preposition: "at",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "f5cbc5db-5fa5-495c-a075-668ee46f559a",
		idea: "far away",
		preposition: "somewhere",
		nonSpecific: true,
		geographical: true
	},
	{
		id: "36c81ce5-e493-425b-9541-b67543225413",
		idea: "an empty tower",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "d8b4035c-9073-44ac-b52f-733ab76b48a0",
		idea: "a laundromat",
		preposition: "at",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "c9ec1809-bf31-4048-af73-97da97fce303",
		idea: "a mountain peak",
		preposition: "on",
		nonSpecific: true,
		geographical: true,
		smallSize: true
	},
	{
		id: "7d261606-202e-4c4f-933e-ff034c6f52bf",
		idea: "an ancient cemetery",
		preposition: "at",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "a0cfb706-06ae-414f-82e0-974ed376dcc0",
		idea: "Transylvania",
		properName: true,
		europe: true,
		fantasy: true,
		medievalFantasy: true,
		horror: true,
		political: true,
		mediumSize: true
	},
	{
		id: "03303b1e-a3f6-4ead-a2f3-51a395da3f57",
		idea: "the Orient Express",
		preposition: "on",
		properName: true,
		europe: true,
		westAsia: true,
		historical: true,
		tinySize: true
	},
	{
		id: "273968eb-b612-456c-b820-e531ee798fa4",
		idea: "the Taj Mahal",
		preposition: "at",
		properName: true,
		historical: true,
		westAsia: true,
		tinySize: true
	},
	{
		id: "48f8dd52-f1d3-4f05-ae6b-4b277df46439",
		idea: "the Red Sea",
		preposition: "on",
		properName: true,
		westAsia: true,
		africa: true,
		geographical: true,
		mediumSize: true
	},
	{
		id: "3fd63754-3b89-4206-9498-98d7a015e474",
		idea: "Pennsylvania",
		properName: true,
		americas: true,
		political: true,
		mediumSize: true
	},
	{
		id: "4e47c69c-3ec6-4ba3-9cd4-882f15cc88ac",
		idea: "Nigeria",
		properName: true,
		africa: true,
		political: true,
		mediumSize: true
	},
	{
		id: "ec6fc73e-0393-4e6d-bfbb-4925ec077161",
		idea: "Mt. Everest",
		preposition: "at",
		properName: true,
		westAsia: true,
		geographical: true,
		smallSize: true
	},
	{
		id: "d55fcc2d-77b7-4688-bf64-37c5f580a9fc",
		idea: "Thailand",
		properName: true,
		eastAsia: true,
		political: true,
		mediumSize: true
	},
	{
		id: "d6ebead9-8870-4ffb-8475-85121b2cc063",
		idea: "Hong Kong",
		properName: true,
		eastAsia: true,
		political: true,
		smallSize: true
	},
	{
		id: "9d6cb143-c23b-45da-ae05-94b850c85a5e",
		idea: "the Sydney Opera House",
		preposition: "at",
		properName: true,
		oceania: true,
		tinySize: true
	},
	{
		id: "f0690502-106d-47e6-bf11-f4d258180162",
		idea: "the World Cup",
		preposition: "at",
		properName: true,
		nonSpecific: true,
		smallSize: true
	},
	{
		id: "fbf38d6a-1af4-4aac-b1b2-21fc1fda1f73",
		idea: "South Korea",
		properName: true,
		eastAsia: true,
		political: true,
		mediumSize: true
	},
	{
		id: "55bea60a-767b-4b34-8ecf-5a55b3a7e506",
		idea: "a carnival",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "587740f3-c0b7-47dd-9d49-0d89359694ef",
		idea: "a haunted house",
		preposition: "at",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "3ed9e3ab-f7e4-48cb-a36e-faac929d1fdd",
		idea: "Nebraska",
		properName: true,
		americas: true,
		political: true,
		mediumSize: true
	},
	{
		id: "9d47d2a5-409b-48ac-aed7-f64195d61474",
		idea: "Poland",
		properName: true,
		europe: true,
		political: true,
		mediumSize: true
	},
	{
		id: "39afc166-9d4d-4aff-b6e4-dac10da58942",
		idea: "Ethiopia",
		properName: true,
		africa: true,
		political: true,
		mediumSize: true
	},
	{
		id: "225ad837-ba20-48cc-ae46-df136ab2ba72",
		idea: "Indonesia",
		properName: true,
		eastAsia: true,
		political: true,
		largeSize: true
	},
	{
		id: "e7704920-8e55-4b38-8087-ecb859d4b1d3",
		idea: "the middle of nowhere",
		nonSpecific: true,
		geographical: true
	},
	{
		id: "59ad6014-2ad9-4bad-8c30-da14ed33e7ed",
		idea: "North Korea",
		properName: true,
		eastAsia: true,
		political: true,
		mediumSize: true
	},
	{
		id: "6d567914-5b98-4930-9098-6b69f3a1a59a",
		idea: "Europe",
		properName: true,
		europe: true,
		geographical: true,
		largeSize: true
	},
	{
		id: "1e9a1c64-669f-4b8c-836c-d61a876f24dc",
		idea: "The Vatican",
		preposition: "at",
		properName: true,
		europe: true,
		mythsReligionsAndMetaphysics: true,
		christianity: true,
		political: true,
		smallSize: true
	},
	{
		id: "f03e140e-5b9a-4451-9f10-7f359431839f",
		idea: "Rome",
		properName: true,
		europe: true,
		political: true,
		smallSize: true
	},
	{
		id: "a9b7ddaf-216f-4512-b43b-80b8fc48a02a",
		idea: "Wakanda",
		properName: true,
		africa: true,
		modern: true,
		fantasy: true,
		superhero: true,
		political: true,
		mediumSize: true
	},
	{
		id: "5d9001f2-efd4-433e-a95c-1d7bd7bf1385",
		idea: "a plateau",
		preposition: "on",
		nonSpecific: true,
		geographical: true,
		mediumSize: true
	},
	{
		id: "5826c047-eb67-4c2a-97ce-7b5bb4361c53",
		idea: "a funeral pyre",
		preposition: "by",
		humanDistress: true,
		humanDeath: true,
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "5f87a43d-a3f5-4a74-ba8a-32304bedc1c2",
		idea: "a river",
		preposition: "on",
		nonSpecific: true,
		geographical: true,
		mediumSize: true
	},
	{
		id: "2a61031c-9760-443f-b5df-cbaade675efb",
		idea: "Florida",
		properName: true,
		americas: true,
		political: true,
		mediumSize: true
	},
	{
		id: "b2057a79-5393-4c7d-8106-834e1b898d2c",
		idea: "a maze of corridors, all alike",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "980af9e5-2ba7-4286-92a0-18c266dbcf2a",
		idea: "a painted pathway",
		preposition: "on",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "920b18db-22eb-44eb-836f-3aa7c0c93088",
		idea: "a better place",
		mythsReligionsAndMetaphysics: true,
		christianity: true,
		nonSpecific: true,
		construct: true
	},
	{
		id: "94f0d830-ea35-4f92-b86d-01287564523b",
		idea: "Death Valley",
		properName: true,
		americas: true,
		humanDeath: true,
		humanDistress: true,
		geographical: true,
		smallSize: true
	},
	{
		id: "fa1852d4-d4a9-4e2c-9ec6-030b2495ad6c",
		idea: "Switzerland",
		properName: true,
		europe: true,
		political: true,
		mediumSize: true
	},
	{
		id: "7f52988e-a6b3-4e5a-a027-d6498838578d",
		idea: "Morocco",
		properName: true,
		africa: true,
		political: true,
		mediumSize: true
	},
	{
		id: "47da975c-956a-4e7c-ac07-f53c723d5a06",
		idea: "Argentina",
		properName: true,
		americas: true,
		political: true,
		mediumSize: true
	},
	{
		id: "773c9001-677d-4cd9-9b3e-74672b199f74",
		idea: "Chile",
		properName: true,
		americas: true,
		political: true,
		mediumSize: true
	},
	{
		id: "29463344-e20f-491e-8444-8187a1cf26aa",
		idea: "Iraq",
		properName: true,
		westAsia: true,
		political: true,
		mediumSize: true
	},
	{
		id: "531dc1fa-9da6-4a53-bb7b-48e9c014396d",
		idea: "Iran",
		properName: true,
		westAsia: true,
		political: true,
		mediumSize: true
	},
	{
		id: "e200f77a-9684-4108-b15d-6332ee5e384f",
		idea: "Dubai",
		properName: true,
		westAsia: true,
		political: true,
		smallSize: true
	},
	{
		id: "b6c57e94-d702-44c4-a03b-81775e2b79bd",
		idea: "Libya",
		properName: true,
		africa: true,
		political: true,
		mediumSize: true
	},
	{
		id: "1b4ebb92-f8ec-448a-8f8e-de795fd43100",
		idea: "New Zealand",
		properName: true,
		oceania: true,
		political: true,
		mediumSize: true
	},
	{
		id: "d0fb91ce-6721-4563-8faa-1593f4cd9be8",
		idea: "Alaska",
		properName: true,
		americas: true,
		political: true,
		mediumSize: true
	},
	{
		id: "a4b158b0-8c72-4ff5-b9a2-c0c408bd3f44",
		idea: "Hawaii",
		properName: true,
		americas: true,
		oceania: true,
		geographical: true,
		political: true,
		mediumSize: true
	},
	{
		id: "f2b031e6-f974-4641-b7dc-1f57caf3c720",
		idea: "Mexico",
		properName: true,
		americas: true,
		political: true,
		mediumSize: true
	},
	{
		id: "1814b97e-66b2-414a-b6e7-d404c131f0c7",
		idea: "Spain",
		properName: true,
		europe: true,
		political: true,
		mediumSize: true
	},
	{
		id: "ac002fa9-47d3-4380-83bc-a8e4bd1b9eea",
		idea: "Istanbul",
		properName: true,
		europe: true,
		westAsia: true,
		political: true,
		smallSize: true
	},
	{
		id: "65c80e1a-b3d6-4775-9905-b3647d5344fa",
		idea: "the Oscars",
		preposition: "at",
		properName: true,
		americas: true,
		nonSpecific: true,
		smallSize: true
	},
	{
		id: "e825b14c-04d4-46f0-b8b0-b4b1d018d983",
		idea: "the UN",
		preposition: "at",
		properName: true,
		americas: true,
		smallSize: true
	},
	{
		id: "435cce17-0130-4b89-a322-0187926cba81",
		idea: "a bedroom",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "2b996a92-90ad-430e-bc65-c4de25ab217d",
		idea: "a bathroom",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "9dc8c9c7-6769-4f47-8753-4cd5cf065d25",
		idea: "a wedding",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "d9c724b4-0f2b-4445-82d0-a9891d27cfb3",
		idea: "an ancient kingdom",
		nonSpecific: true,
		political: true,
		smallSize: true
	},
	{
		id: "8383deb4-b6c9-4756-81b3-4a3325c9074d",
		idea: "a gas station",
		nonSpecific: true,
		tinySize: true,
		preposition: "at"
	},
	{
		id: "ad1799f6-b50e-4a39-b9fc-0c670218c8de",
		idea: "Mecca",
		properName: true,
		westAsia: true,
		smallSize: true,
		political: true,
		mythsReligionsAndMetaphysics: true,
		islam: true
	},
	{
		id: "69d571bc-14c5-44cb-8964-d1b0229fd6ad",
		idea: "Camelot",
		properName: true,
		europe: true,
		smallSize: true,
		mythsReligionsAndMetaphysics: true,
		christianity: true,
		fantasy: true,
		medievalFantasy: true,
		historical: true
	},
	{
		id: "ed1ed1bf-4caf-4bf4-8038-903bd18a4f02",
		idea: "the market",
		preposition: "at",
		tinySize: true,
		nonSpecific: true
	},
	{
		id: "1a7d13ae-2113-44d0-860b-7c8ea96ec202",
		idea: "Uganda",
		properName: true,
		smallSize: true,
		political: true,
		africa: true
	},
	{
		id: "39639b1d-339f-4680-9d64-7084e7295f38",
		idea: "a day-care center",
		nonSpecific: true,
		tinySize: true
	},
	{
		id: "6b300484-f0ef-4001-a718-f7e55db01d30",
		idea: "a nursery",
		nonSpecific: true,
		tinySize: true
	},
	{
		id: "c132a1a7-c17d-4a5f-89d4-180645cf8b32",
		idea: "Wonderland",
		fantasy: true,
		smallSize: true,
		fairyTalesAndUrbanLegends: true
	},
	{
		id: "f0e1a0c8-f949-47c2-9280-b4fce895a900",
		idea: "a wide, empty desert",
		nonSpecific: true,
		smallSize: true,
		preposition: "lost in"
	},
	{
		id: "434844c3-bfe5-4541-aba1-5dacea6b42b0",
		idea: "the second house on the right",
		nonSpecific: true,
		tinySize: true,
		preposition: "at"
	},
	{
		id: "05e469a3-7c15-4383-8df9-1a59d2828cfb",
		idea: "a swamp infested with ravens",
		smallSize: true
	},
	{
		id: "aef54e5f-ad4f-40c3-8f74-6b7b3ee862df",
		idea: "the Xinjiang Uyghur Autonomous Region",
		humanDeath: true,
		humanDeathViolent: true,
		humanDistress: true,
		mythsReligionsAndMetaphysics: true,
		islam: true,
		smallSize: true,
		eastAsia: true,
		properName: true,
		political: true
	},
	{
		id: "dd9061e8-4973-4ded-a81f-a3edb7455e7c",
		idea: "an extensive series of caverns",
		smallSize: true
	},
	{
		id: "b8467c56-dc63-4bd5-ac11-1fc74381d929",
		idea: "the Batcave",
		tinySize: true,
		fantasy: true,
		superhero: true,
		properName: true,
		americas: true
	},
	{
		id: "633e0606-b51b-4734-a850-d1a255c74b63",
		idea: "Narnia",
		smallSize: true,
		fantasy: true,
		medievalFantasy: true,
		properName: true
	},
	{
		id: "831749a0-3e33-4b64-92e1-c4b895d4d2f5",
		idea: "a woodland mansion",
		preposition: "at",
		nonSpecific: true,
		construct: true,
		tinySize: true
	},
	{
		id: "bae22de2-2499-48c0-97d0-c099a2eb17f2",
		idea: "a dark forest",
		nonSpecific: true,
		smallSize: true
	},
	{
		id: "d7022ff5-e702-485a-94e3-253c968f9518",
		idea: "a wasteland",
		nonSpecific: true,
		smallSize: true,
		humanDistress: true,
		humanDeath: true,
		animalDistress: true,
		animalDeath: true
	},
	{
		id: "f5db47d5-7a4a-40af-8d4f-cbdc22c71dcc",
		idea: "the moon",
		preposition: "on",
		mediumSize: true,
		scifi: true
	},
	{
		id: "5967b3af-0969-42bb-a391-58e782492917",
		idea: "a duck pond",
		preposition: "at",
		nonSpecific: true,
		tinySize: true
	},
	{
		id: "1a256d68-7a87-471f-8b5a-82f6612bb0a6",
		idea: "the rings of Saturn",
		preposition: "around",
		largeSize: true,
		scifi: true,
		spacefaring: true
	},
	{
		id: "e77425dd-1dc3-450a-8cc7-59e3de156f86",
		idea: "a bank",
		nonSpecific: true,
		tinySize: true,
		construct: true
	},
	{
		id: "528415a8-a35a-463c-bfb5-ea7819ecbdda",
		idea: "a stable",
		nonSpecific: true,
		tinySize: true,
		construct: true
	},
	{
		id: "f60080fd-b217-47e0-965c-ea8e63ac1b02",
		idea: "along the Mississippi River",
		properName: true,
		nonSpecific: true,
		mediumSize: true,
		geographical: true,
		preposition: "somewhere"
	},
	{
		id: "2d8f36cf-e8f0-426b-b3df-b64046d19784",
		idea: "a golf course",
		nonSpecific: true,
		smallSize: true,
		construct: true,
		preposition: "on"
	},
	{
		id: "54ae5576-89c2-4f08-bfa6-1625a05a2d47",
		idea: "a city of fungus",
		nonSpecific: true,
		smallSize: true,
		fantasy: true
	},
	{
		id: "29221b57-1aeb-453d-9bfe-803500fb2085",
		idea: "a birthday party",
		nonSpecific: true,
		tinySize: true,
		preposition: "at"
	},
	{
		id: "b7d39dd1-e1bc-4301-92a8-82feff531935",
		idea: "Ukraine",
		properName: true,
		mediumSize: true,
		europe: true,
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "8b1c0f6c-f7a7-40d0-80b9-c20fd214df36",
		idea: "the gym",
		tinySize: true,
		construct: true,
		nonSpecific: true,
		preposition: "at"
	},
	{
		id: "f3eac58d-6cd1-4511-84bd-ebcde9b7924d",
		idea: "an open grave",
		tinySize: true,
		construct: true,
		nonSpecific: true,
		preposition: "next to",
		horror: true,
		humanDistress: true,
		humanDeath: true
	},
	{
		id: "f3eac58d-6cd1-4511-84bd-ebcde9b7924d",
		idea: "the Colosseum",
		properName: true,
		tinySize: true,
		construct: true,
		humanDistress: true,
		humanDeath: true,
		historical: true,
		roman: true
	},
	{
		id: "01e024be-d62d-46d0-b701-2e484dee89e7",
		idea: "a labyrinth",
		construct: true,
		tinySize: true,
		nonSpecific: true
	}
];

const locales: Locale[] = info.map(bit => ({...base, ...bit}));

export default locales;
