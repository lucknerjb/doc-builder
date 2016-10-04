<template>
  <header id="header" class="header">
      <div class="container">
          <div class="branding">
              <h1 class="logo">
                  <a href="index.html">
                      <span aria-hidden="true" class="icon_documents_alt icon"></span>
                      <span class="text-highlight">Bootstrap</span><span class="text-bold">Tagsinput</span>
                  </a>
              </h1>
          </div><!--//branding-->
          <ol class="breadcrumb">
            <li class="active">Version:</li>
            <li>
              <select class="" name="">
                <option value="0.8.0">0.8.0</option>
                <option value="0.9.0">0.9.0</option>
                <option value="0.10.0">0.10.0</option>
              </select>
            </li>
          </ol>
      </div><!--//container-->
  </header><!--//header-->
</template>

<script>
    import store from '../store'
    export default {
        ready () {
        }
    }
</script>
