export default function detailDatePost(date: string): string[] {
  const createdAt: Date = new Date(date);
  const day: number = createdAt.getDay();
  let dayName: string[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];
  let monthName: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let calender: string = `${createdAt.getDate()} ${monthName[createdAt.getMonth()]} ${createdAt.getFullYear()}`;

  return [`${dayName[day]} `, calender];
}
