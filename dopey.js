/* dopey.js */
/*

	By @Luckypouet

	Dopey is a simple and lightweight micro templating script that support multilevel objects.
	It generates an HTML string containing updated templates with data supplied as parameter.

	@param - tpl		- DOM Reference / CSS Selector / ID of the element that contains HTML template.
	@param - data		- Object / Array of object that contains data set(s).

	@return - HTML String


	Example Template :

	<script type="text/dopey" id="tplExample">
		<div class="item __config.css__">
			<div class="title">__title__</div>
			<p>__text__</p>
		</div>
	</script>


	Example Data set :

	var dataSet = {
		config:{
			css:'custom'
		},
		title:'My title',
		text:'My text'
	};


	Example use :

	document.getElementById('myDiv').innerHTML = dopey('tplExample',dataSet);


	Result :

	<div id="myDiv">
		<div class="item custom">
			<div class="title">My title</div>
			<p>My text</p>
		</div>
	</div>

*/
;(function(){
	
	/* Vars */
	/*
		reg		- RegExp that define the pattern of variables
	*/
	var reg = /_{2}([\w\.]+)_{2}/g;

	this.dopey = function(tpl,data){

		/* Vars */
		/*
			html	- Store the HTML of the template
			data	- Ensure that data is an array of objects
			output	- Used to store generated templates before injection
		*/

		var html = tpl.innerHTML || ((/^#|\.\w/g).test(tpl))? document.querySelector(tpl).innerHTML : document.getElementById(tpl).innerHTML,
			data = (!data.length)? [data] : data || {},
			output = '';

		/* Iterate for each entry */
		for(var i in data){ addTpl(data[i]); };

		/* Return output string updated */
		return output;

		/* Generate a new template and update output string */
		function addTpl(item){

			output += html.replace(reg,function(search,memo){
				return getValue(item,memo) || '';
			});

		};

		/* Get the value of a path in the data set */
		function getValue(set,path){
			
			var array = path.split('.'),
				value = data[path] || (array.reduce)? array.reduce(function(obj,property){
					return obj[property] || {};
				},set) : eval('set[\''+array.join('\'][\'')+'\']');

			if(!value.substr) value = '';

			return value;

		};

	};
})();
