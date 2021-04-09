import { Store } from "pullstate";

export const CardStore = new Store({

    card_colors: [
        "orange",
        "black",
        "blue",
        "purple"
    ],
    card_types: [
        "visa",
        "mastercard"
    ]
});