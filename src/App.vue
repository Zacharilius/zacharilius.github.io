<template>
  <div id="app" class="md-layout-column">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Zachary Bensley</span>

      <div class="md-xsmall-hide">
        <div class="md-toolbar-section-end">
          <md-tabs class="md-primary" md-sync-route md-alignment="right">
            <md-tab md-label="Home" to="/"></md-tab>
            <md-tab md-label="About" to="/about"></md-tab>
            <md-tab md-label="Blog" to="/blog"></md-tab>
            <md-tab md-label="Maps" to="/map"></md-tab>
            <md-tab md-label="Projects" to="/projects"></md-tab>
            <md-tab md-label="Resume" to="/resume"></md-tab>
          </md-tabs>
          <md-button class="md-icon-button" @click="showSocialMedia = true">
            <md-icon>more_vert</md-icon>
          </md-button>
        </div>
      </div>

    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Zachary Bensley</span>
      </md-toolbar>

      <md-list>
        <md-list-item to="/">
          <md-icon>home</md-icon>
          <span class="md-list-item-text">Home</span>
        </md-list-item>
        <md-list-item to="/about">
          <md-icon>face</md-icon>
          <span class="md-list-item-text">About</span>
        </md-list-item>
        <md-list-item to="/blog">
          <md-icon>favorite</md-icon>
          <span class="md-list-item-text">Blog</span>
        </md-list-item>
        <md-list-item to="/maps">
          <md-icon>map</md-icon>
          <span class="md-list-item-text">Maps</span>
        </md-list-item>
        <md-list-item to="/projects">
          <md-icon>collections</md-icon>
          <span class="md-list-item-text">Projects</span>
        </md-list-item>
        <md-list-item to="/resume">
          <md-icon>content_paste</md-icon>
          <span class="md-list-item-text">Resume</span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-drawer class="md-right" :md-active.sync="showSocialMedia">
      <md-list>
        <md-list-item href="https://github.com/zacharilius">
          <svg class="nav-svg-icon" viewBox="0 0 16 16">
            <path d="M7.999,0.431c-4.285,0-7.76,3.474-7.76,7.761 c0,3.428,2.223,6.337,5.307,7.363c0.388,0.071,0.53-0.168,0.53-0.374c0-0.184-0.007-0.672-0.01-1.32 c-2.159,0.469-2.614-1.04-2.614-1.04c-0.353-0.896-0.862-1.135-0.862-1.135c-0.705-0.481,0.053-0.472,0.053-0.472 c0.779,0.055,1.189,0.8,1.189,0.8c0.692,1.186,1.816,0.843,2.258,0.645c0.071-0.502,0.271-0.843,0.493-1.037 C4.86,11.425,3.049,10.76,3.049,7.786c0-0.847,0.302-1.54,0.799-2.082C3.768,5.507,3.501,4.718,3.924,3.65 c0,0,0.652-0.209,2.134,0.796C6.677,4.273,7.34,4.187,8,4.184c0.659,0.003,1.323,0.089,1.943,0.261 c1.482-1.004,2.132-0.796,2.132-0.796c0.423,1.068,0.157,1.857,0.077,2.054c0.497,0.542,0.798,1.235,0.798,2.082 c0,2.981-1.814,3.637-3.543,3.829c0.279,0.24,0.527,0.713,0.527,1.437c0,1.037-0.01,1.874-0.01,2.129 c0,0.208,0.14,0.449,0.534,0.373c3.081-1.028,5.302-3.935,5.302-7.362C15.76,3.906,12.285,0.431,7.999,0.431z"></path>
          </svg>
          <span class="md-list-item-text">Github</span>
        </md-list-item>
        <md-list-item href="http://codepen.io/zacharilius">
          <svg class="nav-svg-icon" viewBox="80 50 375 375">
            <path d="M427 201.9c-0.6-4.2-2.9-8-6.4-10.3L264.2 87.3c-4.9-3.3-11.4-3.3-16.3 0L91.4 191.6c-4 2.7-6.5 7.4-6.5 12.2v104.3c0 4.8 2.5 9.6 6.5 12.2l156.4 104.3c4.9 3.3 11.4 3.3 16.3 0L420.6 320.4c4-2.6 6.6-7.4 6.6-12.2V203.9C427.1 203.2 427.1 202.6 427 201.9 427 201.7 427.1 202.6 427 201.9zM270.7 127.1l115.2 76.8 -51.5 34.4 -63.8-42.7V127.1zM241.3 127.1v68.6l-63.8 42.7 -51.5-34.4L241.3 127.1zM114.3 231.4l36.8 24.6 -36.8 24.6V231.4zM241.3 384.9L126.1 308.1l51.5-34.4 63.8 42.6V384.9zM256 290.8l-52-34.8 52-34.8 52 34.8L256 290.8zM270.7 384.9V316.3l63.8-42.6 51.5 34.4L270.7 384.9zM397.7 280.6l-36.8-24.6 36.8-24.6V280.6z"></path>
          </svg>
          <span class="md-list-item-text">CodePen</span>
        </md-list-item>
        <md-list-item href="https://www.linkedin.com/in/zabensley">
          <svg class="nav-svg-icon" viewBox="80 50 375 375">
            <path d="M186.4 142.4c0 19-15.3 34.5-34.2 34.5 -18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5C171.1 107.9 186.4 123.4 186.4 142.4zM181.4 201.3h-57.8V388.1h57.8V201.3zM273.8 201.3h-55.4V388.1h55.4c0 0 0-69.3 0-98 0-26.3 12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9 0 26.9 0 98 0 98h57.5c0 0 0-68.2 0-118.3 0-50-28.3-74.2-68-74.2 -39.6 0-56.3 30.9-56.3 30.9v-25.2H273.8z"></path>
          </svg>
          <span class="md-list-item-text">Linkedin</span>
        </md-list-item>
        <md-list-item href="https://instagram.com/zacharilius">
          <svg class="nav-svg-icon" viewBox="80 50 375 375">
            <path d="M365.3 234.1h-24.7c1.8 7 2.9 14.3 2.9 21.9 0 48.3-39.2 87.5-87.5 87.5 -48.3 0-87.5-39.2-87.5-87.5 0-7.6 1.1-14.9 2.9-21.9h-24.7V354.4c0 6 4.9 10.9 10.9 10.9H354.4c6 0 10.9-4.9 10.9-10.9V234.1H365.3zM365.3 157.6c0-6-4.9-10.9-10.9-10.9h-32.8c-6 0-10.9 4.9-10.9 10.9v32.8c0 6 4.9 10.9 10.9 10.9h32.8c6 0 10.9-4.9 10.9-10.9V157.6zM256 201.3c-30.2 0-54.7 24.5-54.7 54.7 0 30.2 24.5 54.7 54.7 54.7 30.2 0 54.7-24.5 54.7-54.7C310.7 225.8 286.2 201.3 256 201.3M365.3 398.1H146.7c-18.1 0-32.8-14.7-32.8-32.8V146.7c0-18.1 14.7-32.8 32.8-32.8h218.7c18.1 0 32.8 14.7 32.8 32.8v218.7C398.1 383.4 383.5 398.1 365.3 398.1"></path>
          </svg>
          <span class="md-list-item-text">Instagram</span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-content>
      <router-view/>
    </md-content>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    showNavigation: false,
    showSocialMedia: false
  })
}
</script>

<style>
#app {
  position: relative;
}

.page-content {
  background-color: #fafafa;
}

.md-content.md-theme-default {
  background-color: transparent;  /* Override default defined in mdl theme. */
}
#app .md-tabs-navigation {
  margin-left: 16px;
  background-color: transparent;
}

.nav-svg-icon {
  display: inline-block;
  margin-right: 32px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.nav-svg-icon path {
  fill: rgba(0, 0, 0, 0.54)
}
</style>

<style lang="sass">
@import "~vue-material/dist/theme/engine";
@include md-register-theme("default", (primary: #00796B, accent: orange, theme: light));
@import "~vue-material/dist/theme/all";
</style>
