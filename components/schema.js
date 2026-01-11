import React, { useState } from 'react';
export default function SchemaEditor({ schema, onChange }) {
  const [text, setText] = useState(JSON.stringify(schema, null, 2));
  const [error, setError] = useState('');

  const handleApply = () => {
    try {
      const parsed = JSON.parse(text);
      setError('');
      onChange(parsed);
    } catch (e) {
      setError('Invalid JSON');
    }
  };

  const addField = () => {
    try {
      const parsed = JSON.parse(text);
      parsed.fields = parsed.fields || [];
      parsed.fields.push({
        type: 'text',
        label: 'New Field',
        name: `field_${parsed.fields.length + 1}`,
        required: false
      });
      const updated = JSON.stringify(parsed, null, 2);
      setText(updated);
      onChange(parsed);
      setError('');
    } catch {
      setError('Fix JSON before adding fields');
    }
  };

  return (
    <div>
      <h2>Schema editor</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={18}
        className="textarea"
        placeholder="Paste your JSON schema here"
      />
      {error && <div className="error">{error}</div>}
      <div className="actions">
        <button onClick={handleApply}>Apply schema</button>
        <button onClick={addField}>Add field</button>
      </div>
    </div>
  );
}