const express = require('express');
const projectRouter = express.Router();
const supabase = require('../utils/supabaseClient');

// Get all projects
projectRouter.get('/', async (req, res) => {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Create a new project
projectRouter.post('/', async (req, res) => {
  const dataInsert = req.body;

  const { data, error } = await supabase.from('projects').insert([dataInsert]);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Get a single project
projectRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

module.exports = projectRouter;
