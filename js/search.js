var btnLoad = document.querySelector('#submit');

btnLoad.addEventListener('click', function(event){
    // [手順1]XMLHttpRequestオブジェクトのインスタンスを作成
    var xmlHttpRequest = new XMLHttpRequest();
    // [手順2]通信状態の変化を監視するイベントハンドラを設定
    xmlHttpRequest.onreadystatechange = function(){
        //レスポンスの受信が正常に完了した時
        if(this.readyState == 4 && this.status == 200){
            console.log(this.readyState, this.response);
            getResult(this.response);
        }
    };
    // [手順3]レスポンスの形式を指定する
    xmlHttpRequest.responseType = 'json';
    var word = document.getElementById("search").value;
    var param="maxResults=40";
    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + word + '&' + param;
    console.log(word);
    
    // [手順4]リクエストメソッドと読みこむファイルのパスを指定する
    xmlHttpRequest.open('GET', url);
    // [手順5]リクエストを送信する
    xmlHttpRequest.send();

})

function getResult(data){
    var retVal = data;
    var result = document.querySelector('#result');
    result.textContent='';
    console.log(data.items.length);
    for(var i=0;i<data.items.length;i++){
        var text = '書籍名：'+data.items[i].volumeInfo.title;
        text+=' ページ数：'+data.items[i].volumeInfo.pageCount;
        if(data.items[i].volumeInfo.authors != undefined){
            text+=' 著者：'+data.items[i].volumeInfo.authors[0]; 
        }
        else{
            text+=' 著者：'+'不明'; 
        }
        text+=' 出版日'+data.items[i].volumeInfo.publishedDate;
        var image = document.createElement('img');
        image.src = data.items[i].volumeInfo.imageLinks.smallThumbnail;
        result.appendChild(image);
        console.log(text)
        var div = document.createElement('div');
        div.textContent = text;
        result.appendChild(div)
        var btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', '登録');
        btn.className = 'register';
        div.appendChild(btn);
    }
}