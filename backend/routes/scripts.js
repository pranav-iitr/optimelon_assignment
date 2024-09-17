const express = require('express');
const scriptRouter = express.Router();

const supabase = require('../utils/supabaseClient');

scriptRouter.get('/generate/:projectId', async (req, res) => {
  const protocol = req.protocol; // 'http' or 'https'
  const hostname = req.hostname;
  const { projectId } = req.params;
  const exists = await supabase
    .from('scripts')
    .select('script_text',)
    .eq('project_id', projectId);

  if (exists.error) {
    return res.status(500).json({ error: 'Failed to check if script exists' });
  }
  if (exists.data.length > 0) {
    return res.send({ message: 'Script already exists', script: exists.data[0].script_text });
  }
  const variations = ['a', 'b', 'c', 'd'];

  const { data: project, error :project_error } = await supabase
    .from('projects')
    .select('domain')
    .eq('id', projectId)
    .single();
  if (project_error) {
    return res.status(500).json({ error: 'Failed to fetch project' });
  }
  

  const scriptContent = `
  (function() {
  const allowedDomain = '${project.domain}';
  const currentDomain = window.location.hostname;
  const urlParams = new URLSearchParams(window.location.search);
  const variationParam = urlParams.get('variation');


  if (variationParam) {
    return; // Exit the script if the 'variation' parameter is present
}


  // Make API call to check if the project exists
  fetch('${protocol}://${hostname}/api/projects/${projectId}')
    .then(response => {
      if (!response.ok) {
        throw new Error('Project not found or invalid response');
      }
      return response.json();
    })
    .then(data => {
    

      // Proceed with the rest of the script if everything is fine
      const variations = ['a','b','c','d'];
      const variation = variations[new Date().getHours() % 4];
      urlParams.set('variation', variation);
      window.location.search = urlParams.toString();
    })
    .catch(error => {
      console.error('Error in the script:', error);
    });
})();

  `;

  // const scriptPath = path.join(__dirname, `../scripts/${projectId}.js`);
  // fs.writeFileSync(scriptPath, scriptContent);

  const { data, error } = await supabase.from('scripts').insert([
    { project_id: projectId, script_text: scriptContent },
  ]);
  if (error) {
    return res.status(500).json({ error: 'Failed to generate script' });
  }
  res.send({ message: 'Script generated', script: scriptContent });
});

module.exports = scriptRouter;
