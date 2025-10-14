

const script = document.createElement('script');
script.src = '/css/tailwind.js';

// When the script loads, make the div visible
script.onload = () => {
    document.getElementById('mockup-content').style.visibility = 'visible';
};

// Append the script to the document
document.head.appendChild(script);
  