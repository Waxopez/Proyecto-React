import { useState } from 'react';
export default function TodoList() {
const [text, setText] = useState('');
const [items, setItems] = useState([]);
const addItem = () => {
const t = text.trim();
if (!t) return;
setItems((prev) => [...prev, t]);
setText('');
};
const removeItem = (idx) => setItems((prev) => prev.filter((_, i) => i !==
idx));
const onKeyDown = (e) => { if (e.key === 'Enter') addItem(); };
return (
<section>
<h1 role="heading">Mis Tareas</h1>
<div>
<input
name="todo"
placeholder="Nueva tarea"
value={text}
onChange={(e) => setText(e.target.value)}
onKeyDown={onKeyDown}
/>
<button data-testid="add" onClick={addItem}>Agregar</button>
</div>
<ul data-testid="list">
{items.map((t, i) => (
<li key={`${t}-${i}`}>
<span>{t}</span>
<button data-testid={`del-${i}`} onClick={() =>
removeItem(i)}>✕</button>
</li>
))}
</ul>
</section>
);
}