var app = new Vue({
    el: '#app',
    data: {
        data: [],
        filter: '',
        currentPage: 0
    },
    created() {
        // 讀取資料
        const vm = this;
        axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
            .then((response) => {
                console.log(response);
                vm.data = response.data.result.records;
            });
    },
    computed: {
        filterZoneList: function(){
            // 讀取唯一值
            let zone = [];
            let result = new Set();
            this.data.forEach( (item) => {
                result.add(item.Zone);
            });
            return zone = Array.from(result);
        },
        filterZone (){
            // 先過濾行政區
            let vm = this;
            let card = [];
            if (this.filter !== ''){
                this.data.forEach(function(item, index){
                    if (vm.filter == item.Zone){
                        card.push(item);
                    }
                });
            } else {
                card = this.data;
            };
            
            let pageData = [];
            card.forEach(function(item, index){
                // 先訂出一頁有10個
                if (index % 10 === 0){
                    pageData.push([]);
                };
                let page = parseInt(index / 10);
                pageData[page].push(item);
            });
            console.log(pageData);
            return pageData;
        },
    },
});
