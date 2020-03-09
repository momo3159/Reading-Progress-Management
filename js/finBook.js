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

            delBtnNode.addEventListener('click', function deleteData(event){
                var tmp = event.target.parentNode.children;
                console.log(tmp);
                var strage = localStorage;

                var key = tmp[2].querySelector('.hiddenKey').innerText;
                strage.removeItem(key);

            });
        }
    }
}