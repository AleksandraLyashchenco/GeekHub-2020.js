jQuery('table').on('paste','input', function (e) {
	e.preventDefault();

	var text = e.originalEvent.clipboardData.getData('text/plain');
	var input = e.currentTarget;

	let inputName = jQuery(input).attr('name');
	let c0 = inputName[0].charCodeAt(0) - 97;
	let r0 = parseInt(inputName[1]) - 1;

	let newArray = text.split('\n');

	newArray = newArray.map(function (person){
		return person.split(';');
	});

	let rows = newArray.length;
	let cols = newArray[0].length;

	let tr0 = jQuery('table thead tr').first();

	for (let c = jQuery('table > thead > tr > th').length - 1; c < cols + c0; c++) {
		tr0.append('<th>' + String.fromCharCode(65 + c) + '</th>');
	}

	let tbody = jQuery('table tbody').first();
	tbody.empty();

	for (let r = 0; r < rows + r0; r++) { 
		let tr = jQuery('<tr></tr>');
		tr.append('<th>' + (r + 1) + '</th>');
        for (let c = 0; c < cols + c0; c++) {
			let name = String.fromCharCode(97 + c)+(r + 1);
			let value = r >= r0 && c >= c0 ? newArray[r - r0][c - c0] : '' ;
			let inp = jQuery('<input type="text" name="' + name + '" value=""/>');
			inp.val(value);

			tr.append($('<td></td>').append(inp));			
		} 
		tbody.append(tr);
	}
});

var currentColumn;

jQuery('thead th').on('contextmenu', function (e) {
	e.preventDefault();

	currentColumn = e.currentTarget;

	var menu = jQuery('#column-menu');

	menu.addClass('d-block');

	menu.css({
		left: e.clientX,
		top: e.clientY
	});
});

jQuery('#column-menu [data-action]').on('click', function (e) {
	e.preventDefault();

	var action = e.currentTarget.getAttribute('data-action');

	switch (action) {
		case 'add-left':

			break;

		case 'add-right':

			break;

		case 'remove':

			break;
	}

	jQuery('#column-menu').removeClass('d-block');
});