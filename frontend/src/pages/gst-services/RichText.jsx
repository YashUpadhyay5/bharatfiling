import React from 'react';

// Renders **bold** markers used in config copy (plan features, notes).
export default function RichText({ text }) {
  return <>{text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</>;
}
