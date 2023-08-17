/**
 *
 */
const app = Vue.createApp({
  components: {},
  data: function () {
    return {
      suppliersData: {},

      findSuppliersId: "",
      findMembersId: "",
      findSuppliersName: "",
      findTaxId: "",
      findPhone: "",
      findAddress: "",
      findLogistics: "",
      findSigningDate: "",
      findContractEndDate: "",
      findBoss: "",
      findContactPerson: "",
      findPhoneNumber: "",
      findEmail: "",
      findRemarks: "",

      updateMessage: "",
      finishMessage: "",

      membersData: [],

      userName: "",
      firstName: "",
      lastName: "",

      reply: "",
      signingDateMessage: "",
      contractEndDateMessage: "",
      hintFinishMessage: "",
    };
  },
  methods: {
    //簽約日不早於系統日
    checkSigningDate: function () {
      const today = new Date(); // 获取当前系统日期
      const startDate = new Date(this.findSigningDate); // 将输入的签约日期转换为日期对象
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
        this.signingDateMessage = "簽約日期不得晚於系統日";
      } else {
        this.signingDateMessage = ""; // 清空消息
      }

      const endWithoutTime = new Date(this.findContractEndDate); // 将输入的签约日期转换为日期对象

      // 比较起迄日
      if (endWithoutTime < startDateWithoutTime) {
        this.contractEndDateMessage = "契約到期日不得早於簽約日期";
      } else {
        this.contractEndDateMessage = ""; // 清空消息
      }
    },

    //到期日不能早於簽約日
    checkContractEndDate: function () {
      const signingDate = new Date(this.findSigningDate); // 将输入的签约日期转换为日期对象
      const contractEndDate = new Date(this.findContractEndDate); // 将输入的签约日期转换为日期对象
      //只取年月日，把時分秒排除
      const startDateWithoutTime = new Date(
        signingDate.getFullYear(),
        signingDate.getMonth(),
        signingDate.getDate()
      );
      const todayWithoutTime = new Date(
        contractEndDate.getFullYear(),
        contractEndDate.getMonth(),
        contractEndDate.getDate()
      );
      // 比较日期
      if (todayWithoutTime < startDateWithoutTime) {
        this.contractEndDateMessage = "契約到期日不得早於簽約日期";
      } else {
        this.contractEndDateMessage = ""; // 清空消息
      }
    },

    //取suppliersId的方法 [[沒有使用]]
    getParameterByName: function (name) {
      name = name.replace(/[\[\]]/g, "\\$&");
      var url = window.location.href;
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      var results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    //取suppliersId，送findBySuppliersId查詢方法
    getSuppliersData: function (suppliersId) {
      let request = {
        suppliersId,
      };

      let pika = this;
      axios
        .get(
          contextPath + "/suppliers/findBySuppliersId/" + suppliersId,
          request
        )
        .then(function (response) {
          // 將回傳的JSON數據存儲到data中的suppliersData
          this.suppliersData = response.data;
          // 更新相應的input元素的值
          pika.findSuppliersId = this.suppliersData.suppliersId;
          pika.findMembersId = this.suppliersData.membersId;
          pika.findSuppliersName = this.suppliersData.suppliersName;
          pika.findTaxId = this.suppliersData.taxId;
          pika.findPhone = this.suppliersData.phone;
          pika.findAddress = this.suppliersData.address;
          pika.findLogistics = this.suppliersData.logistics;
          pika.findSigningDate = this.suppliersData.signingDate;
          pika.findContractEndDate = this.suppliersData.contractEndDate;
          pika.findBoss = this.suppliersData.boss;
          pika.findContactPerson = this.suppliersData.contactPerson;
          pika.findPhoneNumber = this.suppliersData.phoneNumber;
          pika.findEmail = this.suppliersData.email;
          pika.findRemarks = this.suppliersData.remarks;

          const today = new Date(); // 获取当前系统日期
          const startDate = new Date(pika.findContractEndDate); // 将输入的日期转换为日期对象

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
            pika.hintFinishMessage = "※與該廠商之合作已終止※";
          }

          //取得membersId，讓一進明細畫面，會員帳號後面就直接顯示姓名
          let membersId = pika.findMembersId;
          let request2 = {
            membersId,
          };

          let pulu = pika;
          axios
            .post(
              contextPath + "/members/findByMembersIdForContractsAdd",
              request2
            )
            .then(function (response2) {
              pulu.userName = response2.data.userName;
              pulu.firstName = response2.data.firstName;
              pulu.lastName = response2.data.lastName;
              pulu.reply = "會員姓名： " + pulu.firstName + pulu.lastName;
            })
            .catch(function () {})
            .finally(function () {});
        })
        .catch(function () {});
    },

    //修改
    callAddSuppliersToUpdate: function () {
      const signingDate = new Date(this.findSigningDate); // 将输入的签约日期转换为日期对象
      const contractEndDate = new Date(this.findContractEndDate); // 将输入的签约日期转换为日期对象
      const today = new Date(); // 获取当前系统日期
      //如果日期有誤，沒有修改，就不能新增
      if (signingDate > today || contractEndDate < signingDate) {
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
        this.findMembersId === "" ||
        this.findSuppliersName === "" ||
        this.findTaxId === "" ||
        this.findSigningDate === "" ||
        this.findContractEndDate === "" ||
        this.findBoss === "" ||
        this.findContactPerson === "" ||
        this.findPhoneNumber === "" ||
        this.findEmail === "" ||
        this.findRemarks === ""
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
          suppliersId: this.findSuppliersId,
          membersId: this.findMembersId,
          suppliersName: this.findSuppliersName,
          taxId: this.findTaxId,
          phone: this.findPhone,
          address: this.findAddress,
          logistics: this.findLogistics,
          signingDate: this.findSigningDate,
          contractEndDate: this.findContractEndDate,
          boss: this.findBoss,
          contactPerson: this.findContactPerson,
          phoneNumber: this.findPhoneNumber,
          email: this.findEmail,
          remarks: this.findRemarks,
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
                .post(contextPath + "/suppliers/updateBySuppliersId", request)
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
              // 点击了"返回修改"按钮，跳转到/showSupplierPage
              // window.location.href = "/buyallgoods/showSupplierPage";
            }
          },
        });
      }
    },

    //修改--終止合作，用合約id找全部商品，並全部終止
    callFinishProductDate: function (request2) {
      axios
        .post(contextPath + "/product/finishProductDate", request2)
        .then(function (response) {})
        .catch(function () {})
        .finally(function () {});
    },

    //修改--終止合作，用廠商id找全部合約，並全部終止
    callFinishBySId: function (request1) {
      let pulu = this;
      axios
        .post(contextPath + "/contracts/finishBySId", request1)
        .then(function (response) {
          pulu.callFinishProductDate(response.data);
        })
        .catch(function () {})
        .finally(function () {});
    },

    //修改--終止合作
    callFinishSuppliers: function () {
      let request = {
        suppliersId: this.findSuppliersId,
        membersId: this.findMembersId,
        suppliersName: this.findSuppliersName,
        taxId: this.findTaxId,
        phone: this.findPhone,
        address: this.findAddress,
        logistics: this.findLogistics,
        signingDate: this.findSigningDate,
        contractEndDate: this.findContractEndDate,
        boss: this.findBoss,
        contactPerson: this.findContactPerson,
        phoneNumber: this.findPhoneNumber,
        email: this.findEmail,
        remarks: this.findRemarks,
      };

      bootbox.confirm({
        title: "再次確認！",
        message:
          '<div class="text-center">' +
          "確認要終止與此廠商之合作嗎？" +
          "</div>" +
          "<br>" +
          '<p class="text-center" style="color:red">※此操作將連同其合約及商品販售一同終止</p>',
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
        callback: (result) => {
          //確認就往下修改
          if (result) {
            //透過廠商ID把對應的合約都終止~
            this.callFinishBySId(request);
            let pika = this;
            axios
              .post(contextPath + "/suppliers/finishSuppliers", request)
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
                    const url = contextPath + "/showSupplierPage";
                    window.location.href = url;
                  },
                });
              });
          } else {
          }
        },
      });
    },

    //選擇會員代號後，後方顯示對應會員的名稱
    callFindByMembersIdForContractsAdd: function () {
      let membersId = this.findMembersId;

      let request = {
        membersId,
      };
      let pika = this;
      axios
        .post(contextPath + "/members/findByMembersIdForContractsAdd", request)
        .then(function (response) {
          pika.userName = response.data.userName;
          pika.firstName = response.data.firstName;
          pika.lastName = response.data.lastName;
          pika.reply = "會員姓名： " + pika.firstName + pika.lastName;
        })
        .catch(function () {})
        .finally(function () {});
    },

    //查詢全部的會員有哪些，for會員代號的填寫欄位
    callFindAllMembers: function () {
      let pika = this;
      axios
        .post(contextPath + "/members/findMembersByIdForAddS")
        .then(function (response) {
          pika.membersData = response.data;
        })
        .catch(function () {})
        .finally(function () {});
    },
  },
  mounted: function () {
    const urlParams = new URLSearchParams(window.location.search);
    const suppliersId = urlParams.get("suppliersId");
    this.getSuppliersData(suppliersId);
    this.callFindAllMembers();
  },
});

app.mount("#app");
