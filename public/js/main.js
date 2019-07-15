var calendar = new Calendar({
	elem: document.getElementById('calendar')
});

function Calendar(options) {
	var elem = options.elem;
	var isOpen = false;

	function createInput() {
			var input_date = document.createElement('input');
			elem.appendChild(input_date);
			input_date.setAttribute('type', 'datetime-local');
			input_date.className = 'datetime';

			var currentDate = new Date();
			var day = currentDate.getDate() < 10 ? ('0' + currentDate.getMonth()) : 
											currentDate.getDate();
			var month = (currentDate.getMonth()+1) < 10 ? 
								('0' + (currentDate.getMonth()+1)) : (currentDate.getMonth()+1);
			var year = currentDate.getFullYear();
			var hours = currentDate.getHours();
			var min = currentDate.getMinutes();
			var sec = currentDate.getSeconds();

			input_date.value =  year + '-' + month + '-' + day + 'T' + hours + ':' + min + ':' + sec;

	}
	function removeInput() {
			elem.firstChild.remove();
	}

	function close() {
		elem.firstChild.classList.remove('datetime_open');
		document.removeEventListener('click', outsideInputClick);
		isOpen = false;
		removeInput();
	}

	function open() {
		elem.firstChild.classList.add('datetime_open');
		var coords = elem.firstChild.getBoundingClientRect();
		elem.firstChild.style.marginTop = elem.firstChild.offsetHeight + 5 + 'px';		
		elem.firstChild.style.marginRight = elem.firstChild.offsetWidth / 2 + 'px';
		elem.firstChild.style.fontSize = 16 + 'px';
		elem.firstChild.style.borderSize = 3 + 'px';
		elem.firstChild.style.borderColor = 'green';
		elem.firstChild.style.borderRadius = 10 + 'px';
		document.addEventListener('click', outsideInputClick);
   		isOpen = true;		
	}

	function outsideInputClick(event) {
		if (!elem.contains(event.target)) {
			close();
		}
	}

	function toggle() {
			if (!elem.firstChild) {
				createInput();
			}
			if (elem.firstChild.classList.contains('datetime_open')) {
				close();
			}
			else open();
		}

	elem.onmousedown = function() {
		return false;
	}

	elem.onclick = function(event) {
		var target = event.target;
			if (!target.classList.contains('calendar')) {
				return;
			}
			toggle();
	}
}

var search = new Search({
	elem: document.getElementById('search_icon')
});

function Search(options) {
	var elem = options.elem;
	var isOpen = false;
	function createInput() {
			var input_search = document.createElement('input');
			elem.appendChild(input_search);
			input_search.setAttribute('type', 'search');
			input_search.className = 'search_inner_elem';

			var btn_search = document.createElement('button');
			btn_search.innerHTML = 'Search';
			btn_search.className = 'btn_search_elem';
			elem.appendChild(btn_search);
	}
	function removeInput() {
			elem.firstChild.remove();
			elem.firstChild.remove();
	}

	function close() {
		elem.firstChild.classList.remove('search_inner_elem_open');
		document.removeEventListener('click', outsideInputClick);

		elem.firstChild.classList.remove('btn_search_elem_open');
		document.removeEventListener('click', outsideInputClick);

		isOpen = false;
		removeInput();
	}

	function open() {
		elem.firstChild.classList.add('search_inner_elem_open');
		elem.children[1].classList.add('btn_search_elem_open');
		
		var coords = elem.firstChild.getBoundingClientRect();
		elem.firstChild.style.marginTop = elem.firstChild.offsetHeight + 5 + 'px';		
		elem.firstChild.style.marginRight = elem.firstChild.offsetWidth/2 + 'px';
		elem.firstChild.style.fontSize = 16 + 'px';
		elem.firstChild.style.borderSize = 3 + 'px';
		elem.firstChild.style.borderColor = 'green';
		elem.firstChild.style.borderRadius = 10 + 'px';
		document.addEventListener('click', outsideInputClick);
   		isOpen = true;	
	}

	function outsideInputClick(event) {
		if (!elem.contains(event.target)) {
			close();
		}
	}

	function toggle() {
			if (!elem.firstChild) {
				createInput();
			}
			if (elem.firstChild.classList.contains('search_inner_elem_open')) {
				close();
			}
			else open();
		}

	elem.onmousedown = function() {
		return false;
	}

	elem.onclick = function(event) {
		var target = event.target;
			if (!target.classList.contains('search_icon')) {
				return;
			}
			toggle();
	}
}

var menu_copy = new Menu({
	elem: document.getElementById('menu_copy'),
	menu_elem: document.getElementById('second_menu')
});

function Menu(options){
	var elem = this._elem = options.elem;
	var menu_elem = this._menu_elem = options.menu_elem;

	elem.onclick = function(event){
		var target = event.target;
		if (target.classList.contains('fa-toggle-down')) {
			menu_elem.classList.toggle('second_menu_open');
		}
	}
}

Menu.prototype.loadSecondMenu = function() {
		var number = 0;
		var disp = ["block","none"];
		var time = [5000, 5000];
		var elem = this._elem;

		function show(){ 
			number ^= 1;
		    elem.style.display = disp[number];
		    setTimeout(show,time[number]);
		}

		show();
}

var browser_pictures = new BrowserPictures({
	elem: document.getElementsByClassName('browser_pictures')[0],
	left: document.getElementById('browser_left'),
	center: document.getElementById('browser_center'),
	right: document.getElementById('browser_right')
});

function BrowserPictures(options){
	var elem = options.elem;
	var left = options.left;
	var center = options.center;
	var right = options.right;

	elem.onmousemove = function(event){
		var target = event.target;
		if (target.className == 'browser_right') {
			target.style.zIndex = 15;
			left.style.zIndex = 1;
			center.style.zIndex = 10;
		}
		if (target.className == 'browser_center') {
			target.style.zIndex = 15;
			left.style.zIndex = 1;
			right.style.zIndex = 10;
		}
		if (target.className == 'browser_left') {
			target.style.zIndex = 15;
			center.style.zIndex = 10;
			right.style.zIndex = 10;
			target.style.position = 'absolute';
		}
	}
}

var lupa = new Lupa({
	elem: document.getElementsByClassName('lupa')
});

function Lupa(options){
	var elem = options.elem;

	for (var i = 0; i < elem.length; i++) {
		elem[i].onclick = function(event){
			var target = event.target;
			if (target.classList.contains('lupa_active')) {
				target.parentNode.children[0].classList.toggle('big_img');
			}
		}		
	}
}

var link = new Link({
	elem: document.getElementsByClassName('link')
});

function Link(options){
	var elem = options.elem;

	function livingPage(href){
		var confirmPage = confirm('You realy wanna link to ' + href + ' ?');
		if (!confirmPage) {
			return false;
		}
		document.location.href = href;
	}

	for (var i = 0; i < elem.length; i++) {
		elem[i].onclick = function(event){
			var target = event.target;
			if (target.classList.contains('link_active')) {
				livingPage('https://learn.javascript.ru');
			}
		}		
	}
}

var picture = new Picture({
	elem: document.getElementsByClassName('picture')
});

function Picture(options){
	var elem = options.elem;
	for (var i = 0; i < elem.length; i++) {
		elem[i].onmouseover = function(event){
			var target = event.target;
				if (target.className == 'lupa') {
					target = target.previousSibling.previousSibling.previousSibling.previousSibling;
					target.style.filter = 'brightness(40%)';
				}
				if (target.className == 'link') {
					target = target.previousSibling.previousSibling;
					target.style.filter = 'brightness(40%)';
				}
				if (target.tagName == 'IMG') {
					if (target.classList.contains('big_img')) {
						target.style.filter = 'brightness(100%)';
					}
					else{
						target.style.filter = 'brightness(40%)';
					}
				}
				target.nextSibling.nextSibling.nextSibling.nextSibling.classList.add('lupa_active');	
				target.nextSibling.nextSibling.classList.add('link_active');	
		}

		elem[i].onmouseout = function(event){
			var target = event.target;
			if (target.tagName == 'IMG') {
				target.nextSibling.nextSibling.nextSibling.nextSibling.classList.remove('lupa_active');	
				target.nextSibling.nextSibling.classList.remove('link_active');
				target.style.filter = 'brightness(100%)';
			}
		}
	}		
}

var slider_arrows = new Arrow({
	elem_left: document.getElementsByClassName('left_post')[0],
	elem_right: document.getElementsByClassName('right_post')[0]
});

function Arrow(options){
	var elem_left = options.elem_left;
	var elem_right = options.elem_right;

	elem_right.onclick = function(event){
		var postList = document.getElementsByClassName('post');
		for (var i = 0; i < postList.length; i++) {
			if (postList[i].querySelector('.post_head.post_head img').classList.contains('post_active_img') &&
					i < 2) {
				postList[i].querySelector('.post_head.post_head img').classList.remove('post_active_img');
				postList[i].querySelector('.post_head > .day').classList.remove('day_active');
				postList[i].querySelector('.post_head > .month').classList.remove('month_active');

				postList[i].querySelector('.post-desc').classList.remove('post_active');
				postList[i].querySelector('.post-desc > .title_post_desc').classList.remove('post_desc_title_active');
				postList[i].querySelector('.post-desc > .post_desc_text').classList.remove('post_desc_text_active');

				postList[i+1].querySelector('.post_head.post_head img').classList.add('post_active_img');
				postList[i+1].querySelector('.post_head > .day').classList.add('day_active');
				postList[i+1].querySelector('.post_head > .month').classList.add('month_active');

				postList[i+1].querySelector('.post-desc').classList.add('post_active');
				postList[i+1].querySelector('.post-desc > .title_post_desc').classList.add('post_desc_title_active');
				postList[i+1].querySelector('.post-desc > .post_desc_text').classList.add('post_desc_text_active');
			}
			else if (i < 2) {
				elem_right.style.backgroundImage = "url('../img/left_posts.png')";
				elem_right.style.transform = 'scale(-1,1)';
				elem_left.style.backgroundImage = "url('../img/right_posts.png')";
				elem_left.style.transform = 'scale(-1,1)';
			}
		}
	}

	elem_left.onclick = function(event){
		var postList = document.getElementsByClassName('post');
		for (var i = 0; i < postList.length; i++) {
			if (postList[i].querySelector('.post_head.post_head img').classList.contains('post_active_img') &&
					i > 0) {
				postList[i].querySelector('.post_head.post_head img').classList.remove('post_active_img');
				postList[i].querySelector('.post_head > .day').classList.remove('day_active');
				postList[i].querySelector('.post_head > .month').classList.remove('month_active');

				postList[i].querySelector('.post-desc').classList.remove('post_active');
				postList[i].querySelector('.post-desc > .title_post_desc').classList.remove('post_desc_title_active');
				postList[i].querySelector('.post-desc > .post_desc_text').classList.remove('post_desc_text_active');

				postList[i-1].querySelector('.post_head.post_head img').classList.add('post_active_img');
				postList[i-1].querySelector('.post_head > .day').classList.add('day_active');
				postList[i-1].querySelector('.post_head > .month').classList.add('month_active');

				postList[i-1].querySelector('.post-desc').classList.add('post_active');
				postList[i-1].querySelector('.post-desc > .title_post_desc').classList.add('post_desc_title_active');
				postList[i-1].querySelector('.post-desc > .post_desc_text').classList.add('post_desc_text_active');
			}
		}
	}
}

var news_elem = new News({
	elem: document.getElementById('close_news_btn'),
	news_window: document.getElementsByClassName('news_window')[0],
	reload_btn: document.getElementById('news_reload'),
	news_box: document.getElementsByClassName('news_box')[0],
	news_desc: document.getElementsByClassName('news_desc')[0],
	publish: document.getElementById('publish'),
	news_read:document.getElementById('news_read')
});

function News(options){
	var elem = options.elem;
	var news_window = options.news_window;
	var reload_btn = options.reload_btn;
	var news_box = options.news_box;
	var news_desc = options.news_desc;
	var publish = options.publish;
	var news_read = options.news_read;

	elem.onclick = function(event){
		var target = event.target;
		if (target.classList.contains('fa')) {
			news_window.classList.toggle('close_window');
		}
	}

	window.onload = function(event){

		function loadSecondMenu(element) {
			var number = 0;
			var disp = ["block","none"];
			var time = [5000, 15000];

			function show(){ 
				number ^= 1;
			    element.style.display = disp[number];
			    setTimeout(show,time[number]);
			}
			show();
			}
		menu_copy.loadSecondMenu();
		news_window.classList.toggle('close_window');
	}

	news_reload.onclick = function(){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/file", true);
		xhr.send("");

		xhr.onreadystatechange = function () {
			if (xhr.status != 200) {
				console.log("status " + xhr.status);
				return;
			}
			if (xhr.readyState != 4) {
				console.log("state " + xhr.readyState);
				return;
			}
			
			var allText = xhr.responseText;
			var objArray = [];
			var arrOfItems = allText.split("{");

			for (var i = 0; i < arrOfItems.length; i++) {
				arrOfItems[i] = arrOfItems[i].replace('}','');
				var supArr = arrOfItems[i].split('","');
				var link, name, obj;
				link = supArr[0];
				name = supArr[1];
				obj = {link: link,
						name: name};
				objArray.push(obj);
			}

			var ul = document.createElement('ul');
			ul.className = 'news_reload_ul';
			news_desc.innerHTML = '';
			news_desc.appendChild(ul);

			for (var i = 1; i < objArray.length; i++) {
				var li = document.createElement('li');
				var a = document.createElement('a');
				li.className = 'news_reload_li';
				a.className = 'news_reload_link';
				a.setAttribute('href', objArray[i]['link'].replace('"link":"',''));
				a.innerHTML = objArray[i]['name'].replace('name":"', '').replace('"','');
				ul.appendChild(li);
				li.appendChild(a);
			}
		}
	}

	news_read.onclick = function () {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/scrape", true);
		xhr.send("");
	}
}
