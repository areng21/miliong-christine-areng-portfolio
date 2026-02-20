document.addEventListener('DOMContentLoaded', ()=>{
	// Chatbot AI Agent
	const chatbotMessages = document.getElementById('chatbot-messages');
	const chatbotInput = document.getElementById('chatbot-input');
	const chatbotSend = document.getElementById('chatbot-send');

	const arengResponses = {
		'who|what|areng|about': "Hi! I'm Areng, a data engineer passionate about building scalable data infrastructure. I specialize in ETL/ELT pipelines, cloud platforms (AWS, Azure, BigQuery), and data analysis using Python, SQL, and modern BI tools like Power BI and Tableau.",
		'skills|professions|expertise': "I'm proficient in: Python, SQL, R, Airflow, Apache Spark, BigQuery, AWS, Azure, Power BI, Tableau, Kobo Toolbox, STATA, SPSS, Docker, Kubernetes, Kafka, DataDog, GitHub, and CI/CD pipelines. I specialize in designing data pipelines and performing exploratory data analysis.",
		'projects|work|experience': "Check out my projects section! I've worked on Kaggle data exploration (Python/pandas), Google Drive projects, and interactive Colab notebooks. I focus on transforming raw data into actionable insights.",
		'contact|reach|email': "You can reach me at arengchristine@gmail.com or via GitHub at github.com/areng21. I'm also on X @christine_areng and available at +254-790-502-966. Feel free to get in touch!",
		'hello|hi|hey': "Hi there! Welcome to my portfolio. Ask me anything about my work, skills, or background!",
		'thanks|thank you': "You're welcome! Feel free to ask more questions!",
		'bye|goodbye|exit': "Thanks for visiting! Looking forward to connecting with you soon."
	};

	function getBotResponse(userMsg){
		const msg = userMsg.toLowerCase();
		for(const [keywords, response] of Object.entries(arengResponses)){
			const kws = keywords.split('|');
			if(kws.some(kw => msg.includes(kw))) return response;
		}
		return "Great question! For more details about my work and skills, feel free to explore my projects and technologies section, or reach out to me directly!";
	}

	function addMessage(text, sender){
		const msgDiv = document.createElement('div');
		msgDiv.className = `chatbot-message ${sender}`;
		msgDiv.textContent = text;
		chatbotMessages.appendChild(msgDiv);
		chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
	}

	function handleSend(){
		const text = chatbotInput.value.trim();
		if(!text) return;
		addMessage(text, 'user');
		chatbotInput.value = '';
		setTimeout(()=>{
			const response = getBotResponse(text);
			addMessage(response, 'bot');
		}, 300);
	}

	chatbotSend.addEventListener('click', handleSend);
	chatbotInput.addEventListener('keypress', e=>{
		if(e.key==='Enter') handleSend();
	});

	// Initial greeting
	setTimeout(()=>addMessage("Hi! I'm Areng. Ask me anything about my work, skills, or how to reach me!", 'bot'), 500);
	
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

