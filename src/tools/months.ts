const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const getEventMonth = (date): string => {
    const monthIndex = date.getMonth();
    return months[monthIndex];
};

export default getEventMonth;
