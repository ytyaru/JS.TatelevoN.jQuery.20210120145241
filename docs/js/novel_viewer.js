/* ******************************************************************************** */
/* 縦書きビューア
/* ******************************************************************************** */
// CSSのURLを定義
const URL_CSS_TATE = './css/vertical.css';    // 縦書きCSS
const URL_CSS_YOKO = './css/horizontal.css';    // 横書きCSS
// jQuery
$(document).ready(
    function() {
        $('body').mousemove(function(e){
            console.log(`e.pageX=${e.pageX} e.pageY=${e.pageY} e.clientX=${e.clientX} e.clientY=${e.clientY} $(this).scrollTop()=${$(this).scrollTop()}`);
            if (e.clientY < $('body').css('--default-LchColorWheel-wheelDiameter').replace('px', '')) { $('body').css('--setting-display', 'block'); }
            else { $('body').css('--setting-display', 'none'); }
        });
        var colorWheel = new LchColorWheel({
            appendTo: document.getElementById('setting-color-picker-lch'),
            wheelDiameter: 200,
            wheelThickness: 20,
            handleDiameter: 16,
            drawsRgbValidityBoundary: true,
            onChange: function (colorWheel) {
                // 背景色を選ぶ。文字色は白黒いずれかを背景色次第で決める。コントラスト比が大きい方を。
                let bgColor = chroma(colorWheel.rgb).name();
                if (!chroma.valid(bgColor)) { bgColor = $('body').css('--honbun-color-bg-default'); }
                let fgColor;
                if (chroma.contrast(bgColor, 'white') <= chroma.contrast(bgColor, 'black')) {
                    fgColor = 'black';
                } else { fgColor = 'white'; }
                if (chroma.contrast(bgColor, fgColor) < 4.5) { alert('見づらい。contrastが4.5未満です。'); }

                // CSSカスタムプロパティ設定
                $('body').css('--honbun-color-bg', bgColor);
                $('body').css('--honbun-color-fg', fgColor);
                $('body').css('--setting-color-bg', bgColor);
                $('body').css('--setting-color-fg', chroma.mix(bgColor, fgColor, 0.5, 'rgb'));
                $('body').css('--setting-color-fg-hover', chroma.mix(bgColor, fgColor, 0.8, 'rgb'));
                $('body').css('--setting-color-bg-checked', fgColor);
                $('body').css('--setting-color-fg-checked', bgColor);

                $('#setting-color-piker-selected').val(bgColor);

                // 色ラジオボタンの選択を解除する
                $(`input[name="color"][type="radio"]`).each(function(index, element){
                    if ($(element).prop('checked')) { $(element).prop('checked', false); }
                });
            },
        })
        colorWheel.wheelDiameter = $('body').css('--default-LchColorWheel-wheelDiameter').replace('px', '');
        colorWheel.wheelThickness = $('body').css('--default-LchColorWheel-wheelThickness').replace('px', '');
        colorWheel.handleDiameter = $('body').css('--default-LchColorWheel-handleDiameter').replace('px', '');
        colorWheel.redraw();

        // カラーピッカーにマウスポインタが乗ったとき、ピッカーが選択した色を用いる
        $('#setting-color-picker-lch').mouseover(function(e) {
            colorWheel.onChange(colorWheel);
            $('#honbun').focus();
        });

        $('input[name="color"][type="color"]').click(function(){
            const NAME = $(this).attr('name');
            $(`input[name="${NAME}"][type="radio"]`).each(function(index, element){
                if ($(element).prop('checked')) { $(element).prop('checked', false); }
            });
        });
        $('input[name="color"]').change(function(){
            // 背景色を選ぶ。文字色は白黒いずれかを背景色次第で決める。コントラスト比が大きい方を。
            let bgColor = $(this).val();
            if (chroma.valid(bgColor)) { bgColor = chroma(bgColor).name(); } // CSS形式
            else { bgColor = $('body').css('--honbun-color-bg-default'); }
            let fgColor;
            if (chroma.contrast(bgColor, 'white') <= chroma.contrast(bgColor, 'black')) {
                fgColor = 'black';
            } else { fgColor = 'white'; }
            if (chroma.contrast(bgColor, fgColor) < 4.5) { alert('見づらい。contrastが4.5未満です。'); }

            // CSSカスタムプロパティ設定
            $('body').css('--honbun-color-bg', bgColor);
            $('body').css('--honbun-color-fg', fgColor);
            $('body').css('--setting-color-bg', bgColor);
            $('body').css('--setting-color-fg', chroma.mix(bgColor, fgColor, 0.5, 'rgb'));
            $('body').css('--setting-color-fg-hover', chroma.mix(bgColor, fgColor, 0.8, 'rgb'));
            $('body').css('--setting-color-bg-checked', fgColor);
            $('body').css('--setting-color-fg-checked', bgColor);

            // Cookieはローカルで動作しない。LocalStrageを使う。
        // クッキーに選択結果を登録する
        Cookies.set('cookieColor', bgColor, { expires: 7 });
            $('#honbun').focus();
        });
        $('input[name="fontSize"]').change(function(){
            // 選択したラジオボタンの値を本文のclassに与える
            $(this).alternateClass();
            $('#honbun').focus();
        });
        $('input[name="fontFamily"]').change(function(){
            // 選択したラジオボタンの値を本文のclassに与える
            $(this).alternateClass();
            $('#honbun').focus();
        });
        $('input[name="writingDirection"]').change(function(){
            // 選択したラジオボタンの値を本文のclassに与える
            $(this).alternateClass();
            // 縦書きCSSを読み込む
            const VALUE = $(this).val();
            const URL = ('vertical' == VALUE) ? URL_CSS_TATE : URL_CSS_YOKO;
            $("#novelTateyoko").attr("href", URL);
            //スクロールバー
            if ('vertical' == VALUE) { tategakiScroll(); }
            else { yokogakiScroll(); }
            $('#honbun').focus();
        });

        //縦書き横書き切り替え
        var w = $(window).width();
        var x = 480;
        if (w >= x) {
            loadSettings();
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
                $("body").addClass('black');
                $("body").removeClass('white');
                $("div.dropdown-btn").addClass('black');
                $("div.dropdown-btn").removeClass('white');
            } else {
                $('#btn_white').addClass('current');
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
                $("body").addClass('white');
                $("body").removeClass('black');
                $("div.dropdown-btn").addClass('white');
                $("div.dropdown-btn").removeClass('black');
        } else if (Cookies.get('cookieColor') == 'black') {
            // クッキーゴシック登録であればゴシックボタンにクラス付与
                $('#btn_white').removeClass('current');
                $('#btn_black').addClass('current');
            // 小説ブロックにゴシッククラス付与
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
//            $('#honbun').trigger('click');
//            console.log($(':focus'));
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
        // 白ボタン押下時にクラスを付与
        $("#btn_white").click(function () {
        });

        // 本文にフォーカスをあててキーボードでスクロールできるようにする
        $('#honbun').focus();

        // ウインドウを閉じるとき、ビューア設定を保存する。
        $(window).on("beforeunload",function(e) {
            // fontFamily, fontSize, color, writingDirection
            // LocalStrageを使う。Cookieはローカルで動作しないため。
//            localStorage.userName = "rdegges";
//            localStorage.getItem('fontColor')
//            localStorage.setItem('fontColor', $('input[name=fontColor]'));
            alert('close');// beforeunloadイベントではブロックされて表示されない
            console.log("本当に離れるの？　いいの？　閉じるよ？　マジで？");
//            return "本当に離れるの？　いいの？　閉じるよ？　マジで？";// return '...';で確認ダイアログが出る。
        });
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
//        $('body').scrollLeft($('body').scrollLeft() + mov * speed);
//        console.log("縦。Point="+$('body').scrollLeft()+"; mov="+mov+"; speed="+speed);
        return false;
    });
}
//横書き用スクロールバー
function yokogakiScroll(){
    //スクロールスピード
    var speed = 30;
    //マウスホイールで横移動
    $('#honbun').mousewheel(function(event, mov) {
        var thisPoint;
        if ('chrome' == getUseBrowser()) { thisPoint = $(window).scrollTop(); }
        else { thisPoint = $('html').scrollTop(); }
        jumpPoint = mov * speed;
        $(window).scrollTop(thisPoint - jumpPoint);
        return false;
    });
}

// 使用ブラウザを取得する
function getUseBrowser() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
        return 'msie';
    } else if(userAgent.indexOf('edge') != -1) {
        return 'edge';
    } else if(userAgent.indexOf('chrome') != -1) {
        return 'chrome';
    } else if(userAgent.indexOf('safari') != -1) {
        return 'safari';
    } else if(userAgent.indexOf('firefox') != -1) {
        return 'firefox';
    } else if(userAgent.indexOf('opera') != -1) {
        return 'opera';
    } else {
        return '';
    }
}

// overflow: scroll要素のスクロールバーをキーボードで操作したい。そのためにはフォーカスをあてねばならない。要素にtabindex="0"属性付与＋初回時に
// https://unformedbuilding.com/articles/accessing-scroll-containers/

// 16進数を反転させる。invertHex('00FF00'); // Returns FF00FF
function invertHex(hex) {
    if (hex.indexOf('#') === 0) { hex = hex.slice(1); }
    return '#' + (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
}

// 設定値をロードする。
function loadSettings() {
    const keys = ['fontFamily', 'fontSize', 'color', 'writingDirection'];
    for (key of keys) { loadSetting(key); }
}
// 指定したキーの設定値をロードする。値はストレージかCSSから取得する。HTMLにセットする。
function loadSetting(name) {
    // キーが存在しないときnullを返す。
    const value = localStorage.getItem(name) ?? $('body').css(`--default-input-value-${name}`);
    console.log(`${name}=${value}`);
    $(`input[name=${name}][value=${value}]`).trigger('click');
}
// 設定をローカルストレージに保存する。現在値がストレージ値と異なるときのみ保存する。nameはinput要素の属性値である。ストレージのキー名も同じものを使う。
function updateSetting(name) {
    updateLocalStorage(name, $(`input[name=${name}]`).val());
}
// 現在のスクロール位置をローカルストレージに保存する。（同じ文書で、現在値が既存値と異なり、かつ先頭か末尾以外なら保存する）
function updateStrageScroll() {
    const NAME = 'scrollPos';
    let newValue;
    if ('tategaki' == $(`input[name=writing_direction]`).val()) {
        newValue = $('#honbun').scrollLeft();
    } else { newValue = $(window).scrollTop(); }
    updateLocalStorage(NAME, newValue);
    oldPos = localStorage.getItem(NAME);
    if (newValue == oldValue) { return; } // 現在値と既存値が同じなら保存しない
    localStorage.setItem(NAME, newValue); // 現在値と既存値が違うなら保存する
}
// ローカルストレージを更新する。指定したキーの値が既存値と異なるときのみ。
function updateLocalStorage(key, newValue) {
    const oldValue = localStorage.getItem(key);
    if (newValue != oldValue) { // 現在値と既存値が違うなら
        localStorage.setItem(key, newValue); // 保存する
    }
}


