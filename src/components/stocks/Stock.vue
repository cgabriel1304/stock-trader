<template>
  <div class="card md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-100">
  <md-card md-with-hover>
    <!-- <md-ripple> -->
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ stock.name }}</div>
          <div class="md-subhead">(Price: {{ stock.price }})</div>
        </md-card-header-text>
        <md-card-media class="md-xsmall-hide md-small-hide">
          <md-icon class="md-size-3x">timeline</md-icon>
        </md-card-media>
      </md-card-header>

      <md-card-content>        
        <md-field :class="{ 'md-invalid':  (quantity < 0) ||  (quantity*stock.price > funds)}">
          <label>Buy Stocks</label>
          <md-input type="number" v-model="quantity"></md-input>
          <span class="md-helper-text">Input how many stocks you want to buy. (TOTAL: {{ quantity*stock.price }})</span>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-primary" @click="buyStock" :disabled=" quantity < 0 ">BUY</md-button>
      </md-card-actions>
    <!-- </md-ripple> -->
  </md-card>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    props: ['stock'],
    computed: {
      ...mapGetters({ funds : 'funds'})
    },
    data() {
      return {
        quantity: 0
      }
    },
    methods: {
      buyStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        }
        this.$store.dispatch('buyStocks', order);
        this.quantity = 0;
      }
    }
}
</script>


<style scoped>
  .card {
    margin-bottom: 20px;
  }
</style>
