import { AnEvent, AnEventBase, CoreIdea, TypedObject } from "./Ideas";

const base: (AnEventBase & TypedObject) = {
	type: "event",
	pluralEvent: false,
	nonPunctual: false,
	preposition: "dealing with"
};
const info: (Partial<AnEvent> & CoreIdea)[] = [
	{
		id: "32a97ee4-45b6-4f52-985a-b96cb1f5963e",
		idea: "a death in the family",
		humanDistress: true,
		humanDeath: true,
		humanDeathNatural: true,
		nonPunctual: true
	},
	{
		id: "c7c30e78-cdf8-4d9f-836c-86b48892392f",
		idea: "a new baby",
		nonPunctual: true,
		sexual: true
	},
	{
		id: "c33740ea-c52f-411b-8553-1bbb0a923049",
		idea: "a divorce",
		humanDistress: true,
		nonPunctual: true
	},
	{
		id: "9ec449e0-fed3-4274-bc77-4733387b975c",
		idea: "a flood",
		nonPunctual: true
	},
	{
		id: "793b77a4-ae85-4cf0-a1d4-e6a63d3ddb7d",
		idea: "a deadly chase",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		nonPunctual: true,
		preposition: "in"
	},
	{
		id: "271fe18b-1c22-4bbd-bd82-973f051b691b",
		idea: "car crashes",
		humanDeath: true,
		humanDeathViolent: true,
		humanDistress: true,
		pluralEvent: true
	},
	{
		id: "1afe96ae-21cd-42f8-b51d-a9a7b24d3beb",
		idea: "a tetanus booster shot",
		preposition: "getting"
	},
	{
		id: "1b643308-3efb-4137-88bf-6fb64cab14f7",
		idea: "an uninteresting speech"
	},
	{
		id: "eab8ebdd-442a-43ea-b32f-897f69ec40f8",
		idea: "menopause",
		sexual: true,
		nonPunctual: true,
		humanDistress: true
	},
	{
		id: "bb78970d-b062-46dc-8506-aca9c8c34bdb",
		idea: "an x-ray",
		preposition: "getting",
		humanDistress: true
	},
	{
		id: "de4c8ed0-f0ca-4273-af1f-9d682a60d519",
		idea: "beach volleyball"
	},
	{
		id: "6d7c6cc8-cd28-4077-8fef-6d69f9abcfe7",
		idea: "guitar lessons",
		pluralEvent: true
	},
	{
		id: "5d191a46-2e5c-4f24-99fd-20ebbf7967e4",
		idea: "an eclipse",
		preposition: "during"
	},
	{
		id: "1f47e3ab-7a5d-4fa5-ab56-c4e7f571491a",
		idea: "a false pregnancy",
		sexual: true,
		humanDistress: true,
		nonPunctual: true
	},
	{
		id: "d384ec43-c614-45ae-af92-456cda5caff9",
		idea: "a miscarriage",
		sexual: true,
		humanDistress: true
	},
	{
		id: "f7ef4d08-b7a1-462d-a417-af2a6cd337b5",
		idea: "a miscarriage of justice",
		humanDistress: true,
		nonPunctual: true
	},
	{
		id: "ff2a36ef-6b8d-47b9-ba8b-2525ce204d4d",
		idea: "an alligator attack",
		humanDistress: true,
		animalDistress: true
	},
	{
		id: "4fbfd471-eb9a-42f9-9ae5-1cd7db8c08ce",
		idea: "an earthquake",
		humanDistress: true,
		animalDeath: true,
		animalDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "bb2ba99a-27ec-498a-8624-db543986f84a",
		idea: "a standoff, guns drawn",
		western: true,
		historical: true,
		preposition: "in"
	},
	{
		id: "ce9f6025-a0de-4757-99d5-ea139af913bd",
		idea: "a writing challenge",
		nonPunctual: true
	},
	{
		id: "f8818fd3-2bcd-459a-a102-e3fd437cc5af",
		idea: "a boxing match",
		humanDistress: true,
		preposition: "in"
	},
	{
		id: "ee10fc8f-35ee-403b-b732-1930beb59eb1",
		idea: "a surprise party"
	},
	{
		id: "10b9e436-82b7-44e1-ad6f-847f0c149629",
		idea: "a case of head lice",
		humanDistress: true,
		nonPunctual: true
	},
	{
		id: "bb586f1b-14fd-40de-a09f-9af002f18cb9",
		idea: "a stabbing",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "5630d2d3-d3bd-4e02-95af-2c9a5510510a",
		idea: "a gun going off",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "720c54b3-b765-4c43-9114-9f98f0b6e83c",
		idea: "a band breaking up",
		humanDistress: true
	},
	{
		id: "e395905b-e1dc-4d27-8e5d-666e282d9b05",
		idea: "someone waking up in Hell",
		mythsReligionsAndMetaphysics: true,
		christianity: true,
		humanDistress: true,
		preposition: "being",
		humanDeath: true
	},
	{
		id: "2f4a713c-91c9-439a-8184-f4cac4c37cbf",
		idea: "when a video keeps buffering and never plays",
		modern: true,
		preposition: "waiting for"
	},
	{
		id: "1882e40a-c494-40e1-b273-6568e5461496",
		idea: "baptism",
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "222e009b-55af-4904-8fe5-c5118123ecf6",
		idea: "a cloudburst"
	},
	{
		id: "9059ffd8-b50e-4ab0-b3d1-6c857b3aafce",
		idea: "an election",
		nonPunctual: true
	},
	{
		id: "1bff6425-4b38-470b-883d-2efbea41813e",
		idea: "a broken bone",
		humanDistress: true,
		animalDistress: true
	},
	{
		id: "f34b544a-51dd-4cd5-9bb7-6cfe42fb7b35",
		idea: "a sprained ankle",
		humanDistress: true
	},
	{
		id: "e36c5e57-9fbe-4e28-b443-31aa8f598b82",
		idea: "a punch in the gut",
		humanDistress: true
	},
	{
		id: "ef51c3e9-f056-4d29-87f2-d2e5bb15ec5b",
		idea: "a loss of virginity",
		sexual: true
	},
	{
		id: "efea0b4f-9d4f-4091-bf2b-3330ef5d9a2e",
		idea: "a hurricane",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		nonPunctual: true
	},
	{
		id: "caf69e6d-d0fa-4cfc-9210-7c67b6b46b40",
		idea: "summer in the city",
		nonPunctual: true,
		preposition: "experiencing"
	},
	{
		id: "430286c1-4860-40fd-969a-92ab4942f530",
		idea: "a midnight snack",
		preposition: "getting"
	},
	{
		id: "b7d9f3b0-8a49-47b3-a3c9-b44f8dd0a22f",
		idea: "a tournament of champions",
		nonPunctual: true,
		preposition: "in"
	},
	{
		id: "4634aded-5d4d-4170-96f5-5dc6f22bf70c",
		idea: "a ménage à trois",
		sexual: true,
		preposition: "having"
	},
	{
		id: "5acbf62d-1493-4068-843d-4257008c943f",
		idea: "a supernova",
		preposition: "seeing"
	},
	{
		id: "e1ca4fed-3206-4e9d-91e5-4bdadc26a978",
		idea: "a misplaced apostrophe"
	},
	{
		id: "8d070029-27fe-4c2f-895a-8ca1bb67034d",
		idea: "a panicked phone call",
		humanDistress: true
	},
	{
		id: "3eda659f-f259-49b6-8a04-13278f1c48bb",
		idea: "a sacrifice",
		mythsReligionsAndMetaphysics: true,
		humanDistress: true,
		animalDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		animalDeath: true,
		preposition: "offering"
	},
	{
		id: "73fa6173-2fea-4f59-80ab-4e32ea297679",
		idea: "a drum solo"
	},
	{
		id: "eb1a7091-97cb-4b58-8724-f84d954de5b9",
		idea: "a choke hold",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "83b04127-1312-44f6-a518-e7f28643a12a",
		idea: "a high school play",
		nonPunctual: true
	},
	{
		id: "373d4d14-8ece-49aa-ab12-caa925d25677",
		idea: "a power outage",
		nonPunctual: true
	},
	{
		id: "0257e6b4-f50d-4b15-918f-42badc4a41e6",
		idea: "some good-natured brawling",
		humanDistress: true,
		preposition: "engaging in"
	},
	{
		id: "3296d599-209d-451c-821a-bc5d5ce934bc",
		idea: "a thunderstorm"
	},
	{
		id: "9f62e044-5e35-42c5-96b2-0839fe770b9e",
		idea: "a grand finale"
	},
	{
		id: "0099682e-0ae3-4c3b-87c3-d98add0f2a53",
		idea: "a pilgrimage",
		mythsReligionsAndMetaphysics: true,
		nonPunctual: true,
		preposition: "going on"
	},
	{
		id: "38b6f902-c92d-4f86-83d4-499a734870c0",
		idea: "puberty",
		sexual: true
	},
	{
		id: "577ca6b5-7421-4468-8adc-499742613a0b",
		idea: "a mid-life crisis",
		humanDistress: true,
		nonPunctual: true
	},
	{
		id: "f93a0c93-b2f3-47c6-8923-62547d2a755a",
		idea: "a clean break"
	},
	{
		id: "032af495-8287-4950-bb97-d03edb19e9fe",
		idea: "a homecoming",
		nonPunctual: true
	},
	{
		id: "dedea6f2-09c5-43d4-8b75-eed441a670c8",
		idea: "a tsunami",
		humanDistress: true,
		animalDistress: true,
		animalDeath: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "a48278bc-886c-4060-b1e0-c396b8a7ed99",
		idea: "an arrest",
		humanDistress: true
	},
	{
		id: "1656a584-799a-495f-a467-5eb8e16df2fa",
		idea: "a betrayal",
		humanDistress: true,
		nonPunctual: true
	},
	{
		id: "beb42a29-3879-41c3-a6c5-2cb91867a95d",
		idea: "a heart attack",
		humanDistress: true,
		humanDeath: true,
		humanDeathNatural: true
	},
	{
		id: "33be070e-ac3d-4840-962e-f364a748e3b5",
		idea: "starting a family",
		sexual: true,
		nonPunctual: true
	},
	{
		id: "e1f60aec-92a7-48ae-9885-daacb4cb7067",
		idea: "a time out"
	},
	{
		id: "d755ab93-7bb1-461d-ad79-395a8e61f228",
		idea: "a first kiss",
		sexual: true
	},
	{
		id: "cc3b4fa9-a780-4fc1-a5ba-367c4fd49ea1",
		idea: "a wipeout",
		humanDistress: true
	},
	{
		id: "30b82e12-8842-4daa-ae38-5ef4dd1aef37",
		idea: "a spit-take"
	},
	{
		id: "6854bcb0-518f-4b85-b991-e9d02f74877e",
		idea: "the first snowfall",
		nonPunctual: true
	},
	{
		id: "96e774a2-7793-4389-bd45-b7ffc2d645e4",
		idea: "a bee sting",
		humanDistress: true
	},
	{
		id: "0e5215e4-e0e2-4482-8728-e617cfb2ed49",
		idea: "a headache",
		humanDistress: true,
		nonPunctual: true
	},
	{
		id: "c0f3a659-c063-487d-af3a-0dfaf60ec323",
		idea: "when it all comes together",
		nonPunctual: true,
		preposition: "experiencing"
	},
	{
		id: "2962fc74-ae8b-4006-b7f8-9c4d7dc92c65",
		idea: "a plane crash",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "465a55ce-2282-4da7-9841-175f96df23bd",
		idea: "something growling in the night",
		animalDistress: true,
		humanDistress: true,
		horror: true,
		preposition: "hearing"
	},
	{
		id: "2f50af96-4a37-4916-b9ba-c7a0dade44fa",
		idea: "a kick to the rear"
	},
	{
		id: "547c6bb5-f0a1-48f1-be77-a323bfa8b787",
		idea: "a riptide"
	},
	{
		id: "e368d616-a51c-468f-8754-8c04640b6342",
		idea: "a dawning realization",
		preposition: "having"
	},
	{
		id: "322d019c-9ffe-441a-acff-c780101b1404",
		idea: "a single siren in the distance",
		humanDistress: true,
		preposition: "hearing"
	},
	{
		id: "f8ef9bf6-bbc7-4f15-a87b-a598cc3fffd8",
		idea: "a game of poker",
		nonPunctual: true
	},
	{
		id: "1f07a0dc-691e-4ac4-9ddf-41bef7c73258",
		idea: "a game of blackjack"
	},
	{
		id: "3c9b578e-264b-4017-9d53-91583ccf0607",
		idea: "a game of solitaire"
	},
	{
		id: "8b646d83-3b0f-4418-b6dd-c338e635f062",
		idea: "breaking the enchantment",
		fantasy: true,
		medievalFantasy: true,
		fairyTalesAndUrbanLegends: true
	},
	{
		id: "b3f57102-f248-4707-a5b1-5e9df5dab64c",
		idea: "a call that is coming from inside of the house",
		horror: true,
		fairyTalesAndUrbanLegends: true,
		humanDistress: true,
		preposition: "receiving"
	},
	{
		id: "cc06d60a-aa03-4f68-8ba8-43bdbc9ea11c",
		idea: "an anniversary",
		preposition: "celebrating"
	},
	{
		id: "87eddbcf-4e56-4b58-ae9b-0a1a95f9a1d8",
		idea: "a deadly game of cat and mouse",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		preposition: "caught in"
	},
	{
		id: "c566c514-2a9c-4cd2-ab18-3b3edef5ae06",
		idea: "a love triangle",
		humanDistress: true,
		preposition: "caught in",
		sexual: true
	},
	{
		id: "dc774fe4-5753-4791-964d-861acc12336c",
		idea: "reaching adulthood"
	},
	{
		id: "eacbad91-4c83-4749-ac56-a8f5382bbd4b",
		idea: "a chase",
		preposition: "involved in",
		humanDistress: true
	},
	{
		id: "9092098f-1f18-469e-a1ce-7e59f26811f5",
		idea: "a final countdown"
	},
	{
		id: "749a93de-9e25-48f5-9c47-66552f49c573",
		idea: "a wide-awake nightmare",
		humanDistress: true
	},
	{
		id: "91ce62ec-3437-4303-94ae-b15a4248bc5d",
		idea: "an avalanche",
		humanDeath: true,
		humanDeathViolent: true,
		humanDistress: true
	},
	{
		id: "071251b9-0d7d-4ef4-88dd-28bc550463ea",
		idea: "a stock market crash",
		humanDistress: true
	},
	{
		id: "23b13dbf-1826-489d-8b06-55c5f00f1bbf",
		idea: "growing old",
		humanDeath: true,
		humanDeathNatural: true,
		humanDistress: true
	},
	{
		id: "e59085d9-c045-4430-9102-09b826ce6968",
		idea: "a job interview"
	},
	{
		id: "c7242f7c-737d-4901-9f99-8257d43c8bec",
		idea: "a shocking revelation",
		humanDistress: true
	},
	{
		id: "ce5aeaaa-7994-4294-94c6-e216e2d46d6d",
		idea: "an epic journey",
		preposition: "having",
		nonPunctual: true
	},
	{
		id: "0dcf936e-71a1-4f20-ad0a-7a09b8845a28",
		idea: "deep respect",
		preposition: "experiencing"
	},
	{
		id: "37689dab-848d-4c55-8fd6-cf03ddae8243",
		idea: "a cliffhanger ending",
		humanDistress: true
	},
	{
		id: "1cf36eac-147e-4c9d-95a9-63b4536246c0",
		idea: "uncontrollable crying",
		humanDistress: true
	},
	{
		id: "7c3a2bc1-0885-41a1-ac0e-d7456ca10f73",
		idea: "objectification",
		humanDistress: true,
		sexual: true
	},
	{
		id: "1acafc6b-faf3-42ce-9b68-5c0042cd1774",
		idea: "a crucifixion",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		historical: true,
		roman: true
	},
	{
		id: "089cd99e-0e8f-4f8c-8874-0af422bd58d4",
		idea: "a long-term relationship",
		preposition: "in",
		sexual: true
	}
];

const events: AnEvent[] = info.map(bit => ({...base, ...bit}));

export default events;
