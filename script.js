const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (toggle && navigation) {
  function setMenu(open) {
    navigation.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (!toggle.contains(event.target) && !navigation.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(max-width: 650px)').addEventListener('change', () => setMenu(false));
}

const entries = [
 {title:'Nossa casa',category:'casa',href:'#sobre',description:'Lanchonete familiar e acolhedora em Guarani d’Oeste.',terms:'familia ambiente estabelecimento'},
 {title:'Cardápio e pedidos',category:'pedidos',href:'#cardapio',description:'Consulte o cardápio atualizado e os preços pelo WhatsApp.',terms:'lanche comida hamburguer bebidas porcoes preco menu'},
 {title:'WhatsApp',category:'pedidos',href:'#contato',description:'Faça seu pedido e consulte as opções de retirada e entrega.',terms:'telefone contato delivery retirada entrega'},
 {title:'Funcionamento',category:'visita',href:'#contato',description:'Atendimento de terça a domingo. Consulte os horários pelo WhatsApp.',terms:'horario aberto dias terca domingo'},
 {title:'Localização',category:'visita',href:'#localizacao',description:'Guarani d’Oeste, São Paulo. Encontre a lanchonete no Google Maps.',terms:'endereco mapa rota como chegar onde sp'},
 {title:'Instagram',category:'redes',href:'#contato',description:'Veja fotos e novidades em @lanchonete_gringa.',terms:'social fotos instagram novidades'},
 {title:'Lanches artesanais',category:'casa',href:'#encontro',description:'Capricho no preparo e toque artesanal em cada mordida.',terms:'qualidade sabor artesanal lanches familia'}
];
const categoryNames = {casa:'Nossa casa',pedidos:'Cardápio e pedidos',visita:'Visita e horários',redes:'Redes sociais'};
const query = document.getElementById('search-query');
const category = document.getElementById('search-category');
const results = document.getElementById('search-results');
const status = document.getElementById('search-status');
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function searchSite() {
 const words = normalize(query.value).trim().split(/\s+/).filter(Boolean);
 const matches = entries.filter(entry => (!category.value || entry.category === category.value) && words.every(word => normalize(entry.title+' '+entry.description+' '+entry.terms).includes(word)));
 results.replaceChildren();
 matches.forEach(entry => {
  const li = document.createElement('li'); const link = document.createElement('a');
  link.href=entry.href;link.textContent=entry.title;
  const description=document.createElement('p');description.textContent=entry.description;
  const tag=document.createElement('span');tag.className='result-category';tag.textContent=categoryNames[entry.category];
  li.append(link,description,tag);results.append(li);
 });
 status.textContent = matches.length ? matches.length+' resultado'+(matches.length===1?' encontrado.':'s encontrados.') : 'Nenhum resultado. Tente cardápio, horários ou localização, ou selecione Todas.';
 document.querySelectorAll('[data-category]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.category===category.value)));
}
document.getElementById('site-search').addEventListener('submit', event => {event.preventDefault();searchSite();});
query.addEventListener('input',searchSite);category.addEventListener('change',searchSite);
document.querySelectorAll('[data-category]').forEach(button => {button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{category.value=button.dataset.category;searchSite();});});
const locations={buscar:'Busca',sobre:'Nossa casa',cardapio:'Cardápio',contato:'Contato e horários',encontro:'Nosso jeito',localizacao:'Localização'};
function updateLocation(){const hash=location.hash.slice(1);const current=document.getElementById('breadcrumb-current');current.textContent=locations[hash]||'';current.hidden=!locations[hash];document.querySelectorAll('#navigation a').forEach(link=>{if(link.hash===location.hash)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
window.addEventListener('hashchange',updateLocation);updateLocation();
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{const target=document.getElementById(link.hash.slice(1));if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}));
