export const AlertTypes = [
    {value: 'absPrice', title: 'Price'},
    {value: 'pctPrice', title: 'Price Change (%)'},
    {value: 'absMCup', title: 'Market Value'},
    {value: 'pctMCup', title: 'Market Value Change (%)'},
];

export const AlertTriggerTypes = {
    absPrice: [
        {direction: false, title: 'Less or Equal', hint: 'Alert sent when price drops to this amount'},
        {direction: true, title: 'Higher or Equal', hint: 'Alert sent when price reaches this amount'}
    ],
    pctPrice: [
        {direction: false, title: 'Less or Equal', hint: 'When price drops by %'},
        {direction: true, title: 'Higher or Equal', hint: 'When price raise by %'}
    ]
};
