<template>
  <div id="format">
    <textarea :value="input" @input="update"></textarea>
    <div class="json-result"><pre v-html="JSONFormat"></pre><copy-button></copy-button></div>
  </div>
</template>

<script>
import _ from 'lodash'
import CopyButton from '../CopyButton'
export default {
  name: 'JSONFormat',
  components: {CopyButton},
  data () {
    return {
      input: '{"total":704,"poetryBeanList":[{"id":935,"title":"横吹曲辞 出塞 二","author":"王昌龄","dynasty":null,"style":null,"authorId":null,"contentList":["白花垣上望京师，黄河水流无尽时。","穷秋旷野行人绝，马首东来知是谁。"],"description":null,"keywords":null,"tags":null},{"id":1383,"title":"相和歌辞 懊恼曲","author":"温庭筠","dynasty":null,"style":null,"authorId":null,"contentList":["藕丝作线难胜针，蕊粉染黄那得深。","玉白兰芳不相顾，倡楼一笑轻千金。","莫言自古皆如此，健剑刜钟铅绕指。","三秋庭绿尽迎霜，惟有荷花守红死。","西江小吏朱斑轮，柳缕吐芽香玉春。","两股金钗已相许，不令独作空城尘。","悠悠楚水流如马，恨紫愁红满平野。","野土千年怨不平，至今烧作鸳鸯瓦。"],"description":null,"keywords":null,"tags":null},{"id":1391,"title":"相和歌辞 春江花月夜","author":"张若虚","dynasty":null,"style":null,"authorId":null,"contentList":["春江潮水连海平，海上明月共潮生。","滟滟随波千万里，何处春江无月明？","江流宛转绕芳甸，月照花林皆似霰。","空里流霜不觉飞，汀上白沙看不见。","江天一色无纤尘，皎皎空中孤月轮。","江畔何人初见月？江月何年初照人？","人生代代无穷已，江月年年望相似。","不知江月待何人，但见长江送流水。","白云一片去悠悠，青枫浦上不胜愁。","谁家今夜扁舟子，何处相思明月楼？","可怜楼上月裴回，应照离人妆镜台。","玉户帘中卷不去，捣衣砧上拂还来。","此时相望不相闻，愿逐月华流照君。","鸿雁长飞光不度，鱼龙潜跃水成文。","昨夜闲潭梦落花，可怜春半不还家。","江水流春去欲尽，江潭落月复西斜。","斜月沈沈藏海雾，碣石潇湘无限路。","不知乘月几人归，落月摇情满江树。"],"description":null,"keywords":null,"tags":null},{"id":1718,"title":"杂曲歌辞 长安少年行","author":"郑锡","dynasty":null,"style":null,"authorId":null,"contentList":["霞鞍金口骝，豹袖紫貂裘。","家住丛台下，门前漳水流。","唤人呈楚舞，借客试吴钩。","见说秦兵至，甘心赴国雠。"],"description":null,"keywords":null,"tags":null},{"id":1921,"title":"杂曲歌辞 桃花曲","author":"顾况","dynasty":null,"style":null,"authorId":null,"contentList":["魏帝宫人舞凤楼，隋家天子泛龙舟。","君王夜醉春眠[晏]，不觉桃花逐水流。"],"description":null,"keywords":null,"tags":null},{"id":2094,"title":"杂曲歌辞 竹枝 二","author":"刘禹锡","dynasty":null,"style":null,"authorId":null,"contentList":["山桃红花满上头，蜀江春水拍江流。","花红易衰似郎意，水流无限似侬愁。"],"description":null,"keywords":null,"tags":null},{"id":2212,"title":"杂曲歌辞 潇湘神二曲 一","author":"刘禹锡","dynasty":null,"style":null,"authorId":null,"contentList":["湘水流，湘水流，九疑云物至今愁。","君问二妃何处所？","零陵香草露中秋。"],"description":null,"keywords":null,"tags":null},{"id":2778,"title":"同临津纪明府孤雁","author":"卢照邻","dynasty":null,"style":null,"authorId":null,"contentList":["三秋违北地，万里向南翔。","河洲花稍白，关塞叶初黄。","避缴风霜劲，怀书道路长。","水流疑箭动，月照似弓伤。","横天无有阵，度海不成行。","会刷能鸣羽，还赴上林乡。"],"description":null,"keywords":null,"tags":null},{"id":3041,"title":"晚霁登王六东阁","author":"张九龄","dynasty":null,"style":null,"authorId":null,"contentList":["试上江楼望，初逢山雨晴。","连空青嶂合，向晚白云生。","彼美要殊观，萧条见远情。","情来不可极，日暮水流清。"],"description":null,"keywords":null,"tags":null},{"id":3198,"title":"和崔司空伤姬人","author":"杨炯","dynasty":null,"style":null,"authorId":null,"contentList":["昔时南浦别，鹤怨宝琴弦。","今日东方至，鸾销珠镜前。","水流衔砌咽，月影向窗悬。","妆匣凄余粉，熏炉灭旧烟。","晚庭摧玉树，寒帐委金莲。","佳人不再得，云日几千年。"],"description":null,"keywords":null,"tags":null}],"page":1,"keyword":"水流","relationTag":{"空山":100,"桃花":91,"人间":86,"春风":82,"不知":78,"青山":73,"行人":73,"故人":73,"门前":60,"明月":60}}'
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  },
  computed: {
    JSONFormat: function () {
      let result = ''
      try {
        let json = JSON.parse(this.input)
        result = JSON.stringify(json, undefined, 2)
        result = result.replace(new RegExp('([{}])', 'g'), '<hl-ob>$1</hl-ob>')
        result = result.replace(new RegExp('([[\\]])', 'g'), '<hl-om>$1</hl-om>')
        result = result.replace(new RegExp('"([^"]+)":', 'g'), '<hl-an>"$1"</hl-an>:')
        result = result.replace(new RegExp('"([^"]+)"(,|\\n)', 'g'), '<hl-av>"$1"</hl-av>$2')
        result = result.replace(new RegExp(': ([^,\\n[{]+)(,|\\n)', 'g'), ': <hl-av>$1</hl-av>$2')
      } catch (err) {
        console.log(err)
      }
      return result
    }
  }
}
</script>

<style scoped>
  html, body, #format, pre {
    margin: 0;
    height: 100%;
    font-family: Consolas,Monaco,monospace;
  }
  textarea, #format div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 20px;
  }
  #format div {
    background: #f8f8f8;
    text-align: left;
    overflow: auto;
    font-size: 14px;
    position: relative;
    color: #888;
  }
  pre{
    overflow: auto;
    line-height: 1.35;
  }
  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
  }
</style>
