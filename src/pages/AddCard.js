import { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import styles from "./Account.module.css";
import DebitCard from '../components/DebitCard';
import { AccountStore, addCardToAccount } from '../data/AccountStore';
import { CardStore } from '../data/CardStore';
import { addOutline, timerOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const AddCard = () => {

  	const cards = AccountStore.useState(s => s.cards);
  	const cardTypes = CardStore.useState(s => s.card_types);
  	const cardColors = CardStore.useState(s => s.card_colors);
	const profile = AccountStore.useState(s => s.profile);

    const [ cardType, setCardType ] = useState(cardTypes[0]);
    const [ cardColor, setCardColor ] = useState(cardColors[0]);
    const [ cardDescription, setCardDescription ] = useState("");
    const [ cardNumber, setCardNumber ] = useState("1234 1234 1234 1234");
    const [ cardSecret, setCardSecret ] = useState("123");
    const [ cardExpiry, setCardExpiry ] = useState("01/22");
    const [ cardBalance, setCardBalance ] = useState(0);

    const history = useHistory();
    const [ adding, setAdding ] = useState(false);

    const addCard = async () => {

        setAdding(true);

        const newCard = {

            type: cardType,
            color: cardColor,
            description: cardDescription,
            number: cardNumber,
            secret: cardSecret,
            expiry: cardExpiry,
            balance: cardBalance,
            transactions: []
        };

        await addCardToAccount(newCard);
        
        setTimeout(() => {
            
            setAdding(false);
            history.goBack();
        }, 2000);
    }

	return (
		<IonPage className={ styles.accountPage }>
			<IonHeader>
				<IonToolbar>

					<IonButtons slot="start">
                        <IonBackButton color="dark" />
					</IonButtons>

					<IonTitle>Add Card</IonTitle>
				</IonToolbar>
			</IonHeader>
			
			<IonContent fullscreen>

				<IonGrid>

                    <IonRow className="animate__animated animate__fadeInTopLeft animate__faster ion-justify-content-center ion-text-center">
                        <IonCol size="12" className="ion-justify-content-center ion-text-center">
                            <DebitCard color={ cardColor } type={ cardType } expiry={ cardExpiry } number={ cardNumber } secret={ cardSecret } profile={ profile } />
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-padding-top">
                        <IonCol size="6">
                            <IonItem lines="full">
                                <IonLabel position="floating">Card Type</IonLabel>
                                <IonSelect placeholder="Select type" value={ cardType } onIonChange={ e => setCardType(e.currentTarget.value) }>
                                    { cardTypes.map((option, index) => {

                                        return <IonSelectOption key={ index } value={ option }>
                                            { option.toUpperCase() }
                                        </IonSelectOption>
                                    })}
                                </IonSelect> 
                            </IonItem>
                        </IonCol>

                        <IonCol size="6">
                            <IonItem lines="full">
                                <IonLabel position="floating">Card Color</IonLabel>
                                <IonSelect placeholder="Select color" value={ cardColor } onIonChange={ e => setCardColor(e.currentTarget.value) }>
                                    { cardColors.map((option, index) => {

                                        return <IonSelectOption key={ index } value={ option }>
                                            { option.toUpperCase() }
                                        </IonSelectOption>
                                    })}
                                </IonSelect> 
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <IonItem lines="full">
                                <IonLabel position="floating">Card Name</IonLabel>
                                <IonInput type="text" inputmode="text" placeholder="Card name" value={ cardDescription } onIonChange={ e => setCardDescription(e.currentTarget.value) } />
                            </IonItem>
                        </IonCol>

                        <IonCol size="6">
                            <IonItem lines="full">
                                <IonLabel position="floating">Starting Balance</IonLabel>
                                <IonInput type="text" inputmode="text" placeholder="0" value={ cardBalance } onIonChange={ e => setCardBalance(e.currentTarget.value) } />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonItem lines="full">
                                <IonLabel position="floating">Card Number</IonLabel>
                                <IonInput type="text" inputmode="text" placeholder="**** **** **** ****" value={ cardNumber } onIonChange={ e => setCardNumber(e.currentTarget.value) } />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <IonItem lines="full">
                                <IonLabel position="floating">Card Expiry</IonLabel>
                                <IonInput type="text" inputmode="text" placeholder="01/22" value={ cardExpiry } onIonChange={ e => setCardExpiry(e.currentTarget.value) } />
                            </IonItem>
                        </IonCol>

                        <IonCol size="6">
                            <IonItem lines="full">
                                <IonLabel position="floating">Card Secret</IonLabel>
                                <IonInput type="text" inputmode="text" placeholder="123" value={ cardSecret } onIonChange={ e => setCardSecret(e.currentTarget.value) } />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size="12">
                            <IonButton style={{ "--background": cardColor, "--background-focused": cardColor, "--background-hover": cardColor, "--background-activated": cardColor }} expand="block" disabled={ adding } onClick={ addCard }>
                                { !adding &&
                                    <>
                                        <IonIcon icon={ addOutline } />
                                        &nbsp; Add Card
                                    </>
                                }

                                { adding &&
                                    <>
                                        <IonIcon icon={ timerOutline } />
                                        &nbsp; Adding...
                                    </>
                                }
                            </IonButton>
                        </IonCol>
                    </IonRow>         
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default AddCard;