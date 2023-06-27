import { nanoid } from 'nanoid';

export default function Filter({ value, onChangeFilter }) {
  const inputId = nanoid();
  return (
    <div>
      <label htmlFor={inputId}>
        <p>Find contacts by name:</p>
        <input
          type="text"
          value={value}
          id={inputId}
          onChange={e => onChangeFilter(e)}
        />
      </label>
    </div>
  );
}
