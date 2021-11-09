const formattedPrice = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GHS'
    });
    return formatter.format(amount);
};

export default formattedPrice;