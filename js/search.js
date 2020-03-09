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

});

function getResult(data){
    var retVal = data;
    var result = document.querySelector('#result');
    result.textContent='';
    console.log(data.items.length);
    for(var i=0;i<data.items.length;i++){
        var text = '書籍名：'+data.items[i].volumeInfo.title + '\n';
        if(typeof data.items[i].volumeInfo.pageCount != 'undefined'){
            text+='ページ数：'+data.items[i].volumeInfo.pageCount + '\n';
        }
        else{
            text+='ページ数：'+ -1 + '\n';
        }

        if(data.items[i].volumeInfo.industryIdentifiers instanceof Array){
            var identifier = data.items[i].volumeInfo.industryIdentifiers[0].identifier;
        }
        else{
            var identifier = data.items[i].volumeInfo.industryIdentifiers;
        }

        text+='識別子：'+identifier + '\n';

        if(data.items[i].volumeInfo.authors){
            text+='著者：'+data.items[i].volumeInfo.authors + '\n'; 
        }
        else{
            text+='著者：'+'不明' + '\n'; 
        }
        text+='出版日：'+data.items[i].volumeInfo.publishedDate + '\n';
        
        
        var image = document.createElement('img');
        if(data.items[i].volumeInfo.imageLinks){
            image.src = data.items[i].volumeInfo.imageLinks.smallThumbnail;
        }
        else{
            image.src = 'alt.png'
        }
        
        console.log(text)
        var div = document.createElement('div');
        div.className="regBook"
        result.appendChild(div);
        div.appendChild(image);
        
        var div1 = document.createElement('div');
        div1.innerText = text;
        div.appendChild(div1);
        var btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', '登録');
        btn.className = 'register';
        // btn.setAttribute('onclick', "regBooktoLS(event, " + this.identifier + ")");
        div.appendChild(btn);
        btn.addEventListener('click', function regBooktoLS(event){
            var storage = localStorage;
        
            var tmp = event.target.parentNode;
            console.log(tmp);
            var imgPath = tmp.children[0].src;
            var bookdata = tmp.children[1].innerText.split('\n', 3);
        
            var bookName = bookdata[0].split('：')[1];
            var pageNum = bookdata[1].split('：')[1];
            if(parseInt(pageNum) < 0){
                pageNum = window.prompt("ページ数を入力してください", "");
            }
        
            var obj = {'書籍名':bookName, 'ページ数': pageNum, 'img':imgPath, '進捗':0};
            storage[bookdata[2].split('：')[1]] = JSON.stringify(obj);

            window.alert("「" + obj.書籍名 + "」を読書中の棚に登録しました");
        }, false);
    }
};

