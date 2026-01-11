import React from 'react';

export default function SubmittedData({ data }) {
  if (!data) return null;
  return (
    <div className="submitted">
      <h2>Submitted data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
