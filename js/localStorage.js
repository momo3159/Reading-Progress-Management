var storage = localStorage;

storage.setItem('test1', JSON.stringify({'書籍名':'はじめてのディープラーニング ', '全ページ数':300, '進捗':0}));

console.log(JSON.parse(storage.getItem('test1')));