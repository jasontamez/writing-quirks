import { Action, ActionBase, CoreIdea, TypedObject } from "./Ideas";

const base: ActionBase & TypedObject = {
	type: "action",
	possessive: false,
	genericPossessive: "one's"
};
const info: (Partial<Action> & CoreIdea)[] = [
	{
		id: "fbc9ae99-ed5f-42ef-9c37-abdebe367105",
		idea: "digging"
	},
	{
		id: "cccac651-fb5b-4b4f-8e1c-f3b988dfab8b",
		idea: "fighting with swords",
		historical: true,
		fantasy: true,
		medievalFantasy: true,
		roman: true,
		humanDeath: true,
		humanDeathViolent: true,
		humanDistress: true
	},
	{
		id: "b7866cb3-2786-4773-ba1e-4180bb6dc46b",
		idea: "taking a pulse"
	},
	{
		id: "08b0fe0a-cb52-4210-a2bf-ad4c303d2fb4",
		idea: "wiping away sweat"
	},
	{
		id: "9cc5f7dd-2a1c-463a-ac6f-4ac68600b2a0",
		idea: "eating too much"
	},
	{
		id: "d43cf787-5a75-4128-944f-17095fbbafbb",
		idea: "trying to dance"
	},
	{
		id: "ce0e95cc-391f-49ef-8679-80a12d4940bd",
		idea: "ordering food"
	},
	{
		id: "87680520-4314-438a-8399-625f8cd55228",
		idea: "sleeping soundly"
	},
	{
		id: "8df11d6e-e4c1-4c51-a81d-f5a4b624d9f7",
		idea: "scratching an itch"
	},
	{
		id: "d73c5d90-1b09-4da6-a678-63f1aaff7c05",
		idea: "going to town"
	},
	{
		id: "1c92bcb5-7152-423e-9c9a-cd3574d23548",
		idea: "driving"
	},
	{
		id: "ff9da362-ef02-4d43-b6a2-a30e42d9ad9d",
		idea: "sleepwalking"
	},
	{
		id: "20a894f3-7030-48bf-8323-ccd481b1a5ac",
		idea: "prancing"
	},
	{
		id: "6c42f3c9-b7f4-417f-a563-69a437bc28b8",
		idea: "killing",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		animalDeath: true,
		animalDistress: true
	},
	{
		id: "8a2bb89f-8422-4011-8bdf-627197c4a62a",
		idea: "giving away clothes"
	},
	{
		id: "fb1d1b29-3ba2-4c25-9847-616995a8ca2e",
		idea: "returning a purchase"
	},
	{
		id: "c58dfafb-0659-4f53-ab77-f4373f953597",
		idea: "looking out"
	},
	{
		id: "f2ab6868-08a3-4cfa-8fd0-970d1fd1850a",
		idea: "going to church",
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "61027b79-4320-4b78-93ad-7959633c6784",
		idea: "quilting"
	},
	{
		id: "c1d9a26d-eff7-4aea-93e1-b761e132448c",
		idea: "jumping off a bridge",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "3f91e868-d65d-4187-8290-dc4c72b56741",
		idea: "muttering"
	},
	{
		id: "2c52e8fb-88a8-40ee-a53d-3dbdc8a8de34",
		idea: "yodeling"
	},
	{
		id: "8b8e1e6e-d565-4eed-86b8-600fccaa149e",
		idea: "taking a big gulp"
	},
	{
		id: "ad580da6-1504-46bc-ac40-b175132913e3",
		idea: "drinking shampoo by mistake"
	},
	{
		id: "0ae8aac4-362e-4156-a1ce-fb1c64e66344",
		idea: "growling",
		animalDistress: true
	},
	{
		id: "15633f16-be97-442f-8f76-236430f558b0",
		idea: "dusting the room"
	},
	{
		id: "a6b138f0-8fb4-4f87-8811-390f6023c9aa",
		idea: "forgetting"
	},
	{
		id: "16a1fcee-7022-4837-a010-f4e292d34081",
		idea: "choosing the undesirable"
	},
	{
		id: "7f5dc1ee-d196-4807-88d0-2c89535d0c75",
		idea: "whittling"
	},
	{
		id: "090ad6e9-5e3d-42a3-9dd9-03c5ca956cfd",
		idea: "not wearing underwear",
		sexual: true
	},
	{
		id: "fab475ec-f5fd-41d6-809d-03f03344acc9",
		idea: "sleeping with eyes open"
	},
	{
		id: "091cb80f-6929-4bc9-85d6-f11bcf9a0a55",
		idea: "ignoring someone",
		humanDistress: true
	},
	{
		id: "fe17ede4-05a4-4181-bbff-69cc1bd1155e",
		idea: "understanding something for the first time"
	},
	{
		id: "f6f6189a-9b7c-425b-95ee-275f5e356d91",
		idea: "rolling down a hill"
	},
	{
		id: "b9effcda-a48e-4002-9c2f-6d6d99c122e0",
		idea: "climbing a mountain"
	},
	{
		id: "ff8745cc-511c-45a9-88cb-56fb881be304",
		idea: "freezing to death",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "e3200176-5749-46b7-ba0b-7785d90c59b3",
		idea: "wondering if cobwebs and spiderwebs are the same thing"
	},
	{
		id: "a17c3146-41bc-45cb-8e2e-8150c288f5b0",
		idea: "using a telescope"
	},
	{
		id: "53b7cd26-30b4-42ef-acb6-95132b977fdb",
		idea: "repeating things"
	},
	{
		id: "76de2995-e929-4a80-89c9-e2bffd2be434",
		idea: "misspelling important words"
	},
	{
		id: "1f7b4a15-41ce-4701-8fc6-453de1182d79",
		idea: "popping up out of nowhere"
	},
	{
		id: "357dbc87-5f10-4c06-9224-6ed90d209009",
		idea: "putting a collar on a giraffe"
	},
	{
		id: "458888c6-61b9-4ca7-bb6f-df0f87ea2681",
		idea: "making out",
		sexual: true
	},
	{
		id: "65dd8776-a7ea-4095-9127-1c08d119e040",
		idea: "flushing something down the toilet"
	},
	{
		id: "aed403cb-b25c-4447-b77f-e496cf0f70bd",
		idea: "clutching a rosary",
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "72a1759a-f091-4825-a1ee-cffa8e4c7375",
		idea: "parallel parking"
	},
	{
		id: "55e6aa1a-bbfa-48a9-9641-0c64bec55e7a",
		idea: "wearing a turban"
	},
	{
		id: "35f6ea83-d0d3-462b-94ed-341adeae93ce",
		idea: "smoking"
	},
	{
		id: "d3df008d-5d81-43d4-9e92-2cf8ab30599d",
		idea: "using kneepads",
		sexual: true
	},
	{
		id: "4861b13d-17b6-425f-8237-e9d46e4b52ba",
		idea: "spinning a globe"
	},
	{
		id: "5acde06f-d997-4c8c-a5e7-bc152d3af1bc",
		idea: "pulling up carpet"
	},
	{
		id: "522c92f8-bebd-417c-8a37-d70312f9317b",
		idea: "being aroused in public",
		sexual: true
	},
	{
		id: "0d5e1bb6-75a8-4663-90da-4a13289de201",
		idea: "stripping",
		sexual: true
	},
	{
		id: "af8b820f-a284-4e5a-a38d-fcc66daba759",
		idea: "getting drunk",
		alcohol: true
	},
	{
		id: "3725f9f8-b44f-4ad8-ae8c-df493f7915dc",
		idea: "meeting the lawyer",
		humanDistress: true
	},
	{
		id: "fb86def8-00c4-4db6-9507-e49d2d63dbf0",
		idea: "eating tofu"
	},
	{
		id: "75afe891-f29c-4638-9134-cefe163adef0",
		idea: "pretending to read"
	},
	{
		id: "1ba1ab12-2730-4103-9084-49c30dafce24",
		idea: "trying to see at night"
	},
	{
		id: "2214ad4d-ed4d-4dfd-8e69-5d7fa7f5d82d",
		idea: "catching what is thrown"
	},
	{
		id: "ed02fb17-48ba-44cf-9326-f47b758e5019",
		idea: "turning something off and on again until it works",
		modern: true
	},
	{
		id: "81e3b6b0-7ab6-4d09-b76b-945cff338dad",
		idea: "being tired"
	},
	{
		id: "ef345180-a1c4-475c-a515-86436e242a4c",
		idea: "believing in magic"
	},
	{
		id: "025cde24-bbc2-45b3-a5c0-59acf9bfd14f",
		idea: "taking a shower with [THEIR] clothes still on",
		possessive: true,
		humanDistress: true
	},
	{
		id: "0c509c24-abc7-4a71-a944-122ae312743e",
		idea: "reaching a new height"
	},
	{
		id: "a4e185a9-373d-49e9-a442-80e7e1b1a6a7",
		idea: "tricking someone",
		humanDistress: true
	},
	{
		id: "eea76b82-50ec-47d5-9c44-1da1bc4f20e1",
		idea: "accidentally turning someone on",
		sexual: true,
		humanDistress: true
	},
	{
		id: "711c02a6-d431-499a-bc17-6ba230d7607c",
		idea: "walking slowly"
	},
	{
		id: "4d8e978c-dc43-4e19-ba11-25c8eee99466",
		idea: "spilling juice on a keyboard",
		modern: true
	},
	{
		id: "4e5fc5c5-6386-471e-985f-c6bdbd7a9f46",
		idea: "rolling a pair of dice"
	},
	{
		id: "a07ec909-36e5-4fca-a5ce-2c80237f3c43",
		idea: "trying not to breathe"
	},
	{
		id: "0f1a94c9-9ead-484a-bff1-20cb39a8794a",
		idea: "holding [THEIR] breath",
		possessive: true,
		genericPossessive: "your"
	},
	{
		id: "0aa8d7f3-65ea-47aa-941d-9c64cdd1a049",
		idea: "uniting people"
	},
	{
		id: "0f475433-4e63-4af5-8913-f3dc0153099d",
		idea: "raising the dead",
		fantasy: true,
		horror: true
	},
	{
		id: "508ccc33-860d-483a-a9ab-3e091d866260",
		idea: "clapping"
	},
	{
		id: "70136998-fa0c-4020-923c-d40a4b4624b6",
		idea: "quitting"
	},
	{
		id: "55bb6811-e151-46a8-a533-679c6d22a78a",
		idea: "having [THEIR] papers in order",
		possessive: true,
		humanDistress: true
	},
	{
		id: "daf14afe-c269-481b-8798-bf15654ce0de",
		idea: "riding off into the sunset",
		historical: true,
		western: true
	},
	{
		id: "b4382627-e308-4ca1-9305-63acfe7f719c",
		idea: "hanging stockings"
	},
	{
		id: "1dc9f008-a7f1-4127-9932-1929372cc444",
		idea: "being out of medication",
		humanDistress: true
	},
	{
		id: "77a32621-f5a2-4ebb-9f96-2e161aa23b98",
		idea: "being naked and afraid",
		humanDistress: true
	},
	{
		id: "a24a1d15-6b7e-49fe-a896-15132502ea86",
		idea: "playing chess"
	},
	{
		id: "83dea6cf-c8b3-45b1-a501-83a8d58d35d8",
		idea: "playing Russian roulette",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "7b88e24c-d08a-41ef-9519-736e256bb14b",
		idea: "riding a dog",
		animalDistress: true
	},
	{
		id: "c24d45aa-a398-48b2-a029-7ec0dfc60aff",
		idea: "getting [THEIR] hair done",
		possessive: true,
		modern: true
	},
	{
		id: "68cf6700-c0e3-40c3-9d94-497a12f2f1eb",
		idea: "hanging a mirror"
	},
	{
		id: "fc63697f-47ae-4c87-a7e5-f7f1fb2bc67d",
		idea: "surfing",
		modern: true
	},
	{
		id: "ede16180-28d1-4f33-8e1d-ea4b5bb3bd9a",
		idea: "skateboarding",
		modern: true
	},
	{
		id: "06905988-7921-4408-8a38-45cf86627c78",
		idea: "snow skiing"
	},
	{
		id: "ba4f53e1-0cc5-45b2-998d-6405eb398d25",
		idea: "water skiing",
		modern: true
	},
	{
		id: "7342e546-dc2a-4509-a49c-e520cca59c90",
		idea: "being stabbed in the foot",
		humanDistress: true
	},
	{
		id: "6b6f4d35-5ab4-47a7-855b-f8969cda2057",
		idea: "screaming",
		humanDistress: true
	},
	{
		id: "446c1a8e-b97e-4127-9099-dd9787470511",
		idea: "wailing",
		humanDistress: true,
		animalDistress: true
	},
	{
		id: "9dda6ded-4b73-4b46-b846-c6de6c6a7c8f",
		idea: "losing an eye",
		humanDistress: true
	},
	{
		id: "bb2a7727-649e-48ae-aa0a-7db63086f8c2",
		idea: "melting in the sun"
	},
	{
		id: "3ef4f753-b596-4d12-8481-19785546d0c2",
		idea: "the curtain falling"
	},
	{
		id: "9f278a0e-2742-496c-a239-09a9054c46c7",
		idea: "kicking the bucket",
		humanDistress: true,
		humanDeath: true,
		humanDeathNatural: true
	},
	{
		id: "dabcae9c-7f23-47fa-b946-c46391f0fbcf",
		idea: "eating dirt"
	},
	{
		id: "7acdde62-910b-4211-9e9a-0a73cca8c1d3",
		idea: "opening a can of food"
	},
	{
		id: "54abaf1a-0759-4f08-a56d-74ad6ceea546",
		idea: "being at a loss for words",
		humanDistress: true
	},
	{
		id: "25f2e4dc-4706-42e6-bd11-19b03617e38a",
		idea: "throwing a hand axe",
		historical: true,
		western: true
	},
	{
		id: "24ab23c0-4998-4e61-9685-7e38cde04d78",
		idea: "catching air",
		modern: true
	},
	{
		id: "3ad5bf99-30d1-4fb0-a64f-f9493fdfaf0f",
		idea: "watching a bad movie"
	},
	{
		id: "9fc43927-1a31-49a5-9f2d-2e340f75db36",
		idea: "framing a diploma"
	},
	{
		id: "c7e90409-32ca-44e5-a60e-abcf31bd1848",
		idea: "dreaming"
	},
	{
		id: "12b2db9a-4dea-4836-a7f3-e52138a528bc",
		idea: "lucking out"
	},
	{
		id: "f8505f02-be09-4219-8a9f-66e67b740fdd",
		idea: "hopping around"
	},
	{
		id: "1237d642-f9a5-4fab-9967-6ea2ddaeda2a",
		idea: "doing jumping jacks"
	},
	{
		id: "4125ca27-52da-4353-b34b-f596e3eb41f2",
		idea: "biding [THEIR] time",
		possessive: true
	},
	{
		id: "73b1f650-025b-4c59-8d9b-6d0a6b51e977",
		idea: "burning a flag"
	},
	{
		id: "b8e6c3d0-ff6b-4c9e-8447-231fa23745be",
		idea: "burping loudly"
	},
	{
		id: "6453bed8-cc56-432d-92eb-85cdf887a67f",
		idea: "getting past an obstacle"
	},
	{
		id: "90f1c6d6-021b-4cc1-bcb1-8fd67db81f6b",
		idea: "forgetting a birthday"
	},
	{
		id: "3a52e110-6656-4e99-a9b8-2eb402765364",
		idea: "getting lost",
		humanDistress: true
	},
	{
		id: "f413e61f-6646-46cf-8831-be6cdf191c4a",
		idea: "faking a death",
		humanDeath: true,
		humanDistress: true
	},
	{
		id: "e17aedcc-4b68-442e-9162-cefb183380d0",
		idea: "wetting the bed",
		humanDistress: true
	},
	{
		id: "bfa9ab5c-1136-4093-b6d4-3190ae9e124c",
		idea: "getting a membership"
	},
	{
		id: "b3b8c552-a26c-42ab-94e3-6b4347c3cc06",
		idea: "feeling like a princess"
	},
	{
		id: "68364734-c716-4075-8d37-1fb0838216ff",
		idea: "making the team"
	},
	{
		id: "04c962d3-de4e-44db-a6d2-ed14b318be99",
		idea: "hitting any key to continue",
		modern: true
	},
	{
		id: "230a0085-c06b-4ee1-8b0f-412c27e92369",
		idea: "giggling uncontrollably"
	},
	{
		id: "e2c2e60f-7fce-4714-8100-514526836096",
		idea: "writing a check"
	},
	{
		id: "5c5e94a0-0cc0-41bd-b805-1f158b16e440",
		idea: "overdrafting [THEIR] account",
		possessive: true
	},
	{
		id: "60490afd-b6ce-4840-adc7-3ea6eb60cbba",
		idea: "dancing at the club",
		modern: true
	},
	{
		id: "9311cf82-18d2-4113-b8fc-8798692b3657",
		idea: "choking on a meal",
		humanDistress: true,
		humanDeath: true
	},
	{
		id: "7a0071f2-d4c9-4dfd-9eba-b7def7e6b5cd",
		idea: "walking for the first time"
	},
	{
		id: "cdc8a04f-8721-4ac6-a26c-7e5458bd1603",
		idea: "jumping the gap"
	},
	{
		id: "8a664803-a7d3-4913-9648-baa254d53085",
		idea: "burning a bridge",
		humanDistress: true
	},
	{
		id: "84aae885-181a-4103-8fa0-d51d2eb6640c",
		idea: "yelling in public"
	},
	{
		id: "83e6e294-9a38-4b9e-b80d-545712944fe3",
		idea: "solving an equation"
	},
	{
		id: "65e7208f-c980-4f63-9162-c7ee8b696e27",
		idea: "quoting a public figure"
	},
	{
		id: "b3de8f8e-cbe6-4840-a5f2-61439e8e1c25",
		idea: "obfuscating the truth"
	},
	{
		id: "cadd425a-995c-4d8c-8463-67c260aead05",
		idea: "watching [THEIR] language",
		possessive: true
	},
	{
		id: "0eab9594-6bab-4ef0-95bb-c16b506c758c",
		idea: "holding hands"
	},
	{
		id: "67b86597-05be-4717-8c81-b6eb76dd9ddb",
		idea: "breathing fire"
	},
	{
		id: "502869d8-ed91-4856-b252-6bb94de0ccbf",
		idea: "playing hopscotch"
	},
	{
		id: "211ec8c5-6b82-480f-bdfd-251cf25d9950",
		idea: "voting someone off the island",
		humanDistress: true,
		modern: true
	},
	{
		id: "f0510971-daaa-465c-a0a6-a06ccb01f453",
		idea: "killing chickens for food",
		animalDistress: true,
		animalDeath: true
	},
	{
		id: "2480ba67-d26b-4e18-a925-25427e050bdc",
		idea: "telling lies",
		humanDistress: true
	},
	{
		id: "e537c8b1-1c1b-41d6-b7bb-d161b6e9571f",
		idea: "eating out",
		sexual: true
	},
	{
		id: "d69482ae-5f3e-457b-92c6-879b2607473d",
		idea: "square dancing"
	},
	{
		id: "fb79830e-0de8-4849-adb3-973ac125d1ab",
		idea: "bouncing"
	},
	{
		id: "4e89f885-5528-4791-920c-e202177a45f1",
		idea: "living the dream"
	},
	{
		id: "aa703aff-da28-4fc3-870d-af2f6cff01eb",
		idea: "looting",
		humanDistress: true
	},
	{
		id: "55acb710-13f2-4f2a-988d-f9ed1ec0a416",
		idea: "destroying someone's childhood",
		humanDistress: true
	},
	{
		id: "ec5991f1-6d9b-4f80-9dc8-d93bc0e7e9b6",
		idea: "not watching TV",
		modern: true
	},
	{
		id: "e99112b3-08f4-4dfd-8db2-8ed0c1fdc2c5",
		idea: "coming in second"
	},
	{
		id: "a8eaa4ba-22ea-4252-a195-2a6f3b1cb059",
		idea: "carving initials into a tree"
	},
	{
		id: "7aa5d641-a6a0-490d-9d2f-bd40266579dc",
		idea: "rolling [THEIR] eyes",
		possessive: true,
		genericPossessive: "their"
	},
	{
		id: "7fa1e083-e9bb-41f2-b7b5-c8888ec9edab",
		idea: "skinny dipping",
		sexual: true
	},
	{
		id: "3ab85099-6c60-424f-a13a-a6a15ea789ca",
		idea: "burning the remains",
		humanDistress: true,
		animalDistress: true,
		humanDeath: true,
		animalDeath: true
	},
	{
		id: "918a14ee-d483-42a3-80cd-934ec41b6c12",
		idea: "going blind",
		humanDistress: true
	},
	{
		id: "da3204cb-3f3f-4dde-a71d-95cec79cbdb6",
		idea: "diving in"
	},
	{
		id: "10ff370f-5663-45ad-b01a-58fc08eebfcf",
		idea: "dividing fractions"
	},
	{
		id: "0f529f8d-60e0-47c7-8b84-cbf8a4a5d7bd",
		idea: "coloring outside the lines"
	},
	{
		id: "4a20123a-ddfc-4bcc-9153-5e22459a9601",
		idea: "joining the band"
	},
	{
		id: "4ddd4896-854b-4dc3-869e-2108180f0c3d",
		idea: "being mistaken for someone famous"
	},
	{
		id: "4246bf1f-8175-41a3-9925-4a57f8240a51",
		idea: "writing the great American novel",
		properName: true
	},
	{
		id: "2247fcfe-0c58-4efd-8174-ebf58b663c04",
		idea: "tap dancing"
	},
	{
		id: "b1954f0e-20fb-4ed9-ae32-425245a82488",
		idea: "sleeping naked",
		sexual: true
	},
	{
		id: "df909d1c-5df6-42c3-982c-5bda6ea2f6b9",
		idea: "being too close for comfort"
	},
	{
		id: "07196ade-0626-4afa-b1c4-e05121c66f0b",
		idea: "pointing a finger"
	},
	{
		id: "34ee7f8d-03a0-47be-ad06-1eaa8f161971",
		idea: "livestreaming a crime",
		modern: true,
		humanDistress: true
	},
	{
		id: "d03d3678-2e09-41e4-b7be-6373e62a5471",
		idea: "using DVDs as shurikens",
		modern: true,
		humanDistress: true
	},
	{
		id: "f8a26e12-189b-4a95-8a9a-980c048b17af",
		idea: "giving thanks"
	},
	{
		id: "3ee76395-01f8-4bdc-900b-8732ba38c8fd",
		idea: "getting laid",
		sexual: true
	},
	{
		id: "e068b5cf-bc58-4106-97fb-48543a691504",
		idea: "job hunting"
	},
	{
		id: "42fde2a8-a1a9-4792-beb5-f8d650d17450",
		idea: "looking for a parent",
		humanDistress: true
	},
	{
		id: "695e5581-c763-4b4d-8ac2-9025dd566821",
		idea: "getting fired from work",
		humanDistress: true
	},
	{
		id: "7cc1c164-3971-49e3-ad6a-c05f07d84e91",
		idea: "checking in"
	},
	{
		id: "a614ff9b-34cd-47a4-93e2-2a7ed4835761",
		idea: "not knowing what day it is",
		humanDistress: true
	},
	{
		id: "89b3cc66-2457-43dd-86d8-bac00486d1b7",
		idea: "screeching",
		humanDistress: true,
		animalDistress: true
	},
	{
		id: "19041248-a878-4453-b624-69bf5a484e3a",
		idea: "burning [THEIR] tongue",
		possessive: true,
		humanDistress: true
	},
	{
		id: "7c478395-b33f-4557-9d75-2957be5bbff0",
		idea: "collecting the entire set",
		modern: true
	},
	{
		id: "a23dd57a-fe6d-47f6-b234-3159581d0afd",
		idea: "lip reading"
	},
	{
		id: "812c7e5b-d4de-4641-a1dc-ed86931933a9",
		idea: "getting [THEIR] period",
		possessive: true,
		sexual: true,
		humanDistress: true,
		genericPossessive: "her"
	},
	{
		id: "615c8796-8804-49ec-8f66-299682f45e7c",
		idea: "cooking with gas"
	},
	{
		id: "c78a9098-7e71-4011-ad2e-81c33d925a94",
		idea: "ignoring an injury"
	},
	{
		id: "c976be3e-efdb-4941-88ef-33cf52ecca8c",
		idea: "hacking",
		modern: true
	},
	{
		id: "f69bf817-7f35-4df8-95ac-554a6944246f",
		idea: "carving a tunnel"
	},
	{
		id: "8e111fa4-9828-4d61-9bff-c88ec550f9dd",
		idea: "accepting [THEIR] fate",
		humanDistress: true,
		humanDeath: true,
		possessive: true,
		genericPossessive: "your"
	},
	{
		id: "29b83c85-085d-4a8e-b458-5388831aad41",
		idea: "choosing [THEIR] fate",
		possessive: true,
		genericPossessive: "your"
	},
	{
		id: "96ceb7da-859e-4309-b0e4-6505f578d41a",
		idea: "making a strong offer"
	},
	{
		id: "303deba4-b806-47c2-a141-89634da638eb",
		idea: "running from [THEIR] past",
		possessive: true,
		humanDistress: true
	},
	{
		id: "0474de3e-a445-443d-9d69-b55bdbc1cd84",
		idea: "growing up too fast"
	},
	{
		id: "0b2413f3-a389-451f-856c-34acd028fd0b",
		idea: "adding the letter X to something's name",
		modern: true
	},
	{
		id: "8a556be9-16de-4a2b-a85b-ec07b445be6b",
		idea: "falling in love"
	},
	{
		id: "12a82e3d-2027-4e20-a1fb-c174d87c04c7",
		idea: "having to change"
	},
	{
		id: "df9e904e-ac82-4c31-be93-342344aa2515",
		idea: "smelting"
	},
	{
		id: "cf928e65-4a39-4908-8869-df8fb572b8e3",
		idea: "eating on the run"
	},
	{
		id: "df16f031-e2a6-4fe3-b702-6be19d5e33fc",
		idea: "running from a killer",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true,
		horror: true
	},
	{
		id: "b8db6fc2-95e3-4cb3-ade1-016fdd030487",
		idea: "running from the police",
		humanDistress: true
	},
	{
		id: "53bca21a-5aa7-4190-86aa-93e03cc3e838",
		idea: "painting a window"
	},
	{
		id: "84a8ac59-bbbe-46a7-a262-f9536ef5145b",
		idea: "scraping [THEIR] knee",
		humanDistress: true,
		possessive: true,
		genericPossessive: "your"
	},
	{
		id: "9369c7ee-36e1-4126-8e85-067e467afb34",
		idea: "turning a page"
	},
	{
		id: "e53976a0-b4b9-4ee8-8f1b-50ec88e7c116",
		idea: "knowing all the lyrics"
	},
	{
		id: "fbec8ed7-729c-44eb-9c5d-4477aeb5f5f4",
		idea: "singing off-key"
	},
	{
		id: "2240c3f9-c289-4bd7-8a72-2d2e116b58d8",
		idea: "finding footprints where there shouldn't be any"
	},
	{
		id: "0bdfb168-bbdb-4c50-af2f-20159cdd3a86",
		idea: "spinning a bottle",
		sexual: true
	},
	{
		id: "1f3f6a7b-84b8-487a-812d-197f6914e7cb",
		idea: "stepping on a nail",
		humanDistress: true
	},
	{
		id: "7a3f7791-9573-4040-b6b1-bc75bf8cede7",
		idea: "managing tasks"
	},
	{
		id: "b94c65cb-4e71-4fb2-8e0b-adbfece034af",
		idea: "feeling cool (fashionable)",
		modern: true
	},
	{
		id: "a2a6c19f-69cc-49ab-8777-d3a06c37ef67",
		idea: "being pretty"
	},
	{
		id: "97635a2b-93e4-4ca6-aedc-acb468fb801f",
		idea: "having enough"
	},
	{
		id: "eac7272b-e5db-4e63-ba18-a90d749e6f4d",
		idea: "getting 15% off of everything",
		modern: true
	},
	{
		id: "db4a1f6e-54c0-4847-83ac-2fd13e0734be",
		idea: "passing for another gender"
	},
	{
		id: "17d07a2c-a440-49f3-bccd-ba32d294cdb0",
		idea: "being cold-blooded"
	},
	{
		id: "29f4d259-6b4f-472e-8586-b5e7aef1d3b8",
		idea: "feeling free"
	},
	{
		id: "b20ce81a-a160-4bd7-ac79-e3e63f94f132",
		idea: "having twelve different hair colors at once",
		modern: true
	},
	{
		id: "275f178c-a418-4640-b747-b014096ef01b",
		idea: "being thirsty",
		humanDistress: true
	},
	{
		id: "5aa97448-fdd6-4565-a067-48d3f3094b22",
		idea: "raising the bar"
	},
	{
		id: "7db03023-8b3b-4519-8f47-975a30fbf942",
		idea: "being alone"
	},
	{
		id: "73229ef2-be45-419c-b436-bb7f7d2efb04",
		idea: "losing the remote control",
		modern: true
	},
	{
		id: "1d827f99-3858-4b5d-8cef-9c4f06bcb878",
		idea: "gaining weight"
	},
	{
		id: "b48f4893-0330-4fdc-9237-2cd66f6eea57",
		idea: "losing weight"
	},
	{
		id: "e8da71b6-e54e-4fef-850f-595e6ceaeec3",
		idea: "finding oil"
	},
	{
		id: "e4da5361-666e-447a-b3fb-0dcfb5df6165",
		idea: "feeling funny",
		humanDistress: true
	},
	{
		id: "7aaf4139-7ace-4cd9-9eb3-d0d0852b2239",
		idea: "dealing with sexual assault",
		sexual: true,
		humanDistress: true
	},
	{
		id: "82d64670-7ddc-4332-a92a-ffb69e8addfa",
		idea: "repressing a hidden trauma",
		humanDistress: true
	},
	{
		id: "a8a9f173-ec5c-4341-837a-1c75820f915c",
		idea: "counting sheep"
	},
	{
		id: "959c6d22-a96a-43c0-929f-b950b6873b67",
		idea: "biting [THEIR] toenails",
		possessive: true,
		genericPossessive: "your"
	},
	{
		id: "a9f88f14-7011-4ac7-8364-07ab45218472",
		idea: "going to a synagogue",
		mythsReligionsAndMetaphysics: true,
		judaism: true
	},
	{
		id: "e84da739-7f56-490a-b718-30352b6f9f52",
		idea: "going to the mosque",
		mythsReligionsAndMetaphysics: true,
		islam: true
	},
	{
		id: "8a184d7b-ed8c-4926-abc7-a1cee4ea636e",
		idea: "seeing the future",
		mythsReligionsAndMetaphysics: true,
		metaphysics: true
	},
	{
		id: "f9b66db9-3fff-4143-b601-c49e0481be9d",
		idea: "haunting a house",
		mythsReligionsAndMetaphysics: true,
		metaphysics: true
	},
	{
		id: "3e458d93-e7dc-4242-a007-9f4cd3d819fc",
		idea: "performing a seance",
		mythsReligionsAndMetaphysics: true,
		metaphysics: true
	},
	{
		id: "42bd463e-23e4-42b2-ad22-3174b287f651",
		idea: "going on a date",
		sexual: true
	},
	{
		id: "3c43d422-efa5-4f93-b779-94e04a239fd9",
		idea: "upsetting the neighbors",
		humanDistress: true
	},
	{
		id: "65b7495b-ea79-445b-819e-b47109f36240",
		idea: "tormenting [THEIR] enemy",
		humanDistress: true,
		possessive: true
	},
	{
		id: "a1db3378-4c3c-41fd-9836-ad98486eb32c",
		idea: "translating a foreign sign"
	},
	{
		id: "d083dfb5-b249-4f40-9590-56fa6fdcf815",
		idea: "reading an ancient text"
	},
	{
		id: "18f35856-992a-45d3-8f41-fb271bda9db8",
		idea: "cracking a secret code"
	},
	{
		id: "6212c2f4-7792-4641-afa6-93d23f30c8a1",
		idea: "groaning",
		humanDistress: true
	},
	{
		id: "f9ba52dd-57dd-45bd-b28d-4300bcb5a648",
		idea: "falling down and being unable to get back up",
		humanDistress: true
	},
	{
		id: "9a963a6c-9b2a-47e0-ac58-c93d1856513d",
		idea: "cracking [THEIR] knuckles",
		humanDistress: true,
		possessive: true
	},
	{
		id: "89bb144e-38a3-4b60-af59-1ca06e204fdc",
		idea: "making a wish",
		fairyTalesAndUrbanLegends: true
	},
	{
		id: "4f1d7213-bb38-4772-a1f1-33a8b7fdcea7",
		idea: "hiding in the back seat",
		fairyTalesAndUrbanLegends: true,
		horror: true
	},
	{
		id: "6becf47f-07da-4029-92e8-0506f2f1f23d",
		idea: "flashing [THEIR] headlights on and off",
		possessive: true,
		fairyTalesAndUrbanLegends: true,
		horror: true
	},
	{
		id: "51485daf-645a-4ee7-9417-aeb2d47f931a",
		idea: "twerking",
		sexual: true,
		modern: true
	},
	{
		id: "428c861e-026c-45de-a7bc-888f1d267355",
		idea: "sorting the recyclables",
		modern: true
	},
	{
		id: "07d3922b-6ef4-4e69-b61b-4974f3535455",
		idea: "waiting in line"
	},
	{
		id: "3a7bc4f2-dfca-438d-9abc-544844b9f418",
		idea: "organizing a kindergarten schoolroom"
	},
	{
		id: "53847cc4-f549-4160-b55c-c2e072223017",
		idea: "counting an enormous amount of small items"
	},
	{
		id: "389f3d0c-7ec4-445e-a84c-e54ef68f4cb4",
		idea: "writing [THEIR] autobiography",
		possessive: true
	},
	{
		id: "c526ea89-d7de-4a5e-8388-1ffa41799d80",
		idea: "lying about [THEIR] whereabouts",
		possessive: true,
		humanDistress: true
	},
	{
		id: "6ba979f3-b9cc-4c77-a95d-c2cdccd3768c",
		idea: "appearing on a quiz show",
		modern: true
	},
	{
		id: "4a12d4d4-ecd7-44de-8c29-2113743a132d",
		idea: "running up a flight of stairs"
	},
	{
		id: "de4b49d4-5c87-4fb4-8c6b-9780a81bfa01",
		idea: "being ridiculous"
	},
	{
		id: "05929083-d6b8-4cac-af8f-7fdd06568fc4",
		idea: "being suspicious",
		humanDistress: true
	},
	{
		id: "63c1da50-15d6-4643-99dd-ac0a26c4b70b",
		idea: "acting out of character",
		humanDistress: true
	},
	{
		id: "7fb42672-33a1-4d11-9af7-c71c2d5e7740",
		idea: "sewing a pair of socks"
	},
	{
		id: "e529a8f0-5675-4791-b4e7-d76a0a764eee",
		idea: "pushing someone off a cliff",
		humanDeath: true,
		humanDistress: true
	},
	{
		id: "cd333dab-9a57-4667-9dfb-296ce5bf2b67",
		idea: "falling off a building",
		humanDeath: true,
		humanDistress: true
	},
	{
		id: "19c6e6a2-3f00-4fad-a610-829cc4b81c4b",
		idea: "stopping to smell the roses"
	},
	{
		id: "82007543-846c-4ca6-af28-2e7ac2a2e8a0",
		idea: "falling down a well",
		humanDeath: true,
		humanDistress: true
	},
	{
		id: "cd4c62f5-826c-41c4-9a51-8776e7beb33e",
		idea: "reconnecting with an old friend"
	},
	{
		id: "3bc4c0e8-a9c2-4c5f-8e04-6eb447aa3768",
		idea: "fucking",
		sexual: true,
		profanity: true
	},
	{
		id: "c5b64ff5-d293-4d26-8dd1-f43c08f04921",
		idea: "shitting",
		profanity: true
	},
	{
		id: "49a005ad-a6e5-4ab3-9a16-69ee7aad64a2",
		idea: "having an orgasm",
		sexual: true
	},
	{
		id: "d8d2c330-81b8-4db0-ab1c-8ea4f77e8b49",
		idea: "justifying terrorism",
		humanDistress: true,
		humanDeath: true,
		humanDeathViolent: true
	},
	{
		id: "76dc627e-b455-4d7b-a182-99d94a4e91b1",
		idea: "taking a picture of a dead body",
		humanDistress: true,
		humanDeath: true
	},
	{
		id: "67f7e0ca-e068-4926-b677-ac32e027dbad",
		idea: "scaring the shit out of someone",
		humanDistress: true,
		profanity: true
	},
	{
		id: "2fd75082-ba4f-4823-80f2-30842b46b958",
		idea: "asking someone out on on a date",
		sexual: true
	},
	{
		id: "ac53fb28-2b47-4366-b2aa-53b64daecf02",
		idea: "working out"
	},
	{
		id: "d821441a-d6a8-4eaf-91c5-c07e6f65def1",
		idea: "building muscle"
	},
	{
		id: "fa1f89cb-4cf6-413f-b09c-e16146d47619",
		idea: "going on a diet"
	},
	{
		id: "ed187aee-2000-4c96-8e4b-e8fb9887f7a9",
		idea: "taking an IQ test"
	},
	{
		id: "f2eed7e1-4e4d-400c-ac3b-d31563376870",
		idea: "crossing the street"
	},
	{
		id: "14c802f7-b49f-4144-a7dd-a86644b31669",
		idea: "swearing at the top of [THEIR] lungs",
		possessive: true,
		genericPossessive: "your"
	},
	{
		id: "9ca0fbfb-24e9-4d37-96d6-6c5028bd6911",
		idea: "dressing in drag",
		sexual: true
	},
	{
		id: "773268bf-2ef1-4794-9f0f-aab0db0767f4",
		idea: "lending money to a friend"
	}
];

const actions: Action[] = info.map(bit => ({ ...base, ...bit }));

export default actions;
