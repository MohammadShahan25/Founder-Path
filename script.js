/* ═══════════════════════════════════════════════════
   FOUNDERPATH — SCRIPT.JS
   Skills data + App logic + AI tools + Form gate
   ═══════════════════════════════════════════════════ */

/* ─── Config ─── */
const OPENROUTER_KEY = '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';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODELS = [
  'meta-llama/llama-3.1-8b-instruct',
  'mistralai/mistral-7b-instruct',
  'openai/gpt-4o-mini'
];
const GOOGLE_FORM_URL = 'https://forms.gle/6AG8MhEnpVCgoZVR8';
const AI_DOWN_KEY = 'fpAIDown';

/* ═══════════════════════════════════════════════════
   SKILLS DATA — ALL 25 SKILLS
   ═══════════════════════════════════════════════════ */

const SKILLS_DATA = [
  {
    id: 1, title: "The Visionary's Spark", stage: "Ideation",
    opening: "You sit across the table from a sparse office. No decorations. No trophies. Just a worn leather chair and a question waiting to be answered. 'I've seen hundreds of startups,' a voice begins, 'and 90% failed. Want to know why? They never asked the right question first.' The finger taps the table. 'Let's see if you can.'",
    questions: [
      { story: "A single sheet of paper is placed in front of you. On it, three problems. 'Choose one to solve,' comes the instruction. 'Not the biggest market. Not the easiest path. The one that makes you angry.'", question: "Which problem should you focus on first?", type: "mcq", choices: ["Build an app that helps rich people get richer faster.", "Create a solution for students in rural areas with no AI access.", "Make a slightly better version of an existing successful product."], correct: 1, feedback: { 0: "Chasing money without meaning is a shortcut to burnout. Money follows impact, not the other way around.", 1: "You chose impact over profit. Rare. That fire will keep you going when the work gets hard. Proceed.", 2: "Better isn't enough. Different is everything. Don't build a faster horse. Build a car. Think bigger." } },
      { story: "'Every problem has layers,' the voice continues. 'The surface problem is easy to see. The root cause is buried. Most startups treat symptoms. The great ones cure the disease.'", question: "Where should you focus your solution?", type: "mcq", choices: ["Fix the surface problem for quick results.", "Address the root cause for lasting impact.", "Solve a medium layer as a compromise."], correct: 1, feedback: { 0: "Quick results feel good. Then they vanish. You'll build something temporary.", 1: "Harder. Slower. But permanent. That's where real value lives. Good.", 2: "Compromise usually satisfies no one. Pick a lane." } },
      { story: "A knock on the door. An investor enters. 'I'll give you $500k right now,' he says, 'if you build my idea instead.' The room feels smaller.", question: "What do you do?", type: "mcq", choices: ["Take the money. Build his idea.", "Decline politely. Stay true to your vision.", "Negotiate for partial control."], correct: 1, feedback: { 0: "Selling your soul before you've started. You'll regret this.", 1: "Money without conviction is poison. You passed.", 2: "Wishful thinking. He'll steamroll you anyway. Stay or leave. Don't bargain." } },
      { story: "'Everyone will doubt you,' comes the voice. 'Family. Friends. Teachers. They'll call it a risk. They'll call it foolish. How will you answer?'", question: "When people doubt you, what keeps you going?", type: "mcq", choices: ["'I want to prove them wrong.'", "'I'm not sure I can handle that.'", "'The mission matters more than their opinions.'"], correct: 2, feedback: { 0: "Revenge isn't fuel. It burns out. Then you're left empty.", 1: "Then step aside now. This path isn't for everyone.", 2: "That's the right answer. Not ego. Not revenge. Purpose. Remember this moment." } },
      { story: "A blank card is slid across the table. 'Write down one person this serves. Not customers. Not the market. A person. With a name. A struggle. A hope. Make me feel them.'", question: "Describe the ONE person your venture will help. What's their name? What problem do they face daily? How will your solution change their life? (Write 3-5 sentences)", type: "open", feedback: "The answer is read slowly. 'Now you understand. Entrepreneurship isn't about products. It's about people. Keep this. Read it when you doubt yourself. Skill 1 complete. There are 24 more.'" }
    ]
  },
  {
    id: 2, title: "The Customer's Confession", stage: "Ideation",
    opening: "You're taken to a crowded market. 'Watch,' comes the instruction. An elderly woman struggles to read a tiny label on a can. 'She's been standing there for five minutes. No one helps. This is your first customer.'",
    questions: [
      { story: "'What did you just see?' The question hangs in the air. 'Don't tell me the product. Tell me the human moment.'", question: "What is the REAL problem this woman faces?", type: "mcq", choices: ["She needs a new prescription for her glasses.", "The label font is too small. Make it bigger.", "She feels invisible and frustrated in a world not designed for her."], correct: 2, feedback: { 0: "Surface. You're not a doctor.", 1: "Better, but still surface. Look deeper.", 2: "You saw the human. Not the transaction. That's rare." } },
      { story: "'How would you help her? Don't build anything yet. Just ask her a question.'", question: "What question do you ask first?", type: "mcq", choices: ["'Would you pay for an app that reads labels?'", "'What's the hardest part about grocery shopping for you?'", "'Do you have a smartphone?'"], correct: 1, feedback: { 0: "You're selling before listening. Stop.", 1: "Open-ended. Human. You're learning. Good.", 2: "Assumptions. Dangerous. Ask about her, not her tech." } },
      { story: "The woman speaks. 'I used to cook for my grandchildren. Now I can't read the ingredients. I feel useless.' The instruction follows: 'There's your problem statement. Write it.'", question: "Which problem statement captures what she said?", type: "mcq", choices: ["Elderly people struggle to read small text in stores.", "Grandmothers cannot cook for their families due to vision challenges.", "Seniors need larger font sizes on product labels."], correct: 1, feedback: { 0: "True but cold. Where's the heart?", 1: "You listened. The emotion is the problem.", 2: "A feature, not a problem. Don't confuse them." } },
      { story: "'How will you know if you've succeeded for her? Not metrics. Not revenue. Her.'", question: "What does success look like for this customer?", type: "mcq", choices: ["She uses your app 5 times per week.", "She cooks her famous biryani for her grandchildren again.", "She gives you a 5-star review."], correct: 1, feedback: { 0: "Activity isn't impact. You missed the point.", 1: "There it is. That's the moment. Remember that feeling.", 2: "Reviews are vanity. Her joy is reality." } },
      { story: "'The best founders become obsessed with one customer at a time. Name her. Write her story. Make me care.'", question: "Name this customer. Write a 3-sentence story of her life, her struggle, and what your venture would restore to her.", type: "open", feedback: "'This is your north star. When you face hard decisions, come back to her. If your choice doesn't help her, it's the wrong choice. Skill 2 complete.'" }
    ]
  },
  {
    id: 3, title: "The Competitor's Shadow", stage: "Ideation",
    opening: "A chart appears. 'Your competitor has 80% market share. They have millions in funding. You have nothing. What now?' The stare is unblinking.",
    questions: [
      { story: "'Most founders panic. They copy. They chase. They die. Don't be most founders.'", question: "What is the WORST response to a dominant competitor?", type: "mcq", choices: ["Build exactly what they built but cheaper.", "Find an underserved niche they ignore.", "Partner with them instead of fighting."], correct: 0, feedback: { 0: "Copying a giant is suicide. They'll crush you with pricing.", 1: "Smart. Giants have blind spots. That's where you live.", 2: "Possible. But only if you bring value they can't ignore. Unlikely at your stage." } },
      { story: "'I once competed against Amazon. They had everything. I had a garage. I found one thing they did badly — customer service for vintage electronics. I owned that tiny corner. They never bothered me.'", question: "What strategy was used to compete against Amazon?", type: "mcq", choices: ["Price competition", "Niche specialization", "Aggressive advertising"], correct: 1, feedback: { 0: "You can't out-price Amazon.", 1: "Exactly. Find the crack in their armor and live there.", 2: "They outspend you 1000:1. You'll bankrupt yourself." } },
      { story: "'Your competitor just launched a new feature you were planning. What's your first move?'", question: "What do you do immediately?", type: "mcq", choices: ["Scrap your feature. Start over.", "Launch yours anyway, but better.", "Call your customers. Ask if they actually wanted that feature."], correct: 2, feedback: { 0: "Reactionary. Weak. You're letting them drive.", 1: "Rash. You don't know if customers even want it.", 2: "Data before decisions. Good instinct." } },
      { story: "'Most founders fear competitors. The smart ones study them. Their Glassdoor reviews tell me where they're failing. Their customer complaints are my product roadmap.'", question: "What is the BEST source of competitor intelligence?", type: "mcq", choices: ["Their investor pitch deck", "Their unhappy customers", "Their employee LinkedIn profiles"], correct: 1, feedback: { 0: "Marketing fiction. Everyone looks good on paper.", 1: "Gold mine. Their complaints are your opportunities.", 2: "Speculative. Unreliable." } },
      { story: "'Write down one thing your competitor does that customers hate. Then write one way you'll do it differently. Be specific. Be brutal.'", question: "Identify one competitor weakness and your differentiation strategy. Be specific.", type: "open", feedback: "'Good. Now you have a battle plan. Competitors are not enemies. They are teachers. Learn what they do wrong. Then don't do that. Skill 3 complete.'" }
    ]
  },
  {
    id: 4, title: "The Market Map", stage: "Ideation",
    opening: "A massive map unrolls on the table. 'This is your market. 100 million potential customers. Most founders drown here. Don't drown.'",
    questions: [
      { story: "'TAM, SAM, SOM. Total Addressable Market. Serviceable Available Market. Serviceable Obtainable Market. Most founders get this wrong. Don't be most founders.'", question: "If 10 million people need your solution, 2 million can afford it, and 200,000 will actually buy in Year 1, what is your TAM?", type: "mcq", choices: ["10 million", "2 million", "200,000"], correct: 0, feedback: { 0: "Correct. TAM is everyone who needs it. Everything else is reality.", 1: "That's SAM. Not TAM. Read carefully.", 2: "That's SOM. Your Year 1 target. Not the whole market." } },
      { story: "'Founders love saying we're targeting a billion-dollar market. I love asking how much of that can you actually reach in Year 1? Silence follows.'", question: "What is the MOST realistic Year 1 goal for a new startup?", type: "mcq", choices: ["5% of the total market", "0.1-1% of your local SAM", "Dominate the entire industry"], correct: 1, feedback: { 0: "Delusional. Giants have 5% after decades.", 1: "Realistic. Humble. Achievable. Grow from there.", 2: "Arrogance before reality. You'll crash." } },
      { story: "'Where will you find your first 100 customers? Not everyone. Not social media. A specific place. A specific person. Name it.'", question: "What is the best source of first customers?", type: "mcq", choices: ["Facebook ads targeted to millions", "Direct outreach to people in your network", "SEO waiting for Google traffic"], correct: 1, feedback: { 0: "Expensive. Impersonal. You'll burn cash.", 1: "Hardest. Most effective. Each conversation teaches you something.", 2: "Passive. Slow. You need urgency." } },
      { story: "'Every market has beachheads. Small, concentrated groups of customers who desperately need your solution. Win them. They'll pull you into the rest.'", question: "What is a beachhead strategy?", type: "mcq", choices: ["Sell to everyone at once with a big marketing blitz", "Dominate one small segment, then expand", "Wait for customers to find you"], correct: 1, feedback: { 0: "Scattered. Unfocused. You'll run out of money.", 1: "Exactly. Win one beach. Then the next. Then the continent.", 2: "Passive. Competitors will eat your lunch." } },
      { story: "'Now, draw your own map. Name your TAM. Your SAM. Your SOM. And most importantly, name the ONE beachhead you'll conquer first. Be specific.'", question: "Define your TAM, SAM, SOM, and your first beachhead customer segment. (4-6 sentences)", type: "open", feedback: "'Now you have a target. Not a wish. A plan. Skill 4 complete. Three left in Ideation.'" }
    ]
  },
  {
    id: 5, title: "The Mission Forge", stage: "Ideation",
    opening: "A single candle is lit. The room is otherwise dark. 'Every great company has a mission that burns brighter than money. My first startup had none. It died. My second had one. It thrived. Let's forge yours.'",
    questions: [
      { story: "'Not a mission statement for investors. A mission for the 3am nights. The rejections. The doubts. Something that pulls you forward when nothing else will.'", question: "What makes a mission statement effective?", type: "mcq", choices: ["It sounds impressive with big words", "It describes what you do AND why it matters", "It fits on a PowerPoint slide"], correct: 1, feedback: { 0: "Fluff. Investors smell fluff from across the room.", 1: "Substance. Why matters more than what.", 2: "Low bar. Aim higher." } },
      { story: "'Tesla's mission isn't make electric cars. It's accelerate the world's transition to sustainable energy. See the difference?'", question: "What makes Tesla's mission powerful?", type: "mcq", choices: ["It mentions a specific product", "It describes a world they want to create", "It promises low prices"], correct: 1, feedback: { 0: "Product-focused. Too narrow.", 1: "World-focused. That's vision.", 2: "Price-focused. That's a sale, not a mission." } },
      { story: "'Write a mission for a tutoring startup. Not we help students with math. Bigger. Bolder.'", question: "Which mission is most compelling?", type: "mcq", choices: ["We are the #1 tutoring platform in Dubai", "We help students get better grades", "We unlock every child's potential, regardless of background"], correct: 2, feedback: { 0: "Arrogant. And irrelevant to meaning.", 1: "True but small. Grades are a means, not an end.", 2: "That's a mission people would die for. Now write yours." } },
      { story: "'My most successful startup had a mission I believed so deeply that I worked 100-hour weeks without noticing. It wasn't work. It was purpose.'", question: "What is the ultimate test of a mission?", type: "mcq", choices: ["It sounds good in a pitch deck", "It makes you want to work on weekends", "It impresses your parents"], correct: 1, feedback: { 0: "Performance. Not reality.", 1: "If it doesn't pull you out of bed on Monday, it's not your mission.", 2: "Parent approval is nice. Not a compass." } },
      { story: "The candle flickers. 'Write your venture's mission. Not for me. For you. When you're failing. When you're winning. When you've forgotten why you started.'", question: "Write your venture's mission statement. What world are you trying to build? Why does it matter? (3-5 sentences)", type: "open", feedback: "'This is your light now. When everything is dark, look at this. Skill 5 complete. You've finished Ideation. Five more stages to go. Don't stop.'" }
    ]
  },
  {
    id: 6, title: "The Founder's Dilemma", stage: "Building",
    opening: "Two contracts slide across the table. 'You found a co-founder. Smart. Hardworking. Your best friend. Now comes the part that destroys friendships.' A pause. 'The equity split.'",
    questions: [
      { story: "'Co-founder conflicts are the #1 killer of early startups. Not competition. Not market. Each other. Define roles before you build a single line of code.'", question: "When should co-founders discuss equity splits?", type: "mcq", choices: ["After the first funding round", "Before writing a single line of code", "When the company starts making money"], correct: 1, feedback: { 0: "Too late. Resentment grows in the silence.", 1: "Correct. Uncomfortable conversations early prevent catastrophes later.", 2: "By then, the damage is done." } },
      { story: "'Your co-founder wants 50/50. It sounds fair. It is almost never smart. Deadlocks kill companies. Someone must be the tiebreaker.'", question: "What is the biggest danger of a 50/50 equity split?", type: "mcq", choices: ["It looks bad to investors", "Deadlock in critical decisions", "Tax complications"], correct: 1, feedback: { 0: "Investors dislike it, but that's secondary.", 1: "Deadlock. Both vote yes to move forward, both vote no to stop. The company freezes.", 2: "Wrong concern." } },
      { story: "'Define roles. CEO. CTO. CMO. Written down. Signed. Not a conversation. A contract. Your friendship depends on it.'", question: "What is the BEST way to define co-founder roles?", type: "mcq", choices: ["Informal agreement over coffee", "Written co-founder agreement with legal signatures", "Decide based on who works harder"], correct: 1, feedback: { 0: "Coffee agreements dissolve under pressure.", 1: "Paper protects partnerships. Always.", 2: "Effort changes. Roles cannot change on a whim." } },
      { story: "'One day, your co-founder will want to quit. If you have no vesting schedule, they walk away with half the company. For nothing.'", question: "What is vesting in co-founder agreements?", type: "mcq", choices: ["A method of splitting profits quarterly", "Equity earned over time based on continued contribution", "A loan from the co-founder to the company"], correct: 1, feedback: { 0: "That's profit sharing. Different concept.", 1: "Exactly. Vesting protects the company if someone leaves early.", 2: "No. Equity is not a loan." } },
      { story: "'Tell me about your co-founder. Real or imagined. What are their strengths? What are yours? How do you complement each other? Where will conflicts arise?'", question: "Describe your ideal co-founder and how your skills complement each other. What roles would each of you own? Where might you clash, and how would you resolve it?", type: "open", feedback: "'Knowing where conflict will come from means you can prepare for it. Most founders are blindsided. You won't be. Skill 6 complete.'" }
    ]
  },
  {
    id: 7, title: "The MVP Sacrifice", stage: "Building",
    opening: "A blank sheet is held up. 'You want to build everything. The full product. Every feature. Perfect.' It gets crumpled. 'Stop. Build the minimum. Ship the minimum. Learn from the minimum.'",
    questions: [
      { story: "'What is an MVP? Don't recite the definition. Tell me what it means for a founder.'", question: "What is the core purpose of an MVP?", type: "mcq", choices: ["Build a full product faster with fewer resources", "Test your riskiest assumptions with the least effort", "Impress investors with a polished prototype"], correct: 1, feedback: { 0: "An MVP isn't a fast full product. It's a learning tool.", 1: "Correct. Kill the assumptions. Keep what survives.", 2: "Investors want traction, not polish." } },
      { story: "'Drew Houston built Dropbox's MVP as a demo video. No actual product. Just a video showing what it would do. 75,000 signups overnight. He validated without building.'", question: "What does Drew's example teach us about MVPs?", type: "mcq", choices: ["Videos are better than actual products", "Validation doesn't always require a built product", "Marketing is more important than engineering"], correct: 1, feedback: { 0: "No. The video was a test, not a strategy.", 1: "Exactly. Validate the demand first. Build second.", 2: "Wrong lesson." } },
      { story: "'You have a list of 50 features you want to build. Cross off 45 of them. The 5 that remain are your MVP. How do you decide which 5?'", question: "What criteria determines which features belong in your MVP?", type: "mcq", choices: ["Features your team enjoys building", "Features that test your core value proposition", "Features your competitors have"], correct: 1, feedback: { 0: "Build what the customer needs, not what you enjoy.", 1: "Right. The MVP must test the one thing that makes your startup exist.", 2: "Copying competitors proves nothing about your value." } },
      { story: "'Every week you don't ship is a week you don't learn. Your competitors are learning. Are you?'", question: "What is the biggest risk of over-engineering your MVP?", type: "mcq", choices: ["Running out of budget", "Missing the market timing and losing learning opportunities", "Confusing your team"], correct: 1, feedback: { 0: "Budget matters but it's secondary.", 1: "Time is the real resource. Every delay is lost learning.", 2: "Team confusion is fixable. Missed market windows are not." } },
      { story: "'Tell me your MVP. What is the absolute minimum version of your product that would prove your idea works? Not what you want to build. What you need to test.'", question: "Describe your MVP in specific terms. What does it do? What does it NOT do? What assumption does it test? How will you know if it worked?", type: "open", feedback: "'Focused. Specific. That is the discipline most founders never develop. Skill 7 complete. You're halfway through Building.'" }
    ]
  },
  {
    id: 8, title: "The Pricing Crossroads", stage: "Building",
    opening: "Three numbers appear on a whiteboard: $0, $9/month, $499/year. 'Pricing is strategy,' a voice says. 'Every number you choose tells your customer something about who you are.'",
    questions: [
      { story: "'Free. Everyone loves free. Except it pays nothing, attracts everyone who values nothing, and is nearly impossible to convert. Use free very carefully.'", question: "What is the biggest risk of a freemium model?", type: "mcq", choices: ["Too many users, overwhelming servers", "Low conversion from free to paid, burning runway", "Competitors copying your free tier"], correct: 1, feedback: { 0: "A nice problem to have, and solvable.", 1: "Correct. Free users rarely convert. You need enough paid to survive.", 2: "Competitors copy anyway. Don't let fear of copying drive pricing." } },
      { story: "'I once had a client charge $5 for their software. I told them to charge $500. Same product. One price signals a hobby. The other signals a business.'", question: "What does premium pricing communicate to enterprise customers?", type: "mcq", choices: ["Greed", "Quality, commitment, and professionalism", "It's out of reach for most buyers"], correct: 1, feedback: { 0: "Wrong frame. Price signals value.", 1: "Exactly. Enterprise buyers distrust cheap. They associate price with risk.", 2: "Premium pricing filters for customers who can afford real results." } },
      { story: "'Subscriptions are the closest thing to a guaranteed salary in business. Predictable revenue lets you plan. Lets you hire. Lets you sleep. But only if churn is low.'", question: "What is churn in a subscription model?", type: "mcq", choices: ["The speed at which new customers sign up", "The percentage of subscribers who cancel each period", "The monthly growth in average revenue per user"], correct: 1, feedback: { 0: "That's acquisition rate.", 1: "Correct. High churn means you're filling a leaky bucket.", 2: "That's ARPU expansion." } },
      { story: "'Value-based pricing. Not cost-plus. Not competitor-match. What is the problem worth to the customer? Price to that. If you save a company $100,000 a year, charge $20,000. They'll pay it.'", question: "What is value-based pricing?", type: "mcq", choices: ["Pricing based on your cost to produce the product", "Pricing based on the value delivered to the customer", "Pricing based on what competitors charge"], correct: 1, feedback: { 0: "Cost-plus leaves enormous money on the table.", 1: "Correct. The customer cares about what they get, not what it costs you.", 2: "Competitor pricing is a floor, not a ceiling." } },
      { story: "'Tell me how you'd price your product. Walk me through your reasoning. What's the value you deliver? What will you charge?'", question: "Choose a pricing model for your venture and justify it. How did you arrive at this number? What value does the customer receive that makes this price fair?", type: "open", feedback: "'You reasoned it. Most founders just guess. Reasoning is the difference between strategy and luck. Skill 8 complete.'" }
    ]
  },
  {
    id: 9, title: "The Legal Labyrinth", stage: "Building",
    opening: "A thick folder drops on the table. 'Lawyers. Contracts. Incorporation. Most founders run from this. That is how they lose everything.' The folder opens. 'Sit down.'",
    questions: [
      { story: "'When do you incorporate? Before customers? After funding? Never?'", question: "When should a startup incorporate as a legal entity?", type: "mcq", choices: ["Only when you raise funding", "Before taking money from anyone or signing contracts", "After reaching profitability"], correct: 1, feedback: { 0: "Too late. Handshake deals create liability before the entity exists.", 1: "Correct. Incorporation creates a legal shield between you and the company.", 2: "Far too late. You'll have created enormous personal liability." } },
      { story: "'Your code. Your brand. Your secret process. Without an IP assignment agreement, your employee or co-founder owns what they built. Not you.'", question: "What protects a startup's intellectual property when employees build it?", type: "mcq", choices: ["Copyright automatically transfers to the employer", "An IP assignment agreement signed by all contributors", "A verbal agreement to transfer ownership"], correct: 1, feedback: { 0: "Not automatically. It depends on jurisdiction and employment type.", 1: "Correct. Written assignment is the only reliable protection.", 2: "Verbal agreements are worth nothing in court." } },
      { story: "'You have a verbal deal with your first big client. No contract. They back out. You've spent three months building for them. What do you have?' A pause. 'Nothing.'", question: "What lesson does this scenario teach about client agreements?", type: "mcq", choices: ["Build trust before contracts", "Always get a written contract before starting work", "Only use contracts for big deals"], correct: 1, feedback: { 0: "Trust and contracts are not opposites. Both matter.", 1: "Correct. No contract, no protection. Period.", 2: "Every deal is a big deal when it's your runway." } },
      { story: "'GDPR in Europe. CCPA in California. If you collect user data without compliance, you face fines that will destroy your startup before it launches.'", question: "What is the minimum compliance requirement when collecting user data?", type: "mcq", choices: ["A terms of service page", "A privacy policy disclosing what data you collect and how", "Only needed after 1,000 users"], correct: 1, feedback: { 0: "Terms of service governs usage, not data privacy.", 1: "Correct. Privacy policy is a legal requirement, not a suggestion.", 2: "Wrong. Day one compliance protects day one." } },
      { story: "'Walk me through the three legal documents every startup must have before acquiring its first customer. Tell me what each protects.'", question: "Name and explain three essential legal documents your startup needs before launch. What does each one protect you from?", type: "open", feedback: "'You won't remember all of this forever. But you'll remember that legal protection exists, and you'll get help when you need it. That's enough. Skill 9 complete.'" }
    ]
  },
  {
    id: 10, title: "The Patent Wall", stage: "Building",
    opening: "A piece of paper is held up. 'This is a patent. One piece of paper. It can be worth nothing. Or it can be worth billions. The difference is what's written on it and when you filed it.'",
    questions: [
      { story: "'First-to-file. In most countries, whoever files the patent first wins. Not the inventor. Not the original creator. The first filer. This is the game you're in.'", question: "In most patent systems, who owns the right to an invention?", type: "mcq", choices: ["The person who invented it first", "The person or company who filed the patent application first", "The person with the most funding"], correct: 1, feedback: { 0: "Not in most jurisdictions. First-to-file dominates globally.", 1: "Correct. File early. File before you publicize.", 2: "Funding is irrelevant to patent rights." } },
      { story: "'Not everything can be patented. Business methods. Software algorithms. Abstract ideas. Many are not patentable. But your specific implementation? Often is.'", question: "What CAN typically be patented?", type: "mcq", choices: ["A general business idea", "A novel, specific, and non-obvious implementation or process", "A company name or brand"], correct: 1, feedback: { 0: "Ideas alone are never patentable.", 1: "Correct. Novelty, specificity, and non-obviousness are the three tests.", 2: "That's trademark territory, not patents." } },
      { story: "'Coca-Cola's formula hasn't been patented in 130 years. Why? Because patents expire. Trade secrets don't. The choice between patent and secrecy is strategic.'", question: "When might a trade secret be better protection than a patent?", type: "mcq", choices: ["When you want government recognition of your invention", "When your process can stay secret and patents would publicly disclose it", "When you plan to license the technology"], correct: 1, feedback: { 0: "Recognition doesn't create competitive advantage.", 1: "Exactly. Patents require public disclosure. Trade secrets don't. Choose wisely.", 2: "Licensing requires a patent. But not every advantage needs licensing." } },
      { story: "'Patent trolls. Companies that own patents but build nothing. They wait for successful startups, then sue. This is the reality of the patent world.'", question: "What is the best early-stage defense against patent trolls?", type: "mcq", choices: ["Avoid building anything novel", "Document invention dates thoroughly and file provisional patents early", "Ignore them — small startups aren't targets"], correct: 1, feedback: { 0: "Then don't be a startup.", 1: "Correct. Documentation creates a paper trail. Provisional patents are cheap insurance.", 2: "Success makes you a target. Prepare before success arrives." } },
      { story: "'Is there anything unique about your product worth protecting? Walk me through your thinking. Do you file a patent? Keep it secret? Or is your moat something else entirely?'", question: "Does your venture have a protectable innovation? Explain your IP strategy — patent, trade secret, or competitive moat — and why you chose that approach.", type: "open", feedback: "'Good. Knowing what to protect is as important as building it. Building stage complete. Skill 10 done.'" }
    ]
  },
  {
    id: 11, title: "The Brand's Voice", stage: "Launch",
    opening: "The lights go off. 'Imagine your brand is a person. They walk into a room. How do people feel? Not what they see. How they feel. That is your brand voice.'",
    questions: [
      { story: "'Nike doesn't sell shoes. They sell the feeling of victory. Apple doesn't sell computers. They sell the feeling of creativity. What feeling does your brand sell?'", question: "What is brand positioning?", type: "mcq", choices: ["The price point at which your product sits in the market", "The emotional space your brand occupies in the customer's mind", "Your company's physical location and reach"], correct: 1, feedback: { 0: "Price is part of positioning but not the whole picture.", 1: "Exactly. Positioning is emotional real estate. Own the feeling.", 2: "Geography is irrelevant to brand positioning." } },
      { story: "'Tone of voice. Formal or casual? Bold or humble? Serious or playful? These are not small decisions. They define every word you publish, every ad you run, every email you send.'", question: "Why does a consistent brand voice matter?", type: "mcq", choices: ["It makes writing easier for the marketing team", "It builds trust and recognition through consistency", "It satisfies regulatory requirements"], correct: 1, feedback: { 0: "Convenience is a side effect, not the purpose.", 1: "Correct. Recognition is trust. Trust is conversion.", 2: "Wrong domain entirely." } },
      { story: "'Your competitor speaks loudly. Lots of exclamation points. AMAZING deals. Meanwhile, you speak quietly. Precisely. Confidently. Who gets remembered?'", question: "In a loud market, what is the most effective brand voice strategy?", type: "mcq", choices: ["Be louder than everyone else", "Be distinct, even if quieter", "Mirror the most successful competitor"], correct: 1, feedback: { 0: "Louder noise is still noise.", 1: "Correct. Contrast creates attention. Quiet confidence is unforgettable.", 2: "Mirroring is forgetting. You must be remembered." } },
      { story: "'A brand without a story is a product. A brand with a story is a movement. Your founding story is your most powerful marketing asset.'", question: "What makes a founder's story compelling?", type: "mcq", choices: ["An impressive resume and credentials", "A specific moment of discovery or frustration that led to the idea", "Endorsements from famous investors"], correct: 1, feedback: { 0: "Credentials validate. They don't inspire.", 1: "Correct. The specific moment makes it human. Human is memorable.", 2: "Borrowed credibility is weak. Your own truth is strong." } },
      { story: "'Write three sentences that define your brand voice. Who are you? What do you believe? How do you speak?'", question: "Write your brand voice statement: Who is your brand as a person? What does it believe in? How does it speak to customers?", type: "open", feedback: "'You have a voice now. Not just a product. A voice people will recognize. Skill 11 complete. You've entered Launch.'" }
    ]
  },
  {
    id: 12, title: "The Marketing Leap", stage: "Launch",
    opening: "A funnel appears on the whiteboard. 'Awareness. Interest. Desire. Action. This is where your money goes. Most founders skip the first three and wonder why no one takes action.'",
    questions: [
      { story: "'Content marketing. Creating value before asking for value. Blog posts. Videos. Podcasts. Guides. You teach the market. They trust you. They buy from you. Not immediately. Eventually.'", question: "What is content marketing's primary goal at the awareness stage?", type: "mcq", choices: ["Generate immediate sales", "Build trust and attract potential customers over time", "Reduce customer service costs"], correct: 1, feedback: { 0: "Content marketing plants seeds. Sales come later.", 1: "Correct. Trust is the product. Sales are the byproduct.", 2: "Wrong metric for marketing." } },
      { story: "'Every marketing channel has a different cost. Organic social: low cost, slow build. Paid ads: fast, expensive. Referrals: free, powerful. SEO: slow, compounding. Choose based on your runway.'", question: "For a seed-stage startup with limited budget, what is the highest-ROI channel?", type: "mcq", choices: ["Television advertising", "Referral programs and word of mouth", "Full-page print ads"], correct: 1, feedback: { 0: "TV reaches millions. But not your specific early customers. Too expensive. Too broad.", 1: "Correct. Word of mouth is trusted, targeted, and free. Optimize for it.", 2: "Print is dying. And you can't track it." } },
      { story: "'I once had a founder spend $200,000 on ads with no product-market fit. They reached millions. Nobody cared. Marketing cannot save a broken product.'", question: "What is the prerequisite for effective marketing?", type: "mcq", choices: ["A large advertising budget", "Product-market fit — a product customers genuinely want", "A famous brand ambassador"], correct: 1, feedback: { 0: "Money amplifies signal. If there's no signal, it amplifies noise.", 1: "Correct. Marketing accelerates the truth. Make sure the truth is good.", 2: "Famous people drive awareness, not adoption." } },
      { story: "'A/B testing. You never know what works until you test. Different headlines. Different images. Different calls-to-action. The market tells you the truth. Don't trust your instincts. Test them.'", question: "What is the purpose of A/B testing in marketing?", type: "mcq", choices: ["To show the team is working hard", "To use data to identify which version performs better", "To satisfy investors with activity"], correct: 1, feedback: { 0: "Effort without measurement is activity, not progress.", 1: "Correct. Data eliminates guessing. Guessing is expensive.", 2: "Investors want results. Not experiments." } },
      { story: "'Build your marketing plan. Not a fantasy. A first-90-days plan. Three channels. Three goals. Three ways you'll measure success.'", question: "Design your 90-day marketing plan. Name 3 channels, 3 specific goals, and 3 metrics you'll track to know if it's working.", type: "open", feedback: "'Specific. Measurable. That is the difference between a plan and a wish. Skill 12 complete.'" }
    ]
  },
  {
    id: 13, title: "The First Hundred", stage: "Launch",
    opening: "A seat at the edge of the desk. 'The first 100 customers are not customers. They are proof. Proof that someone, somewhere, values what you built enough to pay for it.'",
    questions: [
      { story: "'Most founders want to reach everyone. They reach no one. Your first 100 customers will come from a very specific place. A community. A forum. A conference. A DM. Name yours.'", question: "Where are your first 100 customers most likely to come from?", type: "mcq", choices: ["A large social media ad campaign", "A specific community, network, or targeted outreach", "A major news article about your launch"], correct: 1, feedback: { 0: "Ads require product-market fit to be efficient.", 1: "Correct. Specific communities yield the highest-quality early adopters.", 2: "Press can help, but you can't count on or control it." } },
      { story: "'Early adopters are different. They tolerate bugs. They give feedback. They talk about you. They are not normal customers. Treat them differently. Talk to them directly. Know their names.'", question: "What distinguishes an early adopter from a mainstream customer?", type: "mcq", choices: ["They have more money to spend", "They tolerate imperfection and actively want to be part of something new", "They are easier to acquire through ads"], correct: 1, feedback: { 0: "Not necessarily. Early adopters care about the idea, not the price.", 1: "Correct. They are your co-creators. Treat them as partners.", 2: "They're harder to acquire. But worth every conversation." } },
      { story: "'Do things that don't scale. The founders of Airbnb photographed every listing themselves at the start. Stripe manually set up the first clients. Hand-hold your first customers.'", question: "What does 'do things that don't scale' mean for early customer acquisition?", type: "mcq", choices: ["Build systems that can handle millions before launch", "Do manual, high-touch work to get first customers even if you can't automate it yet", "Only pursue customers you can serve at massive scale from day one"], correct: 1, feedback: { 0: "Premature scaling kills startups.", 1: "Exactly. The goal is to learn. Learning requires closeness. Scale later.", 2: "That thinking eliminates 99% of your early customers." } },
      { story: "'Your first 100 customers will tell you something unexpected. They will use your product differently than you imagined. They will value features you didn't prioritize. Listen. Adapt.'", question: "What is the MOST valuable outcome of your first 100 customers beyond revenue?", type: "mcq", choices: ["Brand awareness and press coverage", "Real-world product insights and unexpected use cases", "Proof of concept for investors"], correct: 1, feedback: { 0: "Awareness matters eventually. Insight matters now.", 1: "Correct. The market will teach you more than any research report.", 2: "Proof for investors is secondary. Proof for your product roadmap is primary." } },
      { story: "'Tell me your exact plan to acquire your first 100 customers. Step by step. No generalities. Who will you contact first? What will you say? How will you close them?'", question: "Write your step-by-step plan to acquire your first 100 customers. Be specific about channels, outreach scripts, and follow-up strategy.", type: "open", feedback: "'A plan written is a plan that gets executed. A plan in your head stays in your head. Skill 13 complete.'" }
    ]
  },
  {
    id: 14, title: "The Pitch Gauntlet", stage: "Launch",
    opening: "The lights dim. A single spotlight. 'You have 3 minutes. Convince me. Not with facts. With story. With conviction. With truth. 3 minutes. Go.'",
    questions: [
      { story: "'The best pitches follow a story arc. Not a product demo. Not a feature list. A story. Problem. Solution. Traction. Ask. In that order.'", question: "What is the correct order of a compelling investor pitch?", type: "mcq", choices: ["Team → Product → Market → Financials", "Problem → Solution → Traction → Team → Ask", "Mission → Vision → Revenue → Team"], correct: 1, feedback: { 0: "Team-first works only if you're a celebrity founder.", 1: "Correct. Problem first creates context. Solution without problem is just a product.", 2: "Mission last, after you've earned the right to state it." } },
      { story: "'Investors see 1,000 pitches a year. They fund 10. The ones they fund are the ones they remember 24 hours later. Not the most detailed. The most memorable.'", question: "What makes a pitch memorable?", type: "mcq", choices: ["A comprehensive 50-slide deck", "One compelling story or statistic that reframes how they see the problem", "A detailed 5-year financial model"], correct: 1, feedback: { 0: "Comprehensive decks lose the room.", 1: "Correct. One clear idea, deeply felt, is better than 50 decent ones.", 2: "Models matter in due diligence. Not the pitch." } },
      { story: "'Traction. Even small traction is gold. 100 paid users beats 10,000 free users. Revenue, even $1, beats projections. Show me you've started.'", question: "What type of traction is most compelling to investors?", type: "mcq", choices: ["10,000 social media followers", "100 paying customers and month-over-month revenue growth", "A letter of intent from a potential partner"], correct: 1, feedback: { 0: "Followers are attention. Not revenue.", 1: "Correct. Paid customers validate willingness to pay. That's the only thing that matters.", 2: "Intent without cash is almost meaningless." } },
      { story: "'The ask. Most founders stumble here. They ask for too much with no justification. Or too little. The ask must be specific, justified, and tied to milestones.'", question: "What makes a funding ask credible?", type: "mcq", choices: ["Asking for a round number like $1,000,000", "Tying the amount to specific milestones: $X to reach Y by Z date", "Letting the investor suggest the amount"], correct: 1, feedback: { 0: "Round numbers suggest guessing. Specific numbers suggest planning.", 1: "Correct. Milestone-tied asks show you understand the business.", 2: "You surrender power and signal uncertainty." } },
      { story: "'Now. Pitch me. 3 minutes. In writing. Your company. Your problem. Your solution. Your traction. Your ask. Make me want to write the check.'", question: "Write your 3-minute investor pitch. Include the problem, your solution, any traction you have, your team's unique advantage, and your funding ask with specific milestones.", type: "open", feedback: "'That's a pitch. It has clarity. It has conviction. Polish it. Practice it. Then practice it again. Skill 14 complete.'" }
    ]
  },
  {
    id: 15, title: "The Feedback Loop", stage: "Launch",
    opening: "A stack of negative reviews is handed over. 'Read them. Every word. This is not punishment. This is your product roadmap. The most honest one you'll ever get.'",
    questions: [
      { story: "'Most founders hear feedback and react. They either defend their product or immediately pivot. Both are wrong. First, understand. Then decide.'", question: "What is the correct response to receiving negative customer feedback?", type: "mcq", choices: ["Immediately update the product based on every complaint", "Listen, understand the root cause, then prioritize systematically", "Explain why the customer is wrong"], correct: 1, feedback: { 0: "Reacting to every complaint creates a product that pleases no one.", 1: "Correct. Listen first. Understand second. Act strategically.", 2: "The customer is always partially right. Even when they're wrong about the solution." } },
      { story: "'The difference between feedback and noise is frequency and impact. If one person says it, interesting. If ten say it, important. If your best customers say it, urgent.'", question: "How do you prioritize which feedback to act on?", type: "mcq", choices: ["Act on the most recent feedback", "Prioritize by frequency, customer value, and alignment with your vision", "Let the team vote on what to change"], correct: 1, feedback: { 0: "Recency bias creates a reactive product.", 1: "Correct. Frequency × impact × alignment = priority.", 2: "Teams vote on opinion. Data should vote on direction." } },
      { story: "'The customer interview. Not a survey. Not a form. A conversation. 20 minutes. One customer. No script. Just questions. The insights from one good conversation outweigh 1,000 survey responses.'", question: "What is the most valuable form of customer feedback?", type: "mcq", choices: ["A satisfaction rating out of 10", "A direct, open-ended customer interview", "App store ratings"], correct: 1, feedback: { 0: "Ratings tell you something is wrong. Interviews tell you why.", 1: "Correct. Context is everything. Numbers give you outcomes. Interviews give you causes.", 2: "Public ratings are the end of the feedback chain, not the beginning." } },
      { story: "'The NPS question. On a scale of 1-10, how likely are you to recommend us? It's imperfect. But the follow-up — why? — is worth more than any score.'", question: "What is the MOST valuable part of an NPS survey?", type: "mcq", choices: ["The numerical score", "The follow-up qualitative 'why' response", "The response rate percentage"], correct: 1, feedback: { 0: "The score tells you where you are. The why tells you how to improve.", 1: "Correct. The 'why' is the product roadmap. Mine it ruthlessly.", 2: "Response rate matters for statistical significance. But not for insight." } },
      { story: "'Tell me your feedback system. How will you collect it? How will you analyze it? How will you act on it? How will you close the loop with customers?'", question: "Design your feedback loop system. How do you collect, analyze, prioritize, and act on customer feedback? How do you tell customers what changed because of them?", type: "open", feedback: "'The best products are built with customers, not for them. You understand that now. Skill 15 complete. Three stages down. You're in the second half.'" }
    ]
  },
  {
    id: 16, title: "The Hiring Hunt", stage: "Growth",
    opening: "The expression is tired. 'I did everything myself. For two years. Every email. Every call. Every decision. Then I hired the wrong person. Then the right one. The difference nearly broke me.'",
    questions: [
      { story: "'Your first hire. The most important decision of your company's life after the idea itself. The wrong person will poison the culture. The right person will multiply everything.'", question: "When should a startup hire its first employee?", type: "mcq", choices: ["Immediately, to show investors you're serious", "When you have a specific, urgent need and the revenue to sustain it", "Only after Series A funding"], correct: 1, feedback: { 0: "Hiring for optics creates debt, not value.", 1: "Correct. Every hire must solve a specific, urgent problem.", 2: "Waiting for Series A means doing everything wrong for too long." } },
      { story: "'Culture fit. The real test: will this person challenge the right things and embrace the right values? Not a copy of you. A complement.'", question: "What does 'culture fit' actually mean in a startup context?", type: "mcq", choices: ["They went to the same school as the founders", "They share core values and add skills the team lacks", "They are likeable in an interview"], correct: 1, feedback: { 0: "Homogeneity kills innovation.", 1: "Correct. Culture fit is values alignment, not personality matching.", 2: "Likeable in interviews can mask incompetence for months." } },
      { story: "'I have hired brilliant people with terrible attitudes. They poisoned three teams. I have hired determined, humble people with mediocre skills. They became stars.'", question: "What should you prioritize in an early-stage hire?", type: "mcq", choices: ["Prestigious credentials from top institutions", "Attitude, growth mindset, and alignment with mission", "Years of experience in a specific tool or technology"], correct: 1, feedback: { 0: "Credentials are a proxy, not a guarantee.", 1: "Correct. Skills can be taught. Attitude cannot.", 2: "Tools change. Character doesn't." } },
      { story: "'Delegation. The founder's hardest skill. You built this. It is yours. Letting someone else touch it feels wrong. But you cannot scale alone.'", question: "What is the risk of a founder who cannot delegate?", type: "mcq", choices: ["The company grows too fast", "The founder becomes the bottleneck and limits the company's scale", "Investors lose confidence in the product"], correct: 1, feedback: { 0: "Founders who can't delegate grow slowly, not fast.", 1: "Correct. Every decision that must pass through you is a ceiling on your company.", 2: "Investors lose confidence in the founder. That's worse." } },
      { story: "'Tell me about your first three hires. What roles do they fill? What gap do they solve? What values must they have?'", question: "Describe your first three hires. What roles? What skills? What values? And how will you evaluate whether they are the right fit?", type: "open", feedback: "'You've thought about who, not just what. Most founders only think about what needs to be done. Skill 16 complete.'" }
    ]
  },
  {
    id: 17, title: "The Investor's Table", stage: "Growth",
    opening: "Sitting across from an empty chair. 'That seat is where the investor will sit. They will ask you questions that feel like tests. They are tests. Everything in this room is a test.'",
    questions: [
      { story: "'Valuation. How much is your company worth? Most founders either over-value out of ego or under-value out of desperation. Both are mistakes.'", question: "How is an early-stage startup valuation typically determined?", type: "mcq", choices: ["Based purely on current revenue", "Based on market size, traction, team, and comparable deals", "Whatever the investor offers"], correct: 1, feedback: { 0: "Pre-revenue startups raise millions. Revenue alone doesn't determine value.", 1: "Correct. Valuation is a combination of proof, potential, and negotiation.", 2: "Never accept the first offer without understanding what drives it." } },
      { story: "'Dilution. Every time you raise money, you give away a piece of your company. Too much dilution and you lose control. Too little dilution and you can't raise what you need.'", question: "What does equity dilution mean for a founder?", type: "mcq", choices: ["The company's debt increases", "The founder's ownership percentage decreases with each funding round", "The product loses its original features"], correct: 1, feedback: { 0: "Dilution is about equity, not debt.", 1: "Correct. More investors mean smaller founder slice. Ensure each round is worth the dilution.", 2: "Wrong context entirely." } },
      { story: "'Term sheets. The document the investor sends before the real contract. Liquidation preferences. Anti-dilution. Board control. Read every word.'", question: "What is the most important clause to scrutinize in a term sheet?", type: "mcq", choices: ["The investment amount", "Liquidation preferences and board control terms", "The closing date"], correct: 1, feedback: { 0: "The amount is the obvious part. The terms are the hidden power.", 1: "Correct. Liquidation preferences determine who gets paid first. Board control determines who makes decisions.", 2: "Dates can be negotiated. Terms define the relationship." } },
      { story: "'Not all money is equal. Smart money comes with connections, experience, and doors that open. Choose your investors like partners.'", question: "What distinguishes 'smart money' from regular investment?", type: "mcq", choices: ["A higher investment amount", "Investor expertise, network, and strategic value beyond capital", "Faster payment processing"], correct: 1, feedback: { 0: "Size of check doesn't equal value of investor.", 1: "Correct. The best investors bring network, advice, and credibility. Not just dollars.", 2: "Irrelevant to investment value." } },
      { story: "'You have one chance to tell me why I should invest in your company. What is the return on my investment? What milestones will you hit? Why now?'", question: "Make your investor case. What is the return potential? What will you achieve with the funding? Why is now the right time for this investment?", type: "open", feedback: "'That was an investor conversation, not a product pitch. The difference matters. Skill 17 complete.'" }
    ]
  },
  {
    id: 18, title: "The Expansion Gamble", stage: "Growth",
    opening: "A map spreads across the table. 'You've won your first market. Congratulations. Now the question that has destroyed a hundred companies: when do you expand?'",
    questions: [
      { story: "'Most companies expand too early. They haven't finished winning the first market. They open a second. Both starve. Winning one market completely is always better than half-winning two.'", question: "What is the biggest risk of expanding too early?", type: "mcq", choices: ["The new market won't understand your product", "Dividing resources before the first market is truly won", "Your competitors will copy your expansion strategy"], correct: 1, feedback: { 0: "Market education is a solvable problem.", 1: "Correct. Division before domination is the most common expansion mistake.", 2: "Competitors will copy you regardless." } },
      { story: "'Geographic expansion vs. product expansion. Very different risks. Very different rewards.'", question: "Which expansion type typically has lower execution risk?", type: "mcq", choices: ["New product in a new market", "Existing product in a new geographic market", "Completely new business model"], correct: 1, feedback: { 0: "Two unknowns multiply the risk exponentially.", 1: "Correct. One unknown: the new market. The product is proven. Manage one variable at a time.", 2: "Model changes affect everything. Maximum risk." } },
      { story: "'Localization. Language is the obvious piece. But it goes deeper. Payment methods. Cultural nuances. Local regulations. What works in one country fails in another.'", question: "What is the most overlooked aspect of international expansion?", type: "mcq", choices: ["Language translation", "Cultural, regulatory, and payment localization", "Time zone coordination"], correct: 1, feedback: { 0: "Language is the first step, not the full journey.", 1: "Correct. Surface localization fails. Deep localization wins.", 2: "Time zones are an operational challenge, not an expansion barrier." } },
      { story: "'Before expanding, ask three questions. Have we retained 80% of our first-market customers for six months? Do we have six months of runway after the expansion investment? Is demand in the new market proven or assumed?'", question: "What must be true before a startup should consider expansion?", type: "mcq", choices: ["You've received a press mention in the target country", "You have strong retention in the first market, runway, and validated demand in the new one", "Your competitors have expanded there already"], correct: 1, feedback: { 0: "Press is not product-market fit.", 1: "Correct. Those three conditions are the checklist. Check all three.", 2: "Following competitors into a market is not a strategy." } },
      { story: "'Tell me your expansion plan. Where next? When? Why? And most importantly, how will you know you're ready?'", question: "Outline your expansion strategy. Where will you go next? What signals will tell you the timing is right? What will you do differently in the new market?", type: "open", feedback: "'You've planned the where and the when. Most founders only plan the where. Skill 18 complete.'" }
    ]
  },
  {
    id: 19, title: "The Partnership Web", stage: "Growth",
    opening: "Three chairs appear. 'Strategic partners. They can open doors no amount of money can open. They can also close doors you didn't know existed. Choose carefully.'",
    questions: [
      { story: "'A partnership is a relationship. Without shared incentive, one party will always feel exploited. That party will leave.'", question: "What is the foundation of a successful strategic partnership?", type: "mcq", choices: ["A large payment to secure the deal", "Aligned incentives where both parties benefit clearly", "A famous co-brand name"], correct: 1, feedback: { 0: "Payments secure attention. Alignment secures commitment.", 1: "Correct. Partnerships without mutual benefit are one-sided. They collapse.", 2: "Fame fades. Aligned interest compounds." } },
      { story: "'Exclusivity clauses. Revenue shares. Termination rights. Intellectual property ownership. Most founders ignore these. Then they're surprised when the partnership explodes.'", question: "What is the most dangerous clause in a partnership agreement?", type: "mcq", choices: ["Payment terms", "Exclusivity clauses that lock you into one partner in your category", "Communication protocols"], correct: 1, feedback: { 0: "Payment terms matter but they're negotiable.", 1: "Correct. Exclusivity can prevent you from working with anyone else. It can trap you.", 2: "Communication is operational. Not a legal risk." } },
      { story: "'Integration partnerships. When your product connects with another product. Your users get more value. Their users discover you. Both grow. No money changes hands. Just value.'", question: "What makes a technology integration partnership mutually valuable?", type: "mcq", choices: ["One company pays the other for access", "Both products become more useful because of the integration", "One company gains customers from the other for free"], correct: 1, feedback: { 0: "Payment partnerships are transactional. Value partnerships are compounding.", 1: "Correct. When 1+1=3, both sides commit.", 2: "One-sided benefit creates resentment." } },
      { story: "'Distribution partnerships. They have the customers. You have the product. Make sure you're not entirely dependent on one channel.'", question: "What is the main risk of a distribution-only partnership?", type: "mcq", choices: ["Your product needs too many updates", "Dependency on one channel — if they end the deal, your growth dies", "Legal liability for the partner's sales process"], correct: 1, feedback: { 0: "Updates are a product problem, not a partnership risk.", 1: "Correct. Single-channel dependency is existential risk. Always build alternative channels.", 2: "Contractual protections handle legal liability." } },
      { story: "'Tell me about one strategic partnership your company could pursue. Who is the partner? What do you offer them? What do they offer you?'", question: "Describe one strategic partnership for your venture. Who is the partner, what value do you each bring, and what would the agreement structure look like?", type: "open", feedback: "'You thought about it from both sides. Most founders only think from theirs. That's why their partnerships fail. Skill 19 complete.'" }
    ]
  },
  {
    id: 20, title: "The Numbers Game", stage: "Growth",
    opening: "A spreadsheet opens. 'Numbers don't lie. Founders do. Sometimes to investors. Sometimes to themselves. The spreadsheet always tells the truth. Learn to read it before it's too late.'",
    questions: [
      { story: "'LTV. Lifetime Value. How much revenue does one customer generate over their entire relationship with you? If you don't know this number, you don't know if your business works.'", question: "If a customer pays $50/month and stays for an average of 24 months, what is their LTV?", type: "mcq", choices: ["$50", "$600", "$1,200"], correct: 2, feedback: { 0: "That's one month's revenue.", 1: "That's 12 months. You miscounted.", 2: "Correct. $50 × 24 = $1,200. Now you know what this customer is worth." } },
      { story: "'CAC. Customer Acquisition Cost. If your CAC is higher than your LTV, you are losing money on every customer. This is a death spiral.'", question: "If you spend $10,000 on marketing and acquire 20 customers, what is your CAC?", type: "mcq", choices: ["$200", "$500", "$2,000"], correct: 1, feedback: { 0: "Close. Divide $10,000 by 20.", 1: "Correct. $10,000 / 20 = $500 CAC.", 2: "Off by a factor of 4. Recheck your math." } },
      { story: "'Burn rate. How much cash are you spending each month? Runway: how many months until you run out of money? These two numbers are your heartbeat.'", question: "If you have $300,000 in the bank and spend $30,000 per month, what is your runway?", type: "mcq", choices: ["3 months", "10 months", "30 months"], correct: 1, feedback: { 0: "That would mean $90,000 / $30,000. You have more cash.", 1: "Correct. $300,000 / $30,000 = 10 months of runway.", 2: "That would require $900,000. Count again." } },
      { story: "'Unit economics. Do you make money on each sale? You cannot lose money on every transaction and make it up in volume. This is a fantasy.'", question: "What does 'unit economics' measure?", type: "mcq", choices: ["Total company revenue", "The profitability of a single transaction or customer", "The number of units sold per month"], correct: 1, feedback: { 0: "Total revenue ignores whether each sale is profitable.", 1: "Correct. Unit economics tells you if the business model itself works.", 2: "Volume is separate from unit economics." } },
      { story: "'Calculate the numbers for your venture. Estimate your LTV. Your CAC. Your burn rate. Your runway. Show your work. Tell me if the math works.'", question: "Calculate your startup's unit economics: estimated LTV, CAC, monthly burn rate, and runway. Does the math work? Why or why not?", type: "open", feedback: "'You know your numbers now. Founders who know their numbers make better decisions. Skill 20 complete. Stage 4 done.'" }
    ]
  },
  {
    id: 21, title: "The Border Crossing", stage: "Scale",
    opening: "A world map unrolls. 'Your product works here. Does it work there?' A finger points to the other side of the globe. 'Most founders assume yes. Most are wrong.'",
    questions: [
      { story: "'Uber launched in Southeast Asia. They assumed the product worked globally. It didn't. Payment systems were different. Trust was different. They eventually sold to Grab.'", question: "What mistake did Uber make in Southeast Asia?", type: "mcq", choices: ["They priced too high", "They assumed global product-market fit without local validation", "They hired local drivers too slowly"], correct: 1, feedback: { 0: "Pricing was a factor but not the root cause.", 1: "Correct. Assumption without validation is expensive.", 2: "Driver supply was an operational issue downstream." } },
      { story: "'What works in an individualist market may fail in a collectivist one. What works in a high-trust market may fail where trust must be earned slowly. Culture is not soft. It is your hardest barrier.'", question: "Why does culture matter in international expansion?", type: "mcq", choices: ["Different countries speak different languages", "Cultural values affect how customers discover, evaluate, and trust products", "Different countries have different time zones"], correct: 1, feedback: { 0: "Language is a solvable technical problem.", 1: "Correct. Culture shapes behavior. Behavior determines adoption.", 2: "Operations adapt to time zones. Culture requires product adaptation." } },
      { story: "'GDPR in Europe can fine you 4% of global annual revenue for violations. Entering a new country without understanding its data laws is like swimming in a minefield.'", question: "What is the first legal step before entering a new international market?", type: "mcq", choices: ["Translate your marketing materials", "Review data privacy, business registration, and consumer protection laws", "Open a local bank account"], correct: 1, feedback: { 0: "Translation comes after legal compliance.", 1: "Correct. Legal research is the non-negotiable first step.", 2: "Banking is operational. Legal is strategic." } },
      { story: "'Going direct gives you control. Local partners give you speed and trust. Most founders try direct. Most fail. A local partner who understands the market is worth more than any playbook.'", question: "What advantage does a local partner provide in international expansion?", type: "mcq", choices: ["They reduce your equity stake", "They provide existing trust, networks, and market knowledge", "They eliminate all cultural challenges"], correct: 1, feedback: { 0: "Partners don't take equity unless they're co-founders.", 1: "Correct. Trust earned over years cannot be bought. A local partner brings it.", 2: "They reduce challenges but cannot eliminate them." } },
      { story: "'Tell me which country you would enter first. Why? What do you know about it? What do you need to learn? How will you enter?'", question: "Choose your first international market. Explain why you chose it, what you know about the local customer, the legal requirements, and your entry strategy.", type: "open", feedback: "'You've crossed the border on paper. Now cross it in reality. Skill 21 complete.'" }
    ]
  },
  {
    id: 22, title: "The Acquisition Offer", stage: "Scale",
    opening: "An envelope slides across the table. Inside: a letter of intent. An acquisition offer. More money than you've ever imagined. 'Congratulations,' comes flatly. 'Now the hardest decision of your life begins.'",
    questions: [
      { story: "'Most founders either jump at the first offer out of fear or reject every offer out of ego. Both cost them dearly. Evaluate with your head, not your emotions.'", question: "What is the correct first response to an acquisition offer?", type: "mcq", choices: ["Accept immediately before they change their mind", "Evaluate objectively: what is the strategic value and what are you giving up?", "Reject it — real founders never sell"], correct: 1, feedback: { 0: "Urgency is a negotiation tactic. Don't let it work.", 1: "Correct. Emotion kills deal evaluation. Strategy must lead.", 2: "Idealism without analysis is expensive." } },
      { story: "'Earnouts. Part of the acquisition price paid later based on performance targets. Sounds good. Often a trap. If the acquirer controls the company, they can manipulate the conditions and deny your earnout.'", question: "What is the main risk of an earnout structure in an acquisition?", type: "mcq", choices: ["You have to keep working for the acquirer", "The acquirer can influence outcomes to deny your deferred payment", "The payment is taxed at a higher rate"], correct: 1, feedback: { 0: "That's a lifestyle consideration, not a financial risk.", 1: "Correct. Earnouts are often broken promises wrapped in legal language.", 2: "Tax is real but secondary to the structural risk." } },
      { story: "'If you sell: your team gets paid. Your investors get returns. You get freedom to start again. If you stay: you keep building. But you carry the weight alone.'", question: "What factors should most influence a sell vs. stay decision?", type: "mcq", choices: ["What your investors want", "Your personal vision, the company's growth trajectory, and the acquirer's strategic intent", "What your competitor did in a similar situation"], correct: 1, feedback: { 0: "Investors want returns. Their interest is important but not the deciding factor.", 1: "Correct. The decision must be grounded in your vision for the company's future.", 2: "Comparables inform but cannot decide." } },
      { story: "'Are they buying your product? Your team? Your customers? Your technology? Or just eliminating a competitor? Each motive determines what happens to your people after the deal closes.'", question: "Why does an acquirer's motive matter for your team?", type: "mcq", choices: ["It affects your negotiation leverage", "It determines whether your team will be kept, integrated, or eliminated post-acquisition", "It has no effect on operations"], correct: 1, feedback: { 0: "Motive affects leverage, but more importantly it affects your people.", 1: "Correct. Acqui-hires keep teams. Technology purchases often don't.", 2: "Motive shapes everything post-close." } },
      { story: "'You have the offer in front of you. What do you decide? Why? Walk me through your thought process.'", question: "Would you sell your company? Walk through your complete reasoning — the factors that matter, the trade-offs you'd accept, and the decision you'd make.", type: "open", feedback: "'The right answer is the one you can defend in 10 years. To yourself, not to others. Skill 22 complete.'" }
    ]
  },
  {
    id: 23, title: "The Crisis Hour", stage: "Scale",
    opening: "A phone lights up with headlines. 'Your product just failed publicly. Millions of users affected. Media is writing the story. What do you do in the next 60 minutes?'",
    questions: [
      { story: "'Silence is the worst response to a crisis. Every minute you say nothing, someone else tells the story. And they won't tell it the way you want.'", question: "What is the most dangerous mistake in a PR crisis?", type: "mcq", choices: ["Issuing a statement too quickly", "Saying nothing and waiting until you have all the information", "Communicating before the legal team approves"], correct: 1, feedback: { 0: "A fast, honest statement is almost always better than silence.", 1: "Correct. Silence creates a vacuum. Bad actors fill it.", 2: "Legal delays destroy brands. Speed and honesty matter more." } },
      { story: "'Ownership. Two words: we failed. Not the algorithm. Not the team. We failed. Ownership is not weakness. It is leadership. Customers forgive owned mistakes. They never forgive excuses.'", question: "What is the correct tone for a crisis response statement?", type: "mcq", choices: ["Explain technical reasons for the failure in detail", "Own the mistake fully, apologize sincerely, and state what you're doing to fix it", "Minimize the severity so customers don't panic"], correct: 1, feedback: { 0: "Technical explanations feel like excuses.", 1: "Correct. Own, apologize, act. In that order.", 2: "Minimizing erodes trust permanently." } },
      { story: "'Root cause analysis. The crisis is handled. Now ask: why did this happen? Not the surface cause. The root cause. Five Whys. Because if you don't fix the root, it happens again.'", question: "What is the purpose of a post-crisis root cause analysis?", type: "mcq", choices: ["To assign blame to team members", "To identify and fix the underlying cause so the crisis doesn't repeat", "To produce a document for investors"], correct: 1, feedback: { 0: "Blame is backward-looking. Root cause is forward-looking.", 1: "Correct. The crisis teaches you something. Learn it.", 2: "The document is a byproduct. The learning is the product." } },
      { story: "'During a crisis, over-communicate. Every hour, if necessary. Tell them what you know. Tell them what you don't know. Tell them what you're doing. Silence breeds speculation.'", question: "How often should you communicate with affected customers during an active crisis?", type: "mcq", choices: ["Only once, with a final resolution statement", "Frequently, with updates even when you have no new information", "Only through lawyers to avoid legal liability"], correct: 1, feedback: { 0: "One statement leaves too many hours of uncertainty.", 1: "Correct. 'We're still working on it and here's what we know' is a valid update.", 2: "Lawyer-filtered communication sounds like a cover-up." } },
      { story: "'Write your crisis response. Your public statement. Your internal communication to the team. And your 48-hour action plan.'", question: "Write a crisis response plan: a public statement acknowledging the issue, an internal message to your team, and your 48-hour action plan to resolve it.", type: "open", feedback: "'You didn't panic. You led. That's the difference between founders who survive crises and those who become them. Skill 23 complete.'" }
    ]
  },
  {
    id: 24, title: "The Sustainability Pledge", stage: "Scale",
    opening: "The revenue chart gets turned off. 'Numbers go up. I've seen it a thousand times. Then they go to zero. Because the founders never asked: does this last? Should this last?'",
    questions: [
      { story: "'ESG. Environmental. Social. Governance. Once a checkbox for large corporations. Now a filter for the best investors, employees, and customers. Sustainability is not just ethics. It is strategy.'", question: "Why has ESG become strategically important for startups?", type: "mcq", choices: ["Governments require it for all companies", "Investors, employees, and customers increasingly choose companies with strong ESG practices", "It reduces your corporate tax rate"], correct: 1, feedback: { 0: "Not universally required for startups yet.", 1: "Correct. The best talent and capital now has sustainable options. They choose them.", 2: "Tax benefits are jurisdiction-specific and secondary." } },
      { story: "'Your product may be clean. Your suppliers may not be. If your supplier uses child labor and a journalist finds out, it becomes your crisis. Know your supply chain end to end.'", question: "Why is supply chain transparency important for sustainable business?", type: "mcq", choices: ["To negotiate better prices", "Because ethical issues upstream become your brand's crisis downstream", "To improve delivery times"], correct: 1, feedback: { 0: "Transparency serves ethics more than economics.", 1: "Correct. Your brand is accountable for your suppliers. Full stop.", 2: "Logistics is a side benefit." } },
      { story: "'Quarterly results are the enemy of great companies. Amazon didn't profit for 9 years. Jeff Bezos promised investors a long-term mindset. Then he delivered.'", question: "What does long-term thinking require from a founder?", type: "mcq", choices: ["Ignoring short-term results entirely", "Balancing short-term survival with decisions that compound over years", "Avoiding all investor pressure"], correct: 1, feedback: { 0: "Short-term survival is prerequisite to long-term vision.", 1: "Correct. Long-term thinking lives alongside short-term discipline.", 2: "Investor pressure is real. Managing it is the skill." } },
      { story: "'Purpose vs. profit. False choice. The most sustainable companies have both. Purpose attracts the right customers and team. Profit funds the mission. Sacrificing one for the other is suicide.'", question: "How should a founder think about the relationship between purpose and profit?", type: "mcq", choices: ["Purpose is a luxury once profitability is achieved", "Purpose and profit are complementary — purpose drives long-term profit", "Profit must always come first in business decisions"], correct: 1, feedback: { 0: "Waiting for profit to pursue purpose usually means purpose never arrives.", 1: "Correct. Companies with genuine purpose attract compounding advantages.", 2: "Purpose-driven decisions often produce the most durable profits." } },
      { story: "'What does your company stand for beyond the product? What impact do you want to leave on the world, the community, the environment? Write your commitment.'", question: "Write your sustainability commitment. What environmental, social, and governance pledges does your company make? How will you hold yourself accountable?", type: "open", feedback: "'You've committed to something bigger than the product. That's the difference between building a company and building a legacy. Skill 24 complete.'" }
    ]
  },
  {
    id: 25, title: "The Exit Door", stage: "Scale",
    opening: "A long look out the window. Then: 'You've built something. Real. Now comes the question that every founder eventually faces: what happens at the end?'",
    questions: [
      { story: "'Three exits. IPO: go public, face quarterly scrutiny forever, but unlock enormous capital and liquidity. Acquisition: sell to a strategic buyer, take the capital, lose the control. Bootstrap forever: grow on revenue alone, remain independent.'", question: "What is the primary trade-off of an IPO compared to staying private?", type: "mcq", choices: ["IPOs always result in lower company valuations", "IPOs provide capital and liquidity but require quarterly reporting and public scrutiny", "IPOs eliminate the founder's role in the company"], correct: 1, feedback: { 0: "IPOs can dramatically increase valuations.", 1: "Correct. Public markets are a powerful but demanding partner.", 2: "Many founders remain CEO post-IPO." } },
      { story: "'Legacy. What do you want to be remembered for? Not your revenue. Not your valuation. What did you change? Who did you help? What would not exist without you?'", question: "What defines a founder's legacy?", type: "mcq", choices: ["The final sale price of the company", "The lasting change created in their industry, community, or customer's lives", "The number of press articles written about them"], correct: 1, feedback: { 0: "Sale price is the scoreboard. Impact is the game.", 1: "Correct. Legacy is what remains after the money is spent.", 2: "Press is attention, not legacy." } },
      { story: "'The team. When you exit, what happens to them? The people who believed in you when no one else did. They deserve to be part of the answer to this question.'", question: "Why should a founder consider their team when planning an exit?", type: "mcq", choices: ["Legal obligations require it in some jurisdictions", "The team took a risk on the vision and their outcomes are part of the founder's responsibility", "Investors require team retention clauses"], correct: 1, feedback: { 0: "Legal obligation is the floor. Moral responsibility is the ceiling.", 1: "Correct. You asked them to bet on you. Honor that when the bet pays off.", 2: "Investor requirements are separate from moral leadership." } },
      { story: "'Every exit is a beginning. Some founders rest. Some invest. Some build again. The ones who build again say the same thing: I know how to do it better now.'", question: "What is the most valuable asset a founder takes from a completed venture?", type: "mcq", choices: ["The financial return", "The accumulated knowledge, relationships, and judgment that cannot be taught", "The brand recognition"], correct: 1, feedback: { 0: "Money is renewable. Wisdom is multiplicative.", 1: "Correct. The next venture builds on the foundation of the last. That's why serial founders succeed faster.", 2: "Brand is tied to the company. Knowledge travels with you." } },
      { story: "'You've completed the Founder's Path. Twenty-five skills. Twenty-five stories. One last question. The most important one.'", question: "You've completed all 25 stages. Write your final reflection: What kind of founder do you want to be remembered as? What did this journey teach you about yourself? What will you do differently because of what you learned here?", type: "open", feedback: "'You've walked the full path. Not everyone does. Most quit at Stage 1. Some at Stage 10. You went all the way. The world doesn't need more products. It needs more founders who understand why they're building. Go. Build something that matters. The path was the preparation. The journey starts now.'" }
    ]
  }
];

/* ═══════════════════════════════════════════════════
   LOCALSTORAGE HELPERS
   ═══════════════════════════════════════════════════ */

function getData() {
  try {
    const raw = localStorage.getItem('founderPathData');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveData(data) {
  localStorage.setItem('founderPathData', JSON.stringify(data));
}

function initData() {
  const existing = getData();
  if (!existing) {
    const fresh = { completedSkills: [], skillAnswers: {}, journalEntries: [], totalSkillsCompleted: 0, venture: null };
    saveData(fresh);
    return fresh;
  }
  return existing;
}

/* ═══════════════════════════════════════════════════
   PARTICLE SYSTEM
   ═══════════════════════════════════════════════════ */

(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = document.getElementById('landing-page')?.offsetHeight || window.innerHeight * 3;
  }

  function spawnParticle() {
    return { x: Math.random() * W, y: H + 10, vx: (Math.random() - 0.5) * 0.5, vy: -(Math.random() * 0.6 + 0.2), size: Math.random() * 2.5 + 0.5, alpha: Math.random() * 0.5 + 0.1, life: 0, maxLife: Math.random() * 400 + 200, hue: Math.random() > 0.7 ? 46 : 220 };
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    while (particles.length < 120) particles.push(spawnParticle());
    particles = particles.filter(p => {
      p.x += p.vx + Math.sin(p.life * 0.02) * 0.3;
      p.y += p.vy;
      p.life++;
      const progress = p.life / p.maxLife;
      const fadeIn = Math.min(progress * 10, 1);
      const fadeOut = Math.max(0, 1 - Math.pow((progress - 0.7) / 0.3, 2));
      const alpha = p.alpha * fadeIn * fadeOut;
      if (alpha <= 0) return false;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${alpha})`;
      ctx.fill();
      return p.life < p.maxLife && p.y > -20;
    });
    requestAnimationFrame(tick);
  }
  resize();
  window.addEventListener('resize', resize);
  tick();
})();

/* ═══════════════════════════════════════════════════
   LANDING ANIMATIONS
   ═══════════════════════════════════════════════════ */

function initLandingAnimations() {
  document.querySelectorAll('.animate-up').forEach(el => el.classList.add('visible'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        if (e.target.classList.contains('stats-belt')) animateStatCounters();
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(r => io.observe(r));

  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
      const scrolled = window.pageYOffset;
      hero.style.transform = `translateY(${scrolled * 0.22}px)`;
      hero.style.opacity = Math.max(0, 1 - scrolled / 500);
    }
  });

  /* ─── Cursor glow + hero parallax ─── */
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);
  let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  let tx = cx, ty = cy;

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    const landing = document.getElementById('landing-page');
    if (!landing || landing.classList.contains('hidden')) return;
    const xp = (e.clientX / window.innerWidth - 0.5);
    const yp = (e.clientY / window.innerHeight - 0.5);
    const heroTitle = document.querySelector('.hero-title');
    const heroSub = document.querySelector('.hero-sub');
    const heroEye = document.querySelector('.hero-eyebrow');
    if (heroTitle) heroTitle.style.transform = `translateX(${xp * 22}px) translateY(${yp * 10}px)`;
    if (heroSub) heroSub.style.transform = `translateX(${xp * 12}px) translateY(${yp * 6}px)`;
    if (heroEye) heroEye.style.transform = `translateX(${xp * 7}px)`;
  });

  (function glowLoop() {
    cx += (tx - cx) * 0.055;
    cy += (ty - cy) * 0.055;
    const landing = document.getElementById('landing-page');
    glow.style.display = (!landing || landing.classList.contains('hidden')) ? 'none' : 'block';
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(glowLoop);
  })();

  /* ─── Magnetic buttons ─── */
  function applyMagnetism() {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
      if (btn._magnetBound) return;
      btn._magnetBound = true;
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.22;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }
  applyMagnetism();
  setInterval(applyMagnetism, 1200);

  /* ─── Card tilt on cursor proximity ─── */
  document.addEventListener('mousemove', e => {
    const landing = document.getElementById('landing-page');
    if (!landing || landing.classList.contains('hidden')) return;
    document.querySelectorAll('.stage-card, .plarge-card, .ai-prev-card').forEach(card => {
      const r = card.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 320;
      if (dist < maxDist) {
        const s = (1 - dist / maxDist) * 9;
        card.style.transform = `perspective(900px) rotateX(${(-dy / maxDist) * s}deg) rotateY(${(dx / maxDist) * s}deg) translateY(-5px)`;
        card.style.transition = 'transform 0.05s ease';
      } else {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease';
      }
    });
  });
}

let countersAnimated = false;
function animateStatCounters() {
  if (countersAnimated) return;
  countersAnimated = true;
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ═══════════════════════════════════════════════════
   APP INIT
   ═══════════════════════════════════════════════════ */

window.addEventListener('DOMContentLoaded', () => {
  const data = initData();
  initLandingAnimations();
  if (data.venture) showHQ();
});

/* ═══════════════════════════════════════════════════
   FORM GATE
   ═══════════════════════════════════════════════════ */

function handleStartFounding() {
  const formDone = localStorage.getItem('fpFormDone') === 'true';
  const data = getData();

  if (formDone || (data && data.venture)) {
    if (data && data.venture) { showHQ(); }
    else { showVentureModal(); }
    return;
  }

  document.getElementById('form-gate-modal').classList.remove('hidden');
}

function openFormInNewTab() {
  window.open(GOOGLE_FORM_URL, '_blank');
  const btn = document.getElementById('open-form-btn');
  btn.textContent = 'Form opened ✓ — come back here when done';
  btn.disabled = true;
  btn.style.opacity = '0.6';
  document.getElementById('form-done-btn').style.display = 'block';
}

function continueAfterForm() {
  localStorage.setItem('fpFormDone', 'true');
  document.getElementById('form-gate-modal').classList.add('hidden');
  const data = getData();
  if (data && data.venture) { showHQ(); } else { showVentureModal(); }
}

function skipFormGate(e) {
  e.preventDefault();
  document.getElementById('form-gate-modal').classList.add('hidden');
  const data = getData();
  if (data && data.venture) { showHQ(); } else { showVentureModal(); }
}

/* ═══════════════════════════════════════════════════
   VENTURE MODAL
   ═══════════════════════════════════════════════════ */

function showVentureModal() {
  document.getElementById('venture-modal').classList.remove('hidden');
}

function submitVenture() {
  const name = document.getElementById('venture-name').value.trim();
  const desc = document.getElementById('venture-desc').value.trim();
  if (!name) { document.getElementById('venture-name').focus(); return; }
  _saveVenture(name, desc);
}

function skipVenture(e) {
  e.preventDefault();
  _saveVenture('The Unnamed Venture', 'A founder with a dream waiting to be defined.');
}

function _saveVenture(name, desc) {
  const data = getData();
  data.venture = { name, description: desc || 'A founder with a dream waiting to be defined.', createdAt: new Date().toISOString() };
  saveData(data);
  document.getElementById('venture-modal').classList.add('hidden');
  showHQ();
}

function openEditVentureModal() {
  const data = getData();
  document.getElementById('venture-name').value = data.venture?.name || '';
  document.getElementById('venture-desc').value = data.venture?.description || '';
  document.getElementById('venture-modal').classList.remove('hidden');
}

/* ═══════════════════════════════════════════════════
   HEADQUARTERS
   ═══════════════════════════════════════════════════ */

function showHQ() {
  const landing = document.getElementById('landing-page');
  const hq = document.getElementById('headquarters');
  landing.style.transition = 'opacity 0.7s ease';
  landing.style.opacity = '0';
  setTimeout(() => {
    landing.classList.add('hidden');
    hq.classList.remove('hidden');
    hq.style.opacity = '0';
    hq.style.transition = 'opacity 0.7s ease';
    requestAnimationFrame(() => { hq.style.opacity = '1'; });
    populateHQ();
  }, 700);
}

function populateHQ() {
  const data = getData();
  const venture = data.venture || {};
  document.getElementById('hq-greeting-text').textContent = `Hello, ${venture.name || 'Founder'}.`;
  document.getElementById('hq-greeting-desc').textContent = venture.description || '';
  document.getElementById('nav-venture-name').textContent = `${venture.name || 'Unnamed'} ✏️`;
  updateProgressBar(data);
  renderSkillsGrid(data);
  if (sessionStorage.getItem(AI_DOWN_KEY) === '1') hideAITools();
}

function updateProgressBar(data) {
  const d = data || getData();
  const completed = d.completedSkills.length;
  const pct = Math.round((completed / 25) * 100);
  document.getElementById('progress-text').textContent = `${completed}/25 Skills Completed`;
  document.getElementById('progress-pct').textContent = `${pct}%`;
  document.getElementById('progress-fill').style.width = `${pct}%`;
}

function renderSkillsGrid(data) {
  const d = data || getData();
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = '';
  SKILLS_DATA.forEach(skill => {
    const completed = d.completedSkills.includes(skill.id);
    const inProgress = !completed && d.skillAnswers[skill.id];
    const stageLower = skill.stage.toLowerCase();
    const card = document.createElement('div');
    card.className = `skill-card${completed ? ' completed' : ''}`;
    let statusText = 'Not Started', btnText = 'Begin Story';
    if (completed) { statusText = '✓ Completed'; btnText = 'Review'; }
    else if (inProgress) { statusText = 'In Progress'; btnText = 'Continue'; }
    card.innerHTML = `
      <span class="skill-num">SKILL ${String(skill.id).padStart(2,'0')}</span>
      <div class="skill-name">${skill.title}</div>
      <span class="skill-stage-badge ${stageLower}">${skill.stage}</span>
      <div class="skill-status ${completed ? 'done' : ''}">${statusText}</div>
      <button class="skill-action-btn" onclick="openSkill(${skill.id})">${btnText}</button>
    `;
    grid.appendChild(card);
  });
  const cards = grid.querySelectorAll('.skill-card');
  cards.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(20px)';
    c.style.transition = `opacity 0.4s ease ${i * 0.025}s, transform 0.4s ease ${i * 0.025}s`;
    setTimeout(() => { c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, 60 + i * 25);
  });
}

/* ═══════════════════════════════════════════════════
   STORY ENGINE
   ═══════════════════════════════════════════════════ */

let currentSkill = null;
let currentQIndex = 0;
let isReadOnly = false;

function openSkill(skillId) {
  const skill = SKILLS_DATA.find(s => s.id === skillId);
  if (!skill) return;
  const data = getData();
  currentSkill = skill;
  currentQIndex = 0;
  isReadOnly = data.completedSkills.includes(skillId);
  const modal = document.getElementById('story-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (isReadOnly) {
    renderReviewMode(skill, data);
  } else {
    const saved = data.skillAnswers[skillId];
    const hasProgress = saved && Object.keys(saved).length > 0;
    if (hasProgress) {
      currentQIndex = Math.min(Object.keys(saved).length, skill.questions.length - 1);
      renderStoryShell();
      renderQuestion();
    } else {
      renderOpeningScreen();
    }
  }
}

function renderOpeningScreen() {
  const box = document.querySelector('.story-modal-box');
  box.innerHTML = `
    <div class="grain"></div>
    <button class="story-close" onclick="closeStoryModal()">✕</button>
    <div class="opening-screen">
      <div class="opening-eyebrow">SKILL ${String(currentSkill.id).padStart(2,'0')} · ${currentSkill.stage.toUpperCase()}</div>
      <h2 class="opening-skill-title">${currentSkill.title}</h2>
      <div class="opening-divider"></div>
      <p class="opening-narrative">${currentSkill.opening}</p>
      <button class="btn-primary opening-begin-btn" onclick="beginSkill()">Begin the Story →</button>
    </div>
  `;
}

function beginSkill() {
  currentQIndex = 0;
  renderStoryShell();
  renderQuestion();
}

function renderStoryShell() {
  const box = document.querySelector('.story-modal-box');
  box.innerHTML = `
    <div class="grain"></div>
    <button class="story-close" onclick="closeStoryModal()">✕</button>
    <div class="story-header">
      <div class="story-skill-num" id="story-skill-num">SKILL ${String(currentSkill.id).padStart(2,'0')}</div>
      <h2 class="story-skill-title" id="story-skill-title">${currentSkill.title}</h2>
      <div class="story-divider"></div>
      <div class="story-progress-indicator" id="story-q-indicator">Question 1 of 5</div>
    </div>
    <div class="story-body">
      <div class="story-narrative-block" id="story-text"></div>
      <div class="story-question" id="story-question"></div>
      <div class="story-answers" id="story-answers"></div>
      <div class="story-feedback hidden" id="story-feedback">
        <div class="khan-label">— Mr. Khan —</div>
        <p id="feedback-text"></p>
      </div>
      <div class="story-actions">
        <button class="btn-primary hidden" id="btn-next" onclick="nextQuestion()">Next →</button>
        <button class="btn-primary hidden" id="btn-complete" onclick="completeSkill()">Complete Skill ✓</button>
      </div>
    </div>
  `;
}

function renderQuestion() {
  const q = currentSkill.questions[currentQIndex];
  const total = currentSkill.questions.length;
  document.getElementById('story-q-indicator').textContent = `Question ${currentQIndex + 1} of ${total}`;
  const storyEl = document.getElementById('story-text');
  storyEl.innerHTML = `<div class="story-narrative-label">— Mr. Khan —</div><div class="story-narrative-text">${q.story}</div>`;
  document.getElementById('story-question').textContent = q.question;
  const answersDiv = document.getElementById('story-answers');
  answersDiv.innerHTML = '';
  document.getElementById('story-feedback').classList.add('hidden');
  document.getElementById('btn-next').classList.add('hidden');
  document.getElementById('btn-complete').classList.add('hidden');
  if (q.type === 'mcq') {
    q.choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = choice;
      btn.onclick = () => handleMCQ(idx, btn);
      answersDiv.appendChild(btn);
    });
  } else {
    const ta = document.createElement('textarea');
    ta.className = 'story-open-textarea';
    ta.placeholder = 'Write your answer here...';
    ta.id = 'open-answer-input';
    answersDiv.appendChild(ta);
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn-primary';
    submitBtn.textContent = 'Submit Answer';
    submitBtn.onclick = () => handleOpen();
    answersDiv.appendChild(submitBtn);
  }
}

function handleMCQ(selectedIdx, btn) {
  const q = currentSkill.questions[currentQIndex];
  const allBtns = document.querySelectorAll('.answer-btn');
  allBtns.forEach(b => { b.disabled = true; b.classList.remove('selected'); });
  btn.classList.add('selected');
  const isCorrect = selectedIdx === q.correct;
  if (isCorrect) btn.classList.add('correct');
  else { btn.classList.add('wrong'); allBtns[q.correct].classList.add('correct'); }
  saveAnswer(selectedIdx, q.choices[selectedIdx]);
  showFeedback(q.feedback[selectedIdx]);
  showNextButton();
}

function handleOpen() {
  const ta = document.getElementById('open-answer-input');
  const answer = ta ? ta.value.trim() : '';
  if (!answer) { ta.focus(); ta.style.borderColor = '#ef4444'; return; }
  ta.disabled = true;
  document.querySelectorAll('.story-answers button').forEach(b => b.disabled = true);
  saveAnswer('open', answer);
  showFeedback(currentSkill.questions[currentQIndex].feedback);
  showNextButton();
}

function showFeedback(text) {
  document.getElementById('feedback-text').textContent = text;
  document.getElementById('story-feedback').classList.remove('hidden');
}

function showNextButton() {
  const isLast = currentQIndex === currentSkill.questions.length - 1;
  if (isLast) document.getElementById('btn-complete').classList.remove('hidden');
  else document.getElementById('btn-next').classList.remove('hidden');
}

function nextQuestion() {
  currentQIndex++;
  renderQuestion();
  document.querySelector('.story-modal-box').scrollTo({ top: 0, behavior: 'smooth' });
}

function saveAnswer(indexOrKey, value) {
  const data = getData();
  if (!data.skillAnswers[currentSkill.id]) data.skillAnswers[currentSkill.id] = {};
  data.skillAnswers[currentSkill.id][`q${currentQIndex + 1}`] = {
    answer: value,
    answerText: typeof indexOrKey === 'number' ? currentSkill.questions[currentQIndex].choices[indexOrKey] : value,
    timestamp: Date.now()
  };
  saveData(data);
}

function completeSkill() {
  const data = getData();
  if (!data.completedSkills.includes(currentSkill.id)) {
    data.completedSkills.push(currentSkill.id);
    data.totalSkillsCompleted = data.completedSkills.length;
    currentSkill.questions.forEach((q, i) => {
      if (q.type === 'open') {
        const ans = data.skillAnswers[currentSkill.id]?.[`q${i + 1}`];
        if (ans) data.journalEntries.push({ skillId: currentSkill.id, skillTitle: currentSkill.title, question: q.question, answer: ans.answerText || ans.answer, timestamp: Date.now() });
      }
    });
    saveData(data);
  }
  const remaining = 25 - data.completedSkills.length;
  const box = document.querySelector('.story-modal-box');
  box.innerHTML = `
    <div class="grain"></div>
    <div class="skill-complete-screen">
      <div class="complete-icon">✦</div>
      <div class="complete-title">Skill ${currentSkill.id} Complete.</div>
      <p class="complete-quote">${currentSkill.id} down. ${remaining} to go. Keep moving.</p>
      <button class="btn-primary" onclick="closeStoryModal()">Return to Headquarters</button>
    </div>
  `;
  updateProgressBar(data);
  renderSkillsGrid(data);
}

function renderReviewMode(skill, data) {
  const saved = data.skillAnswers[skill.id] || {};
  const box = document.querySelector('.story-modal-box');
  box.innerHTML = `
    <div class="grain"></div>
    <button class="story-close" onclick="closeStoryModal()">✕</button>
    <div class="story-header">
      <div class="story-skill-num">SKILL ${String(skill.id).padStart(2,'0')} — COMPLETED</div>
      <h2 class="story-skill-title">${skill.title}</h2>
      <div class="story-divider"></div>
    </div>
    <div style="margin-bottom:24px;">
      ${skill.questions.map((q, i) => {
        const a = saved[`q${i+1}`];
        const ansText = a?.answerText || a?.answer || '—';
        return `<div class="market-quarter" style="margin-bottom:16px;"><div class="q-label">Question ${i+1}</div><p style="color:var(--white);margin-bottom:6px;">${q.question}</p><p style="color:var(--gold);font-size:0.88rem;">Your answer: ${ansText}</p></div>`;
      }).join('')}
    </div>
    <button class="btn-secondary" onclick="replaySkill(${skill.id})">↺ Replay Skill</button>
  `;
}

function replaySkill(skillId) {
  const data = getData();
  data.completedSkills = data.completedSkills.filter(id => id !== skillId);
  data.totalSkillsCompleted = data.completedSkills.length;
  data.skillAnswers[skillId] = {};
  data.journalEntries = data.journalEntries.filter(e => e.skillId !== skillId);
  saveData(data);
  updateProgressBar(data);
  renderSkillsGrid(data);
  closeStoryModal();
}

function closeStoryModal() {
  document.getElementById('story-modal').classList.add('hidden');
  document.body.style.overflow = '';
  currentSkill = null;
}

/* ═══════════════════════════════════════════════════
   AI TOOLS
   ═══════════════════════════════════════════════════ */

function openAITool(toolId) {
  if (sessionStorage.getItem(AI_DOWN_KEY) === '1') { hideAITools(); return; }
  const modal = document.getElementById('ai-modal');
  const content = document.getElementById('ai-modal-content');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (toolId === 'negotiator') renderNegotiator(content);
  else if (toolId === 'pitch') renderPitchCoach(content);
  else if (toolId === 'market') renderMarketPulse(content);
}

function closeAIModal() {
  document.getElementById('ai-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

/* ── Negotiator ── */
let negotiatorHistory = [];

function renderNegotiator(container) {
  const data = getData();
  const ventureName = data?.venture?.name || 'your startup';
  negotiatorHistory = [];
  container.innerHTML = `
    <div class="ai-tool-eyebrow">AI Simulation</div>
    <h2 class="ai-tool-title">🤝 The Negotiator</h2>
    <p style="color:var(--white-dim);font-size:0.875rem;margin-bottom:20px;line-height:1.7;">You're in a high-stakes negotiation room. Choose your scenario and engage.</p>
    <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;">
      <button class="market-choice-btn" style="flex:1;min-width:140px;" onclick="startNegotiation('investor',this)">💰 Investor Meeting</button>
      <button class="market-choice-btn" style="flex:1;min-width:140px;" onclick="startNegotiation('partner',this)">🤝 Partnership Deal</button>
      <button class="market-choice-btn" style="flex:1;min-width:140px;" onclick="startNegotiation('supplier',this)">📦 Supplier Contract</button>
    </div>
    <div class="ai-chat-area" id="neg-chat"><p style="color:var(--white-faint);font-style:italic;text-align:center;padding-top:60px;">Choose a scenario above to begin.</p></div>
    <div id="neg-thinking" style="display:none;" class="ai-thinking">Negotiator is thinking...</div>
    <div class="ai-input-row" id="neg-input-row" style="display:none;">
      <textarea id="neg-input" placeholder="Your response..." rows="2" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendNegotiatorMessage();}"></textarea>
      <button class="ai-send-btn" id="neg-send" onclick="sendNegotiatorMessage()">➤</button>
    </div>
  `;
}

async function startNegotiation(scenario, btn) {
  document.querySelectorAll('.market-choice-btn').forEach(b => b.style.opacity = '0.4');
  btn.style.opacity = '1'; btn.style.borderColor = 'var(--gold)';
  const data = getData();
  const ventureName = data?.venture?.name || 'your startup';
  const desc = data?.venture?.description || 'an innovative product';
  const scenarios = {
    investor: `You are a tough, experienced venture capitalist meeting with the founder of "${ventureName}" — a startup: "${desc}". You are skeptical but fair. Ask challenging questions about the business model, competition, team, and financials. Stay in character. Start by greeting them and asking your first hard question.`,
    partner: `You are a senior executive at a large corporation considering a partnership with "${ventureName}" — a startup: "${desc}". You represent a company 100x their size. You're interested but protective of your brand. Ask probing questions about reliability, integration, and exclusivity. Stay in character. Introduce yourself and your concern.`,
    supplier: `You are a supplier being approached by "${ventureName}" — a startup: "${desc}". You have many clients and little patience. You want to know they can pay, scale, and commit. Be direct about your terms. Start by asking why you should prioritize them.`
  };
  negotiatorHistory = [{ role: 'user', parts: [{ text: scenarios[scenario] }] }];
  const chat = document.getElementById('neg-chat');
  const thinking = document.getElementById('neg-thinking');
  const inputRow = document.getElementById('neg-input-row');
  chat.innerHTML = '';
  thinking.style.display = 'block';
  const reply = await geminiChat(negotiatorHistory);
  negotiatorHistory.push({ role: 'model', parts: [{ text: reply }] });
  thinking.style.display = 'none';
  inputRow.style.display = 'flex';
  appendChatMsg(chat, 'ai', 'Negotiator', reply);
}

async function sendNegotiatorMessage() {
  const input = document.getElementById('neg-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  const chat = document.getElementById('neg-chat');
  const thinking = document.getElementById('neg-thinking');
  appendChatMsg(chat, 'user', 'You', msg);
  negotiatorHistory.push({ role: 'user', parts: [{ text: msg }] });
  document.getElementById('neg-send').disabled = true;
  thinking.style.display = 'block';
  const reply = await geminiChat(negotiatorHistory);
  negotiatorHistory.push({ role: 'model', parts: [{ text: reply }] });
  thinking.style.display = 'none';
  document.getElementById('neg-send').disabled = false;
  appendChatMsg(chat, 'ai', 'Negotiator', reply);
}

/* ── Pitch Coach ── */
function renderPitchCoach(container) {
  const data = getData();
  const venture = data?.venture?.name || 'the startup';
  container.innerHTML = `
    <div class="ai-tool-eyebrow">AI Analysis</div>
    <h2 class="ai-tool-title">🎤 The Pitch Coach</h2>
    <p style="color:var(--white-dim);font-size:0.875rem;margin-bottom:20px;line-height:1.7;">
      Write your elevator pitch below. Get scored on clarity, persuasion, and impact. Blunt, specific feedback.
    </p>
    <label class="form-label">Your Pitch (2-3 minutes when spoken aloud)</label>
    <textarea class="pitch-input-area" id="pitch-text" placeholder="We're building [what] for [who]. The problem is [pain point]. Our solution [how you solve it]. We've already [traction]. We're raising [ask] to [milestone]..."></textarea>
    <button class="btn-primary" id="pitch-btn" onclick="analyzePitch()">Get Feedback</button>
    <div id="pitch-thinking" style="display:none;margin-top:16px;" class="ai-thinking">Analyzing your pitch...</div>
    <div id="pitch-result" style="display:none;margin-top:24px;">
      <div id="pitch-score-section" style="text-align:center;margin-bottom:20px;"></div>
      <div class="feedback-section" id="pitch-feedback-text"></div>
      <button class="btn-secondary" style="margin-top:16px;" onclick="document.getElementById('pitch-text').value='';document.getElementById('pitch-result').style.display='none';">Try Again ↺</button>
    </div>
  `;
}

async function analyzePitch() {
  const pitch = document.getElementById('pitch-text').value.trim();
  if (!pitch) { document.getElementById('pitch-text').focus(); return; }
  const data = getData();
  const venture = data?.venture?.name || 'the startup';
  document.getElementById('pitch-btn').disabled = true;
  document.getElementById('pitch-thinking').style.display = 'block';
  const prompt = `You are a hardened startup pitch coach. Analyze this elevator pitch for "${venture}":

"${pitch}"

Give feedback in this EXACT format:
CLARITY SCORE: X/10
PERSUASION SCORE: X/10
IMPACT SCORE: X/10
OVERALL: X/10

WHAT WORKS:
[2-3 specific strengths]

WHAT DOESN'T:
[2-3 specific weaknesses, be blunt]

VERDICT:
[2-3 sentences: direct, challenging, but fair]

ONE THING TO FIX IMMEDIATELY:
[One specific, actionable improvement]`;

  const result = await geminiSingle(prompt);
  document.getElementById('pitch-thinking').style.display = 'none';
  document.getElementById('pitch-btn').disabled = false;
  const scoreMatch = result.match(/OVERALL:\s*(\d+)\/10/i);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
  const scoreColor = score >= 8 ? '#34d399' : score >= 6 ? 'var(--gold)' : '#f87171';
  const scoreSection = document.getElementById('pitch-score-section');
  scoreSection.innerHTML = score ? `<div class="score-display" style="color:${scoreColor}">${score}<span style="font-size:1.5rem;color:var(--white-dim)">/10</span></div><p style="color:var(--white-dim);font-size:0.85rem;margin-top:4px;">Overall Score</p>` : '';
  document.getElementById('pitch-feedback-text').textContent = result;
  document.getElementById('pitch-result').style.display = 'block';
}

/* ── Market Pulse ── */
let marketState = {};

function renderMarketPulse(container) {
  const data = getData();
  container.innerHTML = `
    <div class="ai-tool-eyebrow">AI Simulation</div>
    <h2 class="ai-tool-title">📈 Market Pulse</h2>
    <p style="color:var(--white-dim);font-size:0.875rem;margin-bottom:20px;line-height:1.7;">Run your business through 4 simulated quarters. Make decisions. See the consequences.</p>
    <div id="market-setup">
      <label class="form-label">Starting Capital ($)</label>
      <input type="number" class="form-input" id="market-capital" value="100000" min="10000" max="10000000" style="margin-bottom:16px;" />
      <label class="form-label">Starting Monthly Burn Rate ($)</label>
      <input type="number" class="form-input" id="market-burn" value="15000" min="1000" max="1000000" style="margin-bottom:24px;" />
      <button class="btn-primary" onclick="startMarketSim()">Begin Simulation</button>
    </div>
    <div id="market-sim" style="display:none;"></div>
    <div id="market-thinking" class="ai-thinking" style="display:none;margin-top:12px;">Market is calculating your quarter...</div>
  `;
}

async function startMarketSim() {
  const capital = parseInt(document.getElementById('market-capital').value) || 100000;
  const burn = parseInt(document.getElementById('market-burn').value) || 15000;
  const data = getData();
  marketState = { quarter: 1, capital, burn, revenue: 0, customers: 0, ventureName: data?.venture?.name || 'Your Startup', decisions: [] };
  document.getElementById('market-setup').style.display = 'none';
  runMarketQuarter();
}

async function runMarketQuarter() {
  if (marketState.quarter > 4) { showMarketFinal(); return; }
  const simDiv = document.getElementById('market-sim');
  const thinking = document.getElementById('market-thinking');
  thinking.style.display = 'block';
  simDiv.style.display = 'block';
  const prompt = `You are a market simulation AI for "${marketState.ventureName}".
Current state going into Quarter ${marketState.quarter}:
- Capital: $${marketState.capital.toLocaleString()}
- Monthly burn: $${marketState.burn.toLocaleString()}
- Quarterly revenue: $${marketState.revenue.toLocaleString()}
- Customers: ${marketState.customers}
- Previous decisions: ${marketState.decisions.join(', ') || 'None yet'}

Generate a realistic market scenario for Quarter ${marketState.quarter} with:
1. A brief market event/challenge (2 sentences)
2. Exactly 3 strategic decision options (label them A, B, C — one sentence each)

Format:
QUARTER ${marketState.quarter} SCENARIO:
[scenario description]

DECISION REQUIRED:
A) [option A]
B) [option B]
C) [option C]`;

  const scenario = await geminiSingle(prompt);
  thinking.style.display = 'none';
  const existing = simDiv.innerHTML;
  const qDiv = document.createElement('div');
  qDiv.className = 'market-quarter';
  const lines = scenario.split('\n').filter(l => l.trim());
  const scenarioText = lines.slice(1, 3).join(' ').replace(/^QUARTER.*?:/i, '').trim();
  const options = lines.filter(l => /^[A-C]\)/i.test(l.trim()));
  qDiv.innerHTML = `
    <div class="q-label">QUARTER ${marketState.quarter} OF 4</div>
    <p style="margin-bottom:14px;">${scenarioText || scenario.substring(0, 300)}</p>
    <div class="market-choice-row">
      ${options.map((opt, i) => `<button class="market-choice-btn" onclick="makeMarketDecision('${opt.replace(/'/g, "\\'")}', this, ${i})">${opt}</button>`).join('')}
    </div>
  `;
  simDiv.innerHTML = existing;
  simDiv.appendChild(qDiv);
  simDiv.scrollTop = simDiv.scrollHeight;
}

async function makeMarketDecision(decision, btn, idx) {
  document.querySelectorAll('.market-choice-btn').forEach(b => b.disabled = true);
  btn.style.borderColor = 'var(--gold)';
  marketState.decisions.push(`Q${marketState.quarter}: ${decision.substring(0, 60)}`);
  const thinking = document.getElementById('market-thinking');
  thinking.style.display = 'block';
  const prompt = `Market simulation for "${marketState.ventureName}". Quarter ${marketState.quarter} decision: "${decision}".
Current state: Capital $${marketState.capital.toLocaleString()}, Burn $${marketState.burn.toLocaleString()}/month, Revenue $${marketState.revenue.toLocaleString()}/quarter, Customers: ${marketState.customers}.
Simulate realistic outcomes. Calculate new metrics and provide brief narrative.
Format exactly:
OUTCOME: [2 sentences describing what happened]
NEW CAPITAL: $[number]
NEW REVENUE: $[number per quarter]
NEW CUSTOMERS: [number]
NEW BURN: $[number per month]
VERDICT: [1 blunt sentence]`;

  const result = await geminiSingle(prompt);
  thinking.style.display = 'none';
  const parseNum = (label) => {
    const m = result.match(new RegExp(label + ':\\s*\\$?([\\d,]+)', 'i'));
    return m ? parseInt(m[1].replace(/,/g, '')) : null;
  };
  const newCapital = parseNum('NEW CAPITAL');
  const newRevenue = parseNum('NEW REVENUE');
  const newCustomers = parseNum('NEW CUSTOMERS');
  const newBurn = parseNum('NEW BURN');
  const verdictMatch = result.match(/VERDICT:\s*(.+)/i);
  if (newCapital) marketState.capital = newCapital;
  if (newRevenue) marketState.revenue = newRevenue;
  if (newCustomers) marketState.customers = newCustomers;
  if (newBurn) marketState.burn = newBurn;
  const simDiv = document.getElementById('market-sim');
  const resultDiv = document.createElement('div');
  resultDiv.style.cssText = 'padding:16px;background:rgba(212,175,55,0.05);border:1px solid var(--gold-border);border-radius:6px;margin-bottom:12px;font-size:0.875rem;line-height:1.8;';
  const outcomeMatch = result.match(/OUTCOME:\s*(.+?)(?=NEW CAPITAL|$)/is);
  const outcomeText = outcomeMatch ? outcomeMatch[1].trim() : '';
  const verdictText = verdictMatch ? verdictMatch[1].trim() : '';
  resultDiv.innerHTML = `
    <p style="color:var(--white);margin-bottom:8px;">${outcomeText}</p>
    <div style="display:flex;gap:20px;flex-wrap:wrap;margin:12px 0;font-size:0.82rem;">
      <span>💰 Capital: <strong style="color:var(--gold);">$${marketState.capital.toLocaleString()}</strong></span>
      <span>📊 Revenue: <strong style="color:var(--gold);">$${marketState.revenue.toLocaleString()}/qtr</strong></span>
      <span>👥 Customers: <strong style="color:var(--gold);">${marketState.customers}</strong></span>
    </div>
    ${verdictText ? `<p style="color:var(--gold);font-style:italic;font-size:0.85rem;">"${verdictText}"</p>` : ''}
  `;
  simDiv.appendChild(resultDiv);
  marketState.quarter++;
  if (marketState.capital <= 0) { showMarketBankrupt(); return; }
  if (marketState.quarter <= 4) setTimeout(() => runMarketQuarter(), 800);
  else showMarketFinal();
}

async function showMarketFinal() {
  const simDiv = document.getElementById('market-sim');
  const finalDiv = document.createElement('div');
  finalDiv.style.cssText = 'text-align:center;padding:32px;border:1px solid var(--gold);border-radius:8px;background:rgba(212,175,55,0.06);margin-top:16px;';
  const verdict = await geminiSingle(`In 2-3 sentences, evaluate this startup's one-year performance: Capital $${marketState.capital.toLocaleString()}, Revenue $${marketState.revenue.toLocaleString()}/quarter, ${marketState.customers} customers. Decisions: ${marketState.decisions.join('; ')}. Be direct and insightful.`);
  finalDiv.innerHTML = `
    <div style="font-size:0.75rem;color:var(--gold);letter-spacing:0.15em;margin-bottom:12px;">YEAR 1 COMPLETE</div>
    <div style="font-family:'Playfair Display',serif;font-size:1.6rem;color:var(--white);margin-bottom:16px;">Simulation Results</div>
    <div style="display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin-bottom:20px;">
      <div style="text-align:center;"><div style="font-size:1.5rem;color:var(--gold);font-weight:700;">$${marketState.capital.toLocaleString()}</div><div style="font-size:0.75rem;color:var(--white-dim);">Capital</div></div>
      <div style="text-align:center;"><div style="font-size:1.5rem;color:var(--gold);font-weight:700;">$${marketState.revenue.toLocaleString()}</div><div style="font-size:0.75rem;color:var(--white-dim);">Quarterly Revenue</div></div>
      <div style="text-align:center;"><div style="font-size:1.5rem;color:var(--gold);font-weight:700;">${marketState.customers}</div><div style="font-size:0.75rem;color:var(--white-dim);">Customers</div></div>
    </div>
    <p style="color:var(--white-dim);font-style:italic;line-height:1.8;max-width:480px;margin:0 auto 24px;">"${verdict}"</p>
    <button class="btn-secondary" onclick="renderMarketPulse(document.getElementById('ai-modal-content'))">Run Again ↺</button>
  `;
  simDiv.appendChild(finalDiv);
  simDiv.scrollTop = simDiv.scrollHeight;
}

function showMarketBankrupt() {
  const simDiv = document.getElementById('market-sim');
  const bd = document.createElement('div');
  bd.style.cssText = 'text-align:center;padding:32px;border:1px solid #ef4444;border-radius:8px;background:rgba(239,68,68,0.06);margin-top:16px;';
  bd.innerHTML = `
    <div style="font-size:2rem;margin-bottom:12px;">💀</div>
    <div style="font-family:'Playfair Display',serif;font-size:1.5rem;color:#f87171;margin-bottom:12px;">Bankrupt.</div>
    <p style="color:var(--white-dim);line-height:1.8;margin-bottom:20px;">"You ran out of money. Not the market's fault. Not the economy's fault. Your decisions. Learn from them."</p>
    <button class="btn-secondary" onclick="renderMarketPulse(document.getElementById('ai-modal-content'))">Try Again ↺</button>
  `;
  simDiv.appendChild(bd);
  simDiv.scrollTop = simDiv.scrollHeight;
}

/* ═══════════════════════════════════════════════════
   AI HELPERS — OpenRouter
   ═══════════════════════════════════════════════════ */

function markAIUnavailable() {
  sessionStorage.setItem(AI_DOWN_KEY, '1');
  hideAITools();
}

function hideAITools() {
  const grid = document.querySelector('#headquarters .ai-tools-grid');
  if (!grid) return;
  if (document.querySelector('.ai-unavailable-notice')) return;
  grid.style.display = 'none';
  const notice = document.createElement('div');
  notice.className = 'ai-unavailable-notice';
  notice.innerHTML = `
    <div class="ai-unavail-icon">⚙️</div>
    <h4 class="ai-unavail-title">AI Tools Temporarily Unavailable</h4>
    <p class="ai-unavail-desc">Our AI capacity has been reached. The Negotiator, Pitch Coach, and Market Pulse will be back online shortly. Your skills journey continues uninterrupted.</p>
  `;
  grid.parentNode.insertBefore(notice, grid);
}

async function aiRequest(messages, maxTokens = 1024) {
  for (const model of OPENROUTER_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      if (attempt > 0) await new Promise(r => setTimeout(r, 5000));
      try {
        const res = await fetch(OPENROUTER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_KEY}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'FounderPath'
          },
          body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature: 0.9 })
        });
        if (res.status === 402) {
          console.warn('OpenRouter: credits exhausted');
          markAIUnavailable();
          return null;
        }
        if (res.status === 429) {
          const err = await res.json().catch(() => ({}));
          const msg = err?.error?.message || '';
          if (msg.toLowerCase().includes('credit') || msg.toLowerCase().includes('quota')) {
            markAIUnavailable();
            return null;
          }
          if (attempt === 0) continue;
          break;
        }
        if (!res.ok) { console.warn(`OpenRouter ${model} error:`, res.status); break; }
        const json = await res.json();
        const text = json.choices?.[0]?.message?.content;
        if (text) return text;
        break;
      } catch (err) {
        console.warn('OpenRouter fetch error:', err);
        break;
      }
    }
  }
  return null;
}

async function geminiSingle(prompt) {
  const result = await aiRequest([{ role: 'user', content: prompt }], 1024);
  return result || '⚠️ AI service is temporarily unavailable. Please try again later.';
}

async function geminiChat(history) {
  const messages = history.map(m => ({
    role: m.role === 'model' ? 'assistant' : m.role,
    content: m.parts?.[0]?.text || m.content || ''
  }));
  const result = await aiRequest(messages, 512);
  return result || '⚠️ AI service is temporarily unavailable. Please try again later.';
}

function appendChatMsg(container, role, label, text) {
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<div class="chat-label">${label}</div><p>${text}</p>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

/* ═══════════════════════════════════════════════════
   JOURNAL
   ═══════════════════════════════════════════════════ */

function openJournal() {
  const data = getData();
  const entries = data.journalEntries || [];
  const container = document.getElementById('journal-entries');
  if (entries.length === 0) {
    container.innerHTML = '<div class="journal-empty">Complete skill questions to see your reflections here. Your journey begins with the first answer.</div>';
  } else {
    container.innerHTML = entries.map(e => `
      <div class="journal-entry">
        <div class="journal-skill-title">${e.skillTitle}</div>
        <div class="journal-question">${e.question}</div>
        <div class="journal-answer">${e.answer}</div>
        <div class="journal-timestamp">${new Date(e.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
    `).join('');
  }
  document.getElementById('journal-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeJournal() {
  document.getElementById('journal-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════
   RESET
   ═══════════════════════════════════════════════════ */

function confirmReset() { document.getElementById('confirm-modal').classList.remove('hidden'); }
function closeConfirmModal() { document.getElementById('confirm-modal').classList.add('hidden'); }
function executeReset() {
  localStorage.removeItem('founderPathData');
  localStorage.removeItem('fpFormDone');
  window.location.reload();
}

/* ── Keyboard shortcuts ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeStoryModal();
    closeAIModal();
    closeJournal();
    closeConfirmModal();
    document.getElementById('venture-modal').classList.add('hidden');
    document.getElementById('form-gate-modal').classList.add('hidden');
    document.body.style.overflow = '';
  }
});
