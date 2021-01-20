/* ******************************************************************************** */
/* ******************************************************************************** */

/* 
 * HTMLで作成した要素をラジオボタンにする。
 */
/*  HTML

// CSSのURLを定義
//	var URL_CSS_TATE= './css/tategaki.css';    // 縦書きCSS
//	var URL_CSS_YOKO= './css/yokogaki.css';    // 横書きCSS
const URL_CSS_TATE= './css/tategaki.css';    // 縦書きCSS
const URL_CSS_YOKO= './css/yokogaki.css';    // 横書きCSS
// jQuery
$(document).ready(
	function() {
		//縦書き横書き切り替え
		var w = $(window).width();
		var x = 480;
		if (w >= x) {
		// 画面読み込み時の縦横切り替えボタンのカレントクラス付与
			if (!Cookies.get('cookieTateyoko')) {
				// クッキー未登録時にlinkタグを診断してカレントクラスを付与
				if ($('#novelTateyoko').attr('href').match(/tategaki/)) {
					$('#btn_tategaki').addClass('current');
					tategakiScroll();
				} else {
					$('#btn_yokogaki').addClass('current');
				}
			} else if (Cookies.get('cookieTateyoko') == 'tategaki') {
				// クッキー縦書き登録であれば縦書き表示にクラス付与
					$('#btn_yokogaki').removeClass('current');
					$('#btn_tategaki').addClass('current');
				// 縦書きCSSを読み込み設定
					$("#novelTateyoko").attr("href" , URL_CSS_TATE);
				//スクロールバー
					tategakiScroll();
			} else if (Cookies.get('cookieTateyoko') == 'yokogaki') {
				// クッキー横書き登録であれば横書き表示にクラス付与
					$('#btn_tategaki').removeClass('current');
					$('#btn_yokogaki').addClass('current');
				// 横書きCSSを読み込み設定
					$("#novelTateyoko").attr("href" , URL_CSS_YOKO);
			}
		} else {
			// 横書きCSSを読み込み設定
				$("#novelTateyoko").attr("href" , URL_CSS_YOKO);
		}
	// 画面読み込み時のフォント切り替えボタンのカレントクラス付与
		if (!Cookies.get('cookieFont')) {
			// クッキー未登録時に小説ブロックを診断してカレントクラスを付与
			if ($('#honbun').attr('class').match(/serif/)) {
				$('#btn_mincho').addClass('current');
				$("#honbun").addClass('serif');
				$("#honbun").removeClass('gothic');
			} else {
				$('#btn_gothic').addClass('current');
				$("#honbun").removeClass('serif');
				$("#honbun").addClass('gothic');
			}
		} else if (Cookies.get('cookieFont') == 'serif') {
			// クッキー明朝登録であれば明朝ボタンにクラス付与
				$('#btn_mincho').addClass('current');
				$('#btn_gothic').removeClass('current');
			// 小説ブロックに明朝クラス付与
				$("#honbun").addClass('serif');
				$("#honbun").removeClass('gothic');
		} else if (Cookies.get('cookieFont') == 'gothic') {
			// クッキーゴシック登録であればゴシックボタンにクラス付与
				$('#btn_mincho').removeClass('current');
				$('#btn_gothic').addClass('current');
			// 小説ブロックにゴシッククラス付与
				$("#honbun").removeClass('serif');
				$("#honbun").addClass('gothic');
		}
	// 画面読み込み時のフォントサイズ切り替えボタンのカレントクラス付与
		if (!Cookies.get('cookieFontSize')) {
			// クッキー未登録時に小説ブロックを診断してカレントクラスを付与
			if ($('#honbun').attr('class').match(/large/)) {
				$('#btn_large').addClass('current');
				$("#honbun").addClass('large');
				$("#honbun").removeClass('middle');
				$("#honbun").removeClass('small');
			} else if ($('#honbun').attr('class').match(/middle/)) {
				$('#btn_middle').addClass('current');
				$("#honbun").removeClass('large');
				$("#honbun").addClass('middle');
				$("#honbun").removeClass('small');
			} else {
				$('#btn_large').addClass('current');
				$("#honbun").removeClass('large');
				$("#honbun").removeClass('middle');
				$("#honbun").addClass('small');
			}
		} else if (Cookies.get('cookieFontSize') == 'large') {
			// クッキー大文字登録であれば大文字ボタンにクラス付与
				$('#btn_large').addClass('current');
				$('#btn_middle').removeClass('current');
				$('#btn_small').removeClass('current');
			// 小説ブロックに大文字クラス付与
				$("#honbun").addClass('large');
				$("#honbun").removeClass('middle');
				$("#honbun").removeClass('small');
		} else if (Cookies.get('cookieFontSize') == 'middle') {
			// クッキー中文字登録であれば中文字ボタンにクラス付与
				$('#btn_large').removeClass('current');
				$('#btn_middle').addClass('current');
				$('#btn_small').removeClass('current');
			// 小説ブロックに中文字クラス付与
				$("#honbun").removeClass('large');
				$("#honbun").addClass('middle');
				$("#honbun").removeClass('small');
		} else {
			// クッキー小文字登録であれば小文字ボタンにクラス付与
				$('#btn_small').removeClass('current');
				$('#btn_middle').removeClass('current');
				$('#btn_small').addClass('current');
			// 小説ブロックに小文字クラス付与
				$("#honbun").removeClass('large');
				$("#honbun").removeClass('middle');
				$("#honbun").addClass('small');
		}

	// 読込時に背景色ボタンのカレントクラス付与
		if (!Cookies.get('cookieColor')) {
			// クッキー未登録時に小説ブロックを診断してカレントクラスを付与
			if ($('#honbun').attr('class').match(/black/)) {
				$('#btn_black').addClass('current');
//				$("#honbun").addClass('black');
//				$("#honbun").removeClass('white');
				$("body").addClass('black');
				$("body").removeClass('white');
				$("div.dropdown-btn").addClass('black');
				$("div.dropdown-btn").removeClass('white');
			} else {
				$('#btn_white').addClass('current');
//				$("#honbun").removeClass('black');
//				$("#honbun").addClass('white');
				$("body").addClass('white');
				$("body").removeClass('black');
				$("div.dropdown-btn").addClass('white');
				$("div.dropdown-btn").removeClass('black');
			}
		} else if (Cookies.get('cookieColor') == 'white') {
			// クッキー明朝登録であれば明朝ボタンにクラス付与
				$('#btn_white').addClass('current');
				$('#btn_black').removeClass('current');
			// 小説ブロックに明朝クラス付与
//				$("#honbun").addClass('white');
//				$("#honbun").removeClass('black');
				$("body").addClass('white');
				$("body").removeClass('black');
				$("div.dropdown-btn").addClass('white');
				$("div.dropdown-btn").removeClass('black');
		} else if (Cookies.get('cookieColor') == 'black') {
			// クッキーゴシック登録であればゴシックボタンにクラス付与
				$('#btn_white').removeClass('current');
				$('#btn_black').addClass('current');
			// 小説ブロックにゴシッククラス付与
//				$("#honbun").removeClass('white');
//				$("#honbun").addClass('black');
				$("body").removeClass('white');
				$("body").addClass('black');
				$("div.dropdown-btn").addClass('black');
				$("div.dropdown-btn").removeClass('white');
		} else {}


	// 左へのページ送りボタン
		$("#honbun_next").click(function(){
			var speed = 400; // ミリ秒
			var widthH = $("#honbun").width();
			var hereH = $("#honbun").scrollLeft();
			var position = hereH - widthH;
			$('#honbun').animate({scrollLeft:position}, speed, 'swing');
			return false;
		})
	// 右へのページ送りボタン
		$("#honbun_prev").click(function(){
			var speed = 400; // ミリ秒
			var widthH = $("#honbun").width();
			var hereH = $("#honbun").scrollLeft();
			var position = hereH + widthH;
			$('#honbun').animate({scrollLeft:position}, speed, 'swing');
			return false;
		})
	//本文表示時のスクロールボタン濃度
		var hereH = $("#honbun").scrollLeft();
		var widthHarea = document.getElementById("honbun").scrollWidth;
		var widthH = widthH = $("#honbun").width();
		if (hereH == 0) {
			//ブロックの先頭で右へページを送るボタンを一番薄くする
			$('#honbun_prev i').addClass('opacity03');
		} else if ((hereH - widthH) * -1 == widthHarea) {
			//ブロックの最後で左へページを送るボタンを一番薄くする
			$('#honbun_next i').addClass('opacity03');
		} else {
			//その他の場合はページ送りのボタンを通常通り表示する
			$('#honbun_next i').removeClass('opacity03');
			$('#honbun_prev i').removeClass('opacity03');
		}
	// 本文のブロック内でスクロールした時にページ送りボタンの濃さを変化させる
		$("#honbun").scroll(function () {
			var hereH = $("#honbun").scrollLeft();
			var widthHarea = document.getElementById("honbun").scrollWidth;
			var widthH = widthH = $("#honbun").width();
			if (hereH == 0) {
				//ブロックの先頭で右へページを送るボタンを一番薄くする
				$('#honbun_prev i').addClass('opacity03');
			} else if ((hereH - widthH) * -1 == widthHarea) {
				//ブロックの最後で左へページを送るボタンを一番薄くする
				$('#honbun_next i').addClass('opacity03');
			} else {
				//その他の場合はページ送りのボタンを通常通り表示する
				$('#honbun_next i').removeClass('opacity03');
				$('#honbun_prev i').removeClass('opacity03');
			}
			return false;
		});
	// 縦書き設定ボタン押下時にカレントクラスを付与
	    $("#btn_tategaki").click(function () {
	    // ボタンにカレントクラスを付与
	        $("#btn_tategaki").addClass('current');
	        $("#btn_yokogaki").removeClass('current');
	    // 縦書きCSSを読み込み設定
	        $('#novelTateyoko').attr({href:URL_CSS_TATE});
	    // 小説ブロックのスクロールバーを調整する
			$('#honbun').focus();
//			$('#honbun').trigger('click');
//			console.log($(':focus'));
			tategakiScroll();
	    // クッキーに選択結果を登録する
	        Cookies.set('cookieTateyoko', 'tategaki', { expires: 7 });
			return false;
	    });
	// 横書き設定ボタン押下時にカレントクラスを付与
	    $("#btn_yokogaki").click(function () {
	    // ボタンにカレントクラスを付与
	        $("#btn_yokogaki").addClass('current');
	        $("#btn_tategaki").removeClass('current');
	    // 横書きCSSを読み込み設定
	        $('#novelTateyoko').attr({href:URL_CSS_YOKO});
	    // 小説ブロックのスクロールバーを調整する
			yokogakiScroll();
	    // クッキーに選択結果を登録する
	        Cookies.set('cookieTateyoko', 'yokogaki', { expires: 7 });
			$('#honbun').focus();
			return false;
	    });
	// 明朝ボタン押下時にクラスを付与
	    $("#btn_mincho").click(function () {
	    // ボタンにカレントクラスを付与
	        $("#btn_mincho").addClass('current');
	        $("#btn_gothic").removeClass('current');
	    // 小説ブロックに明朝クラス付与
	        $('#honbun').addClass('serif');
	        $('#honbun').removeClass('gothic');
	    // クッキーに選択結果を登録する
	        Cookies.set('cookieFont', 'serif', { expires: 7 });
			$('#honbun').focus();
			return false;
	    });
	// ゴシックボタン押下時にカレントクラスを付与
	    $("#btn_gothic").click(function () {
	    // ボタンにカレントクラスを付与
	        $("#btn_mincho").removeClass('current');
	        $("#btn_gothic").addClass('current');
	    // 小説ブロックにゴシッククラス付与
	    	$('#honbun').removeClass('serif');
	        $('#honbun').addClass('gothic');
	    // クッキーに選択結果を登録する
	        Cookies.set('cookieFont', 'gothic', { expires: 7 });
			$('#honbun').focus();
			return false;
	    });
	// 大文字ボタン押下時にクラスを付与
	    $("#btn_large").click(function () {
	    // 大文字ボタンにカレントクラスを付与
	        $("#btn_large").addClass('current');
	        $("#btn_middle").removeClass('current');
	        $("#btn_small").removeClass('current');
	    // 小説ブロックに大文字クラス付与
	        $('#honbun').addClass('large');
	        $("#honbun").removeClass('middle');
	        $("#honbun").removeClass('small');
	    // クッキーに選択結果を登録する
	        Cookies.set('cookieFontSize', 'large', { expires: 7 });
			$('#honbun').focus();
			return false;
	    });
	// 中文字ボタン押下時にカレントクラスを付与
	    $("#btn_middle").click(function () {
	    // 中文字ボタンにカレントクラスを付与
	        $("#btn_large").removeClass('current');
	        $("#btn_middle").addClass('current');
	        $("#btn_small").removeClass('current');
	    // 小説ブロックに中文字クラス付与
	    	$('#honbun').removeClass('large');
	        $('#honbun').addClass('middle');
	        $('#honbun').removeClass('small');
	    // クッキーに選択結果を登録する
	        Cookies.set('cookieFontSize', 'middle', { expires: 7 });
			$('#honbun').focus();
			return false;
	    });
	// 小文字ボタン押下時にカレントクラスを付与
	    $("#btn_small").click(function () {
	    // 小文字ボタンにカレントクラスを付与
	        $("#btn_large").removeClass('current');
	        $("#btn_middle").removeClass('current');
	        $("#btn_small").addClass('current');
	    // 小説ブロックに小文字クラス付与
	        $('#honbun').removeClass('large');
	        $('#honbun').removeClass('middle');
	        $('#honbun').addClass('small');
	    // クッキーに選択結果を登録する
	        Cookies.set('cookieFontSize', 'small', { expires: 7 });
			$('#honbun').focus();
			return false;
	    });


		// 黒ボタン押下時にクラスを付与
	    $("#btn_black").click(function () {
		    // ボタンにカレントクラスを付与
	        $("#btn_black").addClass('current');
	        $("#btn_white").removeClass('current');
		    // 小説ブロックに明朝クラス付与
	        $('#honbun').addClass('black');
	        $('#honbun').removeClass('white');
			$("div.dropdown-btn").addClass('black');
			$("div.dropdown-btn").removeClass('white');
		    // クッキーに選択結果を登録する
	        Cookies.set('cookieColor', 'black', { expires: 7 });
			$('#honbun').focus();
			return false;
	    });
		// 白ボタン押下時にクラスを付与
	    $("#btn_white").click(function () {
		    // ボタンにカレントクラスを付与
	        $("#btn_white").addClass('current');
	        $("#btn_black").removeClass('current');
		    // 小説ブロックに明朝クラス付与
	        $('#honbun').addClass('white');
	        $('#honbun').removeClass('black');
			$("div.dropdown-btn").addClass('white');
			$("div.dropdown-btn").removeClass('black');
		    // クッキーに選択結果を登録する
	        Cookies.set('cookieColor', 'white', { expires: 7 });
			$('#honbun').focus();
			return false;
	    });



		// 本文にフォーカスをあててキーボードでスクロールできるようにする
		$('#honbun').focus();

		/*
		// 設定ボタンを表示・非表示する
		$('.dropdown-btn').hover(
			function() {
				//カーソルが重なった時
				$(this).children('.dropdown').addClass('open');
				alert('add');
			}, function() {
				//カーソルが離れた時
				$(this).children('.dropdown').removeClass('open');
				alert('remove');
			}
		);
		// グローバルナビの開閉
		$(function() {
			$('.nav-button-wrap').on('click', function() {
			if ($(this).hasClass('active')) {
				// スマホ用メニューが表示されていたとき
				$(this).removeClass('active');
				$('.globalnav').addClass('close');
				$('.globalnav-wrap , body').removeClass('open');
			} else {
				// スマホ用メニューが非表示の時
				$(this).addClass('active');
				$('.globalnav').removeClass('close');
				$('.globalnav-wrap , body').addClass('open');
			}
			});
		});
		*/
	}
);
//縦書き用スクロールバー
function tategakiScroll(){
	//スクロールスピード
	var speed = 30;
	//マウスホイールで横移動
	$('#honbun').mousewheel(function(event, mov) {
		//ie firefox
		$(this).scrollLeft($(this).scrollLeft() + mov * speed);
		//webkit
//		$('body').scrollLeft($('body').scrollLeft() + mov * speed);
//		console.log("縦。Point="+$('body').scrollLeft()+"; mov="+mov+"; speed="+speed);
		return false;
	});
}
//横書き用スクロールバー
function yokogakiScroll(){
	//スクロールスピード
//	var speed = 100;
	var speed = 30;
	//マウスホイールで横移動
	$('#honbun').mousewheel(function(event, mov) {
		var thisPoint;
		if ('chrome' == getUseBrowser()) { thisPoint = $(window).scrollTop(); }
		else { thisPoint = $('html').scrollTop(); }
		jumpPoint = mov * speed;
		$(window).scrollTop(thisPoint - jumpPoint);
//		console.log("横。thisPoint="+thisPoint+"; jumpPoint="+jumpPoint+"; mov="+mov+"; speed="+speed);
		return false;
	});
	/*
	*/
}

// 使用ブラウザを取得する
function getUseBrowser() {
	var userAgent = window.navigator.userAgent.toLowerCase();
	if(userAgent.indexOf('msie') != -1 ||
		    userAgent.indexOf('trident') != -1) {
//		console.log('Internet Explorerをお使いですね');
		return 'msie';
	} else if(userAgent.indexOf('edge') != -1) {
//		console.log('Edgeをお使いですね');
		return 'edge';
	} else if(userAgent.indexOf('chrome') != -1) {
//		console.log('Google Chromeをお使いですね');
		return 'chrome';
	} else if(userAgent.indexOf('safari') != -1) {
//		console.log('Safariをお使いですね');
		return 'safari';
	} else if(userAgent.indexOf('firefox') != -1) {
//		console.log('FireFoxをお使いですね');
		return 'firefox';
	} else if(userAgent.indexOf('opera') != -1) {
//		console.log('Operaをお使いですね');
		return 'opera';
	} else {
//		console.log('そんなブラウザは知らん');
		return '';
	}
}

// overflow: scroll要素のスクロールバーをキーボードで操作したい。そのためにはフォーカスをあてねばならない。要素にtabindex="0"属性付与＋初回時に
// https://unformedbuilding.com/articles/accessing-scroll-containers/

