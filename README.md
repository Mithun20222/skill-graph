# Skill Graph Explorer (Neo4j-Based Visualization)

An interactive 3D visualization tool built to explore **graph databases using Neo4j** by modeling relationships between technical skills.

Live Demo:  
https://skill-graph-uhx4.onrender.com/


## Purpose

This project was built primarily to:

- Learn how **Neo4j graph databases** work in practice  
- Model real-world relationships between skills  
- Understand **graph traversal vs relational queries**  
- Build APIs that return **connected data efficiently**  


## Core Concept

Instead of tables, this project uses:

- **Nodes** → Skills (React, Python, Docker, etc.)  
- **Relationships** → Connections between skills  


This allows fast and intuitive exploration of related technologies.


## Features

- Interactive 3D rotating skill sphere  
- Click any node to explore connections  
- Graph-based visualization of relationships  
- Search functionality  
- Smooth animations using Canvas  
- Works with both mouse and touch  


## Tech Stack

### Backend (Main Focus)
- Node.js  
- Express.js  
- Neo4j  

### Frontend
- HTML5 Canvas  
- Vanilla JavaScript  
- CSS  

### Deployment
- Render  


## How It Works

1. Skills are stored as **nodes** in Neo4j  
2. Connections are stored as **relationships**  
3. Backend queries Neo4j using graph traversal  
4. Frontend renders:
   - Sphere view (all skills)  
   - Focused graph view (connections)  


## API Endpoints

- `GET /skills`  
  → Returns all skills  

- `GET /skills/:name`  
  → Returns a skill and its connected nodes  


## Deployment Note

- Hosted on Render (free tier)  
- Server sleeps after inactivity (~15 min)  
- First request may take ~30 seconds (cold start)  


## What I Learned

- Graph data modeling with Neo4j  
- Relationship-based querying  
- Backend API design for graph data  
- Canvas-based visualization  
- Handling deployment issues like cold starts  


## Future Improvements

- Multi-level graph traversal  
- Skill recommendation system  
- Learning path generation  
- Improved clustering & layout  
- Better mobile experience  
