import React, { Suspense, lazy, useEffect } from 'react';
import { Route } from 'react-router-dom';
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
	useIonAlert,
	useIonRouter
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
	beerSharp,
	bulbSharp,
	fastFoodSharp,
	planetSharp,
	skullSharp,
	trailSignSharp
} from 'ionicons/icons';
import { App as Capacitor, BackButtonListenerEvent } from '@capacitor/app';

import Settings from './pages/Settings';
import Main from './pages/Main';
import Loading from './pages/Loading';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/app.css';

setupIonicReact();

const Prompts = lazy(() => import("./pages/Prompts"));
const Taverns = lazy(() => import("./pages/Taverns"));
const Streets = lazy(() => import("./pages/Streets"));
const Babbles = lazy(() => import("./pages/Babbles"));
const Insults = lazy(() => import("./pages/Insults"));
const Flavors = lazy(() => import("./pages/Flavors"));
const Favorites = lazy(() => import("./pages/Favorites"));

const App: React.FC = () => {
	const navigator = useIonRouter();
	const [doAlert] = useIonAlert();
	useEffect((): (() => void) => {
		// NOTE: Back Button will automatically go back in history for us.
		Capacitor.addListener('backButton', (ev: BackButtonListenerEvent) => {
			if(!navigator.canGoBack()) {
				// Are we trying to exit the app?
				doAlert({
					header: "Exit App?",
					cssClass: "warning",
					message: "Do you want to exit the app?",
					buttons: [
						{
							text: "Cancel",
							role: "cancel",
							cssClass: "cancel"
						},
						{
							text: "Yes, exit!",
							cssClass: "submit",
							role: "destructive",
							handler: Capacitor.exitApp
						}
					]
				});
			}
		});
		return Capacitor.removeAllListeners
	}, [navigator, doAlert]);
	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path="/prompts" render={() => <Suspense fallback={<Loading />}><Prompts /></Suspense>} />
						<Route exact path="/taverns" render={() => <Suspense fallback={<Loading />}><Taverns /></Suspense>} />
						<Route exact path="/streets" render={() => <Suspense fallback={<Loading />}><Streets /></Suspense>} />
						<Route exact path="/babbles" render={() => <Suspense fallback={<Loading />}><Babbles /></Suspense>} />
						<Route exact path="/insults" render={() => <Suspense fallback={<Loading />}><Insults /></Suspense>} />
						<Route exact path="/flavors" render={() => <Suspense fallback={<Loading />}><Flavors /></Suspense>} />
						<Route exact path="/favorites" render={() => <Suspense fallback={<Loading />}><Favorites /></Suspense>} />
						<Route exact path="/settings" render={() => <Settings />} />
						<Route exact path="/" render={() => <Main />} />
					</IonRouterOutlet>
					<IonTabBar slot="bottom">
						<IonTabButton tab="prompts" href="/prompts">
							<IonIcon aria-hidden="true" icon={bulbSharp} />
							<IonLabel className="ion-hide-sm-down">Story Prompts</IonLabel>
							<IonLabel className="ion-hide-sm-up">Prompts</IonLabel>
						</IonTabButton>
						<IonTabButton tab="taverns" href="/taverns">
							<IonIcon aria-hidden="true" icon={beerSharp} />
							<IonLabel className="ion-hide-sm-down">Taverns and Inns</IonLabel>
							<IonLabel className="ion-hide-sm-up">Taverns</IonLabel>
						</IonTabButton>
						<IonTabButton tab="streets" href="/streets">
							<IonIcon aria-hidden="true" icon={trailSignSharp} />
							<IonLabel className="ion-hide-md-down">Suburban Street Names</IonLabel>
							<IonLabel className="ion-hide-md-up ion-hide-sm-down">Street Names</IonLabel>
							<IonLabel className="ion-hide-sm-up">Streets</IonLabel>
						</IonTabButton>
						<IonTabButton tab="babbles" href="/babbles">
							<IonIcon aria-hidden="true" icon={planetSharp} />
							<IonLabel className="ion-hide-sm-down">Technobabble</IonLabel>
							<IonLabel className="ion-hide-sm-up">Babble</IonLabel>
						</IonTabButton>
						<IonTabButton tab="insults" href="/insults">
							<IonIcon aria-hidden="true" icon={skullSharp} />
							<IonLabel className="ion-hide-md-down">Shakespearian Insults</IonLabel>
							<IonLabel className="ion-hide-md-up">Insults</IonLabel>
						</IonTabButton>
						<IonTabButton tab="flavors" href="/flavors">
							<IonIcon aria-hidden="true" icon={fastFoodSharp} />
							<IonLabel className="ion-hide-md-down">Really Odd Flavors</IonLabel>
							<IonLabel className="ion-hide-md-up ion-hide-sm-down">Odd Flavors</IonLabel>
							<IonLabel className="ion-hide-sm-up">Flavors</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
