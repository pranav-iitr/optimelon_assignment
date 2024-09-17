import { useEffect } from 'react';

const InjectScript = () => {
  useEffect(() => {
    const scriptContent = `
      
  (function() {
  const allowedDomain = 'localhost:3000';
  const currentDomain = window.location.hostname;
  const urlParams = new URLSearchParams(window.location.search);
  const variationParam = urlParams.get('variation');
  
  if (variationParam) {
         
          return; // Exit the script if the 'variation' parameter is present
  }

  // Make API call to check if the project exists
  fetch('http://localhost:5000/api/projects/30c23235-d510-4072-815e-daf46be13b8c')
    .then(response => {

      if (!response.status.toString().startsWith('2')) {
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

    const script = document.createElement('script');
    script.innerHTML = scriptContent;
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    // return () => {
    //   document.body.removeChild(script);
    // };
   
  }, []);

  return <div>Script Injected!</div>;
};

export default InjectScript;
