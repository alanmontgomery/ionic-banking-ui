import { useRef, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonSlides, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import styles from "./Home.module.css";
import { AccountStore } from '../data/AccountStore';
import CardSlide from '../components/CardSlide';
import { searchOutline } from 'ionicons/icons';

const Home = () => {

  	const cards = AccountStore.useState(s => s.cards);
	const profile = AccountStore.useState(s => s.profile);

	const [ pageTitle, setPageTitle ] = useState(cards[0].description);
	const [ mainColor, setMainColor ] = useState(cards[0].color);

	const slidesRef = useRef();

	const slideOpts = {

		initialSlide: 0,
  		speed: 400,
		slidesPerView: 1
	};

	const changeSlide = async e => {

		const swiper = await slidesRef.current.getSwiper();
		const swiperIndex = swiper.activeIndex;

		setPageTitle(cards[swiperIndex].description);
		setMainColor(cards[swiperIndex].color);

		document.getElementById(`slide_${ swiperIndex }_balance`).classList.add("animate__headShake");

		setTimeout(() => {
			
			document.getElementById(`slide_${ swiperIndex }_balance`).classList.remove("animate__headShake");
		}, 1000);
	}

	const manageTouch = async touched => {

		const swiper = await slidesRef.current.getSwiper();
		const swiperIndex = swiper.activeIndex;

		if (touched) {
			
			document.getElementById(`slide_${ swiperIndex }_transactions`).classList.add("animate__fadeOut");
		} else {

			document.getElementById(`slide_${ swiperIndex }_transactions`).classList.remove("animate__fadeOut");
			document.getElementById(`slide_${ swiperIndex }_transactions`).classList.add("animate__fadeIn");
		}
	}

	return (
		<IonPage className={ styles.homePage }>
			<IonHeader>
				<IonToolbar>

					<IonButtons slot="start">
						<IonButton routerLink="/account" className={ styles.toolbarAvatar }>
							<img alt="toolbar avatar" className={ styles.toolbarAvatarImage } src={ profile.avatar } />
						</IonButton>
					</IonButtons>

					<IonTitle>{ pageTitle }</IonTitle>

					<IonButtons slot="end">
						<IonButton>
							<IonIcon color="light" icon={ searchOutline } style={{ backgroundColor: mainColor, borderRadius: "500px", padding: "0.2rem" }} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			
			<IonContent fullscreen>

				<IonGrid>
					<IonSlides onIonSlideTouchEnd={ () => manageTouch(false) } onIonSlideTouchStart={ () => manageTouch(true) } ref={ slidesRef } onIonSlideWillChange={ e => changeSlide(e) } pager={ false } options={ slideOpts } className={ styles.cardsContainer }>

						{ cards.map((card, index) => {
							return <CardSlide key={ index } messages={ card.transactions } card={ card } profile={ profile } index={ index } />;
						})}
    				</IonSlides>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Home;
