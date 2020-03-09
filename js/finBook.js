window.onload = function(event){
    var strage = this.localStorage;
    var parentNode = document.querySelector('.finBooks');
    for(var i=0, len=strage.length;i<len;i++){
        var k = strage.key(i);
        var v = JSON.parse(strage[k]);
        if(v.進捗 < v.ページ数){
            continue;
        }
        else{
            var finBookNode = document.createElement('div');
            finBookNode.setAttribute('class', 'finBook');
            parentNode.appendChild(finBookNode);

            var imgNode = document.createElement('img');
            imgNode.src = v.img;
            finBookNode.appendChild(imgNode);

            var finBookDataNode = document.createElement('div');
            finBookDataNode.innerText = v.書籍名;
            finBookNode.appendChild(finBookDataNode);

            var delBtnNode = this.document.createElement('input');
            delBtnNode.setAttribute('type', 'button');
            delBtnNode.setAttribute('class','delBtn');
            delBtnNode.setAttribute('value', '削除する');
            finBookNode.appendChild(delBtnNode);

            var hiddenKeyNode = document.createElement('div');
            hiddenKeyNode.setAttribute('class','hiddenKey');
            hiddenKeyNode.innerText = k;
            finBookNode.appendChild(hiddenKeyNode);

            delBtnNode.addEventListener('click', function deleteData(event){
                var tmp = event.target.parentNode;
                
                var strage = localStorage;
                // console.log(tmp);
                // for(var i=0;i<tmp.children.length;i++){
                //     tmp.removeChild(tmp.children[i]);
                // }
                // tmp.innerText = "";
                var key = tmp.querySelector('.hiddenKey').innerText;
                console.log(key);
                strage.removeItem(key);
                window.location.reload();
            });
        }
    }
}