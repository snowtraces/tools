<template>
  <div id="post">
    <div class="post-source">
      <div class="post-title">
        <input type="text" placeholder="输入请求地址…" name="post-url">
      </div>
      <div class="post-body">
        <textarea placeholder="输入请求参数…" name="post-data"></textarea>
      </div>
    </div>
    <div class="post-result">
      <textarea name="result-data"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post'
}
</script>

<style scoped>
  html, body, #post, #post > div, pre {
    margin: 0;
    height: 100%;
    font-family: Consolas, Monaco, monospace;
  }
  .post-source {
    padding: 2rem;
    width: 50%;
    height: 100%;
    background-color: #eee;
    float: left;
  }
  .post-body{
    height: calc(100% - 3rem);
  }
  [name='post-url']{
    width: 100%;
    padding: .5rem;
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  [name='post-data'], [name='result-data'] {
    width: 100%;
    height: 100%;
    padding: .5rem;
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  [name='post-data'] {
    margin-top: 1rem;
  }

  .post-result {
    background-color: #eee;
    width: 50%;
    height: 100%;
    padding: 2rem 2rem 2rem 0;
    float: left;
  }
</style>
