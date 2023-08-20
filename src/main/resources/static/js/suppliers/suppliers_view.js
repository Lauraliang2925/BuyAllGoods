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
      contractsAllData:[],

      chooseSuppliersId: null,

      pageCount: [],
      offset: "",
      offset2: "",
      findOffset: "",

      isShowPage: false,

      tomorrowDate: tomorrow,
      todayDate: new Date(),

      isShowSearch:false,
      
    };
  },
  computed: {},
  methods: {
    //分頁查詢
    callFindAllSCPage: function (offset) {
      this.callFindAllSuppliers();
      this.callFindAllContracts();
      this.isShowPage = false;
      this.isShowSearch=false;
      let pika = this;
      let userRoleId = localStorage.getItem("RoleId");

      if (userRoleId === "1") {
        this.isShowPage = true;
        this.isShowSearch=true;
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
      } else if (userRoleId === "2") {
        pika.isShowPage = false;
        pika.isShowSearch=false;
        let localStorageMembersId = localStorage.getItem("MembersId");
        console.log("localStorageMembersId", localStorageMembersId);
        let request = {
          membersId: localStorageMembersId,
        };
        console.log("request", request);

        let pulu = pika;
        axios
          .post(contextPath + "/suppliers/findSupplier", request)
          .then(function (response) {
            console.log(response);
            let vm = pulu;
            let suppliersId = response.data.suppliersId;
            axios
              .get(
                contextPath +
                  "/suppliers/findSomeSCPage?offset=" +
                  offset +
                  "&suppliersId=" +
                  suppliersId
              )
              .then(function (response2) {
                vm.pageCount = response2.data;
                vm.suppliersData = response2.data;
              })
              .catch(function () {})
              .finally(function () {
                vm.callCountAllSC();
              });
          })
          .catch(function () {})
          .finally(function () {});
      }
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

    //查詢全部的合約有哪些，for合約編號的填寫欄位
    callFindAllContracts: function () {
      let pika = this;
      axios
        .post(contextPath + "/contracts/findAllContracts")
        .then(function (response) {
          pika.contractsAllData = response.data;
        })
        .catch(function () {})
        .finally(function () {});
    },

    //進入畫面先查詢全部的資料
    callFindSC: function () {
      console.log("userRoleId", userRoleId);
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
      let roleId=localStorage.getItem("RoleId")
      if(roleId==='1'){
        const url = contextPath + "/goAddContracts?suppliersId=" + suppliersId;
        window.location.href = url;
      }else{
        bootbox.alert({
          title: "提醒！",
          message:
            '<div class="text-center">如合約尚未登錄，請聯繫管理員協助登錄，謝謝！</div>',
          buttons: {
            ok: { label: "關閉", className: "btn btn-warning" },
          },
        });
      }
      
    },
  },
  mounted: function () {
    // this.callFindSC();
    this.offset = 0;
    this.callFindAllSCPage(this.offset);
  },
});

app.mount("#app");