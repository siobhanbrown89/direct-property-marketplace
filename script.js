const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.main-nav');if(menuButton&&nav){menuButton.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(opened));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));}const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();const form=document.getElementById('search-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const purpose=document.getElementById('purpose').value;const type=document.getElementById('property-type').value;const location=document.getElementById('location').value.trim();const desc=(purpose==='all'?'rentals and sales':purpose==='rent'?'rental properties':'properties for sale')+' · '+(type==='all'?'any property type':type.toLowerCase())+' · '+(location?'in '+location:'all locations');document.getElementById('search-result').textContent='Your search: '+desc+'. Live listings will appear here once the listing and search system is connected.';});
const ownerForm=document.getElementById('owner-listing-form');
if(ownerForm){
  ownerForm.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(ownerForm);
    const lines=[];
    for(const [key,value] of data.entries()){
      if(value instanceof File){
        if(value.name) lines.push(key+': '+value.name+' ('+Math.round(value.size/1024)+' KB)');
      } else if(key!=='Consent') {
        lines.push(key+': '+value);
      }
    }
    const output='DIRECT PROPERTY — OWNER LISTING SUMMARY\\n\\n'+lines.join('\\n')+'\\n\\nIMPORTANT: This is a local preview summary only. The selected photos and video have not been uploaded, submitted, reviewed or published. Please contact Royal Bridges through the confirmed official channel to arrange secure submission.';
    const blob=new Blob([output],{type:'text/plain'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=url;
    link.download='direct-property-owner-listing-summary.txt';
    link.click();
    URL.revokeObjectURL(url);
    const status=document.getElementById('listing-status');
    if(status) status.textContent='Your listing summary has been prepared on this device. Your media files remain on your device and have not been uploaded or published.';
  });
}
