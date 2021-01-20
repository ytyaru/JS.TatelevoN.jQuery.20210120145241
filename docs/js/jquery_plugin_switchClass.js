/* ************************************************************************* */
/* 同一グループ内にあるラジオボタンの値が変化したときtargetに所定のclass値を与える。値は$(`input[name=引数値]`).val()である。targetの初期値は$('#honbun')。
/* （addClass, removeClass, switchClass, toggleClass。jQueryに存在する左記メソッドの類似品）
/* https://www.terakoya.work/jquery-build-plugin/
/* ************************************************************************* */
(function($){
	// メソッド本体。呼出例：$('input[name=fontFamily]').alternateClass({target: '#honbun'});
	$.fn.alternateClass = function(options) {
		var defaults = {
			target: "#honbun", // CSSセレクタ文字列。classを与える要素を指定するためのjQueryCSSセレクタ文字列を指定すること。
		}
		var settings = $.extend({}, defaults, options);
		return this.each(function(){
			console.log($(this).prop('tagName').toLowerCase());
			console.log($(this).attr('type').toLowerCase());
			if ('input' != $(this).prop('tagName').toLowerCase()) { return; }
			if ('radio' != $(this).attr('type').toLowerCase()) { return; }
			if (!$(this).prop('checked')) { return; }
			const NAME = $(this).attr('name');
			const VALUE = $(this).val();
			// 同種のclass値をすべて削除する
			$(`input[name="${NAME}"]`).each(function(index, element){
				$(settings.target).removeClass($(element).val());
			});
			// 同種のうちcheckedなラジオボタンのvalue値をclassに追加する。
			$(settings.target).addClass(VALUE);
		});
	};
})(jQuery);
