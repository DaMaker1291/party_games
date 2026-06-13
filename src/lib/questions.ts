import { Question } from './types'

export const QUESTIONS: Question[] = [
  // Trivia
  {
    id: 't1',
    prompt: 'What is the only food that cannot go bad?',
    answer: 'Honey',
    options: ['Honey', 'Rice', 'Sugar', 'Salt'],
    category: 'Food',
    type: 'trivia',
  },
  {
    id: 't2',
    prompt: 'How many bones are in the adult human body?',
    answer: '206',
    options: ['196', '206', '216', '256'],
    category: 'Science',
    type: 'trivia',
  },
  {
    id: 't3',
    prompt: 'Which planet has the most moons?',
    answer: 'Saturn',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    category: 'Science',
    type: 'trivia',
  },
  {
    id: 't4',
    prompt: 'What year was the first iPhone released?',
    answer: '2007',
    options: ['2005', '2006', '2007', '2008'],
    category: 'Tech',
    type: 'trivia',
  },
  {
    id: 't5',
    prompt: 'Which country invented ice cream?',
    answer: 'China',
    options: ['Italy', 'France', 'China', 'USA'],
    category: 'Food',
    type: 'trivia',
  },
  {
    id: 't6',
    prompt: 'What is the smallest country in the world?',
    answer: 'Vatican City',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    category: 'Geography',
    type: 'trivia',
  },
  {
    id: 't7',
    prompt: 'What element is needed for fire?',
    answer: 'Oxygen',
    options: ['Nitrogen', 'Oxygen', 'Carbon', 'Hydrogen'],
    category: 'Science',
    type: 'trivia',
  },
  {
    id: 't8',
    prompt: 'What animal has the longest lifespan?',
    answer: 'Bowhead Whale',
    options: ['Galapagos Tortoise', 'Bowhead Whale', 'Elephant', 'Koi Fish'],
    category: 'Science',
    type: 'trivia',
  },
  // Fun/party questions
  {
    id: 'f1',
    prompt: 'Would you rather fight 100 duck-sized horses or 1 horse-sized duck?',
    answer: '',
    options: ['100 Duck-Sized Horses', '1 Horse-Sized Duck'],
    category: 'Would You Rather',
    type: 'trivia',
  },
  {
    id: 'f2',
    prompt: 'Do you fold your pizza when you eat it?',
    answer: '',
    options: ['Yes, always fold', 'No, flat is fine', 'Depends', 'I use a fork'],
    category: 'Opinion',
    type: 'truth',
  },
  {
    id: 'f3',
    prompt: 'What is the best topping on pizza?',
    answer: '',
    options: ['Pepperoni', 'Pineapple', 'Mushrooms', 'Extra Cheese'],
    category: 'Opinion',
    type: 'truth',
  },
  {
    id: 'f4',
    prompt: 'Make your best seal noise into the phone!',
    answer: '',
    options: ['Arf arf!', 'Eee eee!', 'Rawr rawr!', 'Moo moo!'],
    category: 'Challenge',
    type: 'challenge',
  },
  {
    id: 'f5',
    prompt: 'What is your karaoke go-to song?',
    answer: '',
    options: ['Bohemian Rhapsody', 'Sweet Caroline', 'Don\'t Stop Believin\'', 'Wannabe'],
    category: 'Party',
    type: 'truth',
  },
  {
    id: 'f6',
    prompt: 'Which is the superior pet?',
    answer: '',
    options: ['Dog', 'Cat', 'Fish', 'Hamster'],
    category: 'Opinion',
    type: 'truth',
  },
  {
    id: 'f7',
    prompt: 'Is a hotdog a sandwich?',
    answer: '',
    options: ['Yes, absolutely', 'No, never', 'It\'s a taco', 'What is reality?'],
    category: 'Debate',
    type: 'trivia',
  },
  {
    id: 'f8',
    prompt: 'Do you put ketchup on your hotdog?',
    answer: '',
    options: ['Always', 'Never', 'Only if no one is watching', 'What monster does that?'],
    category: 'Debate',
    type: 'truth',
  },
  // More trivia
  {
    id: 't9',
    prompt: 'What is the most spoken language in the world?',
    answer: 'English',
    options: ['Mandarin', 'English', 'Spanish', 'Hindi'],
    category: 'Language',
    type: 'trivia',
  },
  {
    id: 't10',
    prompt: 'Which ocean is the largest?',
    answer: 'Pacific',
    options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
    category: 'Geography',
    type: 'trivia',
  },
  {
    id: 'f9',
    prompt: 'If you had a superpower, what would it be?',
    answer: '',
    options: ['Invisibility', 'Time Travel', 'Flight', 'Mind Reading'],
    category: 'Fun',
    type: 'truth',
  },
  {
    id: 'f10',
    prompt: 'What would you bring to a desert island?',
    answer: '',
    options: ['A knife', 'A satellite phone', 'A boat', 'A lifetime supply of snacks'],
    category: 'Fun',
    type: 'truth',
  },
  {
    id: 't11',
    prompt: 'What is the fastest land animal?',
    answer: 'Cheetah',
    options: ['Lion', 'Cheetah', 'Peregrine Falcon', 'Horse'],
    category: 'Science',
    type: 'trivia',
  },
  {
    id: 't12',
    prompt: 'How many continents are there?',
    answer: '7',
    options: ['5', '6', '7', '8'],
    category: 'Geography',
    type: 'trivia',
  },
  {
    id: 't13',
    prompt: 'Which gas do plants absorb from the atmosphere?',
    answer: 'Carbon Dioxide',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    category: 'Science',
    type: 'trivia',
  },
]

export function getRandomQuestion(usedIds: string[] = []): Question {
  const available = QUESTIONS.filter((q) => !usedIds.includes(q.id))
  if (available.length === 0) {
    const idx = Math.floor(Math.random() * QUESTIONS.length)
    return QUESTIONS[idx]
  }
  const idx = Math.floor(Math.random() * available.length)
  return available[idx]
}

export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const CATEGORIES = [
  { name: 'Random', icon: '🎲' },
  { name: 'Science', icon: '🔬' },
  { name: 'Food', icon: '🍕' },
  { name: 'Geography', icon: '🌍' },
  { name: 'Party', icon: '🎉' },
  { name: 'Tech', icon: '📱' },
]
