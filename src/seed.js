
const { runQuery, driver } = require('./db')

const skills = [
  { name: "JavaScript",    category: "frontend", color: "#E8B000" },
  { name: "TypeScript",    category: "frontend", color: "#3178C6" },
  { name: "React",         category: "frontend", color: "#61DAFB" },
  { name: "Next.js",       category: "frontend", color: "#111111" },
  { name: "Vue.js",        category: "frontend", color: "#42B883" },
  { name: "Svelte",        category: "frontend", color: "#FF3E00" },
  { name: "CSS",           category: "frontend", color: "#264DE4" },
  { name: "HTML",          category: "frontend", color: "#E34F26" },
  { name: "Tailwind CSS",  category: "frontend", color: "#0EA5E9" },
  { name: "Redux",         category: "frontend", color: "#764ABC" },
  { name: "Vite",          category: "tools",    color: "#BD34FE" },
  { name: "Node.js",       category: "backend",  color: "#339933" },
  { name: "Express",       category: "backend",  color: "#555555" },
  { name: "Python",        category: "backend",  color: "#3776AB" },
  { name: "Django",        category: "backend",  color: "#092E20" },
  { name: "FastAPI",       category: "backend",  color: "#059669" },
  { name: "GraphQL",       category: "backend",  color: "#E535AB" },
  { name: "PostgreSQL",    category: "backend",  color: "#336791" },
  { name: "MongoDB",       category: "backend",  color: "#47A248" },
  { name: "Redis",         category: "backend",  color: "#DC382D" },
  { name: "Docker",        category: "tools",    color: "#2496ED" },
  { name: "Kubernetes",    category: "tools",    color: "#326CE5" },
  { name: "Git",           category: "tools",    color: "#F05032" },
  { name: "GitHub Actions",category: "tools",    color: "#2088FF" },
  { name: "TensorFlow",    category: "data",     color: "#FF6F00" },
  { name: "PyTorch",       category: "data",     color: "#EE4C2C" },
  { name: "pandas",        category: "data",     color: "#130754" },
  { name: "Supabase",      category: "tools",    color: "#3ECF8E" },
  { name: "Prisma",        category: "tools",    color: "#2D3748" },
  { name: "AWS",           category: "tools",    color: "#FF9900" },
]

const relationships = [
  ["JavaScript",  "TypeScript",     "TypeScript adds types to JavaScript"],
  ["JavaScript",  "React",          "React is built with JavaScript"],
  ["JavaScript",  "Node.js",        "Node.js runs JavaScript on the server"],
  ["JavaScript",  "Vue.js",         "Vue is a JavaScript framework"],
  ["JavaScript",  "Svelte",         "Svelte compiles JavaScript components"],
  ["JavaScript",  "Redux",          "Redux manages JavaScript app state"],
  ["TypeScript",  "React",          "React apps are commonly written in TypeScript"],
  ["TypeScript",  "Next.js",        "Next.js is built with TypeScript"],
  ["TypeScript",  "Node.js",        "Node.js supports TypeScript natively"],
  ["TypeScript",  "Prisma",         "Prisma is TypeScript-first"],
  ["React",       "Next.js",        "Next.js is a React framework"],
  ["React",       "Redux",          "Redux is the most popular React state manager"],
  ["React",       "Tailwind CSS",   "Tailwind is commonly used with React"],
  ["React",       "Vite",           "Vite is the recommended React build tool"],
  ["React",       "GraphQL",        "React apps often use GraphQL for data fetching"],
  ["Next.js",     "Tailwind CSS",   "Tailwind is the standard styling choice in Next.js"],
  ["Next.js",     "Prisma",         "Prisma is commonly used for Next.js database access"],
  ["Next.js",     "PostgreSQL",     "Next.js apps often use PostgreSQL as their database"],
  ["Vue.js",      "Tailwind CSS",   "Tailwind works great with Vue"],
  ["Vue.js",      "Vite",           "Vite was originally created for Vue"],
  ["CSS",         "HTML",           "CSS styles HTML elements"],
  ["CSS",         "Tailwind CSS",   "Tailwind is a utility-first CSS framework"],
  ["HTML",        "JavaScript",     "JavaScript makes HTML interactive"],
  ["HTML",        "React",          "React compiles down to HTML"],
  ["Node.js",     "Express",        "Express is the most popular Node.js framework"],
  ["Node.js",     "PostgreSQL",     "Node.js apps commonly use PostgreSQL"],
  ["Node.js",     "MongoDB",        "Node.js and MongoDB are the core of MERN stack"],
  ["Node.js",     "Redis",          "Redis is used with Node.js for caching"],
  ["Node.js",     "GraphQL",        "GraphQL servers are commonly built with Node.js"],
  ["Node.js",     "Docker",         "Node.js apps are packaged with Docker"],
  ["Express",     "MongoDB",        "Express and MongoDB form the core of MERN stack"],
  ["Express",     "PostgreSQL",     "Express apps often use PostgreSQL"],
  ["Express",     "Redis",          "Redis adds caching to Express apps"],
  ["Python",      "Django",         "Django is a Python web framework"],
  ["Python",      "FastAPI",        "FastAPI is a modern Python API framework"],
  ["Python",      "TensorFlow",     "TensorFlow is a Python ML library"],
  ["Python",      "PyTorch",        "PyTorch is a Python deep learning library"],
  ["Python",      "pandas",         "pandas is a Python data analysis library"],
  ["Python",      "Docker",         "Python apps are packaged with Docker"],
  ["Python",      "PostgreSQL",     "Python apps commonly use PostgreSQL"],
  ["Django",      "PostgreSQL",     "Django's default database is PostgreSQL"],
  ["Django",      "Redis",          "Redis is used with Django for caching and queues"],
  ["FastAPI",     "PostgreSQL",     "FastAPI apps commonly use PostgreSQL"],
  ["FastAPI",     "Redis",          "Redis speeds up FastAPI with caching"],
  ["PostgreSQL",  "Prisma",         "Prisma is a popular ORM for PostgreSQL"],
  ["PostgreSQL",  "Supabase",       "Supabase is built entirely on PostgreSQL"],
  ["PostgreSQL",  "Redis",          "Redis caches expensive PostgreSQL queries"],
  ["MongoDB",     "Redis",          "Redis complements MongoDB with fast caching"],
  ["Docker",      "Kubernetes",     "Kubernetes orchestrates Docker containers"],
  ["Docker",      "GitHub Actions", "GitHub Actions builds and pushes Docker images"],
  ["Docker",      "PostgreSQL",     "PostgreSQL is commonly run in a Docker container"],
  ["Docker",      "Redis",          "Redis is commonly run in a Docker container"],
  ["Docker",      "AWS",            "AWS runs Docker containers via ECS and EKS"],
  ["Kubernetes",  "AWS",            "AWS offers managed Kubernetes via EKS"],
  ["Git",         "GitHub Actions", "GitHub Actions triggers on Git events like push"],
  ["TensorFlow",  "PyTorch",        "Both are the leading deep learning frameworks"],
  ["TensorFlow",  "pandas",         "pandas prepares data for TensorFlow models"],
  ["PyTorch",     "pandas",         "pandas prepares data for PyTorch models"],
  ["Supabase",    "React",          "Supabase has a popular React client library"],
  ["Supabase",    "Next.js",        "Supabase is the top database choice for Next.js"],
  ["GraphQL",     "Prisma",         "Prisma integrates directly with GraphQL APIs"],
  ["AWS",         "Node.js",        "Node.js is a top runtime on AWS Lambda"],
  ["AWS",         "Python",         "Python is the most popular language on AWS Lambda"],
]

async function seed() {
  console.log('🌱 Starting seed...')

  // Step 1 — wipe existing data
  console.log('🗑️  Clearing old data...')
  await runQuery('MATCH (n) DETACH DELETE n')

  // Step 2 — create all skill nodes
  console.log('📦 Creating skill nodes...')
  for (const skill of skills) {
    await runQuery(
      `MERGE (s:Skill {name: $name})
       SET s.category = $category, s.color = $color`,
      skill
    )
  }
  console.log(`   ✓ ${skills.length} skills created`)

  // Step 3 — create all relationships
  console.log('🔗 Creating relationships...')
  for (const [from, to, reason] of relationships) {
    await runQuery(
      `MATCH (a:Skill {name: $from})
       MATCH (b:Skill {name: $to})
       MERGE (a)-[:RELATED_TO {reason: $reason}]->(b)`,
      { from, to, reason }
    )
  }
  console.log(`   ✓ ${relationships.length} relationships created`)

  console.log('✅ Seed complete!')

  // Close the driver when done
  await driver.close()
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})