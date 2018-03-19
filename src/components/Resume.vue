<template>
  <div class="page-content">
    <iframe id="resume-google-docs" src="https://docs.google.com/document/d/18fosfLiDGNl5dwqsXBVCPOclMdjrkeqjUDaXZWtLOW8/pub?embedded=true"></iframe>

    <md-button class="md-fab md-secondary md-fixed md-fab-bottom-right" href="https://docs.google.com/document/d/18fosfLiDGNl5dwqsXBVCPOclMdjrkeqjUDaXZWtLOW8/export?format=pdf">
      <md-icon>file_download</md-icon>
    </md-button>
</div>
</template>

<script>
export default {
  name: 'Resume',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.page-content {
  margin: 60px auto;
}

#resume-google-docs {
  display: block;
  margin: 0 auto;
  height: 980px;
  width: 100%;
  max-width: 820px;
  border: none;
}
</style>
