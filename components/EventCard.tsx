type EventCardProps = {
  day: string;
  month: string;
  title: string;
  text: string;
};

export default function EventCard({ day, month, title, text }: EventCardProps) {
  return (
    <div className="event">
      <div className="event-date">
        <b>{day}</b>
        <span>{month}</span>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
