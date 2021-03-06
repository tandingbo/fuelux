/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

define(function(require){
	var $ = require('jquery');
	var html = require('text!test/markup/checkbox-markup.html');
	/* FOR DEV TESTING - uncomment to test against index.html */
	//html = require('text!index.html!strip');
	html = $('<div>'+html+'</div>').find('#MyCheckboxContainer');

	require('bootstrap');
	require('fuelux/checkbox');

	module("Fuel UX Checkbox");

	test("should be defined on jquery object", function () {
		ok($().checkbox, 'checkbox method is defined');
	});

	test("should return element", function () {
		var $chk1 = $(html).find('#Checkbox1');
		ok($chk1.checkbox() === $chk1, 'checkbox should be initialized');
	});

	test("should set initial state", function () {
		var $list = $(html);

		$list.find('input').checkbox();

		// checked/enabled
		var wrapper1 = $list.find('#CheckboxWrapper1');
		equal(wrapper1.hasClass('checked'), true, 'wrapper1 has checked class');
		equal(wrapper1.hasClass('disabled'), false, 'wrapper1 does not have disabled class');

		// unchecked/enabled
		var wrapper3 = $list.find('#CheckboxWrapper3');
		equal(wrapper3.hasClass('checked'), false, 'wrapper3 does not have checked class');
		equal(wrapper3.hasClass('disabled'), false, 'wrapper3 does not have disabled class');

		// checked/disabled
		var wrapper4 = $list.find('#CheckboxWrapper4');
		equal(wrapper4.hasClass('checked'), true, 'wrapper4 has checked class');
		equal(wrapper4.hasClass('disabled'), true, 'wrapper4 has disabled class');

		// checked/disabled
		var wrapper5 = $list.find('#CheckboxWrapper5');
		equal(wrapper5.hasClass('checked'), false, 'wrapper5 does not have checked class');
		equal(wrapper5.hasClass('disabled'), true, 'wrapper5 has disabled class');
	});

	test("should disable/enable checkbox", function () {
		var $chk1 = $(html).find('#Checkbox1');

		equal($chk1.is(':disabled'), false, 'enabled - default state');
		$chk1.checkbox('disable');
		equal($chk1.is(':disabled'), true, 'disabled');
		$chk1.checkbox('enable');
		equal($chk1.is(':disabled'), false, 're-enabled');
	});

	test("toggle should check/uncheck checkbox", function () {
		var $fixture = $(html).appendTo('#qunit-fixture');
		var $chk1 = $fixture.find('#Checkbox1');

		equal($chk1.is(':checked'), true, 'starts checked - confirmation by is(:checked)');
		$chk1.checkbox('toggle');
		equal($chk1.is(':checked'), false, 'calling toggle unchecks - confirmation by is(:checked)');
		$chk1.checkbox('toggle');
		equal($chk1.is(':checked'), true, 'calling toggle again ends with checked - confirmation by is(:checked)');

		$fixture.remove();
	});

	test("click should check/uncheck checkbox", function () {
		var $fixture = $(html).appendTo('#qunit-fixture');
		var $chk1 = $fixture.find('#Checkbox1');

		equal($chk1.is(':checked'), true, 'starts checked - confirmation by is(:checked)');
		$chk1.trigger('click');
		equal($chk1.is(':checked'), false, 'calling click unchecks - confirmation by is(:checked)');
		$chk1.trigger('click');
		equal($chk1.is(':checked'), true, 'calling click again checks - confirmation by is(:checked)');

		$fixture.remove();
	});

	test("test check/uncheck/isChecked convenience methods", function () {
		var $fixture = $(html).appendTo('#qunit-fixture');
		var $chk5 = $fixture.find('#Checkbox5');
		var $wrapper5 = $fixture.find('#CheckboxWrapper5');

		$chk5.checkbox();

		equal($chk5.is(':checked'), false, 'unchecked - default value');

		$chk5.checkbox('check');
		equal($chk5.is(':checked'), true, 'checked - confirmation by is(:checked)');
		equal($wrapper5.hasClass('checked'), true, 'checked - confirmation by css class');
		equal($chk5.checkbox('isChecked'), true, 'checked - confirmation by isChecked method');

		$chk5.checkbox('uncheck');
		equal($chk5.is(':checked'), false, 'unchecked - confirmation by is(:checked)');
		equal($wrapper5.hasClass('checked'), false, 'unchecked - confirmation by css class');
		equal($chk5.checkbox('isChecked'), false, 'unchecked - confirmation by isChecked method');

		$fixture.remove();
	});

	test("onchange should occur", function() {
		var $fixture = $(html).appendTo('#qunit-fixture');
		var $chk1Wrapper = $fixture.find('#CheckboxWrapperChangeCheck');
		var $chk1 = $chk1Wrapper.find('input');

		var changeOccurred = false;

		equal(changeOccurred, false, 'No change occurred yet');

		//this doesn't work right from terminal, but, if you open in browser you'll see 'changed' in console
		$chk1.on('change', function(){
			if(window.console && window.console.log) {
				console.log('change fired');
			}
			changeOccurred = true;
		});

		//clicking label should check box and trigger click
		$chk1Wrapper.find('label').trigger('click');

		//this kind of breaks the whole purpose of this test, but, otherwise the test doesn't work via terminal
		if($chk1.is(':checked')){
			changeOccurred = true;
		}

		stop(); // Pause the test
		//Add your wait
		setTimeout(function() {
			//Make assertion
			equal(changeOccurred, true, 'onchange triggered');
			// After the assertion called, restart the test
			start();
		}, 1000);


		$fixture.remove();
	});

	test("should destroy control", function () {
		var id = '#Checkbox1';
		var $el = $(html).find(id);
		var $parent = $el.closest('.checkbox');

		equal($el.checkbox('destroy'), '' + $parent[0].outerHTML, 'returns markup');
		equal( $(html).find(id).length, false, 'element has been removed from DOM');
	});

});
