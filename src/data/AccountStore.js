import { Store } from "pullstate";

export const AccountStore = new Store({
    
    profile: {
        
        firstname: "Alan",
        surname: "Montgomery",
        avatar: "/alan.jpg",
    },
    cards: [
        
        {
            id: 1,
            type: "visa",
            description: "Current Account",
            number: "4859 2390 5635 7347",
            expiry: "11/22",
            secret: "483",
            color: "orange",
            balance: "38.21",
            transactions: [
                {
                    name: "Joe Bloggs",
                    amount: "2.50",
                    deposit: true
                },
                {
                    name: "Ocean Pratt",
                    amount: "12.99",
                    deposit: true
                },
                {
                    name: "Eugene Piper",
                    amount: "74.99",
                    deposit: false
                },
                {
                    name: "Emeli Potts",
                    amount: "4.20",
                    deposit: false
                },
                {
                    name: "Asia Wells",
                    amount: "12.73",
                    deposit: true
                },
                {
                    name: "Awais Brook",
                    amount: "17.10",
                    deposit: false
                },
                {
                    name: "Coen Haas",
                    amount: "9.99",
                    deposit: true
                }
            ]
        },
        {
            id: 2,
            type: "visa",
            description: "Savings",
            number: "7349 1284 6790 4587",
            expiry: "05/23",
            secret: "590",
            color: "blue",
            balance: "120.90",
            transactions: [
                {
                    name: "Joe Bloggs",
                    amount: "120.90",
                    deposit: true
                }
            ]
        },
        {
            id: 3,
            type: "visa",
            description: "House Fund",
            number: "6783 5692 4475 6682",
            expiry: "01/24",
            secret: "321",
            color: "purple",
            balance: "0",
            transactions: [
            ]
        }
    ],
});

export const addCardToAccount = (newCard) => {

    AccountStore.update(s => { s.cards = [ ...s.cards, newCard ]; });
}

export const addTransactionToCard = (newTransaction, cardID) => {

    AccountStore.update(s => { 
        s.cards.find((c, index) => (parseInt(c.id) === parseInt(cardID)) ? s.cards[index].transactions = [ ...s.cards[index].transactions, newTransaction ] : false ) 
    });

    if (newTransaction.deposit) {
        
        AccountStore.update(s => { 
            s.cards.find((c, index) => (parseInt(c.id) === parseInt(cardID)) ? s.cards[index].balance = (parseFloat(s.cards[index].balance) + parseFloat(newTransaction.amount)) : false ) 
        });
    } else {

        AccountStore.update(s => { 
            s.cards.find((c, index) => (parseInt(c.id) === parseInt(cardID)) ? s.cards[index].balance = (parseFloat(s.cards[index].balance) - parseFloat(newTransaction.amount)) : false ) 
        });
    }
}

// export const removeFromCart = productIndex => {

//     AccountStore.update(s => { s.product_ids.splice(productIndex, 1) });
// }