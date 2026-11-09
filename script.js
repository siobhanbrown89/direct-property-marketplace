const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');if(menuButton&&nav){menuButton.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(opened));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));}const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();const form=document.getElementById('search-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const purpose=document.getElementById('purpose').value;const type=document.getElementById('property-type').value;const location=document.getElementById('location').value.trim();const desc=(purpose==='all'?'rentals and sales':purpose==='rent'?'rental properties':'properties for sale')+' · '+(type==='all'?'any property type':type.toLowerCase())+' · '+(location?'in '+location:'all locations');document.getElementById('search-result').textContent='Your search: '+desc+'. Live listings will appear here once the listing and search system is connected.';});

const ownerForm=document.getElementById('owner-listing-form');
if(ownerForm){
  ownerForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!ownerForm.reportValidity()) return;
    const data=new FormData(ownerForm);
    const lines=[];
    for(const [key,value] of data.entries()){
      if(value instanceof File){
        if(value.name) lines.push(key+': '+value.name+' ('+Math.round(value.size/1024)+' KB)');
      } else if(key!=='Consent' && String(value).trim()) {
        lines.push(key+': '+value);
      }
    }
    const subject=encodeURIComponent('Direct Property — Owner Listing Enquiry');
    const body=encodeURIComponent('DIRECT PROPERTY — OWNER LISTING SUBMISSION\\n\\n'+lines.join('\\n')+'\\n\\nI understand the property listing is subject to verification and approval. I will attach the selected photographs and narrated walkthrough video to this email before sending.');
    const status=document.getElementById('listing-status');
    if(status) status.textContent='Your email application should open with the listing details prepared. Please attach the selected photographs and walkthrough video manually, review the email and press Send. The website has not uploaded or published your property.';
    window.location.href='mailto:info@royalbridges.ae?subject='+subject+'&body='+body;
  });
}
