import React, { useState } from 'react';
import FormRenderer from './components/Form';
import SchemaEditor from './components/schema';
import SubmittedData from './components/Data';
import './App.css';

const initialSchema = {
  title: 'User Profile',
  fields: [
    { type: 'text', label: 'Full Name', name: 'fullName', required: true, placeholder: 'Enter your name' },
    { type: 'email', label: 'Email', name: 'email', required: true },
    {
      type: 'group',
      label: 'Address',
      name: 'address',
      fields: [
        { type: 'text', label: 'Street', name: 'street', required: true },
        { type: 'text', label: 'City', name: 'city', required: true },
        { type: 'text', label: 'Zip', name: 'zip' }
      ]
    }
  ]
};

export default function App() {
  const [schema, setSchema] = useState(initialSchema);
  const [submitted, setSubmitted] = useState(null);

  return (
    <div className="container">
      <h1>Dynamic Form Builder</h1>
      <div className="grid">
        <div className="panel">
          <SchemaEditor schema={schema} onChange={setSchema} />
        </div>
        <div className="panel">
          <FormRenderer schema={schema} onSubmit={setSubmitted} />
        </div>
      </div>
      <SubmittedData data={submitted} />
    </div>
  );
}