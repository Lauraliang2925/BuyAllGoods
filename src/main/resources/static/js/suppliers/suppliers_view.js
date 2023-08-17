/**
 *
 */

const app = Vue.createApp({
  components: {
    paginate: VuejsPaginateNext,
  },
  data: function () {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 1);
    return {
      findSuppliersId: null,
      findSuppliersName: null,
      findContractsId: null,

      suppliersData: [],
      suppliersAllData: [],

      chooseSuppliersId: null,

      pageCount: [],
      offset: "",
      offset2: "",
      findOffset: "",

      isShowPage: true,

      tomorrowDate: tomorrow,
      todayDate: new Date(),
    };
  },
  computed: {},
  methods: {
    //分頁查詢
    callFindAllSCPage: function (offset) {
      this.isShowPage = true;
      let pika = this;

      axios
        .get(contextPath + "/suppliers/findAllSCPage?offset=" + offset)
        .then(function (response) {
          pika.pageCount = response.data;
          pika.suppliersData = response.data;
        })
        .catch(function () {})
        .finally(function () {
          pika.callCountAllSC();
        });
    },

    //計算總共有幾頁
    callCountAllSC: function () {
      let pika = this;
      axios
        .get(contextPath + "/suppliers/countAllSC")
        .then(function (response) {
          pika.pageCount = response.data;
        })
        .catch(function () {});
    },

    //查看合約明細的按鈕，丟contractsId
    showDetailsByContractsId: function (contractsId) {
      const url =
        contextPath + "/showContractsDetailsPage?contractsId=" + contractsId;
      window.location.href = url;
    },

    //查看廠商明細的按鈕，丟suppliersId
    showDetailsBySuppliersId: function (suppliersId) {
      const url =
        contextPath + "/showSuppliersDetailsPage?suppliersId=" + suppliersId;
      window.location.href = url;
    },

    //查詢全部的廠商有哪些，for廠商名稱的填寫欄位
    callFindAllSuppliers: function () {
      let pika = this;
      axios
        .post(contextPath + "/suppliers/findAllSuppliers")
        .then(function (response) {
          pika.suppliersAllData = response.data;
        })
        .catch(function () {})
        .finally(function () {});
    },

    //進入畫面先查詢全部的資料
    callFindSC: function () {
      let pika = this;
      axios
        .post(contextPath + "/suppliers/findAllSC")
        .then(function (response) {
          // pika.suppliersData = response.data;
        })
        .catch(function () {})
        .finally(function () {});
    },

    //callFindSomeSC
    findSomeSC: function (request) {
      this.isShowPage = false;
      let pika = this;
      axios
        .post(contextPath + "/suppliers/findSomeSC", request)
        .then(function (response) {
          pika.suppliersData = response.data;
        })
        .catch(function () {})
        .finally(function () {});
    },

    //查詢條件的方法(篩選出我要的那個)
    callFindSomeSC: function () {
      let pika = this;

      if (
        this.findSuppliersId === null &&
        this.findSuppliersName === null &&
        this.findContractsId === null
      ) {
        console.log("null");
        pika.callFindAllSCPage(0);
      } else if (
        this.findSuppliersId === "" &&
        this.findSuppliersName === "" &&
        this.findContractsId === ""
      ) {
        console.log("空");

        pika.callFindAllSCPage(0);
      } else {
        let request = {};
        //當suppliersId是空白
        if (this.findSuppliersId === null || this.findSuppliersId === "") {
          console.log("a空白1");

          request = {
            suppliersName: this.findSuppliersName,
            contractsId: this.findContractsId,
          };
          pika.findSomeSC(request);
          //當suppliersName是空白，suppliersId是空白
          if (
            this.findSuppliersName === null ||
            this.findSuppliersName === ""
          ) {
            console.log("a+b空白1");
            //當suppliersName是空白，suppliersId是空白，contractsId是空白
            if (this.findContractsId === null || this.findContractsId === "") {
              console.log("a+b+c空白1");

              pika.callFindAllSCPage(0);
            } else {
              console.log("a+b空白2");
              request = {
                contractsId: this.findContractsId,
              };
              pika.findSomeSC(request);
            }
          }
          //當suppliersName不是空白，suppliersId是空白
          else if (
            this.findContractsId === null ||
            this.findContractsId === ""
          ) {
            console.log("a+c空白");
            request = {
              suppliersName: this.findSuppliersName,
            };
            pika.findSomeSC(request);
          }
        }

        //當suppliersId不是空白
        else if (this.findSuppliersId !== null || this.findSuppliersId !== "") {
          //當suppliersId不是空白，suppliersName是空白
          if (
            this.findSuppliersName === null ||
            this.findSuppliersName === ""
          ) {
            //當suppliersId不是空白，suppliersName是空白，contractsId是空白
            if (this.findContractsId === null || this.findContractsId === "") {
              console.log("b+c空白2");
              request = {
                suppliersId: this.findSuppliersId,
              };
              pika.findSomeSC(request);
            }
            //當suppliersId不是空白，suppliersName是空白，contractsId不是空白
            else {
              console.log("b空白2");
              request = {
                suppliersId: this.findSuppliersId,
                contractsId: this.findContractsId,
              };
              pika.findSomeSC(request);
            }
          }
          //當suppliersId不是空白，suppliersName不是空白
          else {
            //當suppliersId不是空白，suppliersName不是空白，contractsId是空白
            if (this.findContractsId === null || this.findContractsId === "") {
              console.log("c空白2");
              request = {
                suppliersId: this.findSuppliersId,
                suppliersName: this.findSuppliersName,
              };
              pika.findSomeSC(request);
            }
            //當suppliersId不是空白，suppliersName不是空白，contractsId不是空白
            else {
              console.log("a+b+c all 2");
              request = {
                suppliersId: this.findSuppliersId,
                suppliersName: this.findSuppliersName,
                contractsId: this.findContractsId,
              };
              pika.findSomeSC(request);
            }
          }
        }
      }
    },

    //如果廠商沒有合約資料，就顯示新增，帶到專屬廠商的合約新增畫面
    callGoAddContracts: function (suppliersId) {
      const url = contextPath + "/goAddContracts?suppliersId=" + suppliersId;
      window.location.href = url;
    },
  },
  mounted: function () {
    this.callFindSC();
    this.callFindAllSuppliers();
    this.offset = 0;
    this.callFindAllSCPage(this.offset);
  },
});

app.mount("#app");
