<template>
  <div class="page-container">
    <!-- <img src="./assets/logo.png"> -->
    <md-app md-mode="reveal">
    <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">{{ name }}</span>
        <span class="md-title md-toolbar-section-end">
           <md-menu md-direction="bottom-end" :mdCloseOnClick="true" :mdCloseOnSelect="true">
            <md-button md-menu-trigger class="md-primary">Actions</md-button>

            <md-menu-content>
              <md-menu-item @click="saveData">Save Data</md-menu-item>
              <md-menu-item @click="loadData">Load Data</md-menu-item>
            </md-menu-content>
          </md-menu>
          Available money: ${{ myFunds }}
        </span>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>{{ name }}</span>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item v-for="ivr in availableRoutes" :key="ivr.name">
            <md-icon>{{ ivr.icon }}</md-icon>
            <router-link tag="span" class="md-list-item-text router-link" :to="ivr.path" exact activeClass="link-active">
              <span @click="closeMenu">{{ ivr.name }}</span></router-link>
          </md-list-item>
        </md-list>


        <md-switch v-model="closeDrawerAfterNvigation" class="custom-switch">Close drawer after navigation</md-switch>
      </md-app-drawer>

      <md-app-content>
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';

export default {
  name: 'stocks',
  computed: {
    ...mapGetters({myFunds: 'funds'})
  },
  data() {
    return { 
      name: 'Stocks Traider',
      menuVisible: false,
      closeDrawerAfterNvigation: true,
      availableRoutes: [
        { path: '/', name: 'Home', icon: 'move_to_inbox'},
        { path: '/portfolio', name: 'Portfolio', icon: 'error'},
        { path: '/stocks', name: 'Stocks', icon: 'send'},
      ]
    }
  },
  methods: {
    ...mapActions({
      loadServerData : 'loadData'
    }),
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    closeMenu() {
      if( this.closeDrawerAfterNvigation ) {
        this.menuVisible = false;
      }
    },
    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks
      }

      console.log( data);
      this.$http.put('data.json', data);
    },
    loadData() {
      this.loadServerData();
    }
  },
  created() {
    this.$store.dispatch('initStocks');
  }
}
</script>

<style scoped>
  .md-app {
    min-height: 100vh;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .router-link {
    cursor: pointer;    
  }

  .link-active{
    font-weight: bold
  }

  .custom-switch {
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 20px;
  }

  .slide-enter-active {
    animation: slide-in .3s ease-out forwards;
  }

  .slide-leave-active {
    animation: slide-out .3s ease-out forwards;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }

</style>
