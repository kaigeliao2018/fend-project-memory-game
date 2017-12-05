/*
 * Create a list that holds all of your cards
 */
//字体图标的class名
var list = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-bomb",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-bomb",
    "fa-leaf",
    "fa-bicycle"
];

// Shuffle function from http://stackoverflow.com/a/2450976
//第一步：将字体图标放进li中
//shuffle洗牌
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
shuffle(list);

// 第二步：给ul添加元素
// 获取li节点,得到的是一个集合
(function addI() {
    var lis = document.querySelectorAll('ul.deck li');
// 给li添加HTMl内容
    for (var i = 0; i < lis.length; i++) {
        var is = document.createElement('i');
        lis[i].appendChild(is);
        is.classList.add('fa',list[i]);
    }
})();

//函数open，获得当前点击元素的class名，通过修改class名将图片显示出来
function open() {
    var eventClassName=event.target.classList;
    if(eventClassName.contains('card')&&!eventClassName.contains('match')){
        eventClassName.add('flipInY','show','open');
    }
}

function match(openNumber) {
    if (openNumber == 1) {
        var opens= document.querySelectorAll('li.open');
        if (opens[0].firstElementChild.classList.toString() == opens[1].firstElementChild.classList.toString()) {
           for(var i=0;i<opens.length;i++){
               opens[i].classList.add('match');
               opens[i].classList.remove('show','open');
           }
        } else {
            function task1() {
                for(var i=0;i<opens.length;i++){
                    opens[i].classList.add('flipOutX');
                    opens[i].classList.remove('flipInY');
                }
            }

            function task2() {
                for(var i=0;i<opens.length;i++){
                    opens[i].classList.add('flipInX');
                    opens[i].classList.remove('flipOutX','open','show');
                }
            }
            var timer1 = setTimeout(task1, 1000);
            var timer2 = setTimeout(task2, 1000);
            timer1=null;
            timer2=null;
        }
        scores();
    }
}

function scores() {
    var move=document.querySelector('.moves');
    var steps=Number(move.innerHTML)+1;
    move.innerHTML=steps;
    (function star() {
        var star;
        var getStar=document.querySelectorAll('.score-panel .stars li');
        if(steps<17&&steps>8) {
            getStar[2].firstElementChild.classList.remove('fa-star');
            getStar[2].firstElementChild.classList.add('fa-star-o');
        }else if(steps>16){
            getStar[1].firstElementChild.classList.remove('fa-star');
            getStar[1].firstElementChild.classList.add('fa-star-o');
            getStar[2].firstElementChild.classList.remove('fa-star');
            getStar[2].firstElementChild.classList.add('fa-star-o');
        }
        return star;
    })();
}

function end() {
    var move=document.querySelector('.moves');
    var steps=move.innerHTML;
    var star=3-document.querySelectorAll('.score-panel .stars .fa-star-o').length;
    var lis=document.querySelectorAll('ul.deck li.match');
    var time=document.querySelector('.time-text').value;
    //全部匹配完毕后跳转到新页面
    if(lis.length==16){
        //结束计时
        stop();
        //游戏结束跳到新页面，同时将新页面需要的参数添加到地址栏，这个思路请教他人
        var url='success.html?steps='+steps+'&star='+star+'&time='+time;
        setTimeout(function () {
            window.location.href=url;
        }, 2000);
    }
}

var ul = document.querySelector('ul.deck');
var flag=true;
ul.addEventListener('click',function () {
    event.stopPropagation();
    //第一次点击触发start函数，以后都不执行，这个思路参考：https://segmentfault.com/q/1010000005994153?_ea=987715
    if(flag){
        flag=false;
        start();
        open();
    }else{
        var openNumber= document.querySelectorAll('li.open').length;
        if(openNumber<=1){
            open();
            match(openNumber);
        }
        end();
    }
},false);

//刷新页面
var refresh=document.querySelector('.restart');
refresh.addEventListener('click',function () {
    window.location.reload();
},false);

//计时器，这个思路参考:http://www.jb51.net/article/105783.htm
var minute=0,second=0,millisecond=0;//分 秒
var int;
function start()//开始
{
    int=setInterval(timer,100);
}

function timer()//计时
{
    millisecond=millisecond+100;
    if(millisecond>=1000)
    {
        millisecond=0;
        second=second+1;
    }
    if(second>=60)
    {
        second=0;
        minute=minute+1;
    }
    document.querySelector('.time-text').value=minute+'minutes'+second+'seconds'+millisecond+'milliseconds';
}

function stop()//停止
{
    window.clearInterval(int);
}








