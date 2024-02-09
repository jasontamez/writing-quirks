import { ATime, CoreIdea, TypedObject } from "./Ideas";

const base: TypedObject = {
	type: "time"
};
const info: (Partial<ATime> & CoreIdea)[] = [
	{
		id: "6cc012a3-d66a-4d0b-8115-3765c55156d7",
		idea: "on Christmas Eve",
		properName: true,
		mythsReligionsAndMetaphysics: true,
		christianity: true
	},
	{
		id: "a0bedf7e-cfe2-49b0-bb60-b633b7914770",
		idea: "at the crack of dawn"
	},
	{
		id: "e1b03ec5-73c8-4474-b3d1-78a19896a375",
		idea: "at midnight"
	},
	{
		id: "4df22a6b-6a57-432d-9ea5-a8cc51ca5263",
		idea: "at lunchtime"
	},
	{
		id: "fb3dd88d-855e-4f86-a713-2f686e16784c",
		idea: "at dinnertime"
	},
	{
		id: "46413d5a-dc60-4a0e-9d07-dac82a7976ad",
		idea: "at breakfast"
	},
	{
		id: "9541816e-0775-4ca3-b393-ca9703d7cb29",
		idea: "on New Year's Eve",
		properName: true
	},
	{
		id: "2cfe3826-5727-418c-b497-f424d062287b",
		idea: "on New Year's Day",
		properName: true
	},
	{
		id: "9c63a70b-5371-44ff-9411-3ce5e73a321b",
		idea: "on Halloween",
		properName: true
	},
	{
		id: "5de0d3fa-af46-4c54-a6df-d062426da001",
		idea: "at high noon",
		properName: true,
		historical: true,
		western: true
	},
	{
		id: "1360c326-96d6-491b-9864-e55f4813e767",
		idea: "at bedtime"
	},
	{
		id: "cc26bc50-193e-4949-a3d4-477ec0f2cec7",
		idea: "during the weekend"
	},
	{
		id: "b4435332-796f-4c8a-952e-b4b54b779446",
		idea: "tomorrow"
	},
	{
		id: "390ffc54-213b-4d12-b91f-748dc1f4aafb",
		idea: "yesterday"
	},
	{
		id: "29f8d8cf-1bc1-4e0d-9ec4-d8e1f2e0b90d",
		idea: "sometime last week"
	},
	{
		id: "4ebc0c2d-a99a-4668-b9e7-302d7183c561",
		idea: "seven years from now"
	},
	{
		id: "0c879467-c7a9-483e-8cfd-a7450b789f92",
		idea: "in 100 years",
		scifi: true
	},
	{
		id: "40d0f760-81de-4744-8953-dc6f51a765a4",
		idea: "during the Middle Ages",
		historical: true
	},
	{
		id: "4cb17357-436b-4c5d-b171-d59080070a22",
		idea: "in the 20th century"
	},
	{
		id: "bb8a5dc2-1afd-4712-a19b-efbf3a6ced3e",
		idea: "during a week's vacation"
	},
	{
		id: "d6e7ce8d-9dcd-4e1f-be73-adf52f2063b3",
		idea: "during Ramadan",
		properName: true,
		mythsReligionsAndMetaphysics: true,
		islam: true
	},
	{
		id: "e2b30bac-8e2a-4237-a827-ae206d36802a",
		idea: "during the 1980s",
		modern: true
	},
	{
		id: "787f90ee-b8f1-430b-b576-ee78a1fe869e",
		idea: "during the Great Depression"
	},
	{
		id: "9f714121-588d-4bcb-8966-df1631fa4291",
		idea: "during prehistoric times",
		historical: true
	},
	{
		id: "fd2e4070-4de1-4281-8009-c0b3d379e351",
		idea: "on the day after tomorrow"
	},
	{
		id: "3673df17-d00c-434e-a9be-0ddd82d3d2cb",
		idea: "right now"
	},
	{
		id: "930dffb5-5dd7-4f7f-9a35-84fdd1acb634",
		idea: "in the not-too-distant future",
		scifi: true
	},
	{
		id: "09a854d1-9177-4f46-8340-ebbb6d0defc1",
		idea: "in a post-apocalyptic future",
		scifi: true,
		humanDeath: true,
		humanDeathViolent: true,
		humanDistress: true
	},
	{
		id: "a4ad3e08-2b66-4e0c-8d85-e1de2ebd7dda",
		idea: "on Valentine's Day",
		properName: true,
		humanDistress: true,
		sexual: true
	},
	{
		id: "33c54d94-b739-43be-8cba-dc744bb12216",
		idea: "on the last day of school"
	},
	{
		id: "23017c60-6250-4208-945a-f2e60da3839e",
		idea: "on the first day of school"
	},
	{
		id: "329d1a67-9160-4af0-a536-b4efe1388e9b",
		idea: "on an average Wednesday"
	},
	{
		id: "633f0213-ac56-435e-b368-9d6473a5d279",
		idea: "on a Friday night"
	},
	{
		id: "95d466c9-743f-41cc-8da4-3991fe16bdd6",
		idea: "on a Monday morning"
	},
	{
		id: "d4ad3951-f697-476b-9f46-032a2f33071d",
		idea: "on the night before a big test"
	},
	{
		id: "4a6c3c69-1f24-4319-9e9f-71c079d2e662",
		idea: "on the morning before a wedding"
	},
	{
		id: "e097f613-5c35-4129-a8e0-4fcc983db7ea",
		idea: "on the happiest day"
	},
	{
		id: "f2a39010-6dab-438d-b9a9-1d6e2a28865e",
		idea: "on the saddest day"
	},
	{
		id: "9e65b509-3668-4b18-9f87-50305a8a9ad9",
		idea: "on a very ordinary day"
	},
	{
		id: "d4c9b328-dd03-43eb-bac5-ecd69d9c9ee7",
		idea: "while the sun is still up"
	},
	{
		id: "de6c56ab-5b9a-4e55-a468-287f1f78cb4c",
		idea: "at sunset"
	},
	{
		id: "b9338221-d8cc-44f2-b6cc-9f74ecb71546",
		idea: "at sunrise"
	},
	{
		id: "4c4f3a1d-9628-41b6-a4d4-4f99caaaa0f1",
		idea: "after the sun has gone down"
	},
	{
		id: "c876288c-1116-4e9f-933c-3698ffb70d70",
		idea: "during the Roman Empire",
		historical: true,
		roman: true
	},
	{
		id: "cb9a1ca0-94e4-4b0c-afcf-348676e6ca4e",
		idea: "on the Ides of March",
		historical: true,
		roman: true,
		humanDeath: true,
		humanDistress: true,
		humanDeathViolent: true
	},
	{
		id: "16b9cd89-280e-4d43-8841-b9db13c71b46",
		idea: "in the year 1,000,000 B.C.",
		historical: true
	},
	{
		id: "3a969d91-1c67-4150-bc0e-4ad952aab516",
		idea: "in the middle of the night"
	}
];

const times: ATime[] = info.map(bit => ({...base, ...bit}));

export default times;
