export const isAnswered = (question, value) =>
  question.type === 'suggest'
    ? typeof value === 'string' && value.trim().length > 0
    : question.options.some((o) => o.value === value);

export const answerLabel = (question, value) =>
  question.type === 'suggest' ? value : question.options.find((o) => o.value === value)?.label;

// The options chosen for the questions that have them.
export const selectedOptions = (questions, answers) =>
  questions.map((q) => q.options?.find((o) => o.value === answers[q.id])).filter(Boolean);

export const answerSummary = (questions, answers) =>
  questions
    .filter((q) => isAnswered(q, answers[q.id]))
    .map((q) => ({ label: q.summaryLabel, value: answerLabel(q, answers[q.id]) }));
