// Mettre l'année automatiquement
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const toggle = document.getElementById('toggle');
const mobileMenu = document.getElementById('mobileMenu');
const menu = document.getElementById('menu');

toggle && toggle.addEventListener('click', ()=>{
  if (mobileMenu.style.display === 'block') { 
    mobileMenu.style.display = 'none'; 
    return;
  }
  mobileMenu.innerHTML = '';
  Array.from(menu.querySelectorAll('a')).forEach(a => {
    const link = document.createElement('a');
    link.href = a.getAttribute('href');
    link.textContent = a.textContent;
    mobileMenu.appendChild(link);
  });
  mobileMenu.style.display = 'block';
});

// Formulaire Contact
function handleSubmit(e){
  e.preventDefault();
  const form = e.target;
  const thanks = document.getElementById('thanks');
  form.reset();
  thanks && (thanks.style.display = 'block');
  setTimeout(()=>{thanks.style.display='none'},4000);
}
