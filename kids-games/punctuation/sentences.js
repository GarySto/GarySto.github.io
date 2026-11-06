/* Punctuation Archery: the sentence bank.
   Written by hand and checked against the national curriculum in England, English Appendix 2
   (vocabulary, grammar and punctuation), Years 1 to 4. Contains public sector information licensed under
   the Open Government Licence v3.0: https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/

   How to read a line: each [ ] is one gap. The right answer comes first, then the wrong balloons, split by |.
   A ~ adds a tip of its own (otherwise the game picks the tip from the kind of gap).
   Every wrong balloon has been checked so that it really is wrong in that sentence.
   Lists use no comma before "and", as taught in English primary schools. */
const PUNCT_SETS = {
  // Years 1 and 2: capital letters, full stops, question marks and exclamation marks
  ends: [
    "[The|the] dog ran across the park[.|?|,]",
    "Where is my red hat[?|.|,]",
    "What a huge cake[!|?|,]",
    "[My|my] brother likes to swim[.|?|,]",
    "Can we go to the beach today[?|.|,]",
    "Stop that bus[!|?|,]",
    "How tall that giraffe is[!|?|,]",
    "Do you like pizza[?|.|,]",
    "[Mum|mum] and [I|i] made pancakes[.|?|,]",
    "We saw a fox in the garden[.|?|,]",
    "[On|on] Saturday we went to [London|london][.|?|,]",
    "Why is the sky blue[?|.|,]",
    "[Our|our] teacher read us a story[.|?|,]",
    "What a lovely surprise[!|?|,]",
    "Who ate the last biscuit[?|.|,]",
    "[Ben|ben] lives next door to [Priya|priya][.|?|,]",
    "[It|it] was raining so we stayed inside[.|?|,]",
    "How fast you can run[!|?|,]",
    "Is it time for lunch yet[?|.|,]",
    "[Every|every] Monday we go swimming[.|?|,]",
    "My friend and [I|i] built a den[.|?|,]",
    "Ouch, that hurt[!|?|,]"
  ],
  // Years 2 to 4: commas in lists, commas after fronted adverbials, apostrophes
  commas: [
    "I need eggs[,|.|?] milk and flour.",
    "We packed a towel[,|.|!] a spade and a bucket.",
    "At the zoo we saw lions[,|.|?] tigers and zebras.",
    "My pencil case has a pen[,|.|'] a ruler and a rubber.",
    "For my party I want balloons[,|.|?] cake and music.",
    "Later that day[,|.|?] we went home.",
    "After lunch[,|.|!] we played football.",
    "In the morning[,|.|?] the birds began to sing.",
    "Without a sound[,|.|?] the cat crept closer.",
    "As quick as a flash[,|.|?] the mouse ran away.",
    "Once upon a time[,|.|?] a dragon lived in a cave.",
    "Next week[,|.|?] we are going on a school trip.",
    "I [can't|cant|ca'nt] find my shoe.",
    "We [don't|dont|do'nt] have school today.",
    "[It's|Its|Its'] going to rain later.",
    "They [didn't|didnt|did'nt] hear the bell.",
    "[I'm|Im|I'am] so excited about the trip.",
    "You [shouldn't|shouldnt|should'nt] run near the pool.",
    "This is [Sam's|Sams|Sam,s] coat.",
    "We went to [Gran's|Grans|Gran,s] house for tea.",
    "The cat licked [its|it's|its'~Its with no apostrophe means belonging to it. It's means it is.] paw.",
    "One [girl's|girls'|girls] scarf blew away.",
    "All the [girls'|girl's|girls] coats were hanging on the pegs.",
    "The two [boys'|boy's|boys] bikes were muddy.",
    "Both [teams'|team's|teams] shirts were blue.",
    "The three [cats'|cat's|cats] bowls were empty.",
    "The [children's|childrens'|childrens~Children is already plural, so just add an apostrophe and s: children's.] playground has a new slide."
  ],
  // Years 3 and 4: inverted commas (speech marks), with the punctuation inside
  speech: [
    "[“|”|.]Sit down[!|?|.][”|“|.] shouted the teacher.",
    "The teacher said[,|.|?] [“|”|.]Please line up[.|,|?][”|“|,]",
    "[“|”|.]Where is my bag[?|.|,][”|“|.] asked Leo.",
    "[“|”|.]I love painting[,|.|?][”|“|.] said Amara.",
    "Mia whispered[,|.|?] [“|”|.]Can you keep a secret[?|.|,][”|“|.]",
    "[“|”|.]Watch out[!|.|?][”|“|.] yelled Kai.",
    "Dad asked[,|.|!] [“|”|.]Who wants pancakes[?|.|,][”|“|.]",
    "[“|”|.]We won the match[!|.|?][”|“|.] cheered Zara.",
    "[“|”|.]It is time for bed[,|.|?][”|“|.] said Mum.",
    "Oscar said[,|.|?] [“|”|.]I found a frog in the pond[!|,|?][”|“|.]",
    "[“|”|.]Can I have a drink[?|.|,][”|“|.] asked Ruby.",
    "Grandad chuckled and said[,|.|?] [“|”|.]That is a funny joke[.|,|?][”|“|,]",
    "[“|”|.]My tooth is wobbly[,|.|?][”|“|.] said Finn."
  ]
};
