/**
 * Created by Administrator on 2017/11/17.
 */
FastClick.attach(document.body);
//rem
~function () {
    var desW = 640, winW = document.documentElement.clientWidth, ratio = winW / desW;
    var oMain = document.querySelector(".main");
    if (winW > desW) {
        oMain.style.width = desW + "px";
        oMain.style.margin = "0 auto";
        return;
    }
    document.documentElement.style.fontSize = ratio * 100 + "px";
}();

//init swiper
new Swiper(".swiper-container", {
    direction: "vertical",
    loop: true,
    // 当切换结束后，给当前展示的区域添加对应的id,由此实现对应的动画效果
    on: {
        slideChangeTransitionEnd: function () {
            //this.slides:获取当前一共有多少个活动块（包含loop模式先前后多加的两个）
            //this.activeIndex:当前展示这个区域的索引
            var slideAry = this.slides,
                curIn = this.activeIndex,
                total = slideAry.length;
            //计算id是page?
            var targetId = "page";
            switch (curIn) {
                case 0:
                    targetId += total - 2;
                    break;
                case (total - 1):
                    targetId += 1;
                    break;
                default:
                    targetId += curIn;
            }
            //给当前的活动块设置id即可，还要把其余的移除
            [].forEach.call(slideAry, function (item, index) {
                if (curIn === index) {
                    item.id = targetId;
                    return;
                }
                item.id = null;
            });
        }
    }
});

//music
~function () {
    var musicMenu = document.getElementById("musicMenu"), musicAudio = document.getElementById("musicAudio");
    musicMenu.addEventListener("click", function () {
        if (musicAudio.paused) {//暂停
            musicAudio.play();
            musicMenu.className = "music move";
            return;
        }
        musicAudio.pause();
        musicMenu.className = "music";
    }, false);
    function controlMusic() {
        musicAudio.volume = 0.1;
        musicAudio.play();
        musicAudio.addEventListener("canplay", function () {
            musicMenu.style.display = "block";
            musicMenu.className = "music move";
        }, false);
    }

    window.setTimeout(controlMusic, 1000);//为的是不要一开始就加载音频文件，不然会减慢页面打开的速度
}();
