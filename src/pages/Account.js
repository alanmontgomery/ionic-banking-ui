import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import styles from "./Account.module.css";
import { AccountStore } from '../data/AccountStore';
import { addOutline, logOutOutline } from 'ionicons/icons';

const Account = () => {

  	const cards = AccountStore.useState(s => s.cards);
	const profile = AccountStore.useState(s => s.profile);

	return (
		<IonPage className={ styles.accountPage }>
			<IonHeader>
				<IonToolbar>

					<IonButtons slot="start">
                        <IonBackButton color="dark" />
					</IonButtons>

					<IonTitle>Account</IonTitle>

					<IonButtons slot="end">
						<IonButton>
							<IonIcon color="dark" icon={ logOutOutline } />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			
			<IonContent fullscreen>

				<IonGrid>
					<IonRow className="ion-text-center ion-justify-content-center">
                        <IonCol size="4" className="animate__animated animate__fadeInTopLeft animate__faster">
                            <img src={ profile.avatar } className={ styles.avatar } alt="account avatar" />
                        </IonCol>
                    </IonRow>

                    <IonRow className={ `ion-no-margin ion-text-center ion-justify-content-center ${ styles.profileDetails }` }>
                        <IonCol size="12">
                            <h5>
                                { `${ profile.firstname } ${ profile.surname }` }
                            </h5>
                            <h6>{ cards.length } current cards</h6>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-text-center">
                        <IonCol size="12">
                            <IonButton color="primary" routerLink="/account/add-card" routerDirection="forward">
                                <IonIcon icon={ addOutline } />Add Card
                            </IonButton>
                        </IonCol>
                    </IonRow>

                    <div className="ion-margin-top">
                        { cards.map((card, index) => {

                            return (
                                <IonRow key={ `smallCard_${ index }` } className="animate__animated animate__fadeInLeft animate__faster">
                                    <IonCol size="12">
                                        <IonItem className={ styles.cardItem } detail={ false } lines="none">
                                            <div className={ styles.smallCard } style={{ backgroundColor: card.color }}></div>

                                            <IonLabel className={ `ion-text-left ${ styles.cardDescription }` }>
                                                <h4>{ card.description }</h4>
                                            </IonLabel>

                                            <IonLabel className="ion-text-right">
                                                <h4>&pound;{ parseFloat(card.balance).toFixed(2) }</h4>
                                            </IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            );
                        })}
                    </div>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Account;