import { Question, QuestionType } from './types'

const triviaQuestions: Question[] = [
  { id: 't1', prompt: 'What is the only food that never goes bad?', options: ['Honey', 'Rice', 'Sugar', 'Salt'], answer: 'Honey', category: '🤯 Mind Blown', type: 'trivia', hasCorrectAnswer: true },
  { id: 't2', prompt: 'How many bones does a shark have?', options: ['0', '206', '50', '100'], answer: '0', category: '🤯 Mind Blown', type: 'trivia', hasCorrectAnswer: true },
  { id: 't3', prompt: 'Which planet has the most moons?', options: ['Saturn', 'Jupiter', 'Uranus', 'Neptune'], answer: 'Saturn', category: '🔭 Space', type: 'trivia', hasCorrectAnswer: true },
  { id: 't4', prompt: 'What year was the first iPhone released?', options: ['2005', '2006', '2007', '2008'], answer: '2007', category: '📱 Tech', type: 'trivia', hasCorrectAnswer: true },
  { id: 't5', prompt: 'Who invented ice cream?', options: ['China', 'Italy', 'France', 'USA'], answer: 'China', category: '🍦 Random', type: 'trivia', hasCorrectAnswer: true },
  { id: 't6', prompt: 'What is the smallest country?', options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'], answer: 'Vatican City', category: '🌍 Geography', type: 'trivia', hasCorrectAnswer: true },
  { id: 't7', prompt: 'What element is essential for fire?', options: ['Oxygen', 'Nitrogen', 'Carbon', 'Hydrogen'], answer: 'Oxygen', category: '🔬 Science', type: 'trivia', hasCorrectAnswer: true },
  { id: 't8', prompt: 'Which animal has the longest lifespan?', options: ['Bowhead Whale', 'Galapagos Tortoise', 'Elephant', 'Koi Fish'], answer: 'Bowhead Whale', category: '🐋 Animals', type: 'trivia', hasCorrectAnswer: true },
  { id: 't9', prompt: 'What is the most spoken language in the world?', options: ['English', 'Mandarin', 'Spanish', 'Hindi'], answer: 'English', category: '🌍 Geography', type: 'trivia', hasCorrectAnswer: true },
  { id: 't10', prompt: 'Which ocean is the largest?', options: ['Pacific', 'Atlantic', 'Indian', 'Arctic'], answer: 'Pacific', category: '🌍 Geography', type: 'trivia', hasCorrectAnswer: true },
  { id: 't11', prompt: 'What is the fastest land animal?', options: ['Cheetah', 'Lion', 'Peregrine Falcon', 'Horse'], answer: 'Cheetah', category: '🐆 Animals', type: 'trivia', hasCorrectAnswer: true },
  { id: 't12', prompt: 'Which gas do plants absorb?', options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], answer: 'Carbon Dioxide', category: '🔬 Science', type: 'trivia', hasCorrectAnswer: true },
  { id: 't13', prompt: 'What is a group of flamingos called?', options: ['A Flamboyance', 'A Flock', 'A Colony', 'A Gaggle'], answer: 'A Flamboyance', category: '🤯 Mind Blown', type: 'trivia', hasCorrectAnswer: true },
  { id: 't14', prompt: 'Which fruit has its seeds on the outside?', options: ['Strawberry', 'Raspberry', 'Blueberry', 'Banana'], answer: 'Strawberry', category: '🍓 Random', type: 'trivia', hasCorrectAnswer: true },
  { id: 't15', prompt: 'How many languages are there in the world?', options: ['~7,000', '~2,000', '~15,000', '~500'], answer: '~7,000', category: '🤯 Mind Blown', type: 'trivia', hasCorrectAnswer: true },
  { id: 't16', prompt: 'What color is a polar bear\'s skin?', options: ['Black', 'White', 'Pink', 'Gray'], answer: 'Black', category: '🤯 Mind Blown', type: 'trivia', hasCorrectAnswer: true },
  { id: 't17', prompt: 'Which country has the most islands?', options: ['Sweden', 'Indonesia', 'Philippines', 'Canada'], answer: 'Sweden', category: '🌍 Geography', type: 'trivia', hasCorrectAnswer: true },
  { id: 't18', prompt: 'What is the only mammal that can truly fly?', options: ['Bat', 'Flying Squirrel', 'Pterodactyl', 'Sugar Glider'], answer: 'Bat', category: '🐋 Animals', type: 'trivia', hasCorrectAnswer: true },
  { id: 't19', prompt: 'How many hearts does an octopus have?', options: ['3', '1', '2', '8'], answer: '3', category: '🤯 Mind Blown', type: 'trivia', hasCorrectAnswer: true },
  { id: 't20', prompt: 'What was the first video game ever?', options: ['Pong', 'Tetris', 'Spacewar!', 'Pac-Man'], answer: 'Spacewar!', category: '🎮 Gaming', type: 'trivia', hasCorrectAnswer: true },
]

const wouldYouRather: Question[] = [
  { id: 'w1', prompt: 'Would you rather...', options: ['Fight 100 duck-sized horses', 'Fight 1 horse-sized duck'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w2', prompt: 'Would you rather...', options: ['Be invisible', 'Be able to fly'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w3', prompt: 'Would you rather...', options: ['Read minds', 'Time travel'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w4', prompt: 'Would you rather...', options: ['Always be 10 min late', 'Always be 20 min early'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w5', prompt: 'Would you rather...', options: ['Lose your phone for a year', 'Lose your Wi-Fi for a year'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w6', prompt: 'Would you rather...', options: ['Be a famous musician', 'Be a famous athlete'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w7', prompt: 'Would you rather...', options: ['Have unlimited pizza', 'Have unlimited sushi'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w8', prompt: 'Would you rather...', options: ['Live in a treehouse', 'Live in an underground bunker'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w9', prompt: 'Would you rather...', options: ['Speak all languages', 'Play every instrument'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w10', prompt: 'Would you rather...', options: ['Have a pet dinosaur', 'Have a pet dragon'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w11', prompt: 'Would you rather...', options: ['Be the funniest person in the room', 'Be the smartest'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
  { id: 'w12', prompt: 'Would you rather...', options: ['Live without music', 'Live without movies'], category: '🤔 WYR', type: 'would-you-rather', hasCorrectAnswer: false },
]

const thisOrThatQuestions: Question[] = [
  { id: 'th1', prompt: 'Which is the superior breakfast food?', options: ['🥞 Pancakes', '🧇 Waffles', '🥓 Bacon & Eggs', '🥣 Cereal'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th2', prompt: 'Which pizza topping is best?', options: ['Pepperoni', 'Pineapple', 'Mushrooms', 'Extra Cheese'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th3', prompt: 'Best gaming console ever?', options: ['Nintendo Switch', 'PlayStation 5', 'Xbox Series X', 'PC Master Race'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th4', prompt: 'Which dog breed is best?', options: ['Golden Retriever', 'German Shepherd', 'Pug', 'Corgi'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th5', prompt: 'Best season?', options: ['🌸 Spring', '☀️ Summer', '🍂 Fall', '❄️ Winter'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th6', prompt: 'Which superhero is best?', options: ['Spider-Man', 'Batman', 'Iron Man', 'Wonder Woman'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th7', prompt: 'Best ice cream flavor?', options: ['🍫 Chocolate', '🍦 Vanilla', '🍪 Cookie Dough', '🍓 Strawberry'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th8', prompt: 'Best movie of all time?', options: ['The Shawshank Redemption', 'The Godfather', 'Inception', 'The Dark Knight'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th9', prompt: 'Is a hotdog a sandwich?', options: ['Yes, absolutely', 'No, never', 'It\'s a taco', 'What is reality?'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th10', prompt: 'Do you fold your pizza?', options: ['Always fold', 'Never fold', 'Depends on the slice', 'I use a fork'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th11', prompt: 'Which is the superior pet?', options: ['🐶 Dog', '🐱 Cat', '🐟 Fish', '🐹 Hamster'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th12', prompt: 'Best way to watch a movie?', options: ['In theaters', 'On Netflix at home', 'On a plane', 'In bed on a laptop'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th13', prompt: 'What is the best chip flavor?', options: ['Regular Salted', 'Sour Cream & Onion', 'Barbecue', 'Salt & Vinegar'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th14', prompt: 'Best social media platform?', options: ['TikTok', 'Instagram', 'Twitter/X', 'Reddit'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
  { id: 'th15', prompt: 'Ketchup on hotdog?', options: ['Always', 'Never', 'Only when no one is watching', 'What monster does that?'], category: '⚔️ This or That', type: 'this-or-that', hasCorrectAnswer: false },
]

const neverHaveIEver: Question[] = [
  { id: 'n1', prompt: 'Never have I ever... lied in a job interview.', options: ['I have 🙋', 'I haven\'t 🙅', 'Define "stretched the truth" 🤐', 'I\'ve never had a job 😎'], category: '🤫 Confessions', type: 'never-have-i-ever', hasCorrectAnswer: false },
  { id: 'n2', prompt: 'Never have I ever... eaten food that fell on the floor.', options: ['5 second rule! 🕐', 'Never 🙅', 'Only if it\'s worth it 🍕', 'The floor is a plate 🍽️'], category: '🤫 Confessions', type: 'never-have-i-ever', hasCorrectAnswer: false },
  { id: 'n3', prompt: 'Never have I ever... sent a text to the wrong person.', options: ['Too many times 📱', 'Never 🙅', 'That\'s how I came out to my mom 😬', 'My ex still has those screenshots 💀'], category: '🤫 Confessions', type: 'never-have-i-ever', hasCorrectAnswer: false },
  { id: 'n4', prompt: 'Never have I ever... googled myself.', options: ['Multiple times 🔍', 'Never 🙅', 'I\'m too famous for that 😎', 'Who hasn\'t?'], category: '🤫 Confessions', type: 'never-have-i-ever', hasCorrectAnswer: false },
  { id: 'n5', prompt: 'Never have I ever... fallen asleep in class/work.', options: ['It\'s a talent 😴', 'Never 🙅', 'I\'m doing it right now', 'My boss is on this app 👀'], category: '🤫 Confessions', type: 'never-have-i-ever', hasCorrectAnswer: false },
  { id: 'n6', prompt: 'Never have I ever... pretended to laugh at a joke I didn\'t get.', options: ['Every single day 😅', 'Never, I ask for explanation', 'That\'s just being polite', 'Are you kidding? That\'s my whole personality'], category: '🤫 Confessions', type: 'never-have-i-ever', hasCorrectAnswer: false },
  { id: 'n7', prompt: 'Never have I ever... worn socks with sandals.', options: ['Unironically yes 🧦', 'Never, I have dignity', 'Only ironically 😎', 'I\'m European, it\'s fine'], category: '🤫 Confessions', type: 'never-have-i-ever', hasCorrectAnswer: false },
  { id: 'n8', prompt: 'Never have I ever... talked to myself in public.', options: ['I have full conversations 🗣️', 'Never 🙅', 'Only when I forget headphones', 'Who doesn\'t?'], category: '🤫 Confessions', type: 'never-have-i-ever', hasCorrectAnswer: false },
  { id: 'n9', prompt: 'Never have I ever... cried at a movie.', options: ['Every Pixar movie ever 🥹', 'Never, I\'m a robot 🤖', 'Only The Notebook', 'I cried at a commercial once'], category: '🤫 Confessions', type: 'never-have-i-ever', hasCorrectAnswer: false },
  { id: 'n10', prompt: 'Never have I ever... stalked an ex on social media.', options: ['Just checking on them... 👀', 'Never, I\'m mature', 'Their new partner is cute... wait', 'I have 3 burner accounts'], category: '🤫 Confessions', type: 'never-have-i-ever', hasCorrectAnswer: false },
]

const hotTakeQuestions: Question[] = [
  { id: 'ht1', prompt: 'What is your most controversial food opinion?', options: ['Pineapple belongs on pizza 🍍', 'Cereal is soup 🥣', 'Ketchup doesn\'t belong on fries', 'Water is a flavor'], category: '🔥 Hot Take', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'ht2', prompt: 'What is the most overrated thing ever?', options: ['The Beatles', 'Avocado toast', 'The Mona Lisa', 'Sleeping in'], category: '🔥 Hot Take', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'ht3', prompt: 'What do you secretly judge people for?', options: ['Their phone wallpaper', 'How they hold a fork', 'Their Netflix queue', 'Their coffee order'], category: '🔥 Hot Take', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'ht4', prompt: 'Which popular thing do you hate?', options: ['The word "viral"', 'Dancing TikToks', 'Influencers', 'Avocado everything'], category: '🔥 Hot Take', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'ht5', prompt: 'What is an overrated movie everyone loves?', options: ['The Godfather', 'Titanic', 'Avatar', 'TheDark Knight'], category: '🔥 Hot Take', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'ht6', prompt: 'What social norm should disappear?', options: ['Small talk', 'Saying "bless you"', 'Wearing shoes inside', 'The Handshake'], category: '🔥 Hot Take', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'ht7', prompt: 'What is your weirdest pet peeve?', options: ['Loud chewers', 'When people say "irregardless"', 'Unsymmetrical things', 'The sound of Styrofoam'], category: '🔥 Hot Take', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'ht8', prompt: 'What is the worst trend of all time?', options: ['Low rise jeans', 'Frosted tips', 'Crocs', 'The dab'], category: '🔥 Hot Take', type: 'hot-take', hasCorrectAnswer: false },
]

const challengeQuestions: Question[] = [
  { id: 'c1', prompt: 'Make your best animal sound into the phone!', options: ['🐱 Meow', '🐶 Woof', '🐄 Moo', '🦁 Roar'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c2', prompt: 'Do your best celebrity impression!', options: ['Elon Musk', 'The Rock', 'Taylor Swift', 'Your mom'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c3', prompt: 'Say "I\'m a little teapot" in your best villain voice', options: ['Deep and menacing', 'High-pitched evil laugh', 'Whisper like Gollum', 'Opera style'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c4', prompt: 'Invent a new dance move right now!', options: ['The Shopping Cart', 'The Lawnmower', 'The Invisible Dog', 'The Bee Hive'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c5', prompt: 'Do a 10-second stand-up comedy routine', options: ['Knock knock joke', 'Dad joke', 'Self-roast', 'Just say "BEES!" loudly'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c6', prompt: 'Rap a freestyle about this game night!', options: ['Brag about your skills', 'Roast the last player', 'Talk about snacks', 'Just say "yeah" repeatedly'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c7', prompt: 'Sing the chorus of your favorite song right now!', options: ['Bohemian Rhapsody', 'Sweet Caroline', 'Don\'t Stop Believin\'', 'Baby Shark (go hard)'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c8', prompt: 'Say the alphabet backward in 10 seconds!', options: ['Easy! ZYX...', 'I\'ll try... Z Y X...', 'Nope, can\'t do it', 'Is this even possible?'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c9', prompt: 'Invent a new Superhero on the spot!', options: ['Captain Obvious', 'Professor Procrastination', 'The Snoozer', 'Dr. Snack'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c10', prompt: 'Do a dramatic reading of your last text message!', options: ['Romantic 🥰', 'Angry 😤', 'Mysterious 🕵️', 'Like a movie trailer 🎬'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c11', prompt: 'Yell your favorite emoji out loud!', options: ['💯!!!', '🔥!!!', '😂!!!', '💀!!!'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
  { id: 'c12', prompt: 'Make up a slogan for a fake product!', options: ['Soggy Socks™', 'Inflatable Furniture™', 'Microwaveable Ice™', 'Silent Alarm Clock™'], category: '🎤 Challenge', type: 'challenge', hasCorrectAnswer: false },
]

const finishThisQuestions: Question[] = [
  { id: 'f1', prompt: 'Finish the sentence: "The best thing since sliced bread is..."', options: ['Wi-Fi', 'Air fryers', 'Auto-correct', 'Streaming services'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
  { id: 'f2', prompt: 'Finish the lyric: "Never gonna give you up, never gonna..."', options: ['let you down', 'tell a lie', 'make you cry', 'run around'], category: '🎵 Finish the Lyric', type: 'finish-the-lyric', hasCorrectAnswer: true },
  { id: 'f3', prompt: 'Finish the sentence: "If I won the lottery, the first thing I\'d buy is..."', options: ['A island', 'A pizza the size of a car', 'Pay off my mom\'s house', 'A lifetime supply of snacks'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
  { id: 'f4', prompt: 'My spirit animal is...', options: ['A sleepy cat', 'A chaotic raccoon', 'A golden retriever', 'A penguin that means business'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
  { id: 'f5', prompt: 'The worst superpower would be...', options: ['The ability to always find a parking spot (but it\'s always a bad one)', 'Knowing exactly when you\'ll die', 'Being able to hear everyone\'s thoughts (no filter)', 'The power to always be slightly warm'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
  { id: 'f6', prompt: 'If my life was a movie, the title would be...', options: ['"Maybe Tomorrow"', '"I\'m Trying My Best"', '"Snack Hard"', '"The Nap Strikes Back"'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
  { id: 'f7', prompt: 'A \'How to\' guide nobody asked for: "How to..."', options: ['Eat a pizza in 3 seconds', 'Annoy your cat', 'Nap professionally', 'Avoid all responsibilities'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
  { id: 'f8', prompt: 'The next meme format should be...', options: ['Cats judging your decisions', 'Dogs explaining things', 'A dramatic potato', 'A chair with opinions'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
  { id: 'f9', prompt: 'What your favorite food says about you as a person...', options: ['Pizza = You\'re fun at parties', 'Sushi = You\'re classy but broke', 'Tacos = You\'re chaotic good', 'Ice Cream = You\'re honest about joy'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
  { id: 'f10', prompt: 'The plot of the worst movie ever made:', options: ['A chair that falls in love with a table', 'Phone battery at 1%: The Movie', 'The man who could only speak in emojis', 'A documentary about paint drying (but it\'s wet paint)'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
  { id: 'f11', prompt: 'Finish the sentence: "An honest dating profile would say..."', options: ['"I\'ll cancel 60% of the time"', '"My cat is the priority"', '"I\'m just here for the food pics"', '"I have 3 personalities and they all want pizza"'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
  { id: 'f12', prompt: 'The official snack of this game is...', options: ['Popcorn (classic)', 'Chips and dip (fancy)', 'Whatever we find in the cupboard (survival)', 'Hot Cheetos (dangerous)'], category: '✍️ Finish This', type: 'finish-the-lyric', hasCorrectAnswer: false },
]

const debateQuestions: Question[] = [
  { id: 'd1', prompt: 'Would you time travel to the past or future?', options: ['Past - fix my mistakes', 'Future - see what\'s next', 'Neither - the present is fine', 'Both - I\'m greedy'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd2', prompt: 'The \'60s or the \'90s?', options: ['60s - music & vibes', '90s - the best decade', 'Neither - too old school', 'Both had good snacks'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd3', prompt: 'Are we living in a simulation?', options: ['Probably yes 🤖', 'Definitely no 🙅', 'Only on Mondays', 'If we are, the dev needs to patch this'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd4', prompt: 'Can AI become truly conscious?', options: ['Already is 🤖', 'Never will be', 'Maybe in 50 years', 'Only if it likes pizza'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd5', prompt: 'Would you rather live forever?', options: ['Yes please!', 'No way!', 'Only if I stay young', 'Only if my pets come too'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd6', prompt: 'Do aliens exist?', options: ['100% yes', 'Probably not', 'They\'re already here 👀', 'We are the aliens'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd7', prompt: 'Zombie apocalypse - what\'s your weapon?', options: ['Baseball bat', 'Crossbow', 'Chainsaw', 'Frying pan'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd8', prompt: 'Which fictional world would you live in?', options: ['Harry Potter', 'Star Wars', 'Pokémon', 'Mario Kart'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd9', prompt: 'If you could swap lives with anyone for a day?', options: ['A billionaire', 'The president', 'A famous singer', 'My dog (seems chill)'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd10', prompt: 'What would your last meal be?', options: ['Pizza (obviously)', 'Sushi', 'Your mom\'s cooking', 'Everything on the menu'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd11', prompt: 'If your life had a soundtrack, what genre?', options: ['Synthwave', 'Lo-fi hip hop', 'Chaotic jazz', 'Epic orchestral'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd12', prompt: 'What would you name your boat?', options: ['"Ship happens"', '"Unsinkable II"', '"The SS Drama"', '"Sir Sails-a-lot"'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd13', prompt: 'If you could eliminate one chore forever?', options: ['Dishes', 'Laundry', 'Making the bed', 'Taking out trash'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd14', prompt: 'How do you want people to remember you?', options: ['They laughed', 'They learned', 'They\'re still confused', '"They always had snacks"'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
  { id: 'd15', prompt: 'What skill would you instantly master?', options: ['Every language', 'Playing piano', 'Cooking like a chef', 'Sleeping 8 hours'], category: '💬 Debate', type: 'poll', hasCorrectAnswer: false },
]

const rateItQuestions: Question[] = [
  { id: 'r1', prompt: 'Rate this game so far:', options: ['🔥 Fire', '💀 Trash', '🤡 I\'m confused', '😤 I\'m about to win'], category: '⭐ Rate It', type: 'poll', hasCorrectAnswer: false },
  { id: 'r2', prompt: 'On a scale of 1-10, how tired are you right now?', options: ['1-3: Wide awake', '4-6: Could nap', '7-8: Running on fumes', '9-10: I am a ghost'], category: '⭐ Rate It', type: 'poll', hasCorrectAnswer: false },
  { id: 'r3', prompt: 'Rate the current player\'s vibe:', options: ['✨ Immaculate', '🤔 Questionable', '💅 Main character energy', '🧓 Boomer energy'], category: '⭐ Rate It', type: 'poll', hasCorrectAnswer: false },
  { id: 'r4', prompt: 'How likely are you to win this game?', options: ['100% - it\'s in the bag', '50% - I have a chance', '1% - I\'m here for the vibes', '-5% - I\'m actively losing'], category: '⭐ Rate It', type: 'poll', hasCorrectAnswer: false },
]

const memeQuestions: Question[] = [
  { id: 'm1', prompt: 'What is the most relatable meme format?', options: ['Distracted boyfriend', 'Woman yelling at cat', 'Drake hotline bling', 'This is fine (fire)'], category: '😭 Meme Zone', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'm2', prompt: 'Which meme describes your life right now?', options: ['"I\'m in danger" (Simpsons)', '"This is fine" (dog in fire)', '"I should buy a boat"', '"Kermit sipping tea"'], category: '😭 Meme Zone', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'm3', prompt: 'Caption this: a cat sitting on a roomba holding a knife', options: ['"Roomba speed: FURIOUS"', '"He is the captain now"', '"Amazon delivered a hitman"', '"The purr-petrator"'], category: '😭 Meme Zone', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'm4', prompt: 'What is the funniest word in the English language?', options: ['Moist', 'Kumquat', 'Bamboozled', 'Fart'], category: '😭 Meme Zone', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'm5', prompt: 'If this game was a meme, it would be:', options: ['"It\'s something"', '"Nobody: ... Absolutely nobody:"', 'Distracted Boyfriend', 'Roll Safe (pointing to head)'], category: '😭 Meme Zone', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'm6', prompt: 'What is the most 2020s thing you can say?', options: ['"Can you hear me now?"', '"Let\'s circle back"', '"That\'s so unserious"', '"Slay"'], category: '😭 Meme Zone', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'm7', prompt: 'If you were a meme for a day, which one?', options: ['Success Kid', 'Grumpy Cat', 'Hide the Pain Harold', 'Disaster Girl'], category: '😭 Meme Zone', type: 'hot-take', hasCorrectAnswer: false },
  { id: 'm8', prompt: 'What is the most chaotic thing you can do in 5 seconds?', options: ['Say the N-word (don\'t)', 'Start clapping randomly', 'Yell "FREE PIZZA"', 'Do the floss dance'], category: '😭 Meme Zone', type: 'hot-take', hasCorrectAnswer: false },
]

// ── Combinatorial Template System ──

const templates: (() => Question)[] = (() => {
  const foods = ['pizza', 'tacos', 'sushi', 'pasta', 'ramen', 'burgers', 'fried chicken', 'ice cream', 'donuts', 'mac and cheese']
  const animals = ['cats', 'dogs', 'penguins', 'sloths', 'otters', 'capybaras', 'axolotls', 'red pandas']
  const movies = ['Inception', 'Shrek 2', 'The Room', 'Spider-Man: Into the Spiderverse', 'The Bee Movie', 'Sharknado', 'Everything Everywhere All At Once']
  const cities = ['New York', 'Tokyo', 'Paris', 'a small beach town', 'the middle of nowhere', 'a treehouse commune', 'a floating city']
  const snacks = ['popcorn', 'chips', 'M&Ms', 'gummy bears', 'pretzels', 'beef jerky', 'cheese puffs']
  const vibes = ['main character', 'chaotic neutral', 'side quest energy', 'final boss', 'NPC', 'gaurdian angel']
  const fears = ['spiders', 'heights', 'clowns', 'public speaking', 'the dark', 'commitment', 'running out of battery']
  const eras = ['2000s', '90s', '80s', '70s', 'Renaissance', 'Jurassic']
  const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

  const temp: (() => Question)[] = []

  // WYR templates
  const wyrPairs = [
    () => [`Be a ${pick(animals)} for a day`, `Be a ${pick(animals)} for a month`],
    () => [`Only eat ${pick(foods)} forever`, `Never eat ${pick(foods)} again`],
    () => [`Have ${pick(fears)} as a pet`, `${pick(cities)} as your hometown`],
  ]
  wyrPairs.forEach((pair, i) => {
    temp.push(() => {
      const [a, b] = pair()
      return {
        id: `gen-wyr-${i}-${Date.now()}`,
        prompt: 'Would you rather...',
        options: [a, b, 'Neither 🤷', 'Both, I\'m built different 💪'],
        category: '🤔 WYR',
        type: 'would-you-rather' as QuestionType,
        hasCorrectAnswer: false,
      }
    })
  })

  // Finish This templates
  const finishStarts = [
    () => `"The best ${pick(foods)} is..."`,
    () => `"The most overrated thing is..."`,
    () => `"My ${pick(vibes)} energy comes from..."`,
    () => `"The secret to happiness is..."`,
    () => `"If I were a ${pick(animals)}, I would..."`,
  ]
  finishStarts.forEach((start, i) => {
    temp.push(() => ({
      id: `gen-finish-${i}-${Date.now()}`,
      prompt: `Finish the sentence: ${start()}`,
      options: [pick(snacks), pick(vibes), pick(cities), pick(animals)].map(s => s.charAt(0).toUpperCase() + s.slice(1)),
      category: '✍️ Finish This',
      type: 'finish-the-lyric' as QuestionType,
      hasCorrectAnswer: false,
    }))
  })

  // Rate It templates
  const rateTopics = [
    () => `Being ${pick(vibes)} on a scale of 1-10`,
    () => `${pick(foods)} as a personality trait`,
    () => `How ${pick(eras)} would you rate this game`,
  ]
  rateTopics.forEach((topic, i) => {
    temp.push(() => ({
      id: `gen-rate-${i}-${Date.now()}`,
      prompt: topic(),
      options: ['💀 Trash', '🤷 Mid', '🔥 Fire', '🏆 Legendary'],
      category: '⭐ Rate It',
      type: 'poll' as QuestionType,
      hasCorrectAnswer: false,
    }))
  })

  return temp
})()

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const staticQuestions: Question[] = [
  ...triviaQuestions,
  ...wouldYouRather,
  ...thisOrThatQuestions,
  ...neverHaveIEver,
  ...hotTakeQuestions,
  ...challengeQuestions,
  ...finishThisQuestions,
  ...debateQuestions,
  ...rateItQuestions,
  ...memeQuestions,
]

export function getRandomQuestion(usedIds: string[] = []): Question {
  // 20% chance to generate a template question
  if (Math.random() < 0.2 && templates.length > 0) {
    const gen = templates[Math.floor(Math.random() * templates.length)]
    return gen()
  }

  const available = staticQuestions.filter((q) => !usedIds.includes(q.id))
  if (available.length === 0) {
    // refill from all questions
    const idx = Math.floor(Math.random() * staticQuestions.length)
    return staticQuestions[idx]
  }
  const idx = Math.floor(Math.random() * available.length)
  return available[idx]
}

export const CATEGORIES = [
  { name: '🤯 Random', icon: '🎲' },
  { name: '🤔 WYR', icon: '🤔' },
  { name: '⚔️ This or That', icon: '⚔️' },
  { name: '😭 Meme Zone', icon: '😭' },
  { name: '🎤 Challenge', icon: '🎤' },
  { name: '🤫 Confessions', icon: '🤫' },
  { name: '🔥 Hot Take', icon: '🔥' },
  { name: '✍️ Finish This', icon: '✍️' },
]
