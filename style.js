(function (blink) {
	'use strict';

	var pearsonbrStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	pearsonbrStyle.prototype = {
		// Heredamos de basic los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_pearsonbr',
        ckEditorStyles: {
			name: 'pearsonbr',
			styles: [
				{ name: 'Title 1', element: 'h4', attributes: { 'class': 'bck-title1'} },
				{ name: 'Title 2', element: 'h4', attributes: { 'class': 'bck-title2'} },
				{ name: 'Title 3', element: 'h4', attributes: { 'class': 'bck-title3'} },
				{ name: 'Title 4', element: 'h4', attributes: { 'class': 'bck-title4'} },
				{ name: 'Title 5', element: 'h4', attributes: { 'class': 'bck-title5'} },
				{ name: 'Title 6', element: 'h4', attributes: { 'class': 'bck-title6'} },
				{ name: 'Title 7', element: 'h4', attributes: { 'class': 'bck-title7'} },
				{ name: 'Title 8', element: 'h4', attributes: { 'class': 'bck-title8'} },
				{ name: 'Title 9', element: 'h4', attributes: { 'class': 'bck-title9'} },
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
				{ name: 'Box 1', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-1' } },
				{ name: 'Box 2 ', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-2' } },
				{ name: 'Box 3', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-3' } },
				{ name: 'Box 4', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-4' } },
				{ name: 'Box 5', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-5' } },
				{ name: 'Box 6', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-6' } },
				{ name: 'Box 7', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-7' } },
				{ name: 'Box 8', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-8' } },
				{ name: 'Box 9', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-9' } },
				{ name: 'Box 10', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-10' } },
				{ name: 'Box 11', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-11' } },
				{ name: 'Box 12', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-12' } }
			]
		},
		slidesTitle: {},

		init: function (scope) {
			// Utilizamos this.parent declarada al inicio de la clase para llamar al init de la misma.
			var that = scope || this;
			this.parent.init.call(that);
            this.addActivityTitle();
            that.getActualUnitActivities();
            blink.events.on("course_loaded", function(){
				that.formatCarouselindicators();
			});
			that.addSlideNavigators();

		},
		initTOC: function(scope) {
			// Utilizamos this.parent declarada al inicio de la clase para llamar al init de la misma.
			var that = scope || this;
			this.parent.initTOC && this.parent.initTOC.call(that);

			that.habilitarTemas();
		},
		removeFinalSlide: function (scope) {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			var that = scope || this;
			if(!esExamen){
				this.parent.removeFinalSlide.call(that, true);
			}
		},
		loadUserData: function () {
			var urlSeguimiento = '/include/javascript/seguimientoCurso.js.php?idcurso=' + idcurso + (!!idalumno ? '&idalumno=' + idalumno : '');
			loadScript(urlSeguimiento, true, (function (data) {
				window.actividades = actividades;
			}).bind(this));
		},
		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			var $navbarTitle = $('.navbar.libro').find('span.title'),
				numSecNeedle = /numSec=\d+/g,
				urlEditParam = getUrlParameters()['editar'],
				isEditMode = urlEditParam
					? !!parseInt(urlEditParam)
					: editar;

			// URLS
			var unitUrl = window.location.origin + window.location.pathname.replace('clases2', 'curso2') + '?idcurso=' + idcurso + '&idtema=' + blink.courseInfo.IDUnit,
				activityUrl = window.location.search.search(numSecNeedle) !== -1
					? window.location.href.replace(numSecNeedle, 'numSec=1')
					: window.location.href.replace('?', '?numSec=1&');

			var wrapWithAnchor = function(element, href) {
				if (!href && typeof href === 'undefined') return element;
				if (!element) return false;

				var anchor = document.createElement('A');
				anchor.href = href;
				anchor.append(element);
				return anchor;
			};

			var linkeable = !isEditMode && (!checkModoExamen() && !checkModoCorreccion() && !checkModoRevision() && (checkModoPracticas() && !esPopup));
			var unitHTML = linkeable
					? wrapWithAnchor(blink.courseInfo.unit, unitUrl).outerHTML
					: blink.courseInfo.unit,
				activityHTML = linkeable
					? wrapWithAnchor(blink.courseInfo.lesson, activityUrl).outerHTML
					: blink.courseInfo.lesson;

			$navbarTitle
				.css('display', 'inline-block')
				.html(unitHTML + ' > ' + activityHTML);
        },

        /**
		 * @summary Gets the activity type subunits of the actual unit.
		 * @return {Object} Object of the actual unit filtering the not activity type subunits
		 */
		getActualUnitActivities: function () {
			var curso = blink.getCourse(idcurso),
				that = this,
				units,
				unitSubunits,
				actualActivity,
				unitActivities = [];

			curso.done(function () {
				units = curso.responseJSON.units;

				$.each(units, function () {
					if (this.id && blink.courseInfo && this.id == blink.courseInfo.IDUnit) {
						unitSubunits = this.subunits.concat(this.resources);
					}
				});

				actualActivity = _.find(unitSubunits, function(subunit) {
					return subunit.id == idclase;
				});

				if (typeof actualActivity !== "undefined" && actualActivity.level == '6') {
					unitActivities.push(actualActivity);
				} else {
					unitActivities = _.filter(unitSubunits, function(subunit) {
						return subunit.type == 'actividad' && subunit.level !== '6';
					});
				}

                that.subunits = unitActivities;
                pearsonbrApp.customBookIndex(curso.responseJSON);
			}).done(function(){
				blink.events.trigger('course_loaded');
			});
		},

        /**
		 * @summary Getting active slide position in relation with the total of the
		 *          unit slides.
		 * @param {Array} $subunits Array of activity type objects
		 * @return {int} Slide position
		 */
		getActualSlideNumber: function (subunits) {
			var actualSlideIndex = $('.swipeview-active').attr('data-page-index'),
				actualSlide = 1;

			for (var i in subunits) {
				if (subunits[i].id && parseInt(subunits[i].id) != idclase) {
					actualSlide += blink.activity.getActivityPages(subunits[i]);
				} else {
					actualSlide += parseInt(actualSlideIndex);
					break;
				}
			}

			return actualSlide;
		},
        formatCarouselindicators: function (scope, classNavbar) {
			var that = scope || this,
				navbar = ((typeof classNavbar !== "undefined" && !classNavbar)?classNavbar:'pearsonbr-navbar'),
				$navbarBottom = $('.navbar-bottom'),
				firstSlide = eval('t0_slide');
			if(blink.courseInfo && blink.courseInfo.courseDateCreated) var courseYearCreated = new Date(blink.courseInfo.courseDateCreated).getFullYear();
			var yearCopy = courseYearCreated !== undefined ? courseYearCreated : 2019;
			$navbarBottom
				.attr('class', navbar)
				.wrapInner('<div class="navbar-content"></div>')
				.find('ol')
					.before('<span class="copyright">&copy;' +  yearCopy + '</span>')
					.wrap('<div id="top-navigator"/>')
					.remove()
					.end();

			$('#volverAlIndice').click(function() {
				return showCursoCommit();
			});

			var no_concatenadas = blink.activity.getActivityLength();

			var subunits = that.subunits,
				totalSlides = 0,
				subunit_index,
				subunit_pags;

			// Different behaviour depending on whether the slides are accessed from
			// a book or from a homework link or similar
			if (subunits.length !== 0) {
				for (var i in subunits) {
					if (subunits[i].pags) {
						var subunitSlides = blink.activity.getActivityPages(subunits[i]);
						totalSlides += subunitSlides;
					}
					if (subunits[i].id && subunits[i].id == idclase) {
						subunit_index = i;
						subunit_pags = blink.activity.getActivityPages(subunits[i]);
					}
				}

				that.totalSlides = (checkModoExamen())?blink.activity.numSlides:totalSlides;

				$('#top-navigator').append('<span class="left slider-navigator">' +
						'<span class="fa fa-chevron-left"></span>' +
					'</span>' +
					'<span class="slide-counter" data-subunit-index="' + subunit_index +
						'" data-subunit-pags="' + subunit_pags + '">' +
						(window.activeSlide + 1) + ' / ' + blink.activity.sections.length  +
					'</span>' +
					'<span class="right slider-navigator">' +
						'<span class="fa fa-chevron-right"></span>' +
					'</span>');

				blink.events.on('section:shown', function() {
					$('.slide-counter').html((window.activeSlide + 1) + ' / ' + blink.activity.sections.length );
				});
			} else {
				$('#top-navigator').append('<span class="left slider-navigator">' +
						'<span class="fa fa-chevron-left"></span>' +
					'</span>' +
					'<span class="slide-counter">' + (window.activeSlide + 1) +
						' / ' + blink.activity.sections.length +
					'</span>' +
					'<span class="right slider-navigator">' +
						'<span class="fa fa-chevron-right"></span>' +
					'</span>');

				blink.events.on('section:shown', function() {
					$('.slide-counter').html((window.activeSlide + 1) +
						' / ' + blink.activity.sections.length);
					$('.bck-dropdown-2').hideBlink();
				});
			}

			// BK-24211 Quitamos escuchador section:shown, duplica procesos innecesarios

			if(activeSlide == 0) {
				$('.left.slider-control').addClass('disabled')
			}

			if(activeSlide + 1  == blink.activity.sections.length) {
				$('.right.slider-control').addClass('disabled')
			}

			if (firstSlide && firstSlide.seccion) {
				$navbarBottom.addClass('first-is-section');
			}

			blink.events.trigger(true, 'style:endFormatCarousel');
        },

		addSlideNavigators: function () {
			var that = this;
			blink.events.on("course_loaded", function(){
				var that = blink.activity.currentStyle,
					subunit_index = parseInt($('.slide-counter').attr('data-subunit-index')),
					level_six = that.subunits.length == 1 && that.subunits[0].level == 6;

				$('.slider-control').off('click');

				// Navigation change depending on whether the slides are accessed from
				// a book or from a homework link or similar
				if (that.subunits.length !== 0 && !level_six) {
					// Slider controls must allow navigation among all the activity subunits
					// in the current unit.
					var idgrupo = window.idgrupo,
						idalumno = window.idalumno,
						slideNavParams = '';
					if (idgrupo) slideNavParams += '&idgrupo=' + idgrupo;
					if (idalumno) slideNavParams += '&idalumno=' + idalumno;
					if(activeSlide + 1  == blink.activity.sections.length && !checkModoExamen()) {
						$('.right.slider-control, .right.slider-navigator').addClass('disabled')
					}
					if(activeSlide == 0) {
						$('.left.slider-control, .left.slider-navigator').addClass('disabled')
					}
					$('.left.slider-control, .left.slider-navigator').click(function () {
						if (!$(this).hasClass('disabled')) {
							if(activeSlide == 0) {
								$(this).addClass('disabled')
							} else {
								blink.activity.showPrevSection();
							}
						}
					});
					$('.right.slider-control, .right.slider-navigator').click(function () {
						if (!$(this).hasClass('disabled')) {
							if(activeSlide + 1  == blink.activity.sections.length && !checkModoExamen()) {
								$(this).addClass('disabled')
							} else {
								blink.activity.showNextSection();
							}
						}
					});
				} else {
					$('.left.slider-control, .left.slider-navigator').click(function () {
						blink.activity.showPrevSection();
					});
					$('.right.slider-control, .right.slider-navigator').click(function () {
						blink.activity.showNextSection();
					});
				}

				that.enableSliders();

				$(document).ready(function() {
					blink.events.on('showSlide:after', function() {
						that.enableSliders();
					});
				});
			});
		},

		/**
		 * @summary Enables all slider controls and disables when appropiate
		 */
		enableSliders: function () {
			// Removes disabled class to all navigation buttons and applies
			// just if its first or last slide of all activities

			$('.slider-control, .slider-navigator').removeClass('disabled');
			if(activeSlide + 1  == blink.activity.sections.length && !checkModoExamen()) {
				$('.right.slider-control, .right.slider-navigator').addClass('disabled')
			}
			if(activeSlide == 0) {
				$('.left.slider-control, .left.slider-navigator').addClass('disabled')
			}
			var that = blink.activity.currentStyle,
				subunit_index = parseInt($('.slide-counter').attr('data-subunit-index')),
				level_six = this.subunits.length == 1 && this.subunits[0].level == 6,
				slidePages = blink.activity.getActivityLength(),
				nextActivity = activeSlide === slidePages - 1;

			// Navigation change depending on whether the slides are accessed from
			// a book or from a homework link or similar
			if (this.subunits.length !== 0 && modoVisualizacionLabel != "standalone") {
				if (this.getActualSlideNumber(this.subunits) == 1) {
					$('.slider-control.left, .slider-navigator.left').addClass('disabled');
				}
				if (this.getActualSlideNumber(this.subunits) == this.totalSlides && !level_six && !checkModoExamen()) {
					$('.slider-control.right, .slider-navigator.right').addClass('disabled');
				}
			} else {
				if (window.activeSlide == 0) {
					$('.slider-control.left, .slider-navigator.left').addClass('disabled');
				}
				if(nextActivity && !level_six){
					$('.slider-control.right, .slider-navigator.right').addClass('disabled');
				}
			}
		},
		showBookIndexInClass: function () {
			return modoVisualizacionLabel != "standalone";
		},
        habilitarTemas: function(){

			var $temas = $(".js-indice-tema");
            $temas.removeClass("disabled locked");
            $temas.each(function(){

				var id_tema = $(this).attr("data-id");
				var selector_accesos = ".unit-content[data-id='" + id_tema + "'] .js-list-activities li .item-containment .acceso";

				var t_actividades_abiertas = $(selector_accesos + ".invisible").length;
                var t_accesos = $(selector_accesos).length;

                var el_tema = $("#tema" + id_tema);

                if(el_tema.hasClass("pearsonbr-toc-unithead")){
                    var c_temas_incluidos = 0;
                    $temas.each(function(){
                        if($(this).attr("data-id") != id_tema){
                            if(!$(this).hasClass("pearsonbr-toc-unithead")){
                                c_temas_incluidos++;
                            }else{
                                c_temas_incluidos = 0;
                            }
                        }
                    });
                }
            });
        }
	};

	pearsonbrStyle.prototype = _.extend({}, new blink.theme.styles.basic(), pearsonbrStyle.prototype);

	blink.theme.styles['pearsonbr'] = pearsonbrStyle;

	blink.events.on('digitalbook:bpdfloaded', function() {
		blink.getCourse(idcurso).done(function(response) {
			var unit = _.findWhere(response.units, {id: idtema.toString()}),
				subunit = _.findWhere(unit.subunits, {id: window.idclase.toString()}),
            	title = unit.title.replace(/(<([^>]+)>)/ig,""),
            	subunitTitle = (subunit)?subunit.title.replace(/(<([^>]+)>)/ig,""):"",
            	$navbarTitle = $('.navbar.libro').find('span.title');
			$navbarTitle.html(title + ' > ' + subunitTitle);
		});
	});

	// Remove Info
	blink.events.on('indexLoaded', function () {
		pearsonbrApp.customBookIndex();
	});

})(blink);


$(function () {
	loadJSON(function (json) {
		// console.log(json);
	})
});
/**
 * loadJSON Ejecuta una llamada asíncrona dependiendo del entorno para obtener el cursoJSON
 * @param  	function 	callback 	Función de callback del ajax.
 * @return 	boolean		False en caso de que no haya callback.
 */
function loadJSON(callback) {
	if (!callback && typeof callback === 'undefined') {
		return false;
	}

	if (!blink.isApp) { //online
		blink.getCourse(window.idcurso).done(callback);
	} else { //local
		var url = "/coursePlayer/curso_json.php?idcurso="+window.idcurso;

		$.ajax({
			url: url,
			dataType: 'json',
			beforeSend: function (xhr) {
				if (xhr.overrideMimeType) xhr.overrideMimeType("application/json");
			},
			success: callback
		});
	}
}



var pearsonbrApp = window.pearsonbrApp || {};

pearsonbrApp.courseData = '';
pearsonbrApp.tags = {
    home : 'home',
    unithead : 'unit_head'
}

pearsonbrApp.text = {
    menu : 'Menu'
}

pearsonbrApp.getCourseData = function() {

    loadJSON(function(json) {
        pearsonbrApp.courseData = json;
        pearsonbrApp.init();
    });

}

pearsonbrApp.customBookIndex = function(data) {

    if (data !== undefined){
        pearsonbrApp.courseData = data;
    } else {
        data = pearsonbrApp.courseData;
    }

    var newBookIndexHeader = '<div class="pearsonbr-bookindex-header"><h2 class="pearsonbr-title-1">'+pearsonbrApp.text.menu+'</h2></div>';
	var headerExists = $('#book-index #wrapper .pearsonbr-bookindex-header').length;

	if (!headerExists) $('#book-index #wrapper').prepend(newBookIndexHeader);

	$.each(data.units, function(i, unit) {
		var unitId = unit.id,
				unitTags = unit.tags,
				unitTagsArray = (typeof unitTags !== 'undefined') ? unitTags.toLowerCase().split(" ") : [];

		var $listUnitsItem = $('#list-units li[data-id="'+unitId+'"]');

		if (unitTagsArray.length) {
			if (unitTagsArray.indexOf(pearsonbrApp.tags.home) >= 0 ) {
				$listUnitsItem.hide();
			}

			if (unitTagsArray.indexOf(pearsonbrApp.tags.unithead) >= 0 ) {
				$listUnitsItem.addClass('pearsonbr-toc-unithead');
				if ($listUnitsItem.prevAll('li').first().hasClass('pearsonbr-toc-unithead')) {
					$listUnitsItem.prevAll('li').first().addClass('pearsonbr-toc-unithead_empty');
				}
				if (!$listUnitsItem.nextAll('li').length) {
					$listUnitsItem.addClass('pearsonbr-toc-unithead_empty');
				}
			}
		}
	});

	$('#list-units li.pearsonbr-toc-unithead.disabled').each(function(i,e) {
		if ($(e).nextAll('li').first().hasClass('pearsonbr-toc-unithead') || !$(e).nextAll('li').length) {
			$(e).addClass('pearsonbr-toc-unithead_empty');
		} else {
			$(e).removeClass('disabled locked').addClass('pearsonbr-toc-disabled');
		}
	});

	if (!$('#list-units li.pearsonbr-toc-unithead').length) {
		$('#list-units li').addClass('pearsonbr-toc-subunit-active pearsonbr-toc-subunit-woparent');
	}
	if ($('#list-units li.pearsonbr-toc-unithead').first().prevAll('li:not(.pearsonbr-toc-home)').length) {
		$('#list-units li.pearsonbr-toc-unithead').first().prevAll('li:not(.pearsonbr-toc-home)').addClass('pearsonbr-toc-subunit-active pearsonbr-toc-subunit-woparent');
	}

	var $currentParent = $('#book-index .current-parent');
	if (!$currentParent.hasClass('pearsonbr-toc-unithead')) {
		$currentParent
			.addClass('pearsonbr-toc-subunit-active')
			.prevUntil('.pearsonbr-toc-unithead', 'li')
				.addClass('pearsonbr-toc-subunit-active')
				.end()
			.nextUntil('.pearsonbr-toc-unithead', 'li')
				.addClass('pearsonbr-toc-subunit-active');
	} else {
		$currentParent.addClass('pearsonbr-toc-active').nextUntil('.pearsonbr-toc-unithead', 'li').addClass('pearsonbr-toc-subunit-active');
	}

}

pearsonbrApp.getTocInfo = function() {

    var data = pearsonbrApp.courseData;

    $.each(data.units, function(i, unit) {
        var unitTitle = unit.title,
            unitDescription = unit.description,
            unitId = unit.id,
			unitTags = unit.tags;

			var unitTagsArray = (typeof unitTags !== 'undefined') ? unitTags.toLowerCase().split(" ") : [];

			var newHeader = '<div class="pearson-header"><h2 class="pearsonbr-title-1">'+unitTitle+'</h2><div class="pearsonbr-description">'+unitDescription+'</div></div>';

        var $currentUnit = $('#indice .unit-content[data-id="'+unitId+'"]');
        $currentUnit.find('.content').prepend(newHeader);

        var $currentListUnit = $('#list-units li[data-id="'+unitId+'"]');

        if (unitTagsArray.length) {
            if (unitTagsArray.indexOf(pearsonbrApp.tags.home) >= 0 ) {
                $currentUnit.addClass('pearsonbr-toc-home pearsonbr-toc-home-content');
                $currentListUnit.addClass('pearsonbr-toc-home');
            }

            if (unitTagsArray.indexOf(pearsonbrApp.tags.unithead) >= 0 ) {
                $currentListUnit.addClass('pearsonbr-toc-unithead');
                if ($currentListUnit.prevAll('li').first().hasClass('pearsonbr-toc-unithead')) {
                    $currentListUnit.prevAll('li').first().addClass('pearsonbr-toc-unithead_empty');
                }
                if (!$currentListUnit.nextAll('li').length) {
                    $currentListUnit.addClass('pearsonbr-toc-unithead_empty');
                }
            }
        }

        $.each(unit.subunits, function(i, subunit) {

			var subunitId = subunit.id,
					subunitTag = subunit.tags;

			var subunitTagsArray = (typeof subunitTag !== 'undefined') ? subunitTag.toLowerCase().split(" ") : ['self'];

			var $subunitIdItem = $('#indice .unit-content .item[data-id="'+subunitId+'"]');

			if (subunitTagsArray.length) {
				$subunitIdItem.addClass('pearsonbr-icon');

				$.each(subunitTagsArray, function(i, tag) {
					$subunitIdItem.addClass('pearsonbr-icon-'+tag);
				});
			}

        });
    });

    var $current = $('#list-units .litema.active');
    $current.addClass('pearsonbr-toc-active').nextUntil('.pearsonbr-toc-unithead', 'li').addClass('pearsonbr-toc-subunit-active active');

    if (!$current.hasClass('pearsonbr-toc-unithead')){
        $current.addClass('pearsonbr-toc-subunit-active').prevUntil('.pearsonbr-toc-unithead', 'li').addClass('pearsonbr-toc-subunit-active').prevAll('.pearsonbr-toc-unithead').first().addClass('pearsonbr-toc-unithead-ancestor');
    } else {
        $current.addClass('pearsonbr-toc-unithead-ancestor');
    }

    if (!$('#list-units li.pearsonbr-toc-unithead').length) {
        $('#list-units li').addClass('pearsonbr-toc-subunit-active active pearsonbr-toc-subunit-woparent');
    }
    if ($('#list-units li.pearsonbr-toc-unithead').first().prevAll('li:not(.pearsonbr-toc-home)').length) {
        $('#list-units li.pearsonbr-toc-unithead').first().prevAll('li:not(.pearsonbr-toc-home)').addClass('pearsonbr-toc-subunit-active pearsonbr-toc-subunit-woparent');
    }
}


// INIT

pearsonbrApp.init = function() {

    pearsonbrApp.getTocInfo();

}


$(document).ready(function() {

    pearsonbrApp.getCourseData();

	if(!blink.user.esAlumno()){
		$("body").addClass("not-student");
	}

    $('body').on('click', '#list-units .js-indice-tema', function(e) {

			if($('img').parent().hasClass('icon-planning')){
				if(e.target.tagName === 'IMG') return false
			};



        if (!$(this).hasClass('pearsonbr-toc-unithead')) {
            $(this).prevAll('li.pearsonbr-toc-unithead').first().addClass('pearsonbr-toc-unithead-ancestor');
        } else {
            var $sublevels = $(this).nextUntil('.pearsonbr-toc-unithead', 'li');
            if ($(this).hasClass('pearsonbr-toc-active')) {
                if ($sublevels.first().hasClass('pearsonbr-toc-subunit-active')) {
                    $(this).removeClass('pearsonbr-toc-unithead-ancestor');
                } else {
                    $(this).addClass('pearsonbr-toc-unithead-ancestor');
                }
                $sublevels.toggleClass('pearsonbr-toc-subunit-active');
            } else {
                $(this).addClass('pearsonbr-toc-unithead-ancestor');
                $sublevels.addClass('pearsonbr-toc-subunit-active');
            }
        }
        if ($(this).hasClass('pearsonbr-toc-disabled')) {
            $('#book-index .col-main').addClass('pearsonbr-hidden');
        } else {
            $('#book-index .col-main').removeClass('pearsonbr-hidden');

        }
        $(this).siblings('li').removeClass('pearsonbr-toc-active').end().addClass('pearsonbr-toc-active');
    });


});

Slide.prototype.resetAnswersBeforeShowPartialSolution = true;

Slide_multiplechoice.prototype.showNextSolution = function(){
	var id = -1;
	var $isLastElem = true;
	for (var i=0; i<this.numElementos; i++) {
		if (this.useExamples && this.exampleIndex == i) continue;
		var $elemsNoSol = $("[id*="+this.prefijo+"v" + i + "]." + this.solutionStyleClass);
		if (id == -1) {
			if (this.isSolution(i)) {
				if($elemsNoSol.length==0){
			 		id = i;
					this.solutionPartialShown = true;
			 		this.showElemSolution(id);
			 	}
			 }
		} else {
	 		//si es la ultima solucion cambiamos estados a que todas las soluciones se estan viendo.
		 	if($elemsNoSol.length==0) {
		 		$isLastElem = false;
			 	break;
		 	}
		}
	}
	if($isLastElem){
		switchSolution(this.prefijo);
	}
	this.setReviewButtons();
};

Slide.prototype.reviewButtons.principal["btn-next"] = {
	"btnTextDef" : textweb('pearson-pearsonbr_nextAnswer'),
	isVisible: function (slide, status) {
		return slide.tienePistas || (slide.esJuegoAutoevaluable && !slide.isDone()) || null;
	},
	isActive: function(slide, status) {
		return !slide.solutionShown || slide.esJuegoAutoevaluable || null;
	},
	"statusOptions" : {
		"conIntentos" 		: { "visible" : true, 	"active"	: true 	},
		"conTodoRelleno" 	: { "visible" : true, 	"active"	: true 	},
		"sinIntentos" 		: { "visible" : true, 	"active"	: true 	},
		"sinRespuesta" 		: { "visible" : true, 	"active"	: true 	},
		"solucion" 			: { "visible" : true, 	"active"	: false	},
		"pistaMostrada"		: { "visible" : true, 	"active"	: false	},
		"juegoRelleno"		: { "visible" : true, 	"active"	: true 	},
		"juegoSinIntentos" 	: { "visible" : true, 	"active"	: true 	},
		"solucionJuego" 	: { "visible" : true, 	"active"	: false },
		"juegoCorreccion" 	: { "visible" : false, 	"active"	: false	},
		"juegoRevision" 	: { "visible" : false, 	"active"	: false }
	}
};

Slide.prototype.reviewButtons.principal["btn-solution"] = {
	"btnTextDef" : textweb('pearson-pearsonbr_solution'),
	isVisible: function(slide, status) {
		return slide.tienePistas || slide.esJuegoAutoevaluable || null;
	},
	isActive: function(slide, status) {
		return slide.tienePistas || slide.esJuegoAutoevaluable || null;
	},
	"statusOptions" : {
		"conIntentos" 		: { "visible" : true, 	"active"	: true 	},
		"conTodoRelleno" 	: { "visible" : true, 	"active"	: true 	},
		"sinIntentos" 		: { "visible" : true, 	"active"	: true 	},
		"sinRespuesta" 		: { "visible" : true, 	"active"	: true 	},
		"solucion" 			: { "visible" : true, 	"active"	: true  },
		"pistaMostrada"		: { "visible" : true, 	"active"	: true	},
		"correccion" 		: { "visible" : true, 	"active"	: true 	},
		"revision" 			: { "visible" : true, 	"active"	: true 	},
		"juegoRelleno"		: { "visible" : true, 	"active"	: true 	},
		"juegoSinIntentos" 	: { "visible" : true, 	"active"	: true 	},
		"solucionJuego" 	: { "visible" : true, 	"active"	: true  },
		"juegoCorreccion" 	: { "visible" : true, 	"active"	: true 	},
		"juegoRevision" 	: { "visible" : true, 	"active"	: true 	}
	}
};
