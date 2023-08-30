/**
 *
 */

//轉換日期為YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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
      overSigningDateMessage: "",
      overSupplierEndDateMessage:"",
    };
  },
  methods: {
     //一鍵新增
     autoADD: function () {
      (this.findContractNumber = "ABC-0001-002"),
        (this.findContractTitle = "十萬個為甚麼書籍販售合約"),
        (this.findAmount = "100000");
    },
    //簽約日不早於系統日
    checkStartDate: function (suppliersId) {
      let p = this;
      axios
        .get(contextPath + "/suppliers/findBySuppliersId/" + suppliersId)
        .then(function (response) {
          let signingDate = new Date(response.data.signingDate);
          const keyInStartDate = new Date(p.findStartDate);

          //只取年月日，把時分秒排除
          const suppliersStartDate = new Date(
            signingDate.getFullYear(),
            signingDate.getMonth(),
            signingDate.getDate()
          );

          const startDate = new Date(
            keyInStartDate.getFullYear(),
            keyInStartDate.getMonth(),
            keyInStartDate.getDate()
          );

          if (startDate < suppliersStartDate) {
            p.overSigningDateMessage =
              "合約起日不得早於廠商簽約日，廠商簽約日：" +
              formatDate(suppliersStartDate);
          } else {
            p.overSigningDateMessage = ""; // 清空消息
          }
        })
        .catch(function () {})
        .finally(function () {});

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
    checkEndDate: function (suppliersId) {

      let p = this;
        axios
          .get(contextPath + "/suppliers/findBySuppliersId/" + suppliersId)
          .then(function (response) {
            let contractEndDate = new Date(response.data.contractEndDate);
            const keyInEndDate = new Date(p.findEndDate);

            //只取年月日，把時分秒排除
            const suppliersEndDate = new Date(
              contractEndDate.getFullYear(),
              contractEndDate.getMonth(),
              contractEndDate.getDate()
            );

            const endDate = new Date(
              keyInEndDate.getFullYear(),
              keyInEndDate.getMonth(),
              keyInEndDate.getDate()
            );

            if (endDate > suppliersEndDate) {
              p.overSupplierEndDateMessage =
                "合約起日不得晚於廠商契約到期日，廠商契約到期日：" +
                formatDate(suppliersEndDate);
            } else {
              p.overSupplierEndDateMessage = ""; // 清空消息
            }
          })
          .catch(function () {})
          .finally(function () {});

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
