import Vue from 'vue';


export const loadData = ({commit}) => {
    Vue.http.get('data.json')
    .then( response => response.json())
    .then( data => {
        const stocks = data.stocks;
        const portfolio = data.stockPortfolio;
        const funds = data.funds;

        const stocksPortfolio = {
            portfolio,
            funds
        }

        commit('SET_STOCKS', stocks);
        commit('SET_PORTFOLIO', stocksPortfolio);
    })
}