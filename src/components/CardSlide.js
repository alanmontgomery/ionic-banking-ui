import { IonButton, IonCardSubtitle, IonCol, IonIcon, IonList, IonRow, IonSlide } from "@ionic/react";
import DebitCard from "./DebitCard";

import styles from "./CardSlide.module.css";
import TransactionItem from "./TransactionItem";
import { addOutline, arrowRedoOutline } from "ionicons/icons";

const CardSlide = props => {

    const { index, card, profile, messages } = props;

    return (

        <IonSlide key={ `slide_${ index }` } id={ `slide_${ index }` } className={ styles.customSlide }>
            <IonRow className="ion-text-center">
                <IonCol size="12">
                    <IonCardSubtitle color="medium">
                        balance
                    </IonCardSubtitle>
                    <IonCardSubtitle id={ `slide_${ index }_balance` } className={ ` ${ styles.balance } animate__animated` }>
                        <span className={ styles.poundSign }>£</span>
                            &nbsp;{ parseFloat(card.balance).toFixed(2) }
                            <IonButton className={ styles.addButton } size="small" style={{ "--background": card.color, "--background-focused": card.color, "--background-hover": card.color, "--background-activated": card.color }} routerLink={ `/add-transaction/${ card.id }` }>
                                <IonIcon icon={ addOutline } />
                            </IonButton>
                    </IonCardSubtitle>
                </IonCol>
            </IonRow>
            <IonRow id={ `card_${ index }_container` } className="animate__animated ion-text-center ion-justify-content-center">
                <IonCol size="12">
                    <DebitCard key={ index } { ...card } profile={ profile } />
                </IonCol>
            </IonRow>

            <IonRow className={ styles.heading }>
                <IonCol size="12">
                    <h6>Transactions</h6>
                </IonCol>
            </IonRow>

            { card.transactions.length > 0 && 
                <IonRow id={ `slide_${ index }_transactions` } className="animate__animated">
                    <IonCol size="12">
                        <IonList className={ styles.transactionList }>
                            { (card.transactions.length > 0) && card.transactions.slice(0).reverse().map((transaction, index) => <TransactionItem key={ `card_transaction_${ index }`} { ...transaction } color={ card.color } />) }
                        </IonList>
                    </IonCol>
                </IonRow>
            }

            { card.transactions.length === 0 &&

               <IonRow id={ `slide_${ index }_transactions` } className="animate__animated">
                    <IonCol size="12">
                        <h5>No transactions found</h5>
                        <IonButton style={{ "--background": card.color, "--background-focused": card.color, "--background-hover": card.color, "--background-activated": card.color }} routerLink={ `/add-transaction/${ card.id }` }>
                            <IonIcon icon={ arrowRedoOutline } />&nbsp;Transfer funds
                        </IonButton>
                    </IonCol>
                </IonRow>
            }
        </IonSlide>
    );
}

export default CardSlide;