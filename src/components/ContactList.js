export default function ContactList({ contactList }) {
  return (
    <ul>
      {contactList.map(({ id, number, name }) => {
        return (
          <li key={id}>
            <span>{name}</span>
            <span>{number}</span>
            <button>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}
