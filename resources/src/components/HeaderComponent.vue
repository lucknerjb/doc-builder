<template>
  <header id="header" class="header">
      <div class="container">
          <div class="branding">
              <h1 class="logo" id="top">
                  <a href="index.html">
                      <span aria-hidden="true" class="icon_documents_alt icon"></span>
                      <!--
                      <span class="text-highlight">My</span><span class="text-bold">Project</span>
                      -->
                      <span class="text-highlight">{{ title }}</span>
                  </a>
              </h1>
          </div><!--//branding-->
      </div><!--//container-->
  </header><!--//header-->
</template>

<script>
    import store from '../store'
    export default {
        ready () {
        },

        props: ['title']
    }
</script>
