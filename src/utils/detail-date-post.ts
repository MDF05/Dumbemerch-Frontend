export default function detailDatePost(date: string): string[] {
    const createdAt: Date = new Date(date);
    const time: string = createdAt.toLocaleTimeString();
    let monthName: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let calender: string = `${createdAt.getDate()} ${monthName[createdAt.getMonth()]
        } ${createdAt.getFullYear()}`;

    return [time, calender];
}