import React, { useEffect, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { refresh } from 'ionicons/icons';

import SimpleGenerator from '../components/SimpleGenerator';
import getRandom from '../helpers/getRandom';
import './Insults.css';

interface Intro {
	msg: string,
	hasNounArticle?: boolean
	hasAdjectiveArticle?: boolean
};

const intros: Intro[] = [
	{msg: "Hear me, thou ADJECTIVE1 and ADJECTIVE2 NOUN!"},
	{msg: "Away with you, you ADJECTIVE1 and ADJECTIVE2 NOUN!"},
	{msg: "Thou art ARTICLE NOUN: ADJECTIVE1 and ADJECTIVE2.", hasNounArticle: true},
	{msg: "Thou art ARTICLE ADJECTIVE1, ADJECTIVE2 NOUN.", hasAdjectiveArticle: true},
	{msg: "Ne'er before have I seen such ARTICLE NOUN, so ADJECTIVE1 and ADJECTIVE2.", hasNounArticle: true},
	{msg: "'Tis nothing but ARTICLE ADJECTIVE1 and ADJECTIVE2 NOUN.", hasAdjectiveArticle: true},
	{msg: "I'd rather meet ARTICLE ADJECTIVE1, ADJECTIVE2 NOUN than thee.", hasAdjectiveArticle: true}
];
const adjs1: string[] = [
	"artless", "bawdy", "beslubbering", "bootless", "churlish", "cockered", "clouted", "craven", "currish", "dankish",
	"dissembling", "droning", "errant", "fawning", "fobbing", "froward", "frothy", "gleeking", "goatish", "gorbellied",
	"impertinent", "infectious", "jarring", "loggerheaded", "lumpish", "mammering", "mangled", "mewling", "paunchy",
	"pribbling", "puking", "puny", "qualling", "rank", "reeky", "roguish", "ruttish", "saucy", "spleeny", "spongy",
	"surly", "tottering", "unmuzzled", "vain", "venomed", "villainous", "warped", "wayward", "weedy", "yeasty"
];
const adjs2: string[] = [
	"base-court", "bat-fowling", "beef-witted", "beetle-headed", "boil-brained", "clapper-clawed", "clay-brained",
	"common-kissing", "crook-pated", "dismal-dreaming", "dizzy-eyed", "doghearted", "dread-bolted", "earth-vexing",
	"elf-skinned", "fat-kidneyed", "fen-sucked", "flap-mouthed", "fly-bitten", "folly-fallen", "fool-born", "full-gorged",
	"guts-griping", "half-faced", "hasty-witted", "hedge-born", "hell-hated", "idle-headed", "ill-breeding", "ill-nurtured",
	"knotty-pated", "milk-livered", "motley-minded", "onion-eyed", "plume-plucked", "pottle-deep", "pox-marked",
	"reeling-ripe", "rough-hewn", "rude-growing", "rump-fed", "shard-borne", "sheep-biting", "spur-galled", "swag-bellied",
	"tardy-gaited", "tickle-brained", "toad-spotted", "unchin-snouted", "weather-bitten"
];
const nouns: string[] = [
	"apple-john", "baggage", "barnacle", "bladder", "boar-pig", "bugbear", "bum-bailey", "canker-blossom", "clack-dish",
	"clotpole", "coxcomb", "codpiece", "death-token", "dewberry", "flap-dragon", "flax-wench", "flirt-gill", "foot-licker",
	"fustilarian", "giglet", "gudgeon", "haggard", "harpy", "hedge-pig", "horn-beast", "hugger-mugger", "joithead",
	"lewdster", "lout", "maggot-pie", "malt-worm", "mammet", "measle", "minnow", "miscreant", "moldwarp", "mumble-news",
	"nut-hook", "pigeon-egg", "pignut", "puttock", "pumpion", "ratsbane", "scut", "skainsmate", "strumpet", "varlet",
	"vassal", "whey-face", "wagtail"
];
const pluralNouns: {[key: string]: boolean} = { baggage: true };
const vowels = ["a","e","i","o","u"];

const Insults: React.FC = () => {
	const [lastIntro, setLastIntro] = useState<Intro>({msg: ""});
	const [lastAdj1, setLastAdj1] = useState<string>("");
	const [lastAdj2, setLastAdj2] = useState<string>("");
	const [lastNoun, setLastNoun] = useState<string>("");
	const [insult, setInsult] = useState<string>("");
	const [insultAlternate, setInsultAlternate] = useState<string>("");
	const [alternateActive, setAlternateActive] = useState<boolean>(false);

	const createInsult = (alternate = false) => {
		const intro = getRandom(intros, lastIntro, setLastIntro);
		let [adj1, adj2, noun] = [
			...(Math.floor(Math.random() * 2) ? [
				getRandom(adjs1, lastAdj1, setLastAdj1),
				getRandom(adjs2, lastAdj2, setLastAdj2)
			] : [
				getRandom(adjs2, lastAdj2, setLastAdj2),
				getRandom(adjs1, lastAdj1, setLastAdj1)
			]),
			getRandom(nouns, lastNoun, setLastNoun)
		];
		let {msg, hasNounArticle, hasAdjectiveArticle} = intro;
		if(pluralNouns[noun]) {
			// plural nouns don't need articles
			msg = msg.replace(" ARTICLE ", " ");
		}
		if(hasNounArticle) {
			let article = (vowels.indexOf(noun.charAt(0)) > -1) ? "an" : "a";
			msg = msg.replace("ARTICLE", article);
		}
		if(hasAdjectiveArticle) {
			let article = (vowels.indexOf(adj1.charAt(0)) > -1) ? "an" : "a";
			msg = msg.replace("ARTICLE", article);
		}
		msg = msg.replace(/\bADJECTIVE1\b/g, adj1).replace(/\bADJECTIVE2\b/g, adj2).replace(/\bNOUN\b/g, noun);
		if(alternate) {
			setInsultAlternate(msg);
			return;
		}
		setInsult(msg);
	}
	useEffect(() => {
		createInsult();
	}, []);

	const doInsult = () => {
		createInsult(!alternateActive);
		setAlternateActive(!alternateActive);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Shakespearian Insults</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="insults">
				<SimpleGenerator
					{...{alternateActive}}
					mainText={insult}
					mainTextAlternate={insultAlternate}
				/>
				<IonFab slot="fixed" horizontal="end" vertical="bottom">
					<IonFabButton color="primary" onClick={doInsult}>
						<IonIcon icon={refresh} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);};

export default Insults;
