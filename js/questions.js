/**
 * IMPACT '26 — Tech & AI Challenge question bank
 * Categories: debug | ai | privacy | general | puzzle
 * Note: `answer` is the index of the correct choice in `choices`.
 * The app also shuffles choices at runtime so position is never predictable.
 */
window.IMPACT_QUESTIONS = [
  // ─── FIND THE BUG ─────────────────────────────────────────────────────
  {
    id: "d01",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This program should print Hello. What is wrong?",
    code: `print(Hello)`,
    choices: [
      "print should be Print",
      "Hello needs quotes: print(\"Hello\")",
      "Missing a semicolon",
      "Nothing — it works fine",
    ],
    answer: 1,
    explanation:
      "In Python, text (a string) must be inside quotes. Without quotes, Python thinks Hello is a variable name.",
  },
  {
    id: "d02",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This should add 2 and 3. Why is the answer wrong?",
    code: `print("2" + "3")`,
    choices: [
      "Python cannot add numbers",
      "It should use & instead of +",
      "It prints 5 correctly",
      "It prints 23 because both are text, not numbers",
    ],
    answer: 3,
    explanation:
      "Quotes make values text. \"2\" + \"3\" joins them into \"23\". Use print(2 + 3) for math.",
  },
  {
    id: "d03",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This loop should count 1, 2, 3. What is broken?",
    code: `for i in range(1, 3):\n    print(i)`,
    choices: [
      "range(1, 3) stops before 3, so it only prints 1 and 2",
      "for loops don't work in Python",
      "print is spelled wrong",
      "It correctly prints 1, 2, 3",
    ],
    answer: 0,
    explanation:
      "range(start, stop) goes up to — but not including — stop. Use range(1, 4) to get 1, 2, 3.",
  },
  {
    id: "d04",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "Someone wants to check if age is exactly 18. Spot the bug.",
    code: `age = 20\nif age = 18:\n    print("Adult")`,
    choices: [
      "Adult needs no quotes",
      "age cannot be 20",
      "Use == for comparison, not = (which assigns)",
      "if must be written as IF",
    ],
    answer: 2,
    explanation:
      "A single = sets a value. To compare, use ==. For “18 or older” you’d want age >= 18.",
  },
  {
    id: "d05",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This should greet the user. What fails?",
    code: `name = input("Your name: ")\nprint("Hello " + Name)`,
    choices: [
      "input cannot ask questions",
      "You cannot add text together",
      "print needs parentheses twice",
      "Name is capitalized — Python is case-sensitive (use name)",
    ],
    answer: 3,
    explanation:
      "name and Name are different names in Python. Always match capitalization exactly.",
  },
  {
    id: "d06",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This should print a number from a list. Why might it crash?",
    code: `nums = [10, 20, 30]\nprint(nums[3])`,
    choices: [
      "Lists cannot hold numbers",
      "Index 3 is out of range — valid indexes are 0, 1, 2",
      "print cannot show lists",
      "You must use nums(3)",
    ],
    answer: 1,
    explanation:
      "Python counts from 0: nums[0]=10, nums[1]=20, nums[2]=30. There is no index 3.",
  },
  {
    id: "d07",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This function should return double the number. What’s wrong?",
    code: `def double(x):\n    x * 2\n\nprint(double(4))`,
    choices: [
      "Functions cannot multiply",
      "print should be inside the function",
      "Missing return — it calculates but doesn't give the answer back",
      "def is outdated syntax",
    ],
    answer: 2,
    explanation:
      "Without return, the function does the math but returns None. Use: return x * 2",
  },
  {
    id: "d08",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This should divide 10 by 2. Spot the issue.",
    code: `print(10 / 0)`,
    choices: [
      "Use // only for division",
      "10 must be in quotes",
      "Division is banned in Python",
      "You cannot divide by zero — it crashes",
    ],
    answer: 3,
    explanation: "Dividing by zero is undefined in math and raises an error in Python.",
  },
  {
    id: "d09",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This should print “Done” as part of a loop. Indentation matters!",
    code: `for i in range(3):\nprint("Done")`,
    choices: [
      "print must be indented under the for loop",
      "range(3) is illegal",
      "Done needs no quotes",
      "for must end with the word end",
    ],
    answer: 0,
    explanation:
      "Python uses indentation to show what belongs inside a loop. Misaligned code causes an IndentationError.",
  },
  {
    id: "d10",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "We want Welcome when the password matches. What’s wrong?",
    code: `password = "secret"\nif password == "Secret":\n    print("Welcome")`,
    choices: [
      "if cannot compare text",
      "== is wrong; use =",
      "\"secret\" and \"Secret\" are different — capitalization matters",
      "Welcome must be lowercase",
    ],
    answer: 2,
    explanation: "String comparison is exact. S vs s means they don’t match.",
  },
  {
    id: "d11",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This should store a person’s age and add 1. Find the bug.",
    code: `age = input("Age: ")\nnext_year = age + 1\nprint(next_year)`,
    choices: [
      "You cannot add 1 to anything",
      "input() returns text — convert with int(age) before adding",
      "print cannot show numbers",
      "Age must be spelled AGE",
    ],
    answer: 1,
    explanation:
      "input() always gives a string. \"20\" + 1 fails. Use int(age) + 1.",
  },
  {
    id: "d12",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This should print “Hi” five times. What’s wrong?",
    code: `count = 0\nwhile count < 5:\n    print("Hi")`,
    choices: [
      "while loops are illegal in Python",
      "Hi must be lowercase",
      "You must use for only",
      "count never increases — the loop runs forever",
    ],
    answer: 3,
    explanation:
      "Without count = count + 1 (or count += 1), count stays 0, so the loop never ends.",
  },
  {
    id: "d13",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This should check if the list has items. Spot the mistake.",
    code: `items = []\nif items = []:\n    print("Empty")`,
    choices: [
      "Empty lists are illegal",
      "Use == to compare, not =",
      "print cannot run after if",
      "You must write if items is None",
    ],
    answer: 1,
    explanation:
      "= assigns. To test equality use ==. (Also common: if not items:)",
  },
  {
    id: "d14",
    category: "debug",
    badge: "🐛 Find the Bug",
    prompt: "This should print the last letter of “CAT”. What’s wrong?",
    code: `word = "CAT"\nprint(word[3])`,
    choices: [
      "Strings cannot be indexed",
      "C A T are indexes 1, 2, 3",
      "Indexes start at 0 — last letter is word[2]",
      "You must use word(-1) only",
    ],
    answer: 2,
    explanation:
      "C=0, A=1, T=2. word[3] is out of range. (word[-1] also works for the last letter.)",
  },

  // ─── AI THINKER ───────────────────────────────────────────────────────
  {
    id: "a01",
    category: "ai",
    badge: "🧠 Spot the Hallucination",
    prompt: "An AI says: “The capital of Canada is Toronto.” What is true?",
    choices: [
      "Correct — Toronto is the capital",
      "AI never gets geography wrong",
      "That’s a hallucination — Ottawa is the capital",
      "Capitals change every year",
    ],
    answer: 2,
    explanation:
      "Hallucinations are confident but false answers. Canada’s capital is Ottawa.",
  },
  {
    id: "a02",
    category: "ai",
    badge: "🧠 Spot the Hallucination",
    prompt:
      "ChatGPT invents a research paper title and fake authors that don’t exist. This is called…",
    choices: [
      "A virus",
      "A hallucination",
      "Fine-tuning",
      "Encryption",
    ],
    answer: 1,
    explanation:
      "When AI fabricates citations, quotes, or facts, that’s a hallucination. Always verify important claims.",
  },
  {
    id: "a03",
    category: "ai",
    badge: "⚖️ Identify Bias",
    prompt:
      "An AI hiring tool ranks “John” resumes higher than identical “Jamila” resumes. This is mainly…",
    choices: [
      "Good accuracy",
      "A privacy feature",
      "Proof AI has no opinions",
      "Bias — unfair treatment based on names/identity signals",
    ],
    answer: 3,
    explanation:
      "Bias can sneak in from training data or design. Fair systems should evaluate skills, not identity proxies.",
  },
  {
    id: "a04",
    category: "ai",
    badge: "⚖️ Identify Bias",
    prompt:
      "A face recognition system works great on light skin but fails often on dark skin. What’s the issue?",
    choices: [
      "Dataset / performance bias — uneven accuracy across groups",
      "Cameras cannot see dark skin",
      "AI is always fair by default",
      "Users must smile more",
    ],
    answer: 0,
    explanation:
      "If training data under-represents some groups, the model performs unevenly. That’s a serious fairness risk.",
  },
  {
    id: "a05",
    category: "ai",
    badge: "✍️ Fix the Prompt",
    prompt: "Which prompt is clearer and more useful?",
    choices: [
      "Do the thing with the text",
      "Write stuff",
      "Summarize this article in 5 bullet points for a beginner, under 80 words",
      "Make it AI",
    ],
    answer: 2,
    explanation:
      "Good prompts specify task, audience, format, and length. Vague prompts get vague answers.",
  },
  {
    id: "a06",
    category: "ai",
    badge: "✍️ Fix the Prompt",
    prompt: "You need interview practice. Which prompt is better?",
    choices: [
      "Help interview.",
      "Act as an interviewer for a junior data analyst role. Ask 1 question at a time and give feedback after each answer.",
      "Be smart.",
      "Questions please forever.",
    ],
    answer: 1,
    explanation: "Role + format + pacing makes AI coaching much more effective.",
  },
  {
    id: "a07",
    category: "ai",
    badge: "🚫 Bad AI Output",
    prompt:
      "You ask for healthy dinner ideas. The AI replies with a medical prescription dosage. What’s wrong?",
    choices: [
      "Perfectly helpful — AI is a licensed doctor",
      "Dinner always requires prescriptions",
      "Off-topic / unsafe — it ignored your request and gave risky advice",
      "You should take the dosage immediately",
    ],
    answer: 2,
    explanation:
      "Good AI use means checking relevance and safety. Don’t follow medical advice from a chatbot blindly.",
  },
  {
    id: "a08",
    category: "ai",
    badge: "🚫 Bad AI Output",
    prompt:
      "You ask for sources. The AI lists 3 links that 404 / don’t exist. What should you do?",
    choices: [
      "Trust them because AI said so",
      "Share them immediately on social media",
      "Assume the websites are secret",
      "Treat them as unverified and check real sources yourself",
    ],
    answer: 3,
    explanation: "Fabricated links are common. Verify before you cite or share.",
  },
  {
    id: "a09",
    category: "ai",
    badge: "🖼️ AI or Real?",
    prompt:
      "A photo of a person has oddly melted fingers, weird jewelry text, and mismatched earrings. Most likely…",
    choices: [
      "A perfect documentary photo",
      "AI-generated or heavily AI-edited",
      "Proof fingers have 7 joints",
      "A normal camera copyright watermark",
    ],
    answer: 1,
    explanation:
      "Unnatural hands, garbled text, and inconsistent details are common AI-image tells.",
  },
  {
    id: "a10",
    category: "ai",
    badge: "🖼️ AI or Real?",
    prompt: "Which clue often suggests an image may be AI-generated?",
    choices: [
      "Background text that looks like nonsense letters",
      "Natural skin pores with consistent shadows only",
      "A news-agency watermark (always proves it’s real)",
      "The photo is in color",
    ],
    answer: 0,
    explanation:
      "Gibberish text in signs/books is a classic AI artifact. Still: verify with multiple signals.",
  },
  {
    id: "a11",
    category: "ai",
    badge: "🏆 Better AI Response",
    prompt: "Question: “Is water wet?” Which response is better?",
    choices: [
      "YES ABSOLUTELY ALWAYS. Anyone who disagrees is wrong.",
      "I refuse all science questions.",
      "Wetness was invented in 2019.",
      "It depends how you define wet; scientifically, water makes things wet — here’s a short balanced take…",
    ],
    answer: 3,
    explanation:
      "Better answers are nuanced, clear, and honest about definitions — not extreme or made-up.",
  },
  {
    id: "a12",
    category: "ai",
    badge: "🏆 Better AI Response",
    prompt: "You ask how to learn Python. Which reply is better?",
    choices: [
      "Start with variables & loops, practice daily 30 mins, build a tiny project this week — here’s a simple plan.",
      "Just be a genius.",
      "Python is impossible.",
      "Skip learning; only prompt forever.",
    ],
    answer: 0,
    explanation: "Actionable, stepwise advice beats vague motivation or discouragement.",
  },
  {
    id: "a13",
    category: "ai",
    badge: "🧠 AI Thinker",
    prompt: "What does “LLM” usually mean in AI?",
    choices: [
      "Little Laptop Monitor",
      "Large Language Model",
      "Local Legal Manual",
      "Long Latency Modem",
    ],
    answer: 1,
    explanation: "LLMs (like ChatGPT) are models trained to predict and generate language.",
  },
  {
    id: "a14",
    category: "ai",
    badge: "🧠 AI Thinker",
    prompt: "“Prompt engineering” is mainly about…",
    choices: [
      "Building physical robots",
      "Hacking passwords",
      "Writing clear instructions so AI gives better answers",
      "Drawing circuit boards",
    ],
    answer: 2,
    explanation: "How you ask matters. Clear goals, context, and constraints improve results.",
  },
  {
    id: "a15",
    category: "ai",
    badge: "🧠 Spot the Hallucination",
    prompt:
      "An AI claims Einstein won a Nobel Prize for inventing the light bulb. What’s going on?",
    choices: [
      "True — Einstein invented the light bulb",
      "Hallucination / mixed-up facts — Edison is linked to the bulb; Einstein’s Nobel was for the photoelectric effect",
      "AI is quoting a secret diary",
      "Nobels are awarded for bulbs yearly",
    ],
    answer: 1,
    explanation:
      "Confident mashups of famous names and inventions are classic hallucinations.",
  },

  // ─── PRIVACY ──────────────────────────────────────────────────────────
  {
    id: "p01",
    category: "privacy",
    badge: "🔒 Privacy Check",
    prompt: "Should you paste your passport number into a public AI chatbot?",
    choices: [
      "Yes — AI needs it to help you",
      "Only on Mondays",
      "No — avoid sharing sensitive personal data with public AI tools",
      "Yes, if you type please",
    ],
    answer: 2,
    explanation:
      "Treat public AI like a shared space. Don’t submit IDs, passwords, health records, or secrets.",
  },
  {
    id: "p02",
    category: "privacy",
    badge: "🔒 Privacy Check",
    prompt: "What is a strong password habit?",
    choices: [
      "Unique password + password manager + MFA when possible",
      "Use the same password everywhere",
      "Password123 for all accounts",
      "Share passwords in the family group chat",
    ],
    answer: 0,
    explanation:
      "Reuse is risky. Managers + multi-factor authentication (MFA) greatly reduce account takeovers.",
  },
  {
    id: "p03",
    category: "privacy",
    badge: "🔒 Privacy Check",
    prompt:
      "A free “AI headshot” site asks for full access to your Google Drive. Best move?",
    choices: [
      "Allow everything — more access = better photos",
      "Deny — grant only the minimum access needed (or don’t use it)",
      "Post your backup codes publicly",
      "Email them your password for convenience",
    ],
    answer: 1,
    explanation:
      "Least privilege: only allow what a tool truly needs. Over-permissioning is a common privacy trap.",
  },
  {
    id: "p04",
    category: "privacy",
    badge: "🔒 Privacy Check",
    prompt: "Personal data generally includes…",
    choices: [
      "Only your favorite color",
      "Only company logos",
      "Weather forecasts",
      "Info that can identify you (name, email, phone, ID numbers)",
    ],
    answer: 3,
    explanation: "If it can identify you (alone or combined), treat it as personal data.",
  },
  {
    id: "p05",
    category: "privacy",
    badge: "🔒 Privacy Check",
    prompt: "Before uploading coworker emails into an AI tool at work, you should…",
    choices: [
      "Upload everything for speed",
      "Ignore policy if the AI is popular",
      "Check company policy — and avoid confidential data unless approved tools allow it",
      "CC the whole company first",
    ],
    answer: 2,
    explanation:
      "Workplace AI use must follow policy, contracts, and confidentiality rules.",
  },
  {
    id: "p06",
    category: "privacy",
    badge: "🔒 Privacy Check",
    prompt: "What does MFA / 2FA help with?",
    choices: [
      "Making websites load faster",
      "Improving camera quality",
      "Stopping attackers even if they steal your password",
      "Removing ads forever",
    ],
    answer: 2,
    explanation:
      "A second factor (app code, hardware key, etc.) blocks many password-only attacks.",
  },
  {
    id: "p07",
    category: "privacy",
    badge: "🔒 Privacy Check",
    prompt:
      "An email says “Your AI account is locked — click here and enter your password.” You didn’t expect it. Best action?",
    choices: [
      "Don’t click — verify via the official website/app yourself",
      "Click fast before it expires",
      "Forward your password to friends for advice",
      "Reply with your SIN / SSN to prove identity",
    ],
    answer: 0,
    explanation:
      "Phishing often uses urgency. Navigate to the real site yourself instead of using email links.",
  },
  {
    id: "p08",
    category: "privacy",
    badge: "🔒 Privacy Check",
    prompt: "“Privacy by design” means…",
    choices: [
      "Adding privacy only after a breach",
      "Hiding the privacy policy",
      "Collecting all data possible",
      "Building products so privacy protections are included from the start",
    ],
    answer: 3,
    explanation:
      "Bake in safeguards early: minimize data, secure storage, clear consent, and user controls.",
  },
  {
    id: "p09",
    category: "privacy",
    badge: "🔒 Privacy Check",
    prompt:
      "A coworker leaves their laptop unlocked at the booth with Slack open. What’s the privacy risk?",
    choices: [
      "None — church events are always safe",
      "Someone could send messages or read private chats as them",
      "Only the wallpaper can be changed",
      "Laptops cannot leak data",
    ],
    answer: 1,
    explanation: "Lock your screen. Physical access can become account access in seconds.",
  },
  {
    id: "p10",
    category: "privacy",
    badge: "🔒 Privacy Check",
    prompt: "Which is safest when using public Wi‑Fi for email?",
    choices: [
      "Log into banking on free café Wi‑Fi with no VPN and share the password aloud",
      "Avoid sensitive logins, use trusted networks/VPN, and watch for HTTPS",
      "Turn off all passwords because Wi‑Fi is encrypted enough",
      "Post your MFA codes in Discord",
    ],
    answer: 1,
    explanation:
      "Public Wi‑Fi is convenient but riskier. Prefer HTTPS, caution with sensitive accounts, and VPN when needed.",
  },

  // ─── AI KNOWLEDGE ─────────────────────────────────────────────────────
  {
    id: "g01",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "Machine learning models improve mainly by…",
    choices: [
      "Sleeping overnight",
      "Learning patterns from examples/data",
      "Reading paper books only",
      "Changing the Wi‑Fi password",
    ],
    answer: 1,
    explanation:
      "Models are trained on data to find patterns that help them make predictions or generate outputs.",
  },
  {
    id: "g02",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "What is an AI “agent” (in simple terms)?",
    choices: [
      "A human customer support worker only",
      "A type of keyboard",
      "Software that can take steps toward a goal (often using tools)",
      "A printer driver",
    ],
    answer: 2,
    explanation:
      "Agents plan and act — e.g., search, call APIs, update files — not just reply with one message.",
  },
  {
    id: "g03",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "Inference in AI usually means…",
    choices: [
      "Deleting the model",
      "Only collecting training data",
      "Drawing the company logo",
      "Running a trained model to get an answer/prediction",
    ],
    answer: 3,
    explanation: "Training builds the model; inference is using it in production to respond.",
  },
  {
    id: "g04",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "Which is a good use of AI for career growth?",
    choices: [
      "Practice interviews, learn concepts, and draft work — then verify & personalize",
      "Let AI take exams for you secretly",
      "Send AI-written lies to employers",
      "Share private employer data publicly",
    ],
    answer: 0,
    explanation: "AI is a tutor and accelerator — integrity and verification still matter.",
  },
  {
    id: "g05",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "Data science is closest to…",
    choices: [
      "Only fixing laptop fans",
      "Only graphic design",
      "Using data + stats + code to answer questions and guide decisions",
      "Only cable management",
    ],
    answer: 2,
    explanation:
      "Data scientists explore data, build models, and communicate insights.",
  },
  {
    id: "g06",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "Which statement is true?",
    choices: [
      "Confident tone always means correct",
      "AI never needs human review",
      "Spellcheck proved AI is perfect",
      "AI can be wrong even when it sounds confident",
    ],
    answer: 3,
    explanation: "Fluency ≠ truth. Critical thinking is your superpower.",
  },
  {
    id: "g07",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "Open-source AI models are typically…",
    choices: [
      "Models whose weights/code are available for others to use/modify (with a license)",
      "Models that only run underwater",
      "Secret government printers",
      "Apps that cannot be downloaded",
    ],
    answer: 0,
    explanation:
      "Open weights/code enable research and customization — still check licenses and safety.",
  },
  {
    id: "g08",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "A resume tip for tech roles:",
    choices: [
      "List every app you ever opened",
      "Use tiny unreadable font to fit more",
      "Show impact with numbers and projects (what you built / improved)",
      "Hide your name for mystery points",
    ],
    answer: 2,
    explanation:
      "Recruiters love clear impact: tools + outcomes. Ask the Tech & AI booth for resume help!",
  },
  {
    id: "g09",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "Supervised learning means the training data usually includes…",
    choices: [
      "No data at all",
      "Labeled examples (input + correct answer)",
      "Only emojis",
      "Random passwords",
    ],
    answer: 1,
    explanation: "Labels teach the model what “right” looks like — e.g., spam vs not spam.",
  },
  {
    id: "g10",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "Why evaluate AI systems (evals)?",
    choices: [
      "To make demos slower on purpose",
      "Because buttons look nicer",
      "Evals are only for video games",
      "To measure quality, catch failures, and improve safely before users get hurt",
    ],
    answer: 3,
    explanation:
      "Evals check whether AI does what you claim — accuracy, safety, bias, and reliability.",
  },
  {
    id: "g11",
    category: "general",
    badge: "💡 AI Knowledge",
    prompt: "Training vs inference — which is right?",
    choices: [
      "Training = teaching the model; inference = using it to answer",
      "They mean the exact same thing",
      "Inference happens only on paper",
      "Training means deleting datasets",
    ],
    answer: 0,
    explanation: "First you train, then you run (infer) to serve users.",
  },

  // ─── PUZZLE / REASONING ───────────────────────────────────────────────
  {
    id: "z01",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt:
      "A bat and a ball cost $1.10 in total. The bat costs $1 more than the ball. How much is the ball?",
    choices: [
      "$0.10",
      "$1.00",
      "$0.05",
      "$0.15",
    ],
    answer: 2,
    explanation:
      "If the ball is $0.05, the bat is $1.05. Together = $1.10. ($0.10 feels right but is the classic trap.)",
  },
  {
    id: "z02",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt: "What comes next: 2, 4, 8, 16, ?",
    choices: [
      "18",
      "24",
      "32",
      "20",
    ],
    answer: 2,
    explanation: "Each number doubles: 16 × 2 = 32.",
  },
  {
    id: "z03",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt:
      "You have a 3-liter jug and a 5-liter jug. You need exactly 4 liters in the 5-liter jug. What’s a valid first idea?",
    choices: [
      "Fill the 5, pour into the 3 (leaves 2 in the 5), empty the 3, pour the 2 into the 3, fill the 5, pour into the 3 until full (adds 1), leaving 4 in the 5",
      "Smash both jugs",
      "Fill only the 3 and stop",
      "Guess until it looks like 4",
    ],
    answer: 0,
    explanation:
      "Classic water-jug reasoning: measure by pouring between jugs until 4 remains.",
  },
  {
    id: "z04",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt: "All roses are flowers. Some flowers fade quickly. Therefore…",
    choices: [
      "All roses fade quickly",
      "We cannot be sure all roses fade quickly from this alone",
      "No flowers fade",
      "Roses are not flowers",
    ],
    answer: 1,
    explanation:
      "“Some flowers” doesn’t prove anything about all roses. Don’t over-conclude.",
  },
  {
    id: "z05",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt: "Which number is the odd one out: 3, 5, 7, 9, 11?",
    choices: [
      "3",
      "5",
      "9 — it’s not a prime number",
      "11",
    ],
    answer: 2,
    explanation: "3, 5, 7, and 11 are primes. 9 = 3×3.",
  },
  {
    id: "z06",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt:
      "A farmer has 17 sheep. All but 9 run away. How many are left?",
    choices: [
      "8",
      "17",
      "0",
      "9",
    ],
    answer: 3,
    explanation: "“All but 9” means 9 remain.",
  },
  {
    id: "z07",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt: "If it takes 5 machines 5 minutes to make 5 widgets, how long for 100 machines to make 100 widgets?",
    choices: [
      "100 minutes",
      "5 minutes",
      "1 minute",
      "20 minutes",
    ],
    answer: 1,
    explanation:
      "Each machine makes 1 widget in 5 minutes. 100 machines → 100 widgets in 5 minutes.",
  },
  {
    id: "z08",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt: "Find the pattern: AZ, BY, CX, ?",
    choices: [
      "DW",
      "DU",
      "EW",
      "XY",
    ],
    answer: 0,
    explanation:
      "First letter moves forward A→B→C→D; second moves backward Z→Y→X→W.",
  },
  {
    id: "z09",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt:
      "Three switches control three bulbs in another room. You may enter the bulb room only once. How can you know which switch is which? (Classic logic)",
    choices: [
      "Flip switch 1 for a few minutes, turn it off, flip switch 2 on, go in: hot bulb=1, lit=2, cold dark=3",
      "Guess randomly once",
      "It is impossible",
      "Yell at the bulbs until they confess",
    ],
    answer: 0,
    explanation:
      "Heat is information: on→off leaves a warm bulb. On = lit. Never-on = cold/dark.",
  },
  {
    id: "z10",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt: "What is 50% of 2 + 2?",
    choices: [
      "1 (if you do 50% of (2+2))",
      "3 (if you do (50% of 2) + 2)",
      "Both A and B can be argued — order/parentheses matter",
      "100",
    ],
    answer: 2,
    explanation:
      "Ambiguous phrasing! Precision matters in prompts and in math. Clarify with parentheses.",
  },
  {
    id: "z11",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt: "Tomorrow is to yesterday as future is to…?",
    choices: [
      "Present",
      "Past",
      "Later",
      "Calendar",
    ],
    answer: 1,
    explanation: "Tomorrow ↔ future direction; yesterday ↔ past.",
  },
  {
    id: "z12",
    category: "puzzle",
    badge: "🧩 Puzzle",
    prompt:
      "There are 2 ducks in front of a duck, 2 ducks behind a duck, and a duck in the middle. How many ducks minimum?",
    choices: [
      "5",
      "3",
      "6",
      "4",
    ],
    answer: 1,
    explanation: "Three ducks in a line: front, middle, back covers all the statements.",
  },
];
