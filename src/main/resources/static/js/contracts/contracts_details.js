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
      finishMessage: "",
      hintFinishMessage: "",
    };
  },
  methods: {
    //簽約日不早於系統日
    checkStartDate: function () {
      const today = new Date(); // 获取当前系统日期
      const startDate = new Date(this.findStartDate); // 将输入的日期转换为日期对象

      //只取年月日，把時分秒排除
      const startDateWithoutTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      const todayWithoutTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      // 比较签约日期是否在今天之后
      if (startDateWithoutTime > todayWithoutTime) {
        this.startDateMessage = "合約起日不得晚於系統日";
      } else {
        this.startDateMessage = ""; // 清空消息
      }

      const endEndDate = new Date(this.findEndDate); // 将输入的签约日期转换为日期对象
      const endWithoutTime = new Date(
        endEndDate.getFullYear(),
        endEndDate.getMonth(),
        endEndDate.getDate()
      );
      // 比较起迄日
      if (endWithoutTime < startDateWithoutTime) {
        this.endDateMessage = "合約迄日不得早於合約起日";
      } else {
        this.endDateMessage = ""; // 清空消息
      }
    },

    //到期日不能早於簽約日
    checkEndDate: function () {
      const startDate = new Date(this.findStartDate); // 将输入的签约日期转换为日期对象
      const endEndDate = new Date(this.findEndDate); // 将输入的签约日期转换为日期对象
      //只取年月日，把時分秒排除
      const startDateWithoutTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      const todayWithoutTime = new Date(
        endEndDate.getFullYear(),
        endEndDate.getMonth(),
        endEndDate.getDate()
      );
      // 比较日期
      if (todayWithoutTime < startDateWithoutTime) {
        this.endDateMessage = "合約迄日不得早於合約起日";
      } else {
        this.endDateMessage = ""; // 清空消息
      }
    },

    //取contractsId，送findByContractsId查詢方法
    getContractsData: function (contractsId) {
      let request = {
        contractsId,
      };
      let pika = this;
      axios
        .get(
          contextPath + "/contracts/findByContractsId/" + contractsId,
          request
        )
        .then(function (response) {
          // 將回傳的JSON數據存儲到data中的suppliersData
          this.contractsData = response.data;
          // 更新相應的input元素的值

          pika.findContractsId = this.contractsData.contractsId;

          pika.findContractNumber = this.contractsData.contractNumber;

          pika.findSuppliersId = this.contractsData.suppliersId;

          pika.findStartDate = this.contractsData.startDate;

          pika.findEndDate = this.contractsData.endDate;

          pika.findContractTitle = this.contractsData.contractTitle;

          pika.findAmount = this.contractsData.amount;

          //

          //明細畫面顯示的文字
          const today = new Date(); // 获取当前系统日期
          const startDate = new Date(pika.findEndDate); // 将输入的日期转换为日期对象

          //只取年月日，把時分秒排除
          const startDateWithoutTime = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
          );
          const todayWithoutTime = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          );

          if (startDateWithoutTime < todayWithoutTime) {
            pika.hintFinishMessage = "※該合約已到期※";
          }
        })
        .catch(function () {});
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

    //取contractsId的方法
    getParameterByName: function (name) {
      name = name.replace(/[\[\]]/g, "\\$&");
      var url = window.location.href;
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      var results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    //修改
    callAddContractsToUpdate: function () {
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
      } else if (
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
          contractsId: this.findContractsId,
          contractNumber: this.findContractNumber,
          suppliersId: this.findSuppliersId,
          startDate: this.findStartDate,
          endDate: this.findEndDate,
          contractTitle: this.findContractTitle,
          amount: this.findAmount,
        };

        bootbox.confirm({
          title: "再次確認！",
          message: '<div class="text-center">' + "確認要修改嗎？" + "</div>",
          buttons: {
            confirm: {
              label: "確認",
              className: "btn-success",
            },
            cancel: {
              label: "返回修改",
              className: "btn-danger",
            },
          },
          callback: function (result) {
            //確認就往下修改
            if (result) {
              let pika = this;
              axios
                .post(contextPath + "/contracts/editContracts", request)
                .then(function (response) {
                  pika.updateMessage = response.data;
                })
                .catch(function () {})
                .finally(function () {
                  //開始

                  bootbox.alert({
                    title: "訊息！",
                    message:
                      '<div class="text-center">' +
                      pika.updateMessage +
                      "</div>",
                    buttons: {
                      ok: { label: "回到查詢頁", className: "btn btn-warning" },
                    },
                    callback: function () {
                      window.location.href = "/buyallgoods/showSupplierPage";
                    },
                  });

                  //結束
                });
            } else {
            }
          },
        });
      }
    },

    //終止合約
    callFinishContracts: function () {

      let request = {
        contractsId: this.findContractsId,
        contractNumber: this.findContractNumber,
        suppliersId: this.findSuppliersId,
        startDate: this.findStartDate,
        endDate: this.findEndDate,
        contractTitle: this.findContractTitle,
        amount: this.findAmount,
      };

      bootbox.confirm({
        title: "再次確認！",
        message:
          '<div class="text-center">' +
          "確認要終止此合約嗎？" +
          "</div>" +
          "<br>" +
          '<p class="text-center" style="color:red">※此操作將連同其商品販售一同終止</p>',
        buttons: {
          confirm: {
            label: "確認",
            className: "btn-success",
          },
          cancel: {
            label: "返回",
            className: "btn-danger",
          },
        },
        callback: function (result) {
          //確認就往下修改

          let pika = this;
          axios
            .post(contextPath + "/contracts/finishContracts", request)
            .then(function (response) {
              pika.finishMessage = response.data;
            })
            .catch(function () {})
            .finally(function () {
              //開始

              bootbox.alert({
                title: "訊息！",
                message:
                  '<div class="text-center">' + pika.finishMessage + "</div>",
                buttons: {
                  ok: { label: "關閉", className: "btn btn-warning" },
                },
                callback: function () {
                  // 設定dialog存在時間，到1000(1秒)就hideAll(隱藏全部)

                  const url = contextPath + "/showSupplierPage";
                  window.location.href = url;
                },
              });
            });
        },
      });
    },
  },
  mounted: function () {
    const urlParams = new URLSearchParams(window.location.search);
    const contractsId = urlParams.get("contractsId");
    this.getContractsData(contractsId);
    this.callFindAllSuppliers();
  },
});

app.mount("#app");
