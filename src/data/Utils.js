export const formatBalance = balance => {

	var formatter = new Intl.NumberFormat('en-GB', {
		
		// style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 2
	});

	return formatter.format(balance);
}