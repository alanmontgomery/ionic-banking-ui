import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import { formatBalance } from "../data/Utils";
import styles from "./TransactionItem.module.css";

const TransactionItem = props => {

    const { name, amount, deposit, color } = props;

    const getContactNameInitials = contactName => {

        var nameInitials = "";

        if (contactName && contactName !== "" && contactName !== undefined) {
            
            const nameParts = contactName && contactName.split(" ");

            if (nameParts) {
                
                if (nameParts[0].charAt(0).match(/^[a-z]+$/i)) {

                    nameInitials += nameParts[0].charAt(0).toUpperCase();
                }

                if (nameParts[1]) {
                    if (nameParts[1].charAt(0).match(/^[a-z]+$/i)) {

                        nameInitials += nameParts[1].charAt(0).toUpperCase();
                    }
                } else {

                    nameInitials += nameParts[0].charAt(1).toUpperCase();
                }
            }
        }
        
        return nameInitials;
    }

    return (

        <IonItem lines="full" detail={ false } className={ `item-text-wrap ion-text-wrap ${ styles.transactionItem }` }>

            <div className={ styles.transactionItemContent }>	
                <IonAvatar slot="start">
                    <div style={{ borderColor: "grey", color: "grey" }} className={ styles.avatarImage }>{ getContactNameInitials(name) }</div>
                </IonAvatar>

                <IonLabel className={ `ion-text-wrap ${ styles.transactionContent }` }>
                    <h2>{ name }</h2>
                </IonLabel>

                <IonLabel className={ `ion-text-wrap ${ styles.transactionContent }` }>
                    <h4 className={ deposit ? styles.green : styles.red }>
                        { deposit ? "+" : "-"}
                        &pound;{ formatBalance(amount) }
                    </h4>
                </IonLabel>
            </div>
        </IonItem>
    );
}

export default TransactionItem;