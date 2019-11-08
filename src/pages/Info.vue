<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="w-all h-all hidden fc-1d7eb8 fs-18 rel">
    <canvas id="stars"></canvas>
    <div class="abs at0 ab0 al0 ar0">
      <div class="w-all h-all flex ai-c jc-c">
        <div class="flex-line fd-c">
          <div class="flex ai-c mb20">
            <span class="font-96d2fd">您的证书无效，请核查服务器是否取得授权或联系管理员处理！</span>
          </div>
          <div class="flex ai-c mb20">
            <span class="w-200">服务器IP地址：</span>
            <input class="canvass" type="text" readonly v-model="data.ipAddress" />
          </div>
          <div class="flex ai-c mb20">
            <span class="w-200">服务器MAC地址：</span>
            <input class="canvass" type="text" readonly v-model="data.macAddress" />
          </div>
          <div class="flex ai-c mb20">
            <span class="w-200">服务器CPU序列号：</span>
            <input class="canvass" type="text" readonly v-model="data.cpuSerial" />
          </div>
          <div class="flex ai-c mb20">
            <span class="w-200">服务器主板序列号：</span>
            <input class="canvass" type="text" readonly v-model="data.mainBoardSerial" />
          </div>
          <div class="flex jc-s">
            <div
              v-clipboard:copy="JSON.stringify(data)"
              v-clipboard:success="onCopy"
              v-clipboard:error="onErr"
              class="fc-1d7eb8 hand w-150 center btnReturn mr20" >复制</div>
            <div @click="$router.push('/')" class="fc-1d7eb8 hand w-150 center btnReturn">返回登录>></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../store/api.js";

export default {
  data() {
    return {
      data: {
        ipAddress: "",
        macAddress: "",
        cpuSerial: "",
        mainBoardSerial: ""
      }
    };
  },
  methods: {
    initData() {
      api.get("sys/getServerInfos").then(res => {
        if (res.code == 2000) {
          this.data = res.data;
        }
      });
    },
    onCopy() {
      this.$message.success("内容已复制到剪切板！");
    },
    onErr() {
      this.$message.error("抱歉，复制失败！");
    }
  },
  mounted() {
    var canvas = document.getElementById("stars"),
      ctx = canvas.getContext("2d"),
      w = (canvas.width = window.innerWidth),
      h = (canvas.height = window.innerHeight),
      hue = 217,
      stars = [],
      count = 0,
      maxStars = 1300; //星星数量

    var canvas2 = document.createElement("canvas"),
      ctx2 = canvas2.getContext("2d");
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, "#CCC");
    gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
    gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
    gradient2.addColorStop(1, "transparent");

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
      if (arguments.length < 2) {
        max = min;
        min = 0;
      }

      if (min > max) {
        var hold = max;
        max = min;
        min = hold;
      }

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
      var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
      return diameter / 2;
      //星星移动范围，值越大范围越小，
    }

    var Star = function() {
      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60, this.orbitRadius) / 8;
      //星星大小
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 50000;
      //星星移动速度
      this.alpha = random(2, 10) / 10;

      count++;
      stars[count] = this;
    };

    Star.prototype.draw = function() {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(10);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      ctx.globalAlpha = this.alpha;
      ctx.drawImage(
        canvas2,
        x - this.radius / 2,
        y - this.radius / 2,
        this.radius,
        this.radius
      );
      this.timePassed += this.speed;
    };

    for (var i = 0; i < maxStars; i++) {
      new Star();
    }

    function animation() {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.5; //尾巴
      ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 2)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      }

      window.requestAnimationFrame(animation);
    }

    animation();
  },
  created() {
    this.initData();
  }
};
</script>

<style scoped>
.fc-1d7eb8 {
  color: #1d7eb8;
}
.font-96d2fd {
  color: #96d2fd;
}
.btnReturn {
  padding: 10px 20px;
  border: 1px solid #1d7eb8;
}
.canvass {
  background-color: transparent;
  border: 1px solid #1d7eb8;
  color: #1d7eb8;
  padding: 10px 10px;
  font-size: 15px;
  width: 400px;
}
</style>
