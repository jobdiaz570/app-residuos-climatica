type Place = { name: string; address: string; hours: string; materials: string };

const places: Place[] = [
  { name: 'Centro de reciclaje Nezahualcóyotl', address: 'Av. del Parque 120, Col. Centro', hours: 'Lun–Vie, 9:00–17:00', materials: 'Plástico, cartón y vidrio' },
  { name: 'Punto limpio Central', address: 'Calle Morelos 45, Col. Central', hours: 'Lun–Sáb, 10:00–16:00', materials: 'Pilas y electrónicos' },
  { name: 'Centro de aceite usado', address: 'Av. Río 82, Col. Las Flores', hours: 'Mié y Sáb, 9:00–14:00', materials: 'Aceite de cocina' },
  { name: 'Huerto comunitario La Esperanza', address: 'Calle Semilla 15, Col. Esperanza', hours: 'Sábados, 9:00–13:00', materials: 'Huerto urbano y donación de semillas' },
  { name: 'Centro de compostaje comunitario', address: 'Camino Verde 30, Col. Jardines', hours: 'Lun–Sáb, 8:00–15:00', materials: 'Residuos orgánicos' }
];
const guides = [
  ['♻','Plástico','Botellas, envases y tapas limpias.','Enjuágalos y aplástalos.','No mezcles unicel ni envases con comida.'],
  ['▤','Papel y cartón','Hojas, periódicos, cajas y empaques.','Manténlos limpios, secos y doblados.','No incluyas papel sanitario o encerado.'],
  ['◇','Vidrio','Frascos y botellas de vidrio.','Enjuaga y retira tapas.','No coloques focos, espejos o cerámica.'],
  ['▣','Pilas','Pilas comunes y recargables.','Guárdalas en un recipiente seco.','No las coloques con la basura doméstica.'],
  ['⌁','Electrónicos','Celulares, cables y pequeños aparatos.','Borra información personal si aplica.','No los desmontes ni los tires en la calle.'],
  ['◉','Aceite','Aceite de cocina usado.','Déjalo enfriar y guárdalo en botella cerrada.','No lo tires al fregadero ni al suelo.'],
  ['♧','Orgánicos','Cáscaras, café, hojas y restos vegetales.','Sepáralos sin plástico.','No agregues carnes, lácteos ni excremento.']
];
const workshops = [
  ['Aprende a hacer composta','12 de octubre','10:00–12:00','Centro comunitario La Esperanza'],
  ['Reciclaje desde casa','19 de octubre','11:00–13:00','Biblioteca Central'],
  ['Construcción de huertos urbanos','26 de octubre','09:00–12:00','Huerto La Esperanza'],
  ['Reutilización creativa de materiales','2 de noviembre','10:00–12:00','Casa de cultura Norte']
];
const faq = [
  ['¿Cómo encuentro un punto de reciclaje?','Ve a Puntos de acopio y selecciona un marcador del mapa para ver sus materiales, dirección y horario.'],
  ['¿Qué residuos puedo llevar?','Depende de cada punto. Consulta la tarjeta del marcador y nuestra guía de reciclaje.'],
  ['¿Necesito registrarme?','No para consultar la plataforma. Solo te pedimos registro si deseas inscribirte a un taller.'],
  ['¿Cómo me inscribo a un taller?','Selecciona “Registrarme” en el taller que te interese y completa el formulario.'],
  ['¿Cómo reporto un nuevo punto de reciclaje?','Usa el Buzón comunitario y comparte la información que conozcas.']
];
const $ = <T extends Element>(selector: string): T => document.querySelector(selector) as T;

function renderContent(): void {
  $('#guideCards').innerHTML = guides.map(([icon,title,what,prepare,avoid]) => `<article class="card guide-card"><div class="card-icon">${icon}</div><h3>${title}</h3><p><strong>¿Qué va aquí?</strong><br>${what}</p><p><strong>Prepáralo así:</strong><br>${prepare}</p><p><strong>No mezclar:</strong><br>${avoid}</p></article>`).join('');
  $('#workshopCards').innerHTML = workshops.map(([title,date,time,place]) => `<article class="card workshop-card"><div class="date">${date}</div><h3>${title}</h3><p>◷ ${time}<br>⌖ ${place}</p><button class="primary-button workshop-button" data-workshop="${title}">Registrarme</button></article>`).join('');
  $('#faq').innerHTML = faq.map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');
}
function showPlace(index: number): void { const p=places[index]; $('#placeCard').innerHTML=`<p class="eyebrow">PUNTO SELECCIONADO</p><h3>${p.name}</h3><div class="details"><p><b>⌖ Dirección</b><br>${p.address}</p><p><b>◷ Horario</b><br>${p.hours}</p><p><b>♻ Recibe</b><br>${p.materials}</p></div>`; }
function error(input: HTMLInputElement|HTMLTextAreaElement, message: string): void { input.parentElement?.querySelector('.field-error')?.remove(); const e=document.createElement('small');e.className='field-error';e.textContent=message;input.insertAdjacentElement('afterend',e); }
function validate(form: HTMLFormElement): boolean {
  form.querySelectorAll('.field-error').forEach(e=>e.remove()); let ok=true;
  const val=(name:string)=((form.elements.namedItem(name) as HTMLInputElement)?.value || '').trim();
  const check=(name:string, test:(v:string)=>boolean, msg:string)=>{const input=form.elements.namedItem(name) as HTMLInputElement;if(input&&!test(val(name))){error(input,msg);ok=false;}};
  check('name',v=>v.length>=3,'El nombre debe tener mínimo 3 caracteres.'); check('email',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),'El correo electrónico no es válido.');
  if(form.elements.namedItem('password')) check('password',v=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v),'La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula y número.');
  if(form.elements.namedItem('confirmPassword')) check('confirmPassword',v=>v===val('password'),'Las contraseñas no coinciden.');
  check('postalCode',v=>/^\d{5}$/.test(v),'El código postal debe tener 5 dígitos.'); check('phone',v=>/^\d{10}$/.test(v),'El teléfono debe tener 10 dígitos.'); check('message',v=>v.length>=10,'El mensaje debe tener mínimo 10 caracteres.');
  if(form.elements.namedItem('subject')) check('subject',v=>v.length>0,'El asunto es obligatorio.'); if(form.elements.namedItem('city')) check('city',v=>v.length>0,'La ciudad es obligatoria.'); return ok;
}
function wireForms(): void { document.querySelectorAll<HTMLFormElement>('form[data-success]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const status=form.querySelector<HTMLParagraphElement>('.form-status')!; if(validate(form)){status.textContent=form.dataset.success||'Enviado correctamente.';status.className='form-status success';form.reset();}else{status.textContent='Revisa los campos marcados.';status.className='form-status field-error';}})); }
function wireModals(): void { document.querySelectorAll<HTMLElement>('[data-modal]').forEach(b=>b.addEventListener('click',()=>{const target=b.dataset.modal!; if(target==='chatPanel'){toggleChat(true);return;} const modal=$<HTMLDialogElement>('#'+target); modal.showModal();})); document.querySelectorAll<HTMLElement>('[data-close]').forEach(b=>b.addEventListener('click',()=>{const el=document.getElementById(b.dataset.close!); if(el instanceof HTMLDialogElement)el.close(); else if(el)el.hidden=true;})); }
function toggleChat(open?:boolean):void { const panel=$<HTMLElement>('#chatPanel'); panel.hidden=open===undefined?!panel.hidden:!open; }
function wireChat():void { $('#chatBubble').addEventListener('click',()=>toggleChat()); $('#chatForm').addEventListener('submit',e=>{e.preventDefault();const input=$<HTMLInputElement>('#chatInput'), text=input.value.trim();if(!text)return;const messages=$('#chatMessages');messages.insertAdjacentHTML('beforeend',`<p class="user">${text}</p>`);const t=text.toLowerCase();const answer=t.includes('pila')?'Puedes consultar Puntos de acopio y seleccionar la categoría Pilas.':t.includes('aceite')?'Guarda el aceite usado en una botella cerrada y llévalo a un centro especializado.':t.includes('taller')?'Encuentra los talleres disponibles en la sección Talleres ambientales.':'Puedes consultar nuestros puntos de acopio, guía de reciclaje o preguntas frecuentes.';messages.insertAdjacentHTML('beforeend',`<p class="bot">${answer}</p>`);input.value='';messages.scrollTop=messages.scrollHeight;}); }
function wireSearch():void { const input=$<HTMLInputElement>('#searchInput'), box=$<HTMLElement>('#searchResults');const results:{key:string;label:string;href:string}[]=[{key:'pilas electrónicos aceite plástico papel cartón vidrio residuos reciclaje',label:'Guía de reciclaje',href:'#reciclaje'},{key:'puntos acopio pilas electrónicos aceite',label:'Puntos de acopio',href:'#puntos'},{key:'huerto huertos',label:'Huertos urbanos',href:'#huertos'},{key:'taller talleres',label:'Talleres ambientales',href:'#talleres'}];input.addEventListener('input',()=>{const q=input.value.toLowerCase().trim();const found=results.filter(x=>q&&x.key.includes(q));box.hidden=!q;box.innerHTML=found.length?found.map(x=>`<a href="${x.href}">${x.label}</a>`).join(''):'<p>No encontramos resultados.</p>';});box.addEventListener('click',()=>{box.hidden=true;input.value='';}); }
renderContent(); wireForms(); wireModals(); wireChat(); wireSearch();
document.querySelectorAll<HTMLButtonElement>('.marker').forEach(b=>b.addEventListener('click',()=>showPlace(Number(b.dataset.place))));
document.querySelectorAll<HTMLButtonElement>('.workshop-button').forEach(b=>b.addEventListener('click',()=>{$('#workshopTitle').textContent=`Registro: ${b.dataset.workshop}`;$<HTMLDialogElement>('#workshopModal').showModal();}));
$('.menu-toggle').addEventListener('click',()=>{const nav=$('.nav');nav.classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',String(nav.classList.contains('open')));});
