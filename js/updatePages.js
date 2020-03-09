function updateData(event){
    var tmp = event.target.parentNode.parentNode.children[2];

    console.log(tmp);
    var data1  = parseInt(tmp.children[0].innerText);
    var data2 = parseInt(tmp.children[1].innerText);
    var percent = parseInt(tmp.children[3].innerText);
    console.log(data1);
    console.log(data2);
    console.log(percent);

    pages = parseInt(window.prompt("読み進めたページ数を入力してください", ""));
    data1 += pages;
    console.log(data1);
    tmp.children[0].innerText = data1;
    tmp.children[1].innerText = data2;
    tmp.children[3].innerText = parseInt(data1*100/data2);
}