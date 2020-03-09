window.onload = function(event){
    var strage = this.localStorage;
    var parentNode = document.querySelector('.mainContent');
    for(var i=0, len=strage.length;i<len;i++){
        var k = strage.key(i);
        var v = JSON.parse(strage[k]);

        var bookNode = document.createElement('div');
        bookNode.setAttribute('class', 'book');
        parentNode.appendChild(bookNode);

        var imgNode = document.createElement('img');
        imgNode.src = v.img;
        bookNode.appendChild(imgNode);

        var bookDataNode = document.createElement('div');
        bookDataNode.innerText = v.書籍名;
        bookNode.appendChild(bookDataNode);

        var readInfoNode = document.createElement('div');
        readInfoNode.setAttribute('class', 'readInfo');
        bookNode.appendChild(readInfoNode);
        
        var span1 = this.document.createElement('span');
        span1.setAttribute('class','data1');
        span1.innerText = v.進捗;
        readInfoNode.appendChild(span1);

        var afterSpan1 = document.createElement('span');
        afterSpan1.innerText = 'ページ/';
        readInfoNode.appendChild(afterSpan1);

        var span2 = this.document.createElement('span');
        span2.setAttribute('class','data2');
        span2.innerText = v.ページ数;
        readInfoNode.appendChild(span2);

        var afterSpan2 = document.createElement('span');
        afterSpan2.innerText = 'ページ\n';
        readInfoNode.appendChild(afterSpan2);
        

        var span3 = this.document.createElement('span');
        span3.setAttribute('class','per');
        span3.innerText = parseInt(100*parseInt(v.進捗)/parseInt(v.ページ数)) + '%';
        readInfoNode.appendChild(span3);

        var updateNode = this.document.createElement('div');
        updateNode.setAttribute('class', 'update');
        bookNode.appendChild(updateNode);

        var updBtnNode = this.document.createElement('input');
        updBtnNode.setAttribute('type', 'button');
        updBtnNode.setAttribute('class','updateBtn');
        updBtnNode.setAttribute('value', '更新する');

        var hiddenKeyNode = document.createElement('div');
        hiddenKeyNode.setAttribute('class','hiddenKey');
        hiddenKeyNode.innerText = k;
        readInfoNode.appendChild(hiddenKeyNode);

        updBtnNode.addEventListener('click', function updateData(event){
            var tmp = event.target.parentNode.children;
            var strage = localStorage;

            var data1  = parseInt(tmp[2].querySelector('.data1').innerText);
            var data2 = parseInt(tmp[2].querySelector('.data2').innerText);

            pages = parseInt(window.prompt("読み進めたページ数を入力してください", ""));
            data1 += pages;
            console.log(tmp[3].querySelector('.data3'));
            tmp[2].querySelector('.data1').innerText = data1;
            tmp[2].querySelector('.per').innerText= parseInt(data1*100/data2);

            //ストレージに保存
            var key = tmp[2].querySelector('.hiddenKey').innerText;
            var v = JSON.parse(strage[key]);
            v.進捗 = data1;
            strage.setItem(key, JSON.stringify(v));
        });
        bookNode.appendChild(updBtnNode);
    }

}
