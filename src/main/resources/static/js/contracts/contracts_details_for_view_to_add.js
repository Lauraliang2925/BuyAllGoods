/**
 *
 */
const app = Vue.createApp({
  components: {},
  data: function () {
    return {
      contractsData: {},

      suppliersAllData: [],

      findContractsId: "",
      findContractNumber: "",
      findSuppliersId: "",
      findStartDate: "",
      findEndDate: "",
      findContractTitle: "",
      findAmount: "",

      updateMessage: "",
      startDateMessage: "",
      endDateMessage: "",
    };
  },
  methods: {
    //簽約日不早於系統日
    checkStartDate: function () {
      const today = new Date(); // 获取当前系统日期
      const startDate = new Date(this.findStartDate); // 将输入的日期转换为日期对象

      // 比较签约日期是否在今天之后
      if (startDate > today) {
        this.startDateMessage = "合約起日不得晚於系統日";
      } else {
        this.startDateMessage = ""; // 清空消息
      }

      const endEndDate = new Date(this.findEndDate); // 将输入的签约日期转换为日期对象

      // 比较起迄日
      if (endEndDate < startDate) {
        this.endDateMessage = "合約迄日不得早於合約起日";
      } else {
        this.endDateMessage = ""; // 清空消息
      }
    },

    //到期日不能早於簽約日
    checkEndDate: function () {
      const startDate = new Date(this.findStartDate); // 将输入的签约日期转换为日期对象
      const endEndDate = new Date(this.findEndDate); // 将输入的签约日期转换为日期对象

      // 比较日期
      if (endEndDate < startDate) {
        this.endDateMessage = "合約迄日不得早於合約起日";
      } else {
        this.endDateMessage = ""; // 清空消息
      }
    },

    //取contractsId，送findByContractsId查詢方法
    getSuppliersId: function (suppliersId) {
      this.findSuppliersId = suppliersId;
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

    //新增合約按鈕
    callAddContracts: function () {
      const today = new Date(); // 获取当前系统日期
      const startDate = new Date(this.findStartDate);
      const endEndDate = new Date(this.findEndDate);

      //如果日期有誤，沒有修改，就不能新增
      if (startDate > today || endEndDate < startDate) {
        bootbox.alert({
          title: "提醒！",
          message:
            '<div class="text-center">欄位有誤尚未修正(請調整有紅字提示之欄位)</div>',
          buttons: {
            ok: { label: "關閉", className: "btn btn-warning" },
          },
        });
      }
      //如果有欄位沒有填，就不能新增
      else if (
        this.findContractNumber === "" ||
        this.findSuppliersId === "" ||
        this.findStartDate === "" ||
        this.findEndDate === "" ||
        this.findContractTitle === "" ||
        this.findAmount === ""
      ) {
        bootbox.alert({
          title: "提醒！",
          message: '<div class="text-center">還有欄位沒有填寫唷！</div>',
          buttons: {
            ok: { label: "關閉", className: "btn btn-warning" },
          },
        });
      } else {
        let request = {
          contractNumber: this.findContractNumber,
          suppliersId: this.findSuppliersId,
          startDate: this.findStartDate,
          endDate: this.findEndDate,
          contractTitle: this.findContractTitle,
          amount: this.findAmount,
        };
        let pika = this;
        axios
          .post(contextPath + "/contracts/addContracts", request)
          .then(function (response) {
            pika.addMessage = response.data;

            bootbox.confirm({
              title: "訊息！",
              message: '<div class="text-center">' + pika.addMessage + "</div>",
              buttons: {
                confirm: {
                  label: "確認",
                  className: "btn-success",
                },
                cancel: {
                  label: "繼續新增",
                  className: "btn-danger",
                },
              },
              callback: function (result) {
                if (result) {
                  // 点击了"確認"按钮，跳转到/showSupplierPage
                  window.location.href = "/buyallgoods/showSupplierPage";
                } else {
                  // 点击了"繼續新增"按钮，清空输入框的值
                  pika.findContractNumber = "";
                  pika.findSuppliersId = "";
                  pika.findStartDate = "";
                  pika.findEndDate = "";
                  pika.findContractTitle = "";
                  pika.findAmount = "";
                  pika.startDateMessage = "";
                  pika.endDateMessage = "";
                }
              },
            });
          })
          .catch(function () {})
          .finally(function () {});
      }
    },
  },
  mounted: function () {
    const urlParams = new URLSearchParams(window.location.search);
    const suppliersId = urlParams.get("suppliersId");

    this.getSuppliersId(suppliersId);
    this.callFindAllSuppliers();
  },
});

app.mount("#app");
