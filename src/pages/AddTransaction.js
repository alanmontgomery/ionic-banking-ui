import { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import styles from "./Account.module.css";
import DebitCard from '../components/DebitCard';
import { AccountStore, addCardToAccount, addTransactionToCard } from '../data/AccountStore';
import { CardStore } from '../data/CardStore';
import { addOutline, timerOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';

const AddTransaction = () => {

  	const cards = AccountStore.useState(s => s.cards);
	const profile = AccountStore.useState(s => s.profile);

    const [ cardID, setCardID ] = useState(false);
    const [ card, setCard ] = useState({});
    const [ transactionName, setTransactionName ] = useState("Test Transaction");
    const [ transactionAmount, setTransactionAmount ] = useState(0);
    const [ transactionDeposit, setTransactionDeposit ] = useState(false);

    const history = useHistory();
    const params = useParams();
    const [ adding, setAdding ] = useState(false);

    useIonViewWillEnter(() => {

        const tempCardID = params.card_id;
        const tempCard = cards.filter(c => parseInt(c.id) === parseInt(tempCardID))[0];
        setCardID(tempCardID);
        setCard(tempCard);
    });

    const addTransaction = async () => {

        setAdding(true);

        const newTransaction = {

            name: transactionName,
            amount: transactionAmount,
            deposit: transactionDeposit
        };

        await addTransactionToCard(newTransaction, cardID);
        
        setTimeout(() => {
            
            setAdding(false);
            history.goBack();
        }, 500);
    }

	return (
		<IonPage className={ styles.accountPage }>
			<IonHeader>
				<IonToolbar>

					<IonButtons slot="start">
                        <IonBackButton color="dark" />
					</IonButtons>

					<IonTitle>Add Transaction</IonTitle>
				</IonToolbar>
			</IonHeader>
			
			<IonContent fullscreen>

				<IonGrid>

                    <IonRow className="animate__animated animate__fadeInTopLeft animate__faster ion-justify-content-center ion-text-center">
                        <IonCol size="12" className="ion-justify-content-center ion-text-center">
                            <DebitCard { ...card } profile={ profile } />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">
                            <IonItem lines="full">
                                <IonLabel position="floating">Name</IonLabel>
                                <IonInput type="text" inputmode="text" placeholder="Transaction name" value={ transactionName } onIonChange={ e => setTransactionName(e.currentTarget.value) } />
                            </IonItem>
                        </IonCol>

                        <IonCol size="6">
                            <IonItem lines="full">
                                <IonLabel position="floating">Amount</IonLabel>
                                <IonInput type="text" inputmode="text" placeholder="0" value={ transactionAmount } onIonChange={ e => setTransactionAmount(e.currentTarget.value) } />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonItem lines="full">
                                <IonLabel>Deposit?</IonLabel>
                                <IonToggle style={{ "--background-checked": card.color }} slot="end" value={ transactionDeposit } onIonChange={ e => setTransactionDeposit(e.currentTarget.checked) } />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>

                        <IonCol size="12">
                            <IonButton style={{ "--background": card.color, "--background-focused": card.color, "--background-hover": card.color, "--background-activated": card.color }} expand="block" disabled={ adding } onClick={ addTransaction }>
                                { !adding &&
                                    <>
                                        <IonIcon icon={ addOutline } />
                                        &nbsp; Add Transaction
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

export default AddTransaction;