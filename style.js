(function (blink) {
	'use strict';

	var PearsonGenericStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	PearsonGenericStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_pearsonbr',
		ckEditorStyles: {
			name: 'pearsonbr',
			styles: [

				{ name: 'Title 01', element: 'h4', attributes: { 'class': 'bck-title1'} },
				{ name: 'Title 02', element: 'h4', attributes: { 'class': 'bck-title2'} },
				{ name: 'Title 03', element: 'h4', attributes: { 'class': 'bck-title3'} },
				{ name: 'Title 04', element: 'h4', attributes: { 'class': 'bck-title4'} },
				{ name: 'Title 05', element: 'h4', attributes: { 'class': 'bck-title5'} },
				{ name: 'Title 06', element: 'h4', attributes: { 'class': 'bck-title6'} },
				{ name: 'Title 07', element: 'h4', attributes: { 'class': 'bck-title7'} },
				{ name: 'Title 08', element: 'h4', attributes: { 'class': 'bck-title8'} },
				{ name: 'Title 09', element: 'h4', attributes: { 'class': 'bck-title9'} },
				{ name: 'Title 10',element: 'h4', attributes: { 'class': 'bck-title10'} },
				{ name: 'Title 11', element: 'h4', attributes: { 'class': 'bck-title11'} },
				{ name: 'Title 12',element: 'h4', attributes: { 'class': 'bck-title12'} },
				{ name: 'Énfasis', element: 'span', attributes: { 'class': 'bck-enfasis' }},
				{ name: 'Table', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table-center'} },
				{ name: 'Cell 1', element: 'td', attributes: { 'class': 'bck-td' } },
				{ name: 'Cell 2', element: 'td', attributes: { 'class': 'bck-td-2' } },
				{ name: 'List 1', element: 'ol', attributes: { 'class': 'bck-ol' } },
				{ name: 'List 2', element: 'ol', attributes: { 'class': 'bck-ol-2' } },
				{ name: 'List 3', element: 'ol', attributes: { 'class': 'bck-ol-3' } },
				{ name: 'List 4', element: 'ol', attributes: { 'class': 'bck-ol-4' } },
				{ name: 'List 5', element: 'ol', attributes: { 'class': 'bck-ol-5' } },
				{ name: 'List 6', element: 'ol', attributes: { 'class': 'bck-ol-6' } },
				{ name: 'List 7', element: 'ol', attributes: { 'class': 'bck-ol-7' } },
				{ name: 'Bulleted list 1', element: 'ul', attributes: { 'class': 'bck-ul'} },
				{ name: 'Bulleted list 2', element: 'ul', attributes: { 'class': 'bck-ul-2'} },
				{ name: 'Bulleted list 3', element: 'ul', attributes: { 'class': 'bck-ul-3'} },
				{ name: 'Box 01', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-1' } },
				{ name: 'Box 02 ', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-2' } },
				{ name: 'Box 03', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-3' } },
				{ name: 'Box 04', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-4' } },
				{ name: 'Box 05', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-5' } },
				{ name: 'Box 06', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-6' } },
				{ name: 'Box 07', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-7' } },
				{ name: 'Box 08', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-8' } },
				{ name: 'Box 09', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-9' } },
				{ name: 'Box 10', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-10' } },
				{ name: 'Box 11', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-11' } },
				{ name: 'Box 12', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-12' } }
			]
		},

		init: function (scope) {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			var that = scope || this;
			this.parent.init.call(that);
			that.addActivityTitle();
			if(window.esWeb) return;
			that.removeFinalSlide();
			that.addSlideNavigators();
			that.handleScrollEnd();
			window.editar && that.configEditor();

			if ($('.navbar-bottom').length > 0) {
 				$('.navbar-bottom ol').wrapAll('<div id="bottom-navigator"></div>');
		 		var width = 0;
		 		$('.navbar-bottom li').each(function(i, elem){ width += $(elem).outerWidth(true); });
		 		$('.navbar-bottom ol').css('width', width * 1.1);
		 		var scroll = new IScroll('#bottom-navigator', {
		 			scrollX: true,
		 			scrollY: false,
		 			eventPassthrough: true
		 		});
		 		scroll.on('scrollEnd', that.handleScrollEnd);
		 		that.handleScrollEnd.call(scroll);
	 		}

		},

		removeFinalSlide: function (scope) {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			var that = scope || this;
			this.parent.removeFinalSlide.call(that, true);
		},

		configEditor: function (editor) {
			editor.dtd.$removeEmpty['span'] = false;
		},


		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				var initials =  blink.activity.name.match(/\b(\w)/g);

				initials = initials.slice(0, 2);
				return $(this).html().trim() + ' - ' + initials.join('') + ' > ' + blink.courseInfo.unit;
			});
		},

		handleScrollEnd: function () {
 			$('#bottom-navigator')
 				.removeClass('show_left')
 				.removeClass('show_right');

 			if (this.x < 0) {
 				$('#bottom-navigator').addClass('show_left');
 			}
 			if (this.x > this.maxScrollX) {
 				$('#bottom-navigator').addClass('show_right');
 			}

 		},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	PearsonGenericStyle.prototype = _.extend({}, new blink.theme.styles.basic(), PearsonGenericStyle.prototype);

	blink.theme.styles.pearsonbr = PearsonGenericStyle;

})( blink );

$(document).ready(function () {

    $('.item').find('.header').find('.title')
		.filter(function () {
			return $(this).find('.empty').length;
		}).hideBlink();

    $('.item').each(function(){
    	var header = $(this).find('.header')[0];
    	$(header).prepend(
    		'<div class="slide_number">' + (parseInt($(this).find('.js-slide-wrapper').attr('data-slide-index')) + 1) + '</div>' +
    		'<div class="logo_holder"></div>'
    	);
    });

    $('.item').find('.header').find('.title')
		.filter(function () {
			return !$(this).find('.empty').length;
		})
		.each(function () {
			var $header = $(this).find('h3');
			$header.length && $header.html($header.html().replace(' ', ''));
		});

	$('.box-1').css('width', '');
});
