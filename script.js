document.addEventListener('DOMContentLoaded', ()=>{
	const navToggle = document.getElementById('nav-toggle');
	const nav = document.getElementById('primary-nav');
	if(navToggle && nav){
		navToggle.addEventListener('click', ()=>{
			const open = nav.classList.toggle('open');
			navToggle.setAttribute('aria-expanded', String(open));
		});
	}

	// Smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', e=>{
			const href = a.getAttribute('href');
			if(href && href.startsWith('#')){
				const target = document.querySelector(href);
				if(target){
					e.preventDefault();
					target.scrollIntoView({behavior:'smooth',block:'start'});
					if(nav.classList.contains('open')){nav.classList.remove('open');navToggle.setAttribute('aria-expanded','false')}
				}
			}
		})
	})

	// Lightweight contact form handler
	const form = document.getElementById('contact-form');
	if(form){
		form.addEventListener('submit', e=>{
			e.preventDefault();
			const name = form.elements['name'].value.trim();
			const email = form.elements['email'].value.trim();
			const message = form.elements['message'].value.trim();
			if(!name||!email||!message){alert('Please complete the form.');return}
			// Build mailto as a simple fallback
			const subject = encodeURIComponent('Portfolio contact from '+name);
			const body = encodeURIComponent(message + '\n\n— ' + name + ' ('+email+')');
			window.location.href = `mailto:arengchristine@gmail.com?subject=${subject}&body=${body}`;
		})
	}
})

