const { runQuery, driver } = require('./db')

const details = {
  "JavaScript":   { why: "The universal language of the web — every browser runs it natively.", created: "Created by Brendan Eich in 10 days in 1995 at Netscape. Originally called Mocha.", build: ["Web apps","Browser extensions","Server apps (Node.js)","Mobile (React Native)","Desktop (Electron)"], learn: ["javascript.info","MDN Web Docs","freeCodeCamp","Eloquent JavaScript (free)"] },
  "TypeScript":   { why: "Adds static typing to JavaScript — catches bugs early and supercharges editor autocomplete.", created: "Built by Microsoft, designed by Anders Hejlsberg (creator of C#). Released 2012.", build: ["Large-scale web apps","APIs","Shared libraries","Enterprise software"], learn: ["typescriptlang.org/docs","Total TypeScript (Matt Pocock)","Execute Program","TypeScript Deep Dive (free)"] },
  "React":        { why: "Component-based UI library making complex interactive UIs manageable.", created: "Built by Jordan Walke at Facebook in 2011. Open-sourced at JSConf 2013.", build: ["SPAs","Dashboards","Social platforms","E-commerce","Mobile (React Native)"], learn: ["react.dev","Scrimba React","Joy of React (Josh Comeau)","Epic React"] },
  "Next.js":      { why: "Full-stack React framework — SSR, SSG, routing, and API routes all in one.", created: "Created by Vercel in 2016. Led by Guillermo Rauch.", build: ["Full-stack web apps","Marketing sites","E-commerce","SaaS products"], learn: ["nextjs.org/learn","Lee Robinson YouTube","Vercel docs"] },
  "Vue.js":       { why: "Progressive framework — add incrementally to any page or build full SPAs.", created: "Created by Evan You in 2014 after working on AngularJS at Google.", build: ["SPAs","Interactive widgets","Dashboards","Progressive web apps"], learn: ["vuejs.org/guide","Vue Mastery","Traversy Media YouTube"] },
  "Svelte":       { why: "Compiles to vanilla JS at build time — no virtual DOM, tiny and fast.", created: "Created by Rich Harris at The Guardian in 2016 for interactive news graphics.", build: ["High-performance web apps","Animations","Static sites (SvelteKit)"], learn: ["learn.svelte.dev","Joy of Code","Fireship YouTube"] },
  "CSS":          { why: "Controls visual presentation of HTML — layout, colors, typography, animations.", created: "Proposed by Håkon Wium Lie in 1994. W3C standard since 1996.", build: ["Every website","Responsive layouts","Animations","Design systems"], learn: ["MDN CSS","Kevin Powell YouTube","CSS Tricks","Flexbox Froggy (game)"] },
  "HTML":         { why: "Defines the structure and semantic meaning of web content.", created: "Invented by Tim Berners-Lee in 1991. The foundation of the World Wide Web.", build: ["Every website","Email templates","Static pages","Web components"], learn: ["MDN HTML","html.com","freeCodeCamp","The Odin Project"] },
  "Tailwind CSS": { why: "Utility-first CSS — compose designs with classes in markup, no context switching.", created: "Created by Adam Wathan in 2017 as an internal project tool.", build: ["Any styled web UI","Design systems","Landing pages"], learn: ["tailwindcss.com/docs","Tailwind Labs YouTube","Scrimba"] },
  "Redux":        { why: "Predictable global state container — one source of truth for complex React apps.", created: "Created by Dan Abramov & Andrew Clark in 2015, inspired by Elm and Flux.", build: ["Complex SPAs","Apps with shared global state","Real-time dashboards"], learn: ["redux.js.org","Redux Toolkit docs","Traversy Media"] },
  "Vite":         { why: "Next-gen build tool using native ES modules — near-instant dev server startup.", created: "Created by Evan You (Vue creator) in 2020 to solve slow webpack dev startup.", build: ["Any modern frontend project","React/Vue/Svelte apps","Library builds"], learn: ["vitejs.dev","Fireship YouTube","official docs"] },
  "Node.js":      { why: "JavaScript on the server using Chrome's V8 — one language for frontend and backend.", created: "Created by Ryan Dahl in 2009 for non-blocking, event-driven I/O.", build: ["REST APIs","Real-time apps","CLI tools","Microservices","Serverless"], learn: ["nodejs.org/learn","The Odin Project","Traversy Media"] },
  "Express":      { why: "Minimal, unopinionated Node.js framework — backbone of the MEAN/MERN stacks.", created: "Created by TJ Holowaychuk in 2010, inspired by Ruby's Sinatra.", build: ["REST APIs","Web servers","Auth systems","Middleware pipelines"], learn: ["expressjs.com","MDN Express tutorial","The Odin Project"] },
  "Python":       { why: "Readable syntax and huge ecosystem — go-to for data science, AI, and scripting.", created: "Created by Guido van Rossum in 1991. Named after Monty Python, not the snake.", build: ["ML models","Data pipelines","Web backends","Automation"], learn: ["python.org/doc","Automate the Boring Stuff (free)","Real Python","CS50P"] },
  "Django":       { why: "Batteries-included framework — ORM, auth, and admin panel out of the box.", created: "Built at a Kansas newspaper in 2003. Open-sourced by Adrian Holovaty in 2005.", build: ["Content platforms","APIs","Admin dashboards","SaaS backends"], learn: ["djangoproject.com","Django Girls tutorial","Test-Driven Dev with Django"] },
  "FastAPI":      { why: "Modern async Python API framework with auto OpenAPI docs and type validation.", created: "Created by Sebastián Ramírez in 2018, built on Starlette and Pydantic.", build: ["REST APIs","ML model serving","Microservices","Data APIs"], learn: ["fastapi.tiangolo.com","TestDriven.io","ArjanCodes YouTube"] },
  "GraphQL":      { why: "Query language for APIs — clients request exactly what they need, nothing more.", created: "Developed at Facebook in 2012 to fix REST limitations. Open-sourced 2015.", build: ["Flexible APIs","Mobile backends","Federated data graphs"], learn: ["graphql.org/learn","Apollo docs","How to GraphQL","Fireship"] },
  "PostgreSQL":   { why: "Most advanced open-source relational DB — rock-solid reliability and rich features.", created: "Started at UC Berkeley in 1986 as POSTGRES. Renamed PostgreSQL in 1996.", build: ["Any structured data app","Financial systems","Analytics","Multi-tenant SaaS"], learn: ["postgresql.org/docs","Supabase docs","PostgreSQL Tutorial","Hussein Nasser"] },
  "MongoDB":      { why: "Document database with flexible JSON-like schema — great for rapid iteration.", created: "Created at 10gen (now MongoDB Inc.) by Eliot Horowitz in 2007.", build: ["Content apps","Catalogs","Real-time analytics","IoT storage"], learn: ["mongodb.com/docs","MongoDB University (free)","Traversy Media"] },
  "Redis":        { why: "In-memory store — blazing fast caching, sessions, rate limiting, and pub/sub.", created: "Created by Salvatore Sanfilippo (antirez) in 2009 at his startup.", build: ["Caching","Session storage","Rate limiting","Leaderboards","Job queues"], learn: ["redis.io/docs","Redis University (free)","Fireship","System Design Primer"] },
  "Docker":       { why: "Containers package app + dependencies together — runs identically everywhere.", created: "Created by Solomon Hykes at dotCloud, open-sourced at PyCon 2013.", build: ["Any deployable app","Dev environments","CI/CD","Microservices"], learn: ["docs.docker.com","TechWorld with Nana YouTube","Docker & Kubernetes on Udemy"] },
  "Kubernetes":   { why: "Orchestrates containers at scale — auto-scaling, self-healing, rolling deploys.", created: "Created by Google engineers, open-sourced in 2014 based on internal Borg system.", build: ["Production microservices","Cloud-native platforms","High-availability systems"], learn: ["kubernetes.io/docs","TechWorld with Nana","KodeKloud"] },
  "Git":          { why: "Version control tracking every code change — collaborate safely, revert mistakes.", created: "Created by Linus Torvalds in 2005 in 10 days to manage the Linux kernel.", build: ["Used in every software project","Open source collaboration"], learn: ["git-scm.com/book (free)","Atlassian Git tutorials","Oh My Git! (game)"] },
  "GitHub Actions":{ why: "Native CI/CD — automate test, build, and deploy on every push without leaving GitHub.", created: "Launched by GitHub in 2018.", build: ["CI/CD pipelines","Automated testing","Deployment workflows"], learn: ["docs.github.com/actions","TechWorld with Nana","Fireship"] },
  "TensorFlow":   { why: "End-to-end ML platform — from research to large-scale production model serving.", created: "Developed at Google Brain by Jeff Dean's team. Open-sourced November 2015.", build: ["Neural networks","Image recognition","NLP models","Recommendation systems"], learn: ["tensorflow.org/tutorials","DeepLearning.AI Coursera","Fast.ai","Kaggle"] },
  "PyTorch":      { why: "Dynamic computation graphs feel like regular Python — preferred for research.", created: "Created by Meta AI Research (Adam Paszke et al.) released in 2016.", build: ["Research models","Computer vision","NLP","Generative AI","RL agents"], learn: ["pytorch.org/tutorials","Fast.ai","DeepLearning.AI","Papers With Code"] },
  "pandas":       { why: "Data manipulation library — read, clean, transform and analyze tabular data.", created: "Created by Wes McKinney in 2008 while working at quantitative hedge fund AQR.", build: ["Data cleaning pipelines","Financial analysis","Feature engineering for ML"], learn: ["pandas.pydata.org","Kaggle pandas course (free)","Real Python"] },
  "Supabase":     { why: "Open-source Firebase alternative — full backend (DB, auth, storage, realtime) instantly.", created: "Founded by Paul Copplestone and Ant Wilson in 2020. Built on PostgreSQL.", build: ["Full-stack apps","Realtime dashboards","Apps needing auth","Rapid prototypes"], learn: ["supabase.com/docs","Jon Meyers YouTube","Egghead.io Supabase"] },
  "Prisma":       { why: "Type-safe ORM — queries generated from your schema, eliminates raw SQL errors.", created: "Created by the Prisma team (Johannes Schickling) in Berlin, 2016.", build: ["Type-safe database layers","Full-stack TypeScript apps","APIs with DB access"], learn: ["prisma.io/docs","Fireship YouTube","Bytes.dev newsletter"] },
  "AWS":          { why: "World's largest cloud — compute, storage, databases, ML, and hundreds of services.", created: "Launched in 2006 with S3 and EC2 to monetize Amazon's excess infrastructure.", build: ["Scalable web apps","Serverless functions","Data lakes","Global CDN"], learn: ["aws.amazon.com/training","A Cloud Guru","freeCodeCamp AWS"] },
}

async function seedDetails() {
  console.log('📝 Adding details to skill nodes...')

  for (const [name, data] of Object.entries(details)) {
    await runQuery(
      `MATCH (s:Skill {name: $name})
       SET s.why      = $why,
           s.created  = $created,
           s.build    = $build,
           s.learn    = $learn`,
      {
        name,
        why:     data.why,
        created: data.created,
        build:   data.build,    // Neo4j stores arrays natively
        learn:   data.learn,
      }
    )
  }

  console.log(`✅ Details added to ${Object.keys(details).length} skills`)
  await driver.close()
}

seedDetails().catch(err => {
  console.error('❌ Failed:', err)
  process.exit(1)
})