/* Case Files: the casebook.
   Written by hand for Year 4 (age 8 to 9), checked against the national curriculum in England:
   - Reading: "drawing inferences such as inferring characters' feelings, thoughts and motives from their actions,
     and justifying inferences with evidence" (Years 3 and 4 programme of study, reading comprehension).
   - Grammar: "using conjunctions to express time, place and cause", e.g. when, before, after, while, because,
     although, if, until (English Appendix 2, Year 3), and spotting the main clause and the subordinate clause.
   Contains public sector information licensed under the Open Government Licence v3.0.

   Every case has five steps:
     infer  - read a short scene, say how someone feels (or what a clue means), then tap the sentence that proves it
     join   - pick the joining word that makes the detective's note true
     main   - tap the part of a sentence that could stand on its own (the main clause)
     accuse - read the suspects' alibis, name who did it, then tap the clue that proves it (proofAt = [suspect, sentence])
   Wrong answers never lose anything. They get a nudge, and the proof sentence glows after a couple of tries.
   {name} becomes the child's name from "Make it yours". */
window.CASE_FILES = [
  {
    id: "medal", title: "The Missing Medal", place: "Oakfield Primary", sign: "SCHOOL", object: "medal",
    intro: "Sports day is over, but Ollie's gold medal has vanished from his peg. Time to investigate, Detective {name}!",
    steps: [
      { type: "infer", heading: "Witness: Ollie",
        text: ["Ollie stood by his peg in the cloakroom.", "His bottom lip wobbled and he wiped his eyes with his sleeve.", "“It was right here at lunchtime,” he whispered."],
        q: "How is Ollie feeling?", options: ["upset", "excited", "bored"], answer: 0,
        nudge: ["", "Excited people bounce about and grin. What is Ollie's lip doing?", "Bored people yawn and sigh. Look at what Ollie does with his sleeve."],
        proof: [1], proofQ: "Which sentence proves Ollie is upset?",
        why: "A wobbly lip and wiping his eyes show Ollie is upset, even though nobody says the word “upset”. Detectives call this reading between the lines." },
      { type: "infer", heading: "Witness: Mrs Patel, the caretaker",
        text: ["Mrs Patel was mopping the corridor.", "She yawned, leaned on her mop and rubbed her back.", "“I've been working since six o'clock this morning,” she said."],
        q: "How is Mrs Patel feeling?", options: ["tired", "angry", "scared"], answer: 0,
        nudge: ["", "Angry people frown or shout. Is Mrs Patel shouting?", "Scared people jump or hide. What is Mrs Patel actually doing?"],
        proof: [1, 2], proofQ: "Which sentence proves she is tired?",
        why: "Yawning, leaning on her mop and working since six o'clock all show that Mrs Patel is tired." },
      { type: "join", heading: "Your notebook",
        setup: "You spot muddy footprints on the clean, wet floor. Which joining word makes your note true?",
        a: "Someone walked down the corridor", b: "it had been mopped.", options: ["after", "before", "although"], answer: 0,
        nudge: ["", "If they walked there before the mopping, Mrs Patel would have mopped the footprints away!", "Although shows a surprise, like “Although it was cold, she wore shorts.” Is there a surprise here?"],
        why: "After tells us the order: first the floor was mopped, then someone walked on it with muddy feet." },
      { type: "main", heading: "Writing it up",
        setup: "Good detectives write clear reports. Tap the part that could be a sentence on its own.",
        parts: ["Because the floor was so slippery,", "someone left a muddy handprint on the wall."], main: 1,
        why: "“Someone left a muddy handprint on the wall” makes sense on its own: it's the main clause. “Because the floor was so slippery” leaves you waiting for more: it's the subordinate clause." },
      { type: "accuse", heading: "The suspects",
        q: "Who walked down the wet corridor?",
        suspects: [
          { name: "Jasmine", text: "Jasmine spent the whole afternoon in the library. The librarian stamped her books at three o'clock." },
          { name: "Max", text: "Max came in from football practice. His boots were caked in fresh, wet mud." },
          { name: "Mr Green", text: "Mr Green, the PE teacher, was packing away hurdles on the field until home time." }
        ],
        answer: 1, proofQ: "Which clue proves it was Max?", proofAt: [1, 1],
        nudge: ["The librarian saw Jasmine in the library all afternoon, so she wasn't in the corridor.", "", "Mr Green was out on the field until home time. Look for someone with muddy feet."],
        reveal: "Max found Ollie's medal on the cloakroom floor and put it in his bag to keep it safe, then rushed off to football and forgot all about it. He hands it straight back, and Ollie grins from ear to ear." }
    ]
  },
  {
    id: "cake", title: "The Vanishing Cake", place: "Rose Cottage", sign: "VILLAGE FETE", object: "cake",
    intro: "Gran baked a chocolate cake for the village fete. Now there's only an empty plate and a few crumbs. Over to you, Detective {name}!",
    steps: [
      { type: "infer", heading: "Witness: Gran",
        text: ["Gran had been baking since breakfast.", "She smiled as she polished the silver trophy she won at last year's fete.", "“This cake is my best ever,” she said, standing up a little taller."],
        q: "How did Gran feel about her cake before it vanished?", options: ["proud", "worried", "jealous"], answer: 0,
        nudge: ["", "Worried people frown and fidget. Gran is smiling.", "Jealous means wanting something that someone else has. Is Gran talking about anyone else?"],
        proof: [1, 2], proofQ: "Which sentence proves Gran was proud?",
        why: "Smiling, polishing her trophy and standing up taller all show that Gran was proud of her cake." },
      { type: "infer", heading: "Witness: Uncle Raj",
        text: ["Uncle Raj was sitting at the kitchen table.", "When Gran asked about the cake, he stared at his shoes and his cheeks went bright pink.", "“I only had one tiny slice,” he mumbled."],
        q: "How is Uncle Raj feeling?", options: ["guilty", "proud", "sleepy"], answer: 0,
        nudge: ["", "Proud people stand tall and smile. Uncle Raj is staring at his shoes.", "Sleepy people yawn. What happens to Uncle Raj's cheeks?"],
        proof: [1, 2], proofQ: "Which sentence proves he feels guilty?",
        why: "Staring at his shoes and going pink show that Uncle Raj feels guilty. He did eat one slice, but did he eat the whole cake? Keep investigating!" },
      { type: "join", heading: "Your notebook",
        setup: "Gran remembers exactly when she last saw the cake. Which joining word makes your note true?",
        a: "The cake was still on the table", b: "Gran went to answer the front door.", options: ["when", "because", "unless"], answer: 0,
        nudge: ["", "Did the cake stay on the table because of the doorbell? That doesn't make sense.", "Unless means “except if”. Read it out loud: does it make sense?"],
        why: "When tells us the time: the cake was there at the moment Gran left the kitchen." },
      { type: "main", heading: "Writing it up",
        setup: "Tap the part that could be a sentence on its own.",
        parts: ["While Gran was at the front door,", "the back door blew open in the wind."], main: 1,
        why: "“The back door blew open in the wind” makes sense on its own: it's the main clause. “While Gran was at the front door” needs more: it's the subordinate clause." },
      { type: "accuse", heading: "The suspects",
        q: "Who ate the cake?",
        suspects: [
          { name: "Uncle Raj", text: "Uncle Raj ate one slice at lunchtime, then went outside to mow the lawn all afternoon." },
          { name: "Mrs Okafor", text: "Mrs Okafor from next door was at the fete all afternoon, judging the flower show." },
          { name: "Biscuit the dog", text: "Biscuit the dog is fast asleep in his basket. There are chocolate crumbs on his whiskers." }
        ],
        answer: 2, proofQ: "Which clue proves it was Biscuit?", proofAt: [2, 1],
        nudge: ["Uncle Raj only had one slice, and he was mowing the lawn all afternoon.", "Mrs Okafor was busy at the flower show all afternoon.", ""],
        reveal: "The back door blew open, and Biscuit trotted in and gobbled the cake! Chocolate isn't good for dogs, so Gran calls the vet, who says Biscuit will be fine. Gran bakes a new cake, and this time it goes in the tin." }
    ]
  },
  {
    id: "museum", title: "The Midnight Noise", place: "City Museum", sign: "MUSEUM", object: "feather",
    intro: "Strange noises are echoing through the City Museum every night. The night guard needs the best detective in town: Detective {name}!",
    steps: [
      { type: "infer", heading: "Witness: Mr Brooks, the night guard",
        text: ["Mr Brooks has guarded the museum for twenty years.", "Tonight, his torch shook in his hand and he jumped at every shadow.", "“D-did you hear that?” he stammered."],
        q: "How is Mr Brooks feeling?", options: ["scared", "cheerful", "bored"], answer: 0,
        nudge: ["", "Cheerful people smile and hum. Look at his torch.", "Bored people yawn. Would a bored person jump at shadows?"],
        proof: [1, 2], proofQ: "Which sentence proves he is scared?",
        why: "A shaking torch, jumping at shadows and stammering all show Mr Brooks is scared." },
      { type: "infer", heading: "Evidence: the Bird Gallery",
        text: ["In the Bird Gallery, a stuffed eagle stands in a glass case.", "On the floor below it lies a soft, white feather.", "The eagle's feathers are all brown and gold."],
        q: "What does the white feather tell you?", options: ["a real bird is in the museum", "the eagle is falling apart", "someone has been painting"], answer: 0,
        nudge: ["", "The eagle is brown and gold. Could a white feather come from it?", "Is there any paint in the room? Stick to the clues you can see."],
        proof: [1, 2], proofQ: "Which sentence helps you work it out?",
        why: "The eagle has no white feathers, so the white feather must have come from a different bird, a real one!" },
      { type: "join", heading: "Your notebook",
        setup: "Mr Brooks says the noise starts at the same time every night. Which joining word makes your note true?",
        a: "The flapping noise starts", b: "the clock strikes midnight.", options: ["when", "although", "unless"], answer: 0,
        nudge: ["", "Although shows a surprise. Is there a surprise here?", "Unless means “except if”. Read it out loud: does it make sense?"],
        why: "When tells us the time something happens: midnight." },
      { type: "main", heading: "Writing it up",
        setup: "Tap the part that could be a sentence on its own.",
        parts: ["Although every door was locked,", "something was flying around the museum."], main: 1,
        why: "“Something was flying around the museum” makes sense on its own: it's the main clause. “Although every door was locked” needs more: it's the subordinate clause." },
      { type: "accuse", heading: "The suspects",
        q: "What is making the noise?",
        suspects: [
          { name: "A burglar", text: "Every door is still locked, and there are no footprints in the thick dust." },
          { name: "The museum ghost", text: "Mr Brooks says the museum is haunted, but he has never actually seen a ghost." },
          { name: "A barn owl", text: "A soft hoot echoes down the old chimney, and there are white feathers in the fireplace." }
        ],
        answer: 2, proofQ: "Which clue proves it was a barn owl?", proofAt: [2, 0],
        nudge: ["No footprints and locked doors mean nobody walked in.", "Nobody has ever seen the ghost. Good detectives only trust clues they can see.", ""],
        reveal: "A young barn owl came down the old chimney and has been flapping around the galleries at night. You open a high window, and it swoops out into the moonlight. Mr Brooks finally smiles." }
    ]
  },
  {
    id: "library", title: "The Lost Library Book", place: "Town Library", sign: "LIBRARY", object: "book",
    intro: "The library's only copy of The Dragon Map has gone missing, and twenty children are waiting to read it. Detective {name}, you're needed!",
    steps: [
      { type: "infer", heading: "Witness: Ms Kaur, the librarian",
        text: ["Ms Kaur held up the empty card from the shelf.", "She tapped her foot, folded her arms and let out a huge sigh.", "“That's the third time this month,” she said."],
        q: "How is Ms Kaur feeling?", options: ["fed up", "delighted", "frightened"], answer: 0,
        nudge: ["", "Delighted people beam and clap. Ms Kaur is sighing.", "Frightened people shake or hide. What are her arms doing?"],
        proof: [1, 2], proofQ: "Which sentence proves she is fed up?",
        why: "Tapping her foot, folding her arms and a huge sigh show she is fed up. “The third time this month” tells us why." },
      { type: "infer", heading: "Evidence: the reading corner",
        text: ["In the reading corner, Zara sat with a book hidden inside a big atlas.", "Her eyes raced along the lines and she didn't even hear the bell ring.", "She gasped and turned the page as fast as she could."],
        q: "How does Zara feel about her book?", options: ["she can't put it down", "she is bored by it", "she is cross about it"], answer: 0,
        nudge: ["", "Would a bored reader miss the bell?", "Cross people frown and grumble. Zara is gasping and turning pages fast."],
        proof: [1, 2], proofQ: "Which sentence proves she can't put it down?",
        why: "Racing eyes, not hearing the bell and turning pages as fast as she can all show that Zara can't put the book down." },
      { type: "join", heading: "Your notebook",
        setup: "Why would Zara hide a book inside an atlas? Which joining word makes your note make sense?",
        a: "Zara hid the book inside the atlas", b: "she didn't want anyone to see it.", options: ["because", "although", "until"], answer: 0,
        nudge: ["", "Although shows a surprise. Is it a surprise that she hid it so nobody would see?", "Until tells us how long. Read it out loud: does it make sense?"],
        why: "Because tells us why: she hid it so nobody would see what she was reading." },
      { type: "main", heading: "Writing it up",
        setup: "This time the main clause comes first! Tap the part that could be a sentence on its own.",
        parts: ["Zara kept on reading", "until her mum came to collect her."], main: 0,
        why: "“Zara kept on reading” makes sense on its own: it's the main clause. “Until her mum came to collect her” needs the rest of the sentence: it's the subordinate clause." },
      { type: "accuse", heading: "The suspects",
        q: "Who has The Dragon Map?",
        suspects: [
          { name: "Theo", text: "Theo returned two books about football this morning. They are already back on the shelf." },
          { name: "Zara", text: "Inside Zara's big atlas, you spot a book cover with a golden dragon on it." },
          { name: "Pages the library cat", text: "Pages the library cat has been asleep on the returns box all day." }
        ],
        answer: 1, proofQ: "Which clue proves Zara has it?", proofAt: [1, 0],
        nudge: ["Theo's books were about football, and they're back on the shelf.", "", "Pages has been asleep all day. Cats can't borrow books!"],
        reveal: "Zara loved The Dragon Map so much that she kept reading it past its return date. She says sorry, and Ms Kaur starts a waiting list so everyone gets a turn. Zara writes the very first review." }
    ]
  },
  {
    id: "gnome", title: "The Garden Gnome Mystery", place: "Willow Street", sign: "GARDENS", object: "gnome",
    intro: "Mr Hughes's prize garden gnome, Gerald, disappeared overnight, and the Best Garden competition is tomorrow. Detective {name}, can you find him?",
    steps: [
      { type: "infer", heading: "Witness: Mr Hughes",
        text: ["Mr Hughes stood by his empty flower bed.", "He paced up and down, checked his watch again and again and chewed his nails.", "“The judges come tomorrow,” he muttered."],
        q: "How is Mr Hughes feeling?", options: ["worried", "relaxed", "silly"], answer: 0,
        nudge: ["", "Relaxed people sit still and smile. Mr Hughes is pacing.", "Silly people giggle and joke. Is he laughing?"],
        proof: [1, 2], proofQ: "Which sentence proves he is worried?",
        why: "Pacing, checking his watch and chewing his nails show Mr Hughes is worried. The judges coming tomorrow tells us why." },
      { type: "infer", heading: "Witness: Mrs Lee, next door",
        text: ["Mrs Lee opened her curtains and looked out at her lawn.", "Her eyebrows shot up and her mouth dropped open.", "Under her apple tree lay a tiny red hat."],
        q: "How does Mrs Lee feel when she looks out?", options: ["surprised", "angry", "sleepy"], answer: 0,
        nudge: ["", "Angry people frown. What are Mrs Lee's eyebrows doing?", "Sleepy people yawn and rub their eyes."],
        proof: [1], proofQ: "Which sentence proves she is surprised?",
        why: "Eyebrows shooting up and a mouth dropping open show that Mrs Lee is surprised." },
      { type: "join", heading: "Your notebook",
        setup: "Mr Hughes is sure Gerald was there at bedtime. Which joining word makes your note true?",
        a: "Gerald was still in the flower bed", b: "Mr Hughes locked the gate at bedtime.", options: ["when", "although", "unless"], answer: 0,
        nudge: ["", "Although shows a surprise. Is there a surprise here?", "Unless means “except if”. Read it out loud: does it make sense?"],
        why: "When tells us the time: Gerald was still there when the gate was locked, so he went missing in the night." },
      { type: "main", heading: "Writing it up",
        setup: "Tap the part that could be a sentence on its own.",
        parts: ["If you follow the tiny paw prints,", "you will find the missing gnome."], main: 1,
        why: "“You will find the missing gnome” makes sense on its own: it's the main clause. “If you follow the tiny paw prints” needs more: it's the subordinate clause." },
      { type: "accuse", heading: "The suspects",
        q: "Who took Gerald?",
        suspects: [
          { name: "Mrs Lee", text: "Mrs Lee was fast asleep all night. Her alarm woke her at seven o'clock." },
          { name: "Tom the paperboy", text: "Tom delivers the papers at six, but he never goes past the front gate." },
          { name: "A fox cub", text: "Tiny paw prints lead under the hedge to a den, where a fox cub is curled up next to something with a red hat." }
        ],
        answer: 2, proofQ: "Which clue proves it was the fox cub?", proofAt: [2, 0],
        nudge: ["Mrs Lee was asleep all night until her alarm rang.", "Tom never goes past the gate, and the flower bed is inside it.", ""],
        reveal: "A curious fox cub dragged Gerald off to its den to play with! Mr Hughes gently gets Gerald back and decides to leave a wild corner in his garden for the foxes. Gerald wins second prize." }
    ]
  }
];
